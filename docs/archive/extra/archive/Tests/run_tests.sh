#!/bin/bash

# Vex Language Test Suite Runner
# Runs all tests in Specifications/Tests/ directory
# Parallel execution with GNU parallel or xargs fallback

VEX_BIN="$HOME/.cargo/target/debug/vex"
TESTS_DIR="Specifications/Tests"
TIMEOUT_SECS=${TIMEOUT_SECS:-5}  # 5 second timeout per test
MAX_JOBS=${MAX_JOBS:-8}  # Default 8 parallel jobs
RESULTS_DIR=$(mktemp -d)

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo "========================================="
echo "  Vex Language Test Suite (Parallel)"
echo "  Max jobs: $MAX_JOBS | Timeout: ${TIMEOUT_SECS}s"
echo "========================================="
echo ""

# Check if vex binary exists
if [ ! -f "$VEX_BIN" ]; then
    echo -e "${RED}Error: Vex binary not found at $VEX_BIN${NC}"
    echo "Please run: cargo build"
    exit 1
fi

# Collect all test files (macOS compatible)
all_tests=()
while IFS= read -r test_file; do
    all_tests+=("$test_file")
done < <(find "$TESTS_DIR" -path "$TESTS_DIR/[0-9][0-9]*/*.vx" -type f 2>/dev/null | sort)

total_tests=${#all_tests[@]}
echo -e "${CYAN}Found $total_tests tests${NC}"
echo ""

echo -e "${BLUE}Running tests...${NC}"
start_time=$(date +%s)

# Function to run a single test and save result
run_single_test() {
    local test_file="$1"
    local result_dir="$2"
    local timeout_secs="$3"
    local vex_bin="$4"
    
    local test_name=$(basename "$test_file" .vx)
    local category=$(basename "$(dirname "$test_file")")
    local result_file="$result_dir/${category}___${test_name}"
    
    output=$(timeout "${timeout_secs}s" "$vex_bin" run "$test_file" 2>&1)
    exit_code=$?
    
    if [ $exit_code -eq 0 ]; then
        if echo "$output" | grep -q "✅"; then
            echo "PASS" > "$result_file"
        else
            echo "PARTIAL" > "$result_file"
        fi
    elif [ $exit_code -eq 124 ]; then
        echo "TIMEOUT" > "$result_file"
    else
        echo "FAIL|$(echo "$output" | head -c 100 | tr '\n' ' ')" > "$result_file"
    fi
}

export -f run_single_test

# Run tests in parallel using xargs
printf '%s\n' "${all_tests[@]}" | xargs -P "$MAX_JOBS" -I {} bash -c 'run_single_test "$@"' _ {} "$RESULTS_DIR" "$TIMEOUT_SECS" "$VEX_BIN"

# Collect and display results
PASSED=0
FAILED=0
PARTIAL=0
TIMEOUT_COUNT=0

declare -a failed_tests
declare -a partial_tests
declare -a timeout_tests

for result_file in "$RESULTS_DIR"/*; do
    [ -f "$result_file" ] || continue
    
    filename=$(basename "$result_file")
    category="${filename%%___*}"
    test_name="${filename#*___}"
    
    IFS='|' read -r status error < "$result_file"
    
    case "$status" in
        PASS)
            echo -e "${GREEN}✅ PASS${NC} $category/$test_name"
            ((PASSED++))
            ;;
        PARTIAL)
            echo -e "${YELLOW}⚠️  PARTIAL${NC} $category/$test_name"
            partial_tests+=("$category/$test_name")
            ((PARTIAL++))
            ((PASSED++))
            ;;
        TIMEOUT)
            echo -e "${RED}⏰ TIMEOUT${NC} $category/$test_name"
            timeout_tests+=("$category/$test_name: Timed out after ${TIMEOUT_SECS}s")
            ((TIMEOUT_COUNT++))
            ((FAILED++))
            ;;
        FAIL)
            echo -e "${RED}❌ FAIL${NC} $category/$test_name"
            failed_tests+=("$category/$test_name: $error")
            ((FAILED++))
            ;;
    esac
done

# Cleanup
rm -rf "$RESULTS_DIR"

end_time=$(date +%s)
duration=$((end_time - start_time))

# Summary
echo ""
echo "========================================="
echo "  Test Summary"
echo "========================================="
echo -e "${GREEN}Passed:   $PASSED${NC}"
echo -e "${RED}Failed:   $FAILED${NC}"
echo -e "${YELLOW}Partial:  $PARTIAL${NC}"
echo -e "${RED}Timeout:  $TIMEOUT_COUNT${NC}"
echo ""
echo "Duration: ${duration}s"

total=$((PASSED + FAILED))
if [ $total -gt 0 ]; then
    percentage=$((PASSED * 100 / total))
    echo "Success Rate: $percentage% ($PASSED/$total)"
fi

# Show failed tests details
if [ ${#failed_tests[@]} -gt 0 ]; then
    echo ""
    echo -e "${RED}━━━ Failed Tests ━━━${NC}"
    for test in "${failed_tests[@]}"; do
        echo -e "  ${RED}•${NC} $test"
    done
fi

if [ ${#timeout_tests[@]} -gt 0 ]; then
    echo ""
    echo -e "${RED}━━━ Timeout Tests ━━━${NC}"
    for test in "${timeout_tests[@]}"; do
        echo -e "  ${RED}•${NC} $test"
    done
fi

# Exit with failure if any tests failed
if [ $FAILED -gt 0 ]; then
    exit 1
else
    exit 0
fi
