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
    description: 'Sum integers 0..1M — tests loop performance',
    vex: `fn main(): i32 {
    let! sum = 0
    for i in 0..1000000 {
        sum = sum + i
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
    description: 'Build a string by repeated concatenation — tests allocator',
    vex: `fn main(): i32 {
    let! s = ""
    for i in 0..10000 {
        s = s + "x"
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
    description: 'SIMD-friendly dot product — tests vectorization',
    vex: `fn dot(a: [f64; 4], b: [f64; 4]): f64 {
    return <+ (a * b)
}

fn main(): i32 {
    let! sum: f64 = 0.0
    for i in 0..100000 {
        let a = [1.0, 2.0, 3.0, 4.0]
        let b = [5.0, 6.0, 7.0, 8.0]
        sum = sum + dot(a, b)
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
    description: 'Sieve of Eratosthenes up to 100K — tests array access',
    vex: `fn main(): i32 {
    let limit = 100000
    let! count = 0
    let! sieve = Vec.new<bool>()
    for i in 0..limit {
        sieve.push(true)
    }
    for i in 2..limit {
        if sieve.get(i) == Some(true) {
            count = count + 1
            let! j = i * i
            for j < limit {
                sieve.set(j, false)
                j = j + i
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
    for iter in 0..100000 {
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
                    s = s + a[i * 4 + k] * b[k * 4 + j]
                }
                c[i * 4 + j] = s
            }
        }
        sum = sum + c[0]
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
            x = x / 2
        } else {
            x = 3 * x + 1
        }
        count = count + 1
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
    let! hi = arr.len() - 1
    while lo <= hi {
        let mid = lo + (hi - lo) / 2
        let val = arr.get(mid)
        if val == Some(target) { return mid }
        if val < Some(target) { lo = mid + 1 }
        else { hi = mid - 1 }
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
        if idx >= 0 { found = found + 1 }
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
        x.push(i * 1.0)
        y.push(i * 0.5)
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
                    let dist = (dx * dx + dy * dy + 0.01)
                    let force = 1.0 / dist
                    fx = fx + dx * force
                    fy = fy + dy * force
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
        if i % 15 == 0 { count = count + 3 }
        else if i % 3 == 0 { count = count + 1 }
        else if i % 5 == 0 { count = count + 2 }
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
]
