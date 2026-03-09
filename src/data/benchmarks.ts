export interface BenchmarkExample {
  name: string
  description: string
  vex: string
  go: string
  rust: string
  zig: string
}

export const benchmarks: BenchmarkExample[] = [
  // 1. Fibonacci (recursive)
  {
    name: 'Fibonacci',
    description: 'Recursive fibonacci — tests function call overhead',
    vex: `fn fib(n: i32): i32 {
    if n <= 1 { return n }
    return fib(n - 1) + fib(n - 2)
}

fn main(): i32 {
    let result = fib(35)
    println(result)
    return 0
}`,
    go: `package main

import "fmt"

func fib(n int) int {
	if n <= 1 {
		return n
	}
	return fib(n-1) + fib(n-2)
}

func main() {
	result := fib(35)
	fmt.Println(result)
}`,
    rust: `fn fib(n: i32) -> i32 {
    if n <= 1 { return n; }
    fib(n - 1) + fib(n - 2)
}

fn main() {
    let result = fib(35);
    println!("{}", result);
}`,
    zig: `const std = @import("std");

fn fib(n: i32) i32 {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

pub fn main() !void {
    const result = fib(35);
    const stdout = std.io.getStdOut().writer();
    try stdout.print("{d}\\n", .{result});
}`,
  },

  // 2. Sum 1M
  {
    name: 'Sum 1M',
    description: 'Sum integers 0..1M — tests loop auto-vectorization',
    vex: `fn main(): i32 {
    let! sum: i64 = 0
    for i in 0..1000000 {
        sum += i as i64
    }
    println(sum)
    return 0
}`,
    go: `package main

import "fmt"

func main() {
	sum := 0
	for i := 0; i < 1000000; i++ {
		sum += i
	}
	fmt.Println(sum)
}`,
    rust: `fn main() {
    let mut sum: i64 = 0;
    for i in 0..1000000 {
        sum += i;
    }
    println!("{}", sum);
}`,
    zig: `const std = @import("std");

pub fn main() !void {
    var sum: i64 = 0;
    var i: i64 = 0;
    while (i < 1000000) : (i += 1) {
        sum += i;
    }
    const stdout = std.io.getStdOut().writer();
    try stdout.print("{d}\\n", .{sum});
}`,
  },

  // 3. String Concat
  {
    name: 'String Concat',
    description: 'Build string by concat — tests VexString COW allocator',
    vex: `fn main(): i32 {
    let! s = ""
    for _ in 0..10000 {
        s += "x"   // VexString: COW + SSO + inline up to 15 bytes
    }
    println(s.len())
    return 0
}`,
    go: `package main

import "fmt"

func main() {
	s := ""
	for i := 0; i < 10000; i++ {
		s += "x"
	}
	fmt.Println(len(s))
}`,
    rust: `fn main() {
    let mut s = String::new();
    for _ in 0..10000 {
        s.push('x');
    }
    println!("{}", s.len());
}`,
    zig: `const std = @import("std");

pub fn main() !void {
    var buf: [10000]u8 = undefined;
    for (0..10000) |i| {
        buf[i] = 'x';
    }
    const stdout = std.io.getStdOut().writer();
    try stdout.print("{d}\\n", .{@as(usize, 10000)});
}`,
  },

  // 4. Array Dot Product
  {
    name: 'Dot Product',
    description: 'SIMD dot product — Vex compiles a * b to single VMUL + horizontal VADD',
    vex: `// Vex: array * array → SIMD multiply, <+ → horizontal sum
// Compiles to: vmulpd + vhaddpd (2 instructions!)
fn dot(a: [f64; 4], b: [f64; 4]): f64 {
    return <+ (a * b)
}

fn main(): i32 {
    let a = [1.0, 2.0, 3.0, 4.0]
    let b = [5.0, 6.0, 7.0, 8.0]
    let! sum: f64 = 0.0
    for _ in 0..100000 {
        sum += dot(a, b)
    }
    println(sum)
    return 0
}`,
    go: `package main

import "fmt"

func dot(a, b [4]float64) float64 {
	return a[0]*b[0] + a[1]*b[1] + a[2]*b[2] + a[3]*b[3]
}

func main() {
	sum := 0.0
	for i := 0; i < 100000; i++ {
		a := [4]float64{1, 2, 3, 4}
		b := [4]float64{5, 6, 7, 8}
		sum += dot(a, b)
	}
	fmt.Println(sum)
}`,
    rust: `fn dot(a: [f64; 4], b: [f64; 4]) -> f64 {
    a.iter().zip(b.iter()).map(|(x, y)| x * y).sum()
}

fn main() {
    let mut sum = 0.0_f64;
    for _ in 0..100000 {
        let a = [1.0, 2.0, 3.0, 4.0];
        let b = [5.0, 6.0, 7.0, 8.0];
        sum += dot(a, b);
    }
    println!("{}", sum);
}`,
    zig: `const std = @import("std");

fn dot(a: [4]f64, b: [4]f64) f64 {
    var s: f64 = 0;
    for (0..4) |i| {
        s += a[i] * b[i];
    }
    return s;
}

pub fn main() !void {
    var sum: f64 = 0;
    var i: usize = 0;
    while (i < 100000) : (i += 1) {
        const a = [4]f64{ 1, 2, 3, 4 };
        const b = [4]f64{ 5, 6, 7, 8 };
        sum += dot(a, b);
    }
    const stdout = std.io.getStdOut().writer();
    try stdout.print("{d}\\n", .{sum});
}`,
  },

  // 5. Sieve of Eratosthenes
  {
    name: 'Prime Sieve',
    description: 'Sieve of Eratosthenes up to 100K — tests array access patterns',
    vex: `fn main(): i32 {
    let limit = 100000
    let! sieve = [true; limit]   // Fixed-size array, stack allocated
    sieve[0] = false
    sieve[1] = false
    let! count = 0
    for i in 2..limit {
        if sieve[i] {
            count += 1
            let! j = i * i
            while j < limit {
                sieve[j] = false
                j += i
            }
        }
    }
    println(count)
    return 0
}`,
    go: `package main

import "fmt"

func main() {
	const limit = 100000
	sieve := make([]bool, limit)
	for i := range sieve {
		sieve[i] = true
	}
	count := 0
	for i := 2; i < limit; i++ {
		if sieve[i] {
			count++
			for j := i * i; j < limit; j += i {
				sieve[j] = false
			}
		}
	}
	fmt.Println(count)
}`,
    rust: `fn main() {
    const LIMIT: usize = 100000;
    let mut sieve = vec![true; LIMIT];
    let mut count = 0;
    for i in 2..LIMIT {
        if sieve[i] {
            count += 1;
            let mut j = i * i;
            while j < LIMIT {
                sieve[j] = false;
                j += i;
            }
        }
    }
    println!("{}", count);
}`,
    zig: `const std = @import("std");

pub fn main() !void {
    const limit = 100000;
    var sieve: [limit]bool = undefined;
    for (&sieve) |*s| s.* = true;
    var count: usize = 0;
    for (2..limit) |i| {
        if (sieve[i]) {
            count += 1;
            var j = i * i;
            while (j < limit) : (j += i) {
                sieve[j] = false;
            }
        }
    }
    const stdout = std.io.getStdOut().writer();
    try stdout.print("{d}\\n", .{count});
}`,
  },

  // 6. Matrix Multiply (4x4)
  {
    name: 'Matrix 4×4',
    description: '4×4 matrix multiply 100K times — tests compute density',
    vex: `fn main(): i32 {
    let! sum: f64 = 0.0
    for _ in 0..100000 {
        let a = [1.0, 2.0, 3.0, 4.0,
                 5.0, 6.0, 7.0, 8.0,
                 9.0, 10.0, 11.0, 12.0,
                 13.0, 14.0, 15.0, 16.0]
        let b = a
        let! c = [0.0, 0.0, 0.0, 0.0,
                  0.0, 0.0, 0.0, 0.0,
                  0.0, 0.0, 0.0, 0.0,
                  0.0, 0.0, 0.0, 0.0]
        for i in 0..4 {
            for j in 0..4 {
                let! s: f64 = 0.0
                for k in 0..4 {
                    s += a[i * 4 + k] * b[k * 4 + j]
                }
                c[i * 4 + j] = s
            }
        }
        sum += c[0]
    }
    println(sum)
    return 0
}`,
    go: `package main

import "fmt"

func main() {
	sum := 0.0
	for iter := 0; iter < 100000; iter++ {
		a := [16]float64{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16}
		b := a
		var c [16]float64
		for i := 0; i < 4; i++ {
			for j := 0; j < 4; j++ {
				s := 0.0
				for k := 0; k < 4; k++ {
					s += a[i*4+k] * b[k*4+j]
				}
				c[i*4+j] = s
			}
		}
		sum += c[0]
	}
	fmt.Println(sum)
}`,
    rust: `fn main() {
    let mut sum = 0.0_f64;
    for _ in 0..100000 {
        let a = [1.0,2.0,3.0,4.0,5.0,6.0,7.0,8.0,9.0,10.0,11.0,12.0,13.0,14.0,15.0,16.0_f64];
        let b = a;
        let mut c = [0.0_f64; 16];
        for i in 0..4 {
            for j in 0..4 {
                let mut s = 0.0;
                for k in 0..4 {
                    s += a[i*4+k] * b[k*4+j];
                }
                c[i*4+j] = s;
            }
        }
        sum += c[0];
    }
    println!("{}", sum);
}`,
    zig: `const std = @import("std");

pub fn main() !void {
    var sum: f64 = 0;
    var iter: usize = 0;
    while (iter < 100000) : (iter += 1) {
        const a = [16]f64{ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 };
        const b = a;
        var c: [16]f64 = .{0} ** 16;
        for (0..4) |i| {
            for (0..4) |j| {
                var s: f64 = 0;
                for (0..4) |k| {
                    s += a[i * 4 + k] * b[k * 4 + j];
                }
                c[i * 4 + j] = s;
            }
        }
        sum += c[0];
    }
    const stdout = std.io.getStdOut().writer();
    try stdout.print("{d}\\n", .{sum});
}`,
  },

  // 7. Collatz Conjecture
  {
    name: 'Collatz',
    description: 'Longest Collatz chain under 100K — tests branching',
    vex: `fn collatz_len(n: i64): i32 {
    let! x = n
    let! count = 0
    while x > 1 {
        if x % 2 == 0 {
            x /= 2
        } else {
            x = 3 * x + 1
        }
        count += 1
    }
    return count
}

fn main(): i32 {
    let! max_len = 0
    let! max_n: i64 = 1
    for i in 1..100000 {
        let len = collatz_len(i)
        if len > max_len {
            max_len = len
            max_n = i
        }
    }
    println(max_n)
    println(max_len)
    return 0
}`,
    go: `package main

import "fmt"

func collatzLen(n int64) int {
	x := n
	count := 0
	for x > 1 {
		if x%2 == 0 {
			x /= 2
		} else {
			x = 3*x + 1
		}
		count++
	}
	return count
}

func main() {
	maxLen := 0
	maxN := int64(1)
	for i := int64(1); i < 100000; i++ {
		l := collatzLen(i)
		if l > maxLen {
			maxLen = l
			maxN = i
		}
	}
	fmt.Println(maxN)
	fmt.Println(maxLen)
}`,
    rust: `fn collatz_len(n: i64) -> i32 {
    let mut x = n;
    let mut count = 0;
    while x > 1 {
        if x % 2 == 0 { x /= 2; } else { x = 3 * x + 1; }
        count += 1;
    }
    count
}

fn main() {
    let mut max_len = 0;
    let mut max_n: i64 = 1;
    for i in 1..100000_i64 {
        let l = collatz_len(i);
        if l > max_len {
            max_len = l;
            max_n = i;
        }
    }
    println!("{}", max_n);
    println!("{}", max_len);
}`,
    zig: `const std = @import("std");

fn collatzLen(n: i64) i32 {
    var x = n;
    var count: i32 = 0;
    while (x > 1) {
        if (@mod(x, 2) == 0) {
            x = @divTrunc(x, 2);
        } else {
            x = 3 * x + 1;
        }
        count += 1;
    }
    return count;
}

pub fn main() !void {
    var max_len: i32 = 0;
    var max_n: i64 = 1;
    var i: i64 = 1;
    while (i < 100000) : (i += 1) {
        const l = collatzLen(i);
        if (l > max_len) {
            max_len = l;
            max_n = i;
        }
    }
    const stdout = std.io.getStdOut().writer();
    try stdout.print("{d}\\n{d}\\n", .{ max_n, max_len });
}`,
  },

  // 8. Binary Search
  {
    name: 'Binary Search',
    description: '10M binary searches in sorted array — tests branch prediction',
    vex: `fn binary_search(arr: &Vec<i32>, target: i32): i32 {
    let! lo = 0
    let! hi = arr.len()
    while lo < hi {
        let mid = lo + (hi - lo) / 2
        let val = arr.getUnchecked(mid)
        if val == target { return mid }
        if val < target {
            lo = mid + 1
        } else {
            hi = mid
        }
    }
    return -1
}

fn main(): i32 {
    let! arr = Vec.new<i32>()
    for i in 0..10000 {
        arr.push(i)
    }
    let! found = 0
    for i in 0..1000000 {
        let idx = binary_search(&arr, i % 10000)
        if idx >= 0 { found += 1 }
    }
    println(found)
    return 0
}`,
    go: `package main

import (
	"fmt"
	"sort"
)

func main() {
	arr := make([]int, 10000)
	for i := range arr {
		arr[i] = i
	}
	found := 0
	for i := 0; i < 1000000; i++ {
		idx := sort.SearchInts(arr, i%10000)
		if idx < len(arr) && arr[idx] == i%10000 {
			found++
		}
	}
	fmt.Println(found)
}`,
    rust: `fn main() {
    let arr: Vec<i32> = (0..10000).collect();
    let mut found = 0;
    for i in 0..1000000 {
        if arr.binary_search(&(i % 10000)).is_ok() {
            found += 1;
        }
    }
    println!("{}", found);
}`,
    zig: `const std = @import("std");

fn binarySearch(arr: []const i32, target: i32) i32 {
    var lo: usize = 0;
    var hi: usize = arr.len - 1;
    while (lo <= hi) {
        const mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return @intCast(mid);
        if (arr[mid] < target) {
            lo = mid + 1;
        } else {
            if (mid == 0) break;
            hi = mid - 1;
        }
    }
    return -1;
}

pub fn main() !void {
    var arr: [10000]i32 = undefined;
    for (0..10000) |i| arr[i] = @intCast(i);
    var found: i32 = 0;
    var i: i32 = 0;
    while (i < 1000000) : (i += 1) {
        if (binarySearch(&arr, @mod(i, 10000)) >= 0) found += 1;
    }
    const stdout = std.io.getStdOut().writer();
    try stdout.print("{d}\\n", .{found});
}`,
  },

  // 9. N-Body simulation step
  {
    name: 'N-Body',
    description: 'Simple gravity simulation — tests floating-point throughput',
    vex: `fn main(): i32 {
    let n = 200
    let! x = Vec.new<f64>()
    let! y = Vec.new<f64>()
    let! vx = Vec.new<f64>()
    let! vy = Vec.new<f64>()
    for i in 0..n {
        x.push(i as f64)
        y.push(i as f64 * 0.5)
        vx.push(0.0)
        vy.push(0.0)
    }
    for step in 0..100 {
        for i in 0..n {
            let! fx: f64 = 0.0
            let! fy: f64 = 0.0
            for j in 0..n {
                if i != j {
                    let dx = x.getUnchecked(j) - x.getUnchecked(i)
                    let dy = y.getUnchecked(j) - y.getUnchecked(i)
                    let dist = dx * dx + dy * dy + 0.01
                    let force = 1.0 / dist
                    fx += dx * force
                    fy += dy * force
                }
            }
            vx.set(i, vx.getUnchecked(i) + fx * 0.001)
            vy.set(i, vy.getUnchecked(i) + fy * 0.001)
        }
        for i in 0..n {
            x.set(i, x.getUnchecked(i) + vx.getUnchecked(i))
            y.set(i, y.getUnchecked(i) + vy.getUnchecked(i))
        }
    }
    println(x.getUnchecked(0))
    return 0
}`,
    go: `package main

import "fmt"

func main() {
	n := 200
	x := make([]float64, n)
	y := make([]float64, n)
	vx := make([]float64, n)
	vy := make([]float64, n)
	for i := 0; i < n; i++ {
		x[i] = float64(i)
		y[i] = float64(i) * 0.5
	}
	for step := 0; step < 100; step++ {
		for i := 0; i < n; i++ {
			fx, fy := 0.0, 0.0
			for j := 0; j < n; j++ {
				if i != j {
					dx := x[j] - x[i]
					dy := y[j] - y[i]
					dist := dx*dx + dy*dy + 0.01
					force := 1.0 / dist
					fx += dx * force
					fy += dy * force
				}
			}
			vx[i] += fx * 0.001
			vy[i] += fy * 0.001
		}
		for i := 0; i < n; i++ {
			x[i] += vx[i]
			y[i] += vy[i]
		}
	}
	fmt.Println(x[0])
}`,
    rust: `fn main() {
    let n = 200;
    let mut x: Vec<f64> = (0..n).map(|i| i as f64).collect();
    let mut y: Vec<f64> = (0..n).map(|i| i as f64 * 0.5).collect();
    let mut vx = vec![0.0_f64; n];
    let mut vy = vec![0.0_f64; n];
    for _ in 0..100 {
        for i in 0..n {
            let (mut fx, mut fy) = (0.0, 0.0);
            for j in 0..n {
                if i != j {
                    let dx = x[j] - x[i];
                    let dy = y[j] - y[i];
                    let dist = dx * dx + dy * dy + 0.01;
                    let force = 1.0 / dist;
                    fx += dx * force;
                    fy += dy * force;
                }
            }
            vx[i] += fx * 0.001;
            vy[i] += fy * 0.001;
        }
        for i in 0..n {
            x[i] += vx[i];
            y[i] += vy[i];
        }
    }
    println!("{}", x[0]);
}`,
    zig: `const std = @import("std");

pub fn main() !void {
    const n = 200;
    var x: [n]f64 = undefined;
    var y: [n]f64 = undefined;
    var vx: [n]f64 = .{0} ** n;
    var vy: [n]f64 = .{0} ** n;
    for (0..n) |i| {
        x[i] = @as(f64, @floatFromInt(i));
        y[i] = @as(f64, @floatFromInt(i)) * 0.5;
    }
    for (0..100) |_| {
        for (0..n) |i| {
            var fx: f64 = 0;
            var fy: f64 = 0;
            for (0..n) |j| {
                if (i != j) {
                    const dx = x[j] - x[i];
                    const dy = y[j] - y[i];
                    const dist = dx * dx + dy * dy + 0.01;
                    const force = 1.0 / dist;
                    fx += dx * force;
                    fy += dy * force;
                }
            }
            vx[i] += fx * 0.001;
            vy[i] += fy * 0.001;
        }
        for (0..n) |i| {
            x[i] += vx[i];
            y[i] += vy[i];
        }
    }
    const stdout = std.io.getStdOut().writer();
    try stdout.print("{d}\\n", .{x[0]});
}`,
  },

  // 10. FizzBuzz (100K iterations)
  {
    name: 'FizzBuzz 100K',
    description: 'Classic FizzBuzz to 100K — tests branching + I/O',
    vex: `fn main(): i32 {
    let! count = 0
    for i in 1..100001 {
        if i % 15 == 0 { count += 3 }
        elif i % 3 == 0 { count += 1 }
        elif i % 5 == 0 { count += 2 }
    }
    println(count)
    return 0
}`,
    go: `package main

import "fmt"

func main() {
	count := 0
	for i := 1; i <= 100000; i++ {
		if i%15 == 0 {
			count += 3
		} else if i%3 == 0 {
			count += 1
		} else if i%5 == 0 {
			count += 2
		}
	}
	fmt.Println(count)
}`,
    rust: `fn main() {
    let mut count = 0;
    for i in 1..=100000 {
        if i % 15 == 0 { count += 3; }
        else if i % 3 == 0 { count += 1; }
        else if i % 5 == 0 { count += 2; }
    }
    println!("{}", count);
}`,
    zig: `const std = @import("std");

pub fn main() !void {
    var count: i32 = 0;
    var i: i32 = 1;
    while (i <= 100000) : (i += 1) {
        if (@mod(i, 15) == 0) {
            count += 3;
        } else if (@mod(i, 3) == 0) {
            count += 1;
        } else if (@mod(i, 5) == 0) {
            count += 2;
        }
    }
    const stdout = std.io.getStdOut().writer();
    try stdout.print("{d}\\n", .{count});
}`,
  },

  // 11. Sum of squares
  {
    name: 'Sum Squares',
    description: 'Accumulate squares up to 1M — tests FMA auto-vectorization',
    vex: `fn main(): i32 {
    let! total: i64 = 0
    for i in 0..1000000 {
        total += (i as i64) * (i as i64)
    }
    println(total)
    return 0
}`,
    go: `package main

import "fmt"

func main() {
	var total int64 = 0
	for i := int64(0); i < 1000000; i++ {
		total += i * i
	}
	fmt.Println(total)
}`,
    rust: `fn main() {
    let mut total: i64 = 0;
    for i in 0_i64..1_000_000 {
        total += i * i;
    }
    println!("{}", total);
}`,
    zig: `const std = @import("std");

pub fn main() !void {
    var total: i64 = 0;
    var i: i64 = 0;
    while (i < 1_000_000) : (i += 1) {
        total += i * i;
    }
    try std.io.getStdOut().writer().print("{d}\\n", .{total});
}`,
  },

  // 12. Prefix sum
  {
    name: 'Prefix Sum',
    description: 'Inclusive prefix sum over 200K integers — tests memory bandwidth',
    vex: `fn main(): i32 {
    let n = 200000
    let! values = Vec.new<i64>()
    for i in 0..n {
        values.push((i % 97) as i64)
    }
    let! running: i64 = 0
    for i in 0..n {
        running += values.getUnchecked(i)
        values.set(i, running)
    }
    println(values.getUnchecked(n - 1))
    return 0
}`,
    go: `package main

import "fmt"

func main() {
	const n = 200000
	values := make([]int64, n)
	for i := 0; i < n; i++ {
		values[i] = int64(i % 97)
	}
	var running int64 = 0
	for i := 0; i < n; i++ {
		running += values[i]
		values[i] = running
	}
	fmt.Println(values[n-1])
}`,
    rust: `fn main() {
    let n = 200000usize;
    let mut values: Vec<i64> = (0..n).map(|i| (i % 97) as i64).collect();
    let mut running: i64 = 0;
    for v in &mut values {
        running += *v;
        *v = running;
    }
    println!("{}", values[n - 1]);
}`,
    zig: `const std = @import("std");

pub fn main() !void {
    const n = 200000;
    var values: [n]i64 = undefined;
    for (0..n) |i| {
        values[i] = @intCast(i % 97);
    }
    var running: i64 = 0;
    for (0..n) |i| {
        running += values[i];
        values[i] = running;
    }
    try std.io.getStdOut().writer().print("{d}\\n", .{values[n - 1]});
}`,
  },

  // 13. XorShift RNG
  {
    name: 'XorShift RNG',
    description: 'Generate 5M pseudo-random values — tests bitwise throughput',
    vex: `fn next_rng(state: u64): u64 {
    let! x = state
    x ^= x << 13
    x ^= x >> 7
    x ^= x << 17
    return x
}

fn main(): i32 {
    let! state: u64 = 88172645463325252
    let! checksum: u64 = 0
    for _ in 0..5000000 {
        state = next_rng(state)
        checksum ^= state
    }
    println(checksum)
    return 0
}`,
    go: `package main

import "fmt"

func nextRng(x uint64) uint64 {
	x ^= x << 13
	x ^= x >> 7
	x ^= x << 17
	return x
}

func main() {
	state := uint64(88172645463325252)
	checksum := uint64(0)
	for i := 0; i < 5000000; i++ {
		state = nextRng(state)
		checksum ^= state
	}
	fmt.Println(checksum)
}`,
    rust: `fn next_rng(mut x: u64) -> u64 {
    x ^= x << 13;
    x ^= x >> 7;
    x ^= x << 17;
    x
}

fn main() {
    let mut state: u64 = 88172645463325252;
    let mut checksum: u64 = 0;
    for _ in 0..5_000_000 {
        state = next_rng(state);
        checksum ^= state;
    }
    println!("{}", checksum);
}`,
    zig: `const std = @import("std");

fn nextRng(x0: u64) u64 {
    var x = x0;
    x ^= x << 13;
    x ^= x >> 7;
    x ^= x << 17;
    return x;
}

pub fn main() !void {
    var state: u64 = 88172645463325252;
    var checksum: u64 = 0;
    var i: usize = 0;
    while (i < 5_000_000) : (i += 1) {
        state = nextRng(state);
        checksum ^= state;
    }
    try std.io.getStdOut().writer().print("{d}\\n", .{checksum});
}`,
  },

  // 14. Histogram
  {
    name: 'Histogram 256',
    description: 'Build 256-bin histogram over 1M values — tests indexed updates',
    vex: `fn main(): i32 {
    let! hist = [0i32; 256]    // Stack-allocated fixed array
    for i in 0..1000000 {
        let idx = (i * 17 + 23) % 256
        hist[idx] += 1
    }
    println(hist[0] + hist[17] + hist[42])
    return 0
}`,
    go: `package main

import "fmt"

func main() {
	hist := make([]int, 256)
	for i := 0; i < 1000000; i++ {
		idx := (i*17 + 23) % 256
		hist[idx]++
	}
	fmt.Println(hist[0] + hist[17] + hist[42])
}`,
    rust: `fn main() {
    let mut hist = [0_i32; 256];
    for i in 0..1_000_000 {
        let idx = (i * 17 + 23) % 256;
        hist[idx] += 1;
    }
    println!("{}", hist[0] + hist[17] + hist[42]);
}`,
    zig: `const std = @import("std");

pub fn main() !void {
    var hist: [256]i32 = .{0} ** 256;
    var i: usize = 0;
    while (i < 1_000_000) : (i += 1) {
        const idx = (i * 17 + 23) % 256;
        hist[idx] += 1;
    }
    try std.io.getStdOut().writer().print("{d}\\n", .{hist[0] + hist[17] + hist[42]});
}`,
  },

  // 15. Horner polynomial
  {
    name: 'Horner Polynomial',
    description: 'Evaluate polynomial 2M times — tests fused arithmetic chains',
    vex: `fn poly(x: f64): f64 {
    return (((((0.125 * x + 0.5) * x + 1.25) * x + 2.0) * x + 3.0) * x + 1.0)
}

fn main(): i32 {
    let! acc: f64 = 0.0
    for i in 0..2000000 {
        acc += poly((i % 1000) as f64 * 0.001)
    }
    println(acc)
    return 0
}`,
    go: `package main

import "fmt"

func poly(x float64) float64 {
	return (((((0.125*x+0.5)*x+1.25)*x+2.0)*x+3.0)*x + 1.0)
}

func main() {
	acc := 0.0
	for i := 0; i < 2000000; i++ {
		acc += poly(float64(i%1000) * 0.001)
	}
	fmt.Println(acc)
}`,
    rust: `fn poly(x: f64) -> f64 {
    (((((0.125 * x + 0.5) * x + 1.25) * x + 2.0) * x + 3.0) * x + 1.0)
}

fn main() {
    let mut acc = 0.0_f64;
    for i in 0..2_000_000 {
        acc += poly((i % 1000) as f64 * 0.001);
    }
    println!("{}", acc);
}`,
    zig: `const std = @import("std");

fn poly(x: f64) f64 {
    return (((((0.125 * x + 0.5) * x + 1.25) * x + 2.0) * x + 3.0) * x + 1.0);
}

pub fn main() !void {
    var acc: f64 = 0;
    var i: usize = 0;
    while (i < 2_000_000) : (i += 1) {
        acc += poly(@as(f64, @floatFromInt(i % 1000)) * 0.001);
    }
    try std.io.getStdOut().writer().print("{d}\\n", .{acc});
}`,
  },

  // 16. Mandelbrot mini
  {
    name: 'Mandelbrot Mini',
    description: '64×64 Mandelbrot sweep — tests floating-point branches',
    vex: `fn escape(cx: f64, cy: f64): i32 {
    let! zr: f64 = 0.0
    let! zi: f64 = 0.0
    for it in 0..50 {
        let zr2 = zr * zr - zi * zi + cx
        zi = 2.0 * zr * zi + cy
        zr = zr2
        if zr * zr + zi * zi > 4.0 { return it }
    }
    return 50
}

fn main(): i32 {
    let! total = 0
    for py in 0..64 {
        for px in 0..64 {
            total += escape(px as f64 * 0.05 - 2.0,
                            py as f64 * 0.05 - 1.6)
        }
    }
    println(total)
    return 0
}`,
    go: `package main

import "fmt"

func iter(cx, cy float64) int {
	x, y := 0.0, 0.0
	for i := 0; i < 50; i++ {
		x2 := x*x - y*y + cx
		y2 := 2*x*y + cy
		x, y = x2, y2
		if x*x+y*y > 4.0 {
			return i
		}
	}
	return 50
}

func main() {
	total := 0
	for py := 0; py < 64; py++ {
		for px := 0; px < 64; px++ {
			cx := float64(px)*0.05 - 2.0
			cy := float64(py)*0.05 - 1.6
			total += iter(cx, cy)
		}
	}
	fmt.Println(total)
}`,
    rust: `fn iter(cx: f64, cy: f64) -> i32 {
    let (mut x, mut y) = (0.0_f64, 0.0_f64);
    for i in 0..50 {
        let x2 = x * x - y * y + cx;
        let y2 = 2.0 * x * y + cy;
        x = x2;
        y = y2;
        if x * x + y * y > 4.0 {
            return i;
        }
    }
    50
}

fn main() {
    let mut total = 0_i32;
    for py in 0..64 {
        for px in 0..64 {
            let cx = px as f64 * 0.05 - 2.0;
            let cy = py as f64 * 0.05 - 1.6;
            total += iter(cx, cy);
        }
    }
    println!("{}", total);
}`,
    zig: `const std = @import("std");

fn iter(cx: f64, cy: f64) i32 {
    var x: f64 = 0;
    var y: f64 = 0;
    var i: i32 = 0;
    while (i < 50) : (i += 1) {
        const x2 = x * x - y * y + cx;
        const y2 = 2.0 * x * y + cy;
        x = x2;
        y = y2;
        if (x * x + y * y > 4.0) return i;
    }
    return 50;
}

pub fn main() !void {
    var total: i32 = 0;
    for (0..64) |py| {
        for (0..64) |px| {
            const cx = @as(f64, @floatFromInt(px)) * 0.05 - 2.0;
            const cy = @as(f64, @floatFromInt(py)) * 0.05 - 1.6;
            total += iter(cx, cy);
        }
    }
    try std.io.getStdOut().writer().print("{d}\\n", .{total});
}`,
  },

  // 17. Bit count
  {
    name: 'Bit Count Sweep',
    description: 'Manual popcount over 1M values — tests integer bit-twiddling',
    vex: `// Fast manual popcount using Kernighan's algorithm
fn popcount(x0: u64): i32 {
    let! x = x0
    let! count = 0
    while x != 0 {
        x &= x - 1
        count += 1
    }
    return count
}

fn main(): i32 {
    let! total = 0
    for i in 1..1000001 {
        total += popcount((i as u64) * 2654435761)
    }
    println(total)
    return 0
}`,
    go: `package main

import "fmt"

func popcount(x uint64) int {
	count := 0
	for x != 0 {
		x &= x - 1
		count++
	}
	return count
}

func main() {
	total := 0
	for i := uint64(1); i <= 1000000; i++ {
		total += popcount(i * 2654435761)
	}
	fmt.Println(total)
}`,
    rust: `fn popcount(mut x: u64) -> i32 {
    let mut count = 0;
    while x != 0 {
        x &= x - 1;
        count += 1;
    }
    count
}

fn main() {
    let mut total = 0_i32;
    for i in 1_u64..=1_000_000 {
        total += popcount(i * 2_654_435_761);
    }
    println!("{}", total);
}`,
    zig: `const std = @import("std");

fn popcount(x0: u64) i32 {
    var x = x0;
    var count: i32 = 0;
    while (x != 0) {
        x &= x - 1;
        count += 1;
    }
    return count;
}

pub fn main() !void {
    var total: i32 = 0;
    var i: u64 = 1;
    while (i <= 1_000_000) : (i += 1) {
        total += popcount(i * 2_654_435_761);
    }
    try std.io.getStdOut().writer().print("{d}\\n", .{total});
}`,
  },

  // 18. GCD sweep
  {
    name: 'GCD Sweep',
    description: 'Euclidean GCD across 500K pairs — tests modulo-heavy loops',
    vex: `fn gcd(a0: i64, b0: i64): i64 {
    let! a = a0
    let! b = b0
    while b != 0 {
        let t = a % b
        a = b
        b = t
    }
    return a
}

fn main(): i32 {
    let! total: i64 = 0
    for i in 1..500001 {
        total += gcd(i as i64 * 17, i as i64 * 29 + 1)
    }
    println(total)
    return 0
}`,
    go: `package main

import "fmt"

func gcd(a, b int64) int64 {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}

func main() {
	var total int64 = 0
	for i := int64(1); i <= 500000; i++ {
		total += gcd(i*17, i*29+1)
	}
	fmt.Println(total)
}`,
    rust: `fn gcd(mut a: i64, mut b: i64) -> i64 {
    while b != 0 {
        let t = a % b;
        a = b;
        b = t;
    }
    a
}

fn main() {
    let mut total: i64 = 0;
    for i in 1_i64..=500_000 {
        total += gcd(i * 17, i * 29 + 1);
    }
    println!("{}", total);
}`,
    zig: `const std = @import("std");

fn gcd(a0: i64, b0: i64) i64 {
    var a = a0;
    var b = b0;
    while (b != 0) {
        const t = @mod(a, b);
        a = b;
        b = t;
    }
    return a;
}

pub fn main() !void {
    var total: i64 = 0;
    var i: i64 = 1;
    while (i <= 500_000) : (i += 1) {
        total += gcd(i * 17, i * 29 + 1);
    }
    try std.io.getStdOut().writer().print("{d}\\n", .{total});
}`,
  },

  // 19. Trapezoid integration
  {
    name: 'Trapezoid Integral',
    description: 'Numerical integration of x² over [0,1] — tests scalar FP loops',
    vex: `fn f(x: f64): f64 { return x * x }

fn main(): i32 {
    let n = 1000000
    let h = 1.0 / n as f64
    let! area: f64 = 0.0
    for i in 0..n {
        let x0 = i as f64 * h
        let x1 = (i + 1) as f64 * h
        area += (f(x0) + f(x1)) * h * 0.5
    }
    println(area)
    return 0
}`,
    go: `package main

import "fmt"

func f(x float64) float64 { return x * x }

func main() {
	n := 1000000
	h := 1.0 / float64(n)
	area := 0.0
	for i := 0; i < n; i++ {
		x0 := float64(i) * h
		x1 := float64(i+1) * h
		area += (f(x0) + f(x1)) * h * 0.5
	}
	fmt.Println(area)
}`,
    rust: `fn f(x: f64) -> f64 { x * x }

fn main() {
    let n = 1_000_000usize;
    let h = 1.0 / n as f64;
    let mut area = 0.0_f64;
    for i in 0..n {
        let x0 = i as f64 * h;
        let x1 = (i + 1) as f64 * h;
        area += (f(x0) + f(x1)) * h * 0.5;
    }
    println!("{}", area);
}`,
    zig: `const std = @import("std");

fn f(x: f64) f64 { return x * x; }

pub fn main() !void {
    const n: usize = 1_000_000;
    const h = 1.0 / @as(f64, @floatFromInt(n));
    var area: f64 = 0;
    var i: usize = 0;
    while (i < n) : (i += 1) {
        const x0 = @as(f64, @floatFromInt(i)) * h;
        const x1 = @as(f64, @floatFromInt(i + 1)) * h;
        area += (f(x0) + f(x1)) * h * 0.5;
    }
    try std.io.getStdOut().writer().print("{d}\\n", .{area});
}`,
  },

  // 20. Monte Carlo pi
  {
    name: 'Monte Carlo Pi',
    description: 'Estimate π with 1M samples — tests RNG + FP mix',
    vex: `fn next_rng(state0: u64): u64 {
    let! state = state0
    state = state * 6364136223846793005 + 1
    return state
}

fn main(): i32 {
    let! state: u64 = 1
    let! inside = 0
    for _ in 0..1000000 {
        state = next_rng(state)
        let x = (state % 1000000) as f64 / 1000000.0
        state = next_rng(state)
        let y = (state % 1000000) as f64 / 1000000.0
        if x * x + y * y <= 1.0 {
            inside += 1
        }
    }
    println(inside)
    return 0
}`,
    go: `package main

import "fmt"

func nextRng(state uint64) uint64 {
	return state*6364136223846793005 + 1
}

func main() {
	state := uint64(1)
	inside := 0
	for i := 0; i < 1000000; i++ {
		state = nextRng(state)
		x := float64(state%1000000) / 1000000.0
		state = nextRng(state)
		y := float64(state%1000000) / 1000000.0
		if x*x+y*y <= 1.0 {
			inside++
		}
	}
	fmt.Println(inside)
}`,
    rust: `fn next_rng(state: u64) -> u64 {
    state.wrapping_mul(6364136223846793005).wrapping_add(1)
}

fn main() {
    let mut state: u64 = 1;
    let mut inside = 0_i32;
    for _ in 0..1_000_000 {
        state = next_rng(state);
        let x = (state % 1_000_000) as f64 / 1_000_000.0;
        state = next_rng(state);
        let y = (state % 1_000_000) as f64 / 1_000_000.0;
        if x * x + y * y <= 1.0 {
            inside += 1;
        }
    }
    println!("{}", inside);
}`,
    zig: `const std = @import("std");

fn nextRng(state: u64) u64 {
    return state *% 6364136223846793005 +% 1;
}

pub fn main() !void {
    var state: u64 = 1;
    var inside: i32 = 0;
    var i: usize = 0;
    while (i < 1_000_000) : (i += 1) {
        state = nextRng(state);
        const x = @as(f64, @floatFromInt(state % 1_000_000)) / 1_000_000.0;
        state = nextRng(state);
        const y = @as(f64, @floatFromInt(state % 1_000_000)) / 1_000_000.0;
        if (x * x + y * y <= 1.0) inside += 1;
    }
    try std.io.getStdOut().writer().print("{d}\\n", .{inside});
}`,
  },

  // 21. 3x3 stencil
  {
    name: 'Stencil 3×3',
    description: 'Repeated 3×3 blur over 64×64 grid — tests neighborhood access',
    vex: `fn main(): i32 {
    let n = 64
    let! src = Vec.new<f64>()
    let! dst = Vec.new<f64>()
    for i in 0..n * n {
        src.push((i % 17) as f64)
        dst.push(0.0)
    }
    for _ in 0..50 {
        for y in 1..n - 1 {
            for x in 1..n - 1 {
                let idx = y * n + x
                let sum = src.getUnchecked(idx - n - 1) + src.getUnchecked(idx - n) + src.getUnchecked(idx - n + 1) +
                          src.getUnchecked(idx - 1)     + src.getUnchecked(idx)     + src.getUnchecked(idx + 1) +
                          src.getUnchecked(idx + n - 1) + src.getUnchecked(idx + n) + src.getUnchecked(idx + n + 1)
                dst.set(idx, sum / 9.0)
            }
        }
        for i in 0..n * n {
            src.set(i, dst.getUnchecked(i))
        }
    }
    println(src.getUnchecked(n + 1))
    return 0
}`,
    go: `package main

import "fmt"

func main() {
	const n = 64
	src := make([]float64, n*n)
	dst := make([]float64, n*n)
	for i := range src {
		src[i] = float64(i % 17)
	}
	for step := 0; step < 50; step++ {
		for y := 1; y < n-1; y++ {
			for x := 1; x < n-1; x++ {
				idx := y*n + x
				sum := src[idx-n-1] + src[idx-n] + src[idx-n+1] + src[idx-1] + src[idx] + src[idx+1] + src[idx+n-1] + src[idx+n] + src[idx+n+1]
				dst[idx] = sum / 9.0
			}
		}
		copy(src, dst)
	}
	fmt.Println(src[n+1])
}`,
    rust: `fn main() {
    const N: usize = 64;
    let mut src = vec![0.0_f64; N * N];
    let mut dst = vec![0.0_f64; N * N];
    for i in 0..src.len() {
        src[i] = (i % 17) as f64;
    }
    for _ in 0..50 {
        for y in 1..N - 1 {
            for x in 1..N - 1 {
                let idx = y * N + x;
                let sum = src[idx - N - 1] + src[idx - N] + src[idx - N + 1]
                    + src[idx - 1] + src[idx] + src[idx + 1]
                    + src[idx + N - 1] + src[idx + N] + src[idx + N + 1];
                dst[idx] = sum / 9.0;
            }
        }
        src.copy_from_slice(&dst);
    }
    println!("{}", src[N + 1]);
}`,
    zig: `const std = @import("std");

pub fn main() !void {
    const n = 64;
    var src: [n * n]f64 = undefined;
    var dst: [n * n]f64 = .{0} ** (n * n);
    for (0..src.len) |i| {
        src[i] = @as(f64, @floatFromInt(i % 17));
    }
    for (0..50) |_| {
        for (1..n - 1) |y| {
            for (1..n - 1) |x| {
                const idx = y * n + x;
                const sum = src[idx - n - 1] + src[idx - n] + src[idx - n + 1] + src[idx - 1] + src[idx] + src[idx + 1] + src[idx + n - 1] + src[idx + n] + src[idx + n + 1];
                dst[idx] = sum / 9.0;
            }
        }
        src = dst;
    }
    try std.io.getStdOut().writer().print("{d}\\n", .{src[n + 1]});
}`,
  },

  // 22. Moving average
  {
    name: 'Moving Average',
    description: 'Sliding average over 500K values — tests rolling updates',
    vex: `fn main(): i32 {
    let n = 500000
    let window = 32
    let! values = Vec.new<i64>()
    for i in 0..n {
        values.push((i % 31) as i64)
    }
    let! rolling: i64 = 0
    for i in 0..window {
        rolling += values.getUnchecked(i)
    }
    let! checksum: i64 = rolling
    for i in window..n {
        rolling += values.getUnchecked(i) - values.getUnchecked(i - window)
        checksum += rolling
    }
    println(checksum)
    return 0
}`,
    go: `package main

import "fmt"

func main() {
	const n = 500000
	const window = 32
	values := make([]int64, n)
	for i := range values {
		values[i] = int64(i % 31)
	}
	var rolling int64 = 0
	for i := 0; i < window; i++ {
		rolling += values[i]
	}
	checksum := rolling
	for i := window; i < n; i++ {
		rolling += values[i] - values[i-window]
		checksum += rolling
	}
	fmt.Println(checksum)
}`,
    rust: `fn main() {
    const N: usize = 500000;
    const WINDOW: usize = 32;
    let values: Vec<i64> = (0..N).map(|i| (i % 31) as i64).collect();
    let mut rolling: i64 = values[..WINDOW].iter().sum();
    let mut checksum = rolling;
    for i in WINDOW..N {
        rolling += values[i] - values[i - WINDOW];
        checksum += rolling;
    }
    println!("{}", checksum);
}`,
    zig: `const std = @import("std");

pub fn main() !void {
    const n = 500000;
    const window = 32;
    var values: [n]i64 = undefined;
    for (0..n) |i| {
        values[i] = @intCast(i % 31);
    }
    var rolling: i64 = 0;
    for (0..window) |i| {
        rolling += values[i];
    }
    var checksum: i64 = rolling;
    var i: usize = window;
    while (i < n) : (i += 1) {
        rolling += values[i] - values[i - window];
        checksum += rolling;
    }
    try std.io.getStdOut().writer().print("{d}\\n", .{checksum});
}`,
  },

  // 23. Selection sort
  {
    name: 'Selection Sort',
    description: 'Sort 512 values repeatedly — tests branchy in-place mutation',
    vex: `fn main(): i32 {
    let! checksum: i64 = 0
    for round in 0..200 {
        let! values = Vec.new<i64>()
        for i in 0..512 {
            values.push(((i * 73 + round * 19) % 997) as i64)
        }
        for i in 0..511 {
            let! best = i
            for j in i + 1..512 {
                if values.getUnchecked(j) < values.getUnchecked(best) {
                    best = j
                }
            }
            let tmp = values.getUnchecked(i)
            values.set(i, values.getUnchecked(best))
            values.set(best, tmp)
        }
        checksum += values.getUnchecked(0) + values.getUnchecked(511)
    }
    println(checksum)
    return 0
}`,
    go: `package main

import "fmt"

func main() {
	var checksum int64 = 0
	for round := 0; round < 200; round++ {
		values := make([]int64, 512)
		for i := 0; i < 512; i++ {
			values[i] = int64((i*73 + round*19) % 997)
		}
		for i := 0; i < 511; i++ {
			best := i
			for j := i + 1; j < 512; j++ {
				if values[j] < values[best] {
					best = j
				}
			}
			values[i], values[best] = values[best], values[i]
		}
		checksum += values[0] + values[511]
	}
	fmt.Println(checksum)
}`,
    rust: `fn main() {
    let mut checksum: i64 = 0;
    for round in 0..200 {
        let mut values: Vec<i64> = (0..512).map(|i| ((i * 73 + round * 19) % 997) as i64).collect();
        for i in 0..511 {
            let mut best = i;
            for j in i + 1..512 {
                if values[j] < values[best] {
                    best = j;
                }
            }
            values.swap(i, best);
        }
        checksum += values[0] + values[511];
    }
    println!("{}", checksum);
}`,
    zig: `const std = @import("std");

pub fn main() !void {
    var checksum: i64 = 0;
    var round: usize = 0;
    while (round < 200) : (round += 1) {
        var values: [512]i64 = undefined;
        for (0..512) |i| {
            values[i] = @intCast((i * 73 + round * 19) % 997);
        }
        for (0..511) |i| {
            var best = i;
            for (i + 1..512) |j| {
                if (values[j] < values[best]) best = j;
            }
            const tmp = values[i];
            values[i] = values[best];
            values[best] = tmp;
        }
        checksum += values[0] + values[511];
    }
    try std.io.getStdOut().writer().print("{d}\\n", .{checksum});
}`,
  },

  // 24. Merge sorted arrays
  {
    name: 'Merge Sorted',
    description: 'Merge two sorted 2K arrays repeatedly — tests linear access',
    vex: `fn main(): i32 {
    let! checksum: i64 = 0
    for _ in 0..400 {
        let! a = Vec.new<i64>()
        let! b = Vec.new<i64>()
        for i in 0..2048 {
            a.push((i * 2) as i64)
            b.push((i * 2 + 1) as i64)
        }
        let! merged = Vec.new<i64>()
        let! ia = 0
        let! ib = 0
        while ia < a.len() && ib < b.len() {
            if a.getUnchecked(ia) < b.getUnchecked(ib) {
                merged.push(a.getUnchecked(ia))
                ia += 1
            } else {
                merged.push(b.getUnchecked(ib))
                ib += 1
            }
        }
        while ia < a.len() {
            merged.push(a.getUnchecked(ia))
            ia += 1
        }
        while ib < b.len() {
            merged.push(b.getUnchecked(ib))
            ib += 1
        }
        checksum += merged.getUnchecked(0) + merged.getUnchecked(merged.len() - 1)
    }
    println(checksum)
    return 0
}`,
    go: `package main

import "fmt"

func main() {
	var checksum int64 = 0
	for round := 0; round < 400; round++ {
		a := make([]int64, 2048)
		b := make([]int64, 2048)
		for i := 0; i < 2048; i++ {
			a[i] = int64(i * 2)
			b[i] = int64(i*2 + 1)
		}
		merged := make([]int64, 0, 4096)
		ia, ib := 0, 0
		for ia < len(a) && ib < len(b) {
			if a[ia] < b[ib] {
				merged = append(merged, a[ia])
				ia++
			} else {
				merged = append(merged, b[ib])
				ib++
			}
		}
		merged = append(merged, a[ia:]...)
		merged = append(merged, b[ib:]...)
		checksum += merged[0] + merged[len(merged)-1]
	}
	fmt.Println(checksum)
}`,
    rust: `fn main() {
    let mut checksum: i64 = 0;
    for _ in 0..400 {
        let a: Vec<i64> = (0..2048).map(|i| (i * 2) as i64).collect();
        let b: Vec<i64> = (0..2048).map(|i| (i * 2 + 1) as i64).collect();
        let mut merged = Vec::with_capacity(4096);
        let (mut ia, mut ib) = (0usize, 0usize);
        while ia < a.len() && ib < b.len() {
            if a[ia] < b[ib] {
                merged.push(a[ia]);
                ia += 1;
            } else {
                merged.push(b[ib]);
                ib += 1;
            }
        }
        merged.extend_from_slice(&a[ia..]);
        merged.extend_from_slice(&b[ib..]);
        checksum += merged[0] + merged[merged.len() - 1];
    }
    println!("{}", checksum);
}`,
    zig: `const std = @import("std");

pub fn main() !void {
    var checksum: i64 = 0;
    var round: usize = 0;
    while (round < 400) : (round += 1) {
        var a: [2048]i64 = undefined;
        var b: [2048]i64 = undefined;
        for (0..2048) |i| {
            a[i] = @intCast(i * 2);
            b[i] = @intCast(i * 2 + 1);
        }
        var merged: [4096]i64 = undefined;
        var ia: usize = 0;
        var ib: usize = 0;
        var im: usize = 0;
        while (ia < a.len and ib < b.len) {
            if (a[ia] < b[ib]) {
                merged[im] = a[ia];
                ia += 1;
            } else {
                merged[im] = b[ib];
                ib += 1;
            }
            im += 1;
        }
        while (ia < a.len) : (ia += 1) { merged[im] = a[ia]; im += 1; }
        while (ib < b.len) : (ib += 1) { merged[im] = b[ib]; im += 1; }
        checksum += merged[0] + merged[4095];
    }
    try std.io.getStdOut().writer().print("{d}\\n", .{checksum});
}`,
  },

  // 25. Ring buffer
  {
    name: 'Ring Buffer',
    description: 'Push/pop through fixed circular buffer — tests modulo indexing',
    vex: `fn main(): i32 {
    let cap = 1024
    let! buf = Vec.new<i64>()
    for _ in 0..cap {
        buf.push(0)
    }
    let! head = 0
    let! tail = 0
    let! checksum: i64 = 0
    for i in 0..200000 {
        buf.set(tail, i as i64)
        tail = (tail + 1) % cap
        let value = buf.getUnchecked(head)
        head = (head + 1) % cap
        checksum += value
    }
    println(checksum)
    return 0
}`,
    go: `package main

import "fmt"

func main() {
	const cap = 1024
	buf := make([]int64, cap)
	head, tail := 0, 0
	var checksum int64 = 0
	for i := 0; i < 200000; i++ {
		buf[tail] = int64(i)
		tail = (tail + 1) % cap
		value := buf[head]
		head = (head + 1) % cap
		checksum += value
	}
	fmt.Println(checksum)
}`,
    rust: `fn main() {
    const CAP: usize = 1024;
    let mut buf = [0_i64; CAP];
    let (mut head, mut tail) = (0usize, 0usize);
    let mut checksum: i64 = 0;
    for i in 0_i64..200_000 {
        buf[tail] = i;
        tail = (tail + 1) % CAP;
        let value = buf[head];
        head = (head + 1) % CAP;
        checksum += value;
    }
    println!("{}", checksum);
}`,
    zig: `const std = @import("std");

pub fn main() !void {
    const cap = 1024;
    var buf: [cap]i64 = .{0} ** cap;
    var head: usize = 0;
    var tail: usize = 0;
    var checksum: i64 = 0;
    var i: i64 = 0;
    while (i < 200_000) : (i += 1) {
        buf[tail] = i;
        tail = (tail + 1) % cap;
        const value = buf[head];
        head = (head + 1) % cap;
        checksum += value;
    }
    try std.io.getStdOut().writer().print("{d}\\n", .{checksum});
}`,
  },

  // 26. LCG checksum
  {
    name: 'LCG Checksum',
    description: 'Linear congruential generator checksum — tests integer pipelines',
    vex: `fn main(): i32 {
    let! x: u64 = 123456789
    let! checksum: u64 = 0
    for _ in 0..5000000 {
        x = x * 1664525 + 1013904223
        checksum += x & 65535
    }
    println(checksum)
    return 0
}`,
    go: `package main

import "fmt"

func main() {
	x := uint64(123456789)
	checksum := uint64(0)
	for i := 0; i < 5000000; i++ {
		x = x*1664525 + 1013904223
		checksum += x & 65535
	}
	fmt.Println(checksum)
}`,
    rust: `fn main() {
    let mut x: u64 = 123456789;
    let mut checksum: u64 = 0;
    for _ in 0..5_000_000 {
        x = x.wrapping_mul(1_664_525).wrapping_add(1_013_904_223);
        checksum += x & 65535;
    }
    println!("{}", checksum);
}`,
    zig: `const std = @import("std");

pub fn main() !void {
    var x: u64 = 123456789;
    var checksum: u64 = 0;
    var i: usize = 0;
    while (i < 5_000_000) : (i += 1) {
        x = x *% 1_664_525 +% 1_013_904_223;
        checksum += x & 65535;
    }
    try std.io.getStdOut().writer().print("{d}\\n", .{checksum});
}`,
  },

  // 27. Pairwise distance
  {
    name: 'Pairwise Distance',
    description: 'All-pairs squared distances for 128 points — tests nested FP loops',
    vex: `fn main(): i32 {
    let n = 128
    let! x = [0.0f64; n]
    let! y = [0.0f64; n]
    for i in 0..n {
        x[i] = i as f64 * 0.25
        y[i] = i as f64 * 0.5
    }
    let! total: f64 = 0.0
    for i in 0..n {
        for j in 0..n {
            let dx = x[i] - x[j]
            let dy = y[i] - y[j]
            total += dx * dx + dy * dy
        }
    }
    println(total)
    return 0
}`,
    go: `package main

import "fmt"

func main() {
	const n = 128
	x := make([]float64, n)
	y := make([]float64, n)
	for i := 0; i < n; i++ {
		x[i] = float64(i) * 0.25
		y[i] = float64(i) * 0.5
	}
	total := 0.0
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			dx := x[i] - x[j]
			dy := y[i] - y[j]
			total += dx*dx + dy*dy
		}
	}
	fmt.Println(total)
}`,
    rust: `fn main() {
    const N: usize = 128;
    let x: Vec<f64> = (0..N).map(|i| i as f64 * 0.25).collect();
    let y: Vec<f64> = (0..N).map(|i| i as f64 * 0.5).collect();
    let mut total = 0.0_f64;
    for i in 0..N {
        for j in 0..N {
            let dx = x[i] - x[j];
            let dy = y[i] - y[j];
            total += dx * dx + dy * dy;
        }
    }
    println!("{}", total);
}`,
    zig: `const std = @import("std");

pub fn main() !void {
    const n = 128;
    var x: [n]f64 = undefined;
    var y: [n]f64 = undefined;
    for (0..n) |i| {
        x[i] = @as(f64, @floatFromInt(i)) * 0.25;
        y[i] = @as(f64, @floatFromInt(i)) * 0.5;
    }
    var total: f64 = 0;
    for (0..n) |i| {
        for (0..n) |j| {
            const dx = x[i] - x[j];
            const dy = y[i] - y[j];
            total += dx * dx + dy * dy;
        }
    }
    try std.io.getStdOut().writer().print("{d}\\n", .{total});
}`,
  },

  // 28. Pascal row
  {
    name: 'Pascal Rows',
    description: 'Build Pascal triangle up to row 256 — tests dependent updates',
    vex: `fn main(): i32 {
    let rows = 256
    let! current = Vec.new<i64>()
    current.push(1)
    for _ in 1..rows {
        let! next = Vec.new<i64>()
        next.push(1)
        for i in 1..current.len() {
            next.push(current.getUnchecked(i - 1) + current.getUnchecked(i))
        }
        next.push(1)
        current = next
    }
    println(current.getUnchecked(current.len() / 2))
    return 0
}`,
    go: `package main

import "fmt"

func main() {
	current := []int64{1}
	for row := 1; row < 256; row++ {
		next := make([]int64, 0, len(current)+1)
		next = append(next, 1)
		for i := 1; i < len(current); i++ {
			next = append(next, current[i-1]+current[i])
		}
		next = append(next, 1)
		current = next
	}
	fmt.Println(current[len(current)/2])
}`,
    rust: `fn main() {
    let mut current = vec![1_i64];
    for _ in 1..256 {
        let mut next = Vec::with_capacity(current.len() + 1);
        next.push(1);
        for i in 1..current.len() {
            next.push(current[i - 1] + current[i]);
        }
        next.push(1);
        current = next;
    }
    println!("{}", current[current.len() / 2]);
}`,
    zig: `const std = @import("std");

pub fn main() !void {
    var current = [_]i64{1} ++ [_]i64{};
    var arena = std.heap.ArenaAllocator.init(std.heap.page_allocator);
    defer arena.deinit();
    const alloc = arena.allocator();

    var cur = try alloc.alloc(i64, 1);
    cur[0] = 1;
    var row: usize = 1;
    while (row < 256) : (row += 1) {
        const next = try alloc.alloc(i64, cur.len + 1);
        next[0] = 1;
        var i: usize = 1;
        while (i < cur.len) : (i += 1) {
            next[i] = cur[i - 1] + cur[i];
        }
        next[cur.len] = 1;
        cur = next;
    }
    _ = current;
    try std.io.getStdOut().writer().print("{d}\\n", .{cur[cur.len / 2]});
}`,
  },

  // 29. Tribonacci
  {
    name: 'Tribonacci',
    description: 'Iterative tribonacci stream — tests scalar recurrence chains',
    vex: `fn main(): i32 {
    let! a: i64 = 0
    let! b: i64 = 1
    let! c: i64 = 1
    for _ in 0..1000000 {
        let next = a + b + c
        a = b
        b = c
        c = next
    }
    println(c)
    return 0
}`,
    go: `package main

import "fmt"

func main() {
	var a, b, c int64 = 0, 1, 1
	for i := 0; i < 1000000; i++ {
		next := a + b + c
		a, b, c = b, c, next
	}
	fmt.Println(c)
}`,
    rust: `fn main() {
    let (mut a, mut b, mut c): (i64, i64, i64) = (0, 1, 1);
    for _ in 0..1_000_000 {
        let next = a + b + c;
        a = b;
        b = c;
        c = next;
    }
    println!("{}", c);
}`,
    zig: `const std = @import("std");

pub fn main() !void {
    var a: i64 = 0;
    var b: i64 = 1;
    var c: i64 = 1;
    var i: usize = 0;
    while (i < 1_000_000) : (i += 1) {
        const next = a + b + c;
        a = b;
        b = c;
        c = next;
    }
    try std.io.getStdOut().writer().print("{d}\\n", .{c});
}`,
  },

  // 30. Min/max reduction
  {
    name: 'Min/Max Reduce',
    description: 'Vex reduction-friendly min/max scan — tests aggregate operations',
    vex: `// Vex SIMD reduction operators: <?| (min), >?| (max)
fn main(): i32 {
    let! acc: f64 = 0.0
    for i in 0..500000 {
        let base = i as f64 * 0.001
        let v = [base, base + 3.0, base - 2.0, base + 1.0]
        acc += (>?| v) - (<?| v)   // Hardware SIMD min/max reduction
    }
    println(acc)
    return 0
}`,
    go: `package main

import "fmt"

func laneMin(v [4]float64) float64 {
	best := v[0]
	for i := 1; i < 4; i++ {
		if v[i] < best {
			best = v[i]
		}
	}
	return best
}

func laneMax(v [4]float64) float64 {
	best := v[0]
	for i := 1; i < 4; i++ {
		if v[i] > best {
			best = v[i]
		}
	}
	return best
}

func main() {
	acc := 0.0
	for i := 0; i < 500000; i++ {
		base := float64(i) * 0.001
		v := [4]float64{base, base + 3.0, base - 2.0, base + 1.0}
		acc += laneMax(v) - laneMin(v)
	}
	fmt.Println(acc)
}`,
    rust: `fn lane_min(v: [f64; 4]) -> f64 {
    v.into_iter().fold(f64::INFINITY, f64::min)
}

fn lane_max(v: [f64; 4]) -> f64 {
    v.into_iter().fold(f64::NEG_INFINITY, f64::max)
}

fn main() {
    let mut acc = 0.0_f64;
    for i in 0..500_000 {
        let base = i as f64 * 0.001;
        let v = [base, base + 3.0, base - 2.0, base + 1.0];
        acc += lane_max(v) - lane_min(v);
    }
    println!("{}", acc);
}`,
    zig: `const std = @import("std");

fn laneMin(v: [4]f64) f64 {
    var best = v[0];
    for (1..4) |i| {
        if (v[i] < best) best = v[i];
    }
    return best;
}

fn laneMax(v: [4]f64) f64 {
    var best = v[0];
    for (1..4) |i| {
        if (v[i] > best) best = v[i];
    }
    return best;
}

pub fn main() !void {
    var acc: f64 = 0;
    var i: usize = 0;
    while (i < 500_000) : (i += 1) {
        const base = @as(f64, @floatFromInt(i)) * 0.001;
        const v = [4]f64{ base, base + 3.0, base - 2.0, base + 1.0 };
        acc += laneMax(v) - laneMin(v);
    }
    try std.io.getStdOut().writer().print("{d}\\n", .{acc});
}`,
  },
]
