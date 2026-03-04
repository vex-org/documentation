import{_ as s,o as n,c as e,ag as t}from"./chunks/framework.BDReElpY.js";const u=JSON.parse('{"title":"Operator Overloading","description":"","frontmatter":{},"headers":[],"relativePath":"guide/advanced/operators.md","filePath":"guide/advanced/operators.md"}'),p={name:"guide/advanced/operators.md"};function l(o,a,d,c,r,i){return n(),e("div",null,[...a[0]||(a[0]=[t(`<h1 id="operator-overloading" tabindex="-1">Operator Overloading <a class="header-anchor" href="#operator-overloading" aria-label="Permalink to &quot;Operator Overloading&quot;">​</a></h1><p>Vex supports operator overloading through <strong>contracts</strong> and <strong>operator methods</strong>. This allows custom types to use natural operators like <code>+</code>, <code>-</code>, <code>*</code>, <code>==</code>, and <code>[]</code>.</p><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>Operator overloading in Vex uses a contract-based system:</p><ol><li><strong>Define or use a contract</strong> with an operator method</li><li><strong>Implement the contract</strong> on your struct</li><li><strong>Use the operator</strong> naturally in code</li></ol><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 1. Contract defines the operator</span></span>
<span class="line"><span>contract Add {</span></span>
<span class="line"><span>    op+(other: Self): Self;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 2. Struct implements the contract</span></span>
<span class="line"><span>struct Point:Add {</span></span>
<span class="line"><span>    x: i32,</span></span>
<span class="line"><span>    y: i32,</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    fn op+(other: Point): Point {</span></span>
<span class="line"><span>        Point { x: self.x + other.x, y: self.y + other.y }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 3. Use the operator</span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let p1 = Point { x: 1, y: 2 }</span></span>
<span class="line"><span>    let p2 = Point { x: 3, y: 4 }</span></span>
<span class="line"><span>    let p3 = p1 + p2  // Calls op+</span></span>
<span class="line"><span>    return 0</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="standard-operator-contracts" tabindex="-1">Standard Operator Contracts <a class="header-anchor" href="#standard-operator-contracts" aria-label="Permalink to &quot;Standard Operator Contracts&quot;">​</a></h2><p>Vex provides built-in contracts for all operators. They use the <code>$</code> prefix.</p><h3 id="arithmetic-operators" tabindex="-1">Arithmetic Operators <a class="header-anchor" href="#arithmetic-operators" aria-label="Permalink to &quot;Arithmetic Operators&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Operator</th><th>Contract</th><th>Method</th><th>Example</th></tr></thead><tbody><tr><td><code>a + b</code></td><td><code>$Add</code></td><td><code>op+(rhs: Self): Self</code></td><td>Addition</td></tr><tr><td><code>a - b</code></td><td><code>$Sub</code></td><td><code>op-(rhs: Self): Self</code></td><td>Subtraction</td></tr><tr><td><code>a * b</code></td><td><code>$Mul</code></td><td><code>op*(rhs: Self): Self</code></td><td>Multiplication</td></tr><tr><td><code>a / b</code></td><td><code>$Div</code></td><td><code>op/(rhs: Self): Self</code></td><td>Division</td></tr><tr><td><code>a % b</code></td><td><code>$Mod</code></td><td><code>op%(rhs: Self): Self</code></td><td>Modulo</td></tr><tr><td><code>-a</code></td><td><code>$Neg</code></td><td><code>op-(): Self</code></td><td>Negation</td></tr></tbody></table><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Vec2:$Add, $Sub, $Neg {</span></span>
<span class="line"><span>    x: f64,</span></span>
<span class="line"><span>    y: f64,</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    fn op+(other: Vec2): Vec2 {</span></span>
<span class="line"><span>        Vec2 { x: self.x + other.x, y: self.y + other.y }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    fn op-(other: Vec2): Vec2 {</span></span>
<span class="line"><span>        Vec2 { x: self.x - other.x, y: self.y - other.y }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    fn op-(): Vec2 {</span></span>
<span class="line"><span>        Vec2 { x: -self.x, y: -self.y }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let v = Vec2 { x: 1.0, y: 2.0 }</span></span>
<span class="line"><span>let neg = -v  // Vec2 { x: -1.0, y: -2.0 }</span></span></code></pre></div><h3 id="comparison-operators" tabindex="-1">Comparison Operators <a class="header-anchor" href="#comparison-operators" aria-label="Permalink to &quot;Comparison Operators&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Operator</th><th>Contract</th><th>Method</th><th>Example</th></tr></thead><tbody><tr><td><code>a == b</code></td><td><code>$Eq</code></td><td><code>op==(rhs: Self): bool</code></td><td>Equality</td></tr><tr><td><code>a != b</code></td><td><code>$Eq</code></td><td><code>op!=(rhs: Self): bool</code></td><td>Inequality</td></tr><tr><td><code>a &lt; b</code></td><td><code>$Ord</code></td><td><code>op&lt;(rhs: Self): bool</code></td><td>Less than</td></tr><tr><td><code>a &lt;= b</code></td><td><code>$Ord</code></td><td><code>op&lt;=(rhs: Self): bool</code></td><td>Less or equal</td></tr><tr><td><code>a &gt; b</code></td><td><code>$Ord</code></td><td><code>op&gt;(rhs: Self): bool</code></td><td>Greater than</td></tr><tr><td><code>a &gt;= b</code></td><td><code>$Ord</code></td><td><code>op&gt;=(rhs: Self): bool</code></td><td>Greater or equal</td></tr></tbody></table><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Version:$Eq, $Ord {</span></span>
<span class="line"><span>    major: i32,</span></span>
<span class="line"><span>    minor: i32,</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    fn op==(other: Version): bool {</span></span>
<span class="line"><span>        self.major == other.major &amp;&amp; self.minor == other.minor</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    fn op!=(other: Version): bool {</span></span>
<span class="line"><span>        !(self == other)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    fn op&lt;(other: Version): bool {</span></span>
<span class="line"><span>        if self.major != other.major {</span></span>
<span class="line"><span>            return self.major &lt; other.major</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        self.minor &lt; other.minor</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    fn op&lt;=(other: Version): bool { self &lt; other || self == other }</span></span>
<span class="line"><span>    fn op&gt;(other: Version): bool { !(self &lt;= other) }</span></span>
<span class="line"><span>    fn op&gt;=(other: Version): bool { !(self &lt; other) }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="bitwise-operators" tabindex="-1">Bitwise Operators <a class="header-anchor" href="#bitwise-operators" aria-label="Permalink to &quot;Bitwise Operators&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Operator</th><th>Contract</th><th>Method</th><th>Example</th></tr></thead><tbody><tr><td><code>a &amp; b</code></td><td><code>$BitAnd</code></td><td><code>op&amp;(rhs: Self): Self</code></td><td>AND</td></tr><tr><td><code>a | b</code></td><td><code>$BitOr</code></td><td><code>op|(rhs: Self): Self</code></td><td>OR</td></tr><tr><td><code>a ^ b</code></td><td><code>$BitXor</code></td><td><code>op^(rhs: Self): Self</code></td><td>XOR</td></tr><tr><td><code>~a</code></td><td><code>$BitNot</code></td><td><code>op~(): Self</code></td><td>NOT</td></tr><tr><td><code>a &lt;&lt; n</code></td><td><code>$Shl</code></td><td><code>op&lt;&lt;(rhs: i32): Self</code></td><td>Left shift</td></tr><tr><td><code>a &gt;&gt; n</code></td><td><code>$Shr</code></td><td><code>op&gt;&gt;(rhs: i32): Self</code></td><td>Right shift</td></tr></tbody></table><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Flags:$BitOr, $BitAnd {</span></span>
<span class="line"><span>    value: u32,</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    fn op|(other: Flags): Flags {</span></span>
<span class="line"><span>        Flags { value: self.value | other.value }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    fn op&amp;(other: Flags): Flags {</span></span>
<span class="line"><span>        Flags { value: self.value &amp; other.value }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const READ = Flags { value: 1 }</span></span>
<span class="line"><span>const WRITE = Flags { value: 2 }</span></span>
<span class="line"><span>let perms = READ | WRITE  // Flags { value: 3 }</span></span></code></pre></div><h3 id="index-operators" tabindex="-1">Index Operators <a class="header-anchor" href="#index-operators" aria-label="Permalink to &quot;Index Operators&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Operator</th><th>Contract</th><th>Method</th><th>Example</th></tr></thead><tbody><tr><td><code>a[i]</code></td><td><code>$Index</code></td><td><code>op[](index: Idx): Output</code></td><td>Read access</td></tr><tr><td><code>a[i] = v</code></td><td><code>$IndexMut</code></td><td><code>op[]=(index: Idx, value: Val)</code></td><td>Write access</td></tr><tr><td><code>a[i..j]</code></td><td><code>$Slice</code></td><td><code>op[..](start, end): Output</code></td><td>Slice read</td></tr></tbody></table><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Matrix:$Index, $IndexMut {</span></span>
<span class="line"><span>    type Output = f64;</span></span>
<span class="line"><span>    data: Vec&lt;f64&gt;,</span></span>
<span class="line"><span>    cols: i64,</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    fn op[](index: i64): f64 {</span></span>
<span class="line"><span>        self.data.get(index)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    fn op[]=(index: i64, value: f64) {</span></span>
<span class="line"><span>        // Set value at index</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let m = Matrix { ... }</span></span>
<span class="line"><span>let val = m[5]     // Calls op[]</span></span>
<span class="line"><span>m[5] = 3.14        // Calls op[]=</span></span></code></pre></div><h3 id="compound-assignment" tabindex="-1">Compound Assignment <a class="header-anchor" href="#compound-assignment" aria-label="Permalink to &quot;Compound Assignment&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Operator</th><th>Contract</th><th>Method</th></tr></thead><tbody><tr><td><code>a += b</code></td><td><code>$AddAssign</code></td><td><code>op+=(rhs: Self)</code></td></tr><tr><td><code>a -= b</code></td><td><code>$SubAssign</code></td><td><code>op-=(rhs: Self)</code></td></tr><tr><td><code>a *= b</code></td><td><code>$MulAssign</code></td><td><code>op*=(rhs: Self)</code></td></tr><tr><td><code>a /= b</code></td><td><code>$DivAssign</code></td><td><code>op/=(rhs: Self)</code></td></tr><tr><td><code>a %= b</code></td><td><code>$ModAssign</code></td><td><code>op%=(rhs: Self)</code></td></tr><tr><td><code>a &amp;= b</code></td><td><code>$BitAndAssign</code></td><td><code>op&amp;=(rhs: Self)</code></td></tr><tr><td><code>a |= b</code></td><td><code>$BitOrAssign</code></td><td><code>op|=(rhs: Self)</code></td></tr><tr><td><code>a ^= b</code></td><td><code>$BitXorAssign</code></td><td><code>op^=(rhs: Self)</code></td></tr><tr><td><code>a &lt;&lt;= n</code></td><td><code>$ShlAssign</code></td><td><code>op&lt;&lt;=(rhs: i32)</code></td></tr><tr><td><code>a &gt;&gt;= n</code></td><td><code>$ShrAssign</code></td><td><code>op&gt;&gt;=(rhs: i32)</code></td></tr></tbody></table><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Counter:$AddAssign {</span></span>
<span class="line"><span>    value: i32,</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    fn op+=(amount: Counter) {</span></span>
<span class="line"><span>        self.value = self.value + amount.value</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let! c = Counter { value: 10 }</span></span>
<span class="line"><span>c += Counter { value: 5 }  // c.value is now 15</span></span></code></pre></div><h3 id="advanced-operators" tabindex="-1">Advanced Operators <a class="header-anchor" href="#advanced-operators" aria-label="Permalink to &quot;Advanced Operators&quot;">​</a></h3><table tabindex="0"><thead><tr><th>Operator</th><th>Contract</th><th>Method</th><th>Example</th></tr></thead><tbody><tr><td><code>a ** b</code></td><td><code>$Pow</code></td><td><code>op**(exp: i32): Self</code></td><td>Power</td></tr><tr><td><code>++a</code></td><td><code>$PreInc</code></td><td><code>op++(): Self</code></td><td>Pre-increment</td></tr><tr><td><code>a++</code></td><td><code>$PostInc</code></td><td><code>op++(): Self</code></td><td>Post-increment</td></tr><tr><td><code>--a</code></td><td><code>$PreDec</code></td><td><code>op--(): Self</code></td><td>Pre-decrement</td></tr><tr><td><code>a--</code></td><td><code>$PostDec</code></td><td><code>op--(): Self</code></td><td>Post-decrement</td></tr><tr><td><code>a..b</code></td><td><code>$Range</code></td><td><code>op..(end): Range&lt;Self&gt;</code></td><td>Range</td></tr><tr><td><code>a..=b</code></td><td><code>$RangeInclusive</code></td><td><code>op..=(end): RangeInclusive&lt;Self&gt;</code></td><td>Inclusive range</td></tr><tr><td><code>a ?? b</code></td><td><code>$NullCoalesce</code></td><td><code>op??(fallback): Self</code></td><td>Null coalesce</td></tr></tbody></table><h2 id="external-operator-methods" tabindex="-1">External Operator Methods <a class="header-anchor" href="#external-operator-methods" aria-label="Permalink to &quot;External Operator Methods&quot;">​</a></h2><p>You can also define operators outside the struct using <strong>method syntax</strong>:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Vector2 {</span></span>
<span class="line"><span>    x: f64,</span></span>
<span class="line"><span>    y: f64,</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// External operator method</span></span>
<span class="line"><span>fn (self: Vector2) op+(other: Vector2): Vector2 {</span></span>
<span class="line"><span>    Vector2 {</span></span>
<span class="line"><span>        x: self.x + other.x,</span></span>
<span class="line"><span>        y: self.y + other.y,</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Works the same</span></span>
<span class="line"><span>let v1 = Vector2 { x: 1.0, y: 2.0 }</span></span>
<span class="line"><span>let v2 = Vector2 { x: 3.0, y: 4.0 }</span></span>
<span class="line"><span>let v3 = v1 + v2</span></span></code></pre></div><h2 id="custom-contracts" tabindex="-1">Custom Contracts <a class="header-anchor" href="#custom-contracts" aria-label="Permalink to &quot;Custom Contracts&quot;">​</a></h2><p>Define your own contracts for domain-specific operators:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// Custom scalar multiplication contract</span></span>
<span class="line"><span>contract ScalarMul {</span></span>
<span class="line"><span>    mul_scalar(scalar: f64): Self;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>struct Vec3:ScalarMul {</span></span>
<span class="line"><span>    x: f64,</span></span>
<span class="line"><span>    y: f64,</span></span>
<span class="line"><span>    z: f64,</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    fn mul_scalar(scalar: f64): Vec3 {</span></span>
<span class="line"><span>        Vec3 {</span></span>
<span class="line"><span>            x: self.x * scalar,</span></span>
<span class="line"><span>            y: self.y * scalar,</span></span>
<span class="line"><span>            z: self.z * scalar,</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let v = Vec3 { x: 1.0, y: 2.0, z: 3.0 }</span></span>
<span class="line"><span>let scaled = v.mul_scalar(2.5)</span></span></code></pre></div><h2 id="implementing-multiple-contracts" tabindex="-1">Implementing Multiple Contracts <a class="header-anchor" href="#implementing-multiple-contracts" aria-label="Permalink to &quot;Implementing Multiple Contracts&quot;">​</a></h2><p>A single struct can implement multiple operator contracts:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Complex:$Add, $Sub, $Mul, $Eq, $Display {</span></span>
<span class="line"><span>    real: f64,</span></span>
<span class="line"><span>    imag: f64,</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    fn op+(other: Complex): Complex {</span></span>
<span class="line"><span>        Complex { real: self.real + other.real, imag: self.imag + other.imag }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    fn op-(other: Complex): Complex {</span></span>
<span class="line"><span>        Complex { real: self.real - other.real, imag: self.imag - other.imag }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    fn op*(other: Complex): Complex {</span></span>
<span class="line"><span>        // (a + bi)(c + di) = (ac - bd) + (ad + bc)i</span></span>
<span class="line"><span>        Complex {</span></span>
<span class="line"><span>            real: self.real * other.real - self.imag * other.imag,</span></span>
<span class="line"><span>            imag: self.real * other.imag + self.imag * other.real,</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    fn op==(other: Complex): bool {</span></span>
<span class="line"><span>        self.real == other.real &amp;&amp; self.imag == other.imag</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    fn op!=(other: Complex): bool {</span></span>
<span class="line"><span>        !(self == other)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    fn display(): string {</span></span>
<span class="line"><span>        // Format as &quot;a + bi&quot;</span></span>
<span class="line"><span>        return &quot;Complex&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="non-overloadable-operators" tabindex="-1">Non-Overloadable Operators <a class="header-anchor" href="#non-overloadable-operators" aria-label="Permalink to &quot;Non-Overloadable Operators&quot;">​</a></h2><p>The following operators <strong>cannot</strong> be overloaded:</p><table tabindex="0"><thead><tr><th>Operator</th><th>Reason</th></tr></thead><tbody><tr><td><code>&amp;&amp;</code></td><td>Short-circuit evaluation</td></tr><tr><td><code>||</code></td><td>Short-circuit evaluation</td></tr><tr><td><code>=</code></td><td>Assignment semantics</td></tr><tr><td><code>.</code></td><td>Member access</td></tr><tr><td><code>?.</code></td><td>Optional chaining</td></tr></tbody></table><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><ol><li><strong>Follow semantics</strong> - <code>op+</code> should behave like addition</li><li><strong>Implement related operators</strong> - If <code>op==</code>, also implement <code>op!=</code></li><li><strong>Return Self</strong> - Arithmetic operators should return <code>Self</code> type</li><li><strong>Don&#39;t surprise</strong> - Operators should be intuitive for users</li><li><strong>Use contracts</strong> - They provide compile-time checking</li></ol><h2 id="example-matrix-type" tabindex="-1">Example: Matrix Type <a class="header-anchor" href="#example-matrix-type" aria-label="Permalink to &quot;Example: Matrix Type&quot;">​</a></h2><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>struct Matrix:$Add, $Mul, $Index, $Eq {</span></span>
<span class="line"><span>    type Output = f64;</span></span>
<span class="line"><span>    data: Vec&lt;f64&gt;,</span></span>
<span class="line"><span>    rows: i64,</span></span>
<span class="line"><span>    cols: i64,</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    fn op+(other: Matrix): Matrix {</span></span>
<span class="line"><span>        $assert(self.rows == other.rows &amp;&amp; self.cols == other.cols)</span></span>
<span class="line"><span>        let! result = Vec.with_capacity&lt;f64&gt;(self.data.len())</span></span>
<span class="line"><span>        for i in 0..self.data.len() {</span></span>
<span class="line"><span>            result.push(self.data.get(i) + other.data.get(i))</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        Matrix { data: result, rows: self.rows, cols: self.cols }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    fn op*(other: Matrix): Matrix {</span></span>
<span class="line"><span>        $assert(self.cols == other.rows)</span></span>
<span class="line"><span>        // Matrix multiplication implementation</span></span>
<span class="line"><span>        // ...</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    fn op[](index: i64): f64 {</span></span>
<span class="line"><span>        self.data.get(index)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    fn op==(other: Matrix): bool {</span></span>
<span class="line"><span>        if self.rows != other.rows || self.cols != other.cols {</span></span>
<span class="line"><span>            return false</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        for i in 0..self.data.len() {</span></span>
<span class="line"><span>            if self.data.get(i) != other.data.get(i) {</span></span>
<span class="line"><span>                return false</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        true</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    fn op!=(other: Matrix): bool {</span></span>
<span class="line"><span>        !(self == other)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let a = Matrix { ... }</span></span>
<span class="line"><span>    let b = Matrix { ... }</span></span>
<span class="line"><span>    let c = a + b       // Matrix addition</span></span>
<span class="line"><span>    let d = a * b       // Matrix multiplication</span></span>
<span class="line"><span>    let val = c[0]      // Index access</span></span>
<span class="line"><span>    let eq = a == b     // Equality check</span></span>
<span class="line"><span>    return 0</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="related-topics" tabindex="-1">Related Topics <a class="header-anchor" href="#related-topics" aria-label="Permalink to &quot;Related Topics&quot;">​</a></h2><ul><li><a href="/docs/guide/types/contracts">Contracts</a> - Contract system</li><li><a href="/docs/guide/types/structs">Structs</a> - Defining types</li><li><a href="/docs/guide/advanced/methods">Methods</a> - Method syntax</li></ul>`,43)])])}const f=s(p,[["render",l]]);export{u as __pageData,f as default};
