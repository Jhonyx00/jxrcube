## Animations

### Index
- [Overview](#overview)
- [The lerp formula](#the-lerp-formula)
- [Time normalization](#time-normalization)
- [Practical example](#practical-example)

### Overview
Animations are crucial for making an interactive project feel polished and elegant. While there are many ways to implement them such as CSS transitions, keyframes, the **Web Animations API (WAAPI)**, or even SVG's **animate** tag, this simulator required a more specialized approach.

During development, I noticed that using WAAPI to interpolate between matrix states caused an unwanted "shrinking" effect toward the center of the layer, as the matrix components were being varied linearly without considering the geometric context. On the other hand, standard CSS transitions occasionally suffered from frame drops, leading to "inconsistent" or "jittery" animations.

To solve this, I implemented a **LERP (Linear Interpolation)** approach. This method allows for precise control over the 4x4 matrices of individual cubelets during each rotation, whether it's for the "auto-align" feature after a drag or triggered by keyboard commands (e.g., pressing the "R" key).

#### The lerp formula
The core concept involves calculating the intermediate state between two points over a set duration:

$$L(t) = A + (B - A) \cdot t$$

Where: 
- $L(t)$: The current calculated angle.
- $A$: The initial state (drag angle).
- $B$: The target state (auto-align angle).
- $t$: The normalized progress of the animation.

#### Time normalization
The progress $t$ is calculated using linear time function:

$$f(t) = \frac{t_{current} - t_{start}}{d}$$

Where:

- $f(t)$: The normalized progress (clamped between $0$ and $1$).
- $t_{current}$: The exact timestamp of the current frame.
- $t_{start}$: The exact timestamp when the animation began.
- $d$: The total duration of the animation.

#### Practical example
If a "U" layer is dragged to $65^\circ$ and released, the auto-alignment target ($B$) is $90^\circ$. At the midpoint of the animation ($t = 0.5$), the calculation would be:

$$L(t) = 65 + (90 - 65) \times 0.5$$

$$L(t) = 65 + (25) \times 0.5$$

$$L(t) = 65 + 12.5$$

$$L(t) = \mathbf{77.5^\circ}$$

This ensures that at exactly half the duration, the layer will be positioned at $77.5^\circ$, providing a smooth, mathematically consistent transition from its starting point.