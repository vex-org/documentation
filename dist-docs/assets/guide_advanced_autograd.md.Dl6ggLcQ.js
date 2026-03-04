import{_ as s,o as n,c as e,ag as p}from"./chunks/framework.BDReElpY.js";const h=JSON.parse('{"title":"Automatic Differentiation (Autograd)","description":"","frontmatter":{},"headers":[],"relativePath":"guide/advanced/autograd.md","filePath":"guide/advanced/autograd.md"}'),t={name:"guide/advanced/autograd.md"};function l(i,a,r,o,c,d){return n(),e("div",null,[...a[0]||(a[0]=[p(`<h1 id="automatic-differentiation-autograd" tabindex="-1">Automatic Differentiation (Autograd) <a class="header-anchor" href="#automatic-differentiation-autograd" aria-label="Permalink to &quot;Automatic Differentiation (Autograd)&quot;">​</a></h1><p>Vex provides <strong>built-in automatic differentiation</strong> for machine learning, physics simulations, and scientific computing. No external libraries needed!</p><div class="tip custom-block"><p class="custom-block-title">What is Autograd?</p><p>Autograd automatically computes gradients (derivatives) of your functions. This is essential for:</p><ul><li>Training neural networks (backpropagation)</li><li>Physics simulations (sensitivity analysis)</li><li>Optimization problems (gradient descent)</li></ul></div><h2 id="the-block" tabindex="-1">The <code>@{ }</code> Block <a class="header-anchor" href="#the-block" aria-label="Permalink to &quot;The \`@{ }\` Block&quot;">​</a></h2><p>The autograd block <code>@{ ... }</code> creates a <strong>differentiable scope</strong>. Inside this scope, operations on &quot;parameters&quot; are tracked to compute gradients.</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let x = 3.0</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Autograd block - computes value AND gradient</span></span>
<span class="line"><span>    let result = @{</span></span>
<span class="line"><span>        let p = $param(x)      // Mark x as a parameter</span></span>
<span class="line"><span>        p * p + 2.0 * p + 1.0  // f(x) = x² + 2x + 1</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Extract results</span></span>
<span class="line"><span>    let value = $val(result)    // f(3) = 9 + 6 + 1 = 16</span></span>
<span class="line"><span>    let gradient = $grad(result) // f&#39;(x) = 2x + 2, f&#39;(3) = 8</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    $println(f&quot;f(3) = {value}&quot;)      // 16.0</span></span>
<span class="line"><span>    $println(f&quot;f&#39;(3) = {gradient}&quot;)  // 8.0</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return 0</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="autograd-intrinsics" tabindex="-1">Autograd Intrinsics <a class="header-anchor" href="#autograd-intrinsics" aria-label="Permalink to &quot;Autograd Intrinsics&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Intrinsic</th><th>Description</th></tr></thead><tbody><tr><td><code>$param(x)</code></td><td>Mark variable <code>x</code> as a tracked parameter</td></tr><tr><td><code>$val(res)</code></td><td>Extract the computed value (primal)</td></tr><tr><td><code>$grad(res)</code></td><td>Extract the gradient (derivative)</td></tr><tr><td><code>$detach(x)</code></td><td>Stop gradient tracking (for inference)</td></tr></tbody></table><h2 id="supported-operations" tabindex="-1">Supported Operations <a class="header-anchor" href="#supported-operations" aria-label="Permalink to &quot;Supported Operations&quot;">​</a></h2><h3 id="arithmetic-operations" tabindex="-1">Arithmetic Operations <a class="header-anchor" href="#arithmetic-operations" aria-label="Permalink to &quot;Arithmetic Operations&quot;">​</a></h3><p>All basic arithmetic is autograd-aware:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let result = @{</span></span>
<span class="line"><span>    let x = $param(a)</span></span>
<span class="line"><span>    let y = $param(b)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    x + y      // ∂/∂x = 1, ∂/∂y = 1</span></span>
<span class="line"><span>    x - y      // ∂/∂x = 1, ∂/∂y = -1</span></span>
<span class="line"><span>    x * y      // ∂/∂x = y, ∂/∂y = x</span></span>
<span class="line"><span>    x / y      // ∂/∂x = 1/y, ∂/∂y = -x/y²</span></span>
<span class="line"><span>    x ^ n      // ∂/∂x = n·x^(n-1) (power rule)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="math-functions" tabindex="-1">Math Functions <a class="header-anchor" href="#math-functions" aria-label="Permalink to &quot;Math Functions&quot;">​</a></h3><p>Built-in math functions support automatic differentiation:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>let trig_result = @{</span></span>
<span class="line"><span>    let x = $param(angle)</span></span>
<span class="line"><span>    $sin(x)    // ∂/∂x = cos(x)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let exp_result = @{</span></span>
<span class="line"><span>    let x = $param(val)</span></span>
<span class="line"><span>    $exp(x)    // ∂/∂x = exp(x)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let log_result = @{</span></span>
<span class="line"><span>    let x = $param(val)</span></span>
<span class="line"><span>    $log(x)    // ∂/∂x = 1/x</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let sqrt_result = @{</span></span>
<span class="line"><span>    let x = $param(val)</span></span>
<span class="line"><span>    $sqrt(x)   // ∂/∂x = 1/(2√x)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>let pow_result = @{</span></span>
<span class="line"><span>    let x = $param(base)</span></span>
<span class="line"><span>    $pow(x, 3.0)  // ∂/∂x = 3x²</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="complete-example-trigonometric-derivatives" tabindex="-1">Complete Example: Trigonometric Derivatives <a class="header-anchor" href="#complete-example-trigonometric-derivatives" aria-label="Permalink to &quot;Complete Example: Trigonometric Derivatives&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let x = 3.0</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // g(x) = sin(x)</span></span>
<span class="line"><span>    // g&#39;(x) = cos(x)</span></span>
<span class="line"><span>    let trig_res = @{</span></span>
<span class="line"><span>        let p = $param(x)</span></span>
<span class="line"><span>        $sin(p)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    $println(f&quot;sin({x}) = {$val(trig_res)}&quot;)    // ~0.14112</span></span>
<span class="line"><span>    $println(f&quot;cos({x}) = {$grad(trig_res)}&quot;)   // ~-0.98999</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return 0</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="advanced-math-example" tabindex="-1">Advanced Math Example <a class="header-anchor" href="#advanced-math-example" aria-label="Permalink to &quot;Advanced Math Example&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn main(): i32 {</span></span>
<span class="line"><span>    let x = 3.0</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // f(x) = √x + log(x) + exp(x)</span></span>
<span class="line"><span>    // f&#39;(x) = 1/(2√x) + 1/x + exp(x)</span></span>
<span class="line"><span>    let result = @{</span></span>
<span class="line"><span>        let p = $param(x)</span></span>
<span class="line"><span>        $sqrt(p) + $log(p) + $exp(p)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // At x = 3:</span></span>
<span class="line"><span>    // val ≈ 1.732 + 1.099 + 20.086 ≈ 22.916</span></span>
<span class="line"><span>    // grad ≈ 0.289 + 0.333 + 20.086 ≈ 20.707</span></span>
<span class="line"><span>    $println(f&quot;f(3) = {$val(result)}&quot;)</span></span>
<span class="line"><span>    $println(f&quot;f&#39;(3) = {$grad(result)}&quot;)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return 0</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="how-it-works" tabindex="-1">How It Works <a class="header-anchor" href="#how-it-works" aria-label="Permalink to &quot;How It Works&quot;">​</a></h2><p>Vex implements <strong>Forward-Mode Automatic Differentiation</strong> using <strong>Dual Numbers</strong>.</p><h3 id="dual-numbers" tabindex="-1">Dual Numbers <a class="header-anchor" href="#dual-numbers" aria-label="Permalink to &quot;Dual Numbers&quot;">​</a></h3><p>Each tracked value becomes a dual number: $v + \\varepsilon d$ where:</p><ul><li>$v$ is the primal value</li><li>$d$ is the derivative (tangent)</li><li>$\\varepsilon^2 = 0$ (infinitesimal)</li></ul><h3 id="chain-rule" tabindex="-1">Chain Rule <a class="header-anchor" href="#chain-rule" aria-label="Permalink to &quot;Chain Rule&quot;">​</a></h3><p>Operations automatically propagate derivatives using the chain rule:</p><p>$$\\frac{d}{dx}f(g(x)) = f&#39;(g(x)) \\cdot g&#39;(x)$$</p><h3 id="compiler-optimization" tabindex="-1">Compiler Optimization <a class="header-anchor" href="#compiler-optimization" aria-label="Permalink to &quot;Compiler Optimization&quot;">​</a></h3><p>The Vex compiler (SIR) can:</p><ul><li>Fuse autograd operations with computation loops</li><li>Eliminate memory overhead of computation graphs</li><li>Generate optimized gradient code at compile time</li></ul><h2 id="machine-learning-example" tabindex="-1">Machine Learning Example <a class="header-anchor" href="#machine-learning-example" aria-label="Permalink to &quot;Machine Learning Example&quot;">​</a></h2><h3 id="linear-regression" tabindex="-1">Linear Regression <a class="header-anchor" href="#linear-regression" aria-label="Permalink to &quot;Linear Regression&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn train_step(x: f64, y_true: f64, w: f64, b: f64, lr: f64): (f64, f64) {</span></span>
<span class="line"><span>    // Forward pass with gradient tracking</span></span>
<span class="line"><span>    let loss_result = @{</span></span>
<span class="line"><span>        let weight = $param(w)</span></span>
<span class="line"><span>        let bias = $param(b)</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        // Prediction: y = wx + b</span></span>
<span class="line"><span>        let y_pred = weight * x + bias</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        // MSE Loss: (y_pred - y_true)²</span></span>
<span class="line"><span>        let loss = (y_pred - y_true) * (y_pred - y_true)</span></span>
<span class="line"><span>        loss</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    let loss = $val(loss_result)</span></span>
<span class="line"><span>    let grad_w = $grad(loss_result)  // ∂loss/∂w</span></span>
<span class="line"><span>    let grad_b = $grad(loss_result)  // ∂loss/∂b (second param)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // Gradient descent update</span></span>
<span class="line"><span>    let new_w = w - lr * grad_w</span></span>
<span class="line"><span>    let new_b = b - lr * grad_b</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    return (new_w, new_b)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="neural-network-layer" tabindex="-1">Neural Network Layer <a class="header-anchor" href="#neural-network-layer" aria-label="Permalink to &quot;Neural Network Layer&quot;">​</a></h3><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn linear_layer(input: [f64], weights: [[f64]], bias: [f64]): @Dual {</span></span>
<span class="line"><span>    @{</span></span>
<span class="line"><span>        let w = $param(weights)</span></span>
<span class="line"><span>        let b = $param(bias)</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        // Matrix multiplication + bias</span></span>
<span class="line"><span>        (input &lt;*&gt; w) + b</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>fn relu(x: @Dual): @Dual {</span></span>
<span class="line"><span>    @{</span></span>
<span class="line"><span>        let p = $param(x)</span></span>
<span class="line"><span>        if $val(p) &gt; 0.0 { p } else { 0.0 }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="stopping-gradients" tabindex="-1">Stopping Gradients <a class="header-anchor" href="#stopping-gradients" aria-label="Permalink to &quot;Stopping Gradients&quot;">​</a></h2><p>Use <code>$detach</code> to stop gradient propagation:</p><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fn inference(x: f64, w: f64): f64 {</span></span>
<span class="line"><span>    // During inference, we don&#39;t need gradients</span></span>
<span class="line"><span>    let result = @{</span></span>
<span class="line"><span>        let weight = $detach(w)  // No gradient tracking</span></span>
<span class="line"><span>        let input = $param(x)</span></span>
<span class="line"><span>        input * weight</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return $val(result)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="comparison-with-other-languages" tabindex="-1">Comparison with Other Languages <a class="header-anchor" href="#comparison-with-other-languages" aria-label="Permalink to &quot;Comparison with Other Languages&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Feature</th><th>Vex</th><th>PyTorch</th><th>JAX</th><th>Julia</th></tr></thead><tbody><tr><td>Syntax</td><td><code>@{ $param(x) }</code></td><td><code>requires_grad=True</code></td><td><code>grad(fn)</code></td><td><code>gradient(fn)</code></td></tr><tr><td>Mode</td><td>Forward</td><td>Reverse</td><td>Both</td><td>Both</td></tr><tr><td>Built-in</td><td>✅</td><td>Library</td><td>Library</td><td>Library</td></tr><tr><td>Compile-time</td><td>✅</td><td>❌</td><td>✅ (JIT)</td><td>✅ (JIT)</td></tr></tbody></table><h2 id="best-practices" tabindex="-1">Best Practices <a class="header-anchor" href="#best-practices" aria-label="Permalink to &quot;Best Practices&quot;">​</a></h2><ol><li><strong>Mark only needed parameters</strong> - Don&#39;t <code>$param</code> constants</li><li><strong>Use <code>$detach</code> for inference</strong> - Saves computation</li><li><strong>Keep autograd blocks focused</strong> - One computation per block</li><li><strong>Extract gradients immediately</strong> - Before the result goes out of scope</li></ol><div class="language-vex vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vex</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ✅ Good: Clear, focused autograd block</span></span>
<span class="line"><span>let result = @{</span></span>
<span class="line"><span>    let w = $param(weights)</span></span>
<span class="line"><span>    compute_loss(input, w, target)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>let grad = $grad(result)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ❌ Avoid: Too much in one block</span></span>
<span class="line"><span>let result = @{</span></span>
<span class="line"><span>    let w = $param(weights)</span></span>
<span class="line"><span>    let preprocessed = preprocess(input)  // Could be outside</span></span>
<span class="line"><span>    let normalized = normalize(preprocessed)  // Could be outside</span></span>
<span class="line"><span>    compute_loss(normalized, w, target)</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="next-steps" tabindex="-1">Next Steps <a class="header-anchor" href="#next-steps" aria-label="Permalink to &quot;Next Steps&quot;">​</a></h2><ul><li><a href="/docs/guide/gpu/">GPU Computing</a> - GPU-accelerated autograd</li><li><a href="/docs/guide/simd/">SIMD</a> - Vectorized operations</li><li><a href="/docs/guide/advanced/comptime">Comptime</a> - Compile-time computation</li></ul>`,45)])])}const g=s(t,[["render",l]]);export{h as __pageData,g as default};
