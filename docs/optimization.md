## Optimization

### Index 
- [Overview](#overview)
- [Single object pattern](#Single-object-pattern)
- [Matrix Data & Typed Arrays](#matrix-data--typed-arrays)
- [Linear operations](#linear-operations)

### Overview
During early development, I utilized the native **DOMMatrix** and **DOMPoint** classes for 4x4 matrix operations and spatial points. While I achieved a fully functional integration, I eventually noticed a concerning issue: the simulator performs matrix operations during high-frequency DOM events like touchmove and pointermove.

By design, these native classes are often immutable or return new instances for each operation. For example, the matrixTransform method returns a new object, and operations like multiply or rotateAxisAngle frequently result in new matrix allocations. While this is great for general use, it creates constant object allocation that saturates memory every frame, adding unnecessary overhead to the **Garbage Collector (GC)**. I needed a more specific solution: mutable, single-instance objects that could be updated in place to save memory and to deeply understand why 4x4 matrices are the industry standard for 3D.

Consequently, I developed my own **Vector3D** and **Matrix3D** classes. They mirror native capabilities but are tailored to these specific performance requirements.

### Single-Object Pattern
To reduce the workload on the Garbage Collector and the JavaScript JIT compiler, I adopted a pattern of pre-defining objects used during execution. By avoiding object creation within high-frequency DOM events and ensuring that data types remain consistent, the engine stays optimized.

In the **Matrix3D** class, I define a mutable object as an attribute from the start, allowing operations to happen on the most recent data. Similarly, in **Vector3D**, points are defined as mutable properties. No new objects are generated within the methods of these classes, maintaining performance consistency for dynamic operations that trigger multiple times per second.

### Matrix Data & Typed Arrays
The use of Typed Arrays is crucial for heavy calculations. I utilized **Float32Array** for matrices with continuous values (such as global and dynamic rotation matrices) and **Int8Array** for the individual puzzle cubelet matrices. This approach provides the advantage of contiguous memory and fixed sizes from initialization. They are significantly more efficient and faster than standard arrays because the engine does not need to perform extra type validations or resizing during execution.

### Linear operations
To maximize execution efficiency and assist the JIT (Just-In-Time) compiler in generating highly optimized machine code, the Matrix3D class avoids iterative structures (such as for loops) for fixed-size matrix operations. Instead, I implemented manual loop unrolling for the $4 \times 4$ matrix multiplication. By explicitly defining the arithmetic operations for each component, we eliminate the overhead associated with loop control logic-such as counter increments and conditional branching. This approach ensures:

- Predictable Execution: Provides the JIT engine with a flat, linear execution path, reducing the likelihood of optimization "bailouts."
- Reduced Overhead: Minimizes the computational cost per frame, which is critical when handling high-frequency DOM events (60fps+).
- Register Optimization: By storing intermediate results in local constants before committing them to the typed array, the engine can better utilize CPU registers and maintain data locality.

```javascript
multiplySelf(b) {
    const a = this.#data;
    // Explicit linear calculation of the 16 matrix components.
    const m0 = a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12];
    const m1 = a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13];
    /// ... (rest of the linear implementation)

    // In-place update to maintain memory persistance
    this.#data[0] = m0;
    this.#data[1] = m1;
    // ...
}
```