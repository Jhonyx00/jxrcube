## Linear algebra

### Index
- [Overview](#overview)
- [Input vector normalization](#Input-vector-normalization)
- [Surface normal transformation](#Surface-normal-transformation)
- [Dot product](#Dot-product)
- [Matrix multiplication](#Matrix-multiplication)
- [Rotation matrices](#Rotation-matrices)

### Overview
Linear algebra is the mathematical foundation that enables spatial transformations. It is used to represent the positions, orientations, and movements of each puzzle cubelet within the 3D environment with precision and consistency. The use of matrices and vectors is vital for simulating both global rotation and the individual rotation of layers.

For global puzzle interaction, the system translates on-screen dragging into matrix multiplication: the Puzzle Matrix is multiplied by the Rotation Matrix corresponding to the drag delta angle.

Regarding layer interaction, the system detects which layer should rotate based on the drag direction from any given orientation. Matrix multiplication is then performed to project the position of all cubelets within that layer for every incremental rotation angle.

#### Input vector normalization
To rotate a layer, the gesture drag vector is first normalized to isolate its direction:

$$x_{gesture}=\frac{\Delta x}{\sqrt{\Delta x^2 + \Delta y^2}}, y_{gesture}=\frac{\Delta y}{\sqrt{\Delta x^2 + \Delta y^2}}$$

Where:
- $\Delta x$: Delta on the $X$ -axis.
- $\Delta y$: Delta on the $Y$ -axis.
- $x_{gesture}$: Normalized X-axis component of the direction vector.
- $y_{gesture}$: Normalized Y-axis component of the direction vector.

#### Surface normal transformation
To align the selected puzzle face with its global matrix, the selected face's normal vector is multiplied by the gloal matrix:

$$V_{world} = V_{face} \cdot M_{global}$$

Where: 
- $V_{face}$: The normal vector of the selected puzzle face.
- $M_{global}$: The global matrix of the puzzle.

subsequently, the resulting vector is normalized to ensure uniform movement:

$$x'=\frac{x}{\sqrt{x^2 + y^2}}, y'=\frac{y}{\sqrt{x^2 + y^2}}$$

Where:
- $x'$: Normalized direction value on the X-axis.
- $y'$: Normalized direction value on the Y-axis.
- $x, y$: original direction values.

#### Dot product
Finally, the dot product is applied between normalized vectors to measure the alignment between the gesture direction and the layer's rotation direction: 

$$\vec{A} \cdot \vec{B}=(A_x \cdot B_x)+(A_y \cdot B_y)$$

Where:
- $A$, $B$: Input vectors (gesture direction on both axes).
- $A_x$, $B_x$: Projections on the X-axis.
- $A_y$, $B_y$: Projections on the Y-axis.

#### Matrix multiplication
The new orientation for each affected cubelet is obtained through the product of its matrix and the rotation matrix of the drag angle:

$$M_{new} = M_{◻} \cdot R_{\theta}$$

Where:
- $M_{new}$: The rotation projection matrix.
- $R_{\theta}$: The rotation matrix for the drag angle.
- $M_{◻}$: Te cubelet's matrix.

The same principle applies to global rotation, where $M_{◻}$ represents the global matrix and $R_{\theta}$ is the rotation matrix of the drag delta instead of a dynamically calculated angle. In this case ${\theta}$ is the drag delta treated as the new angle with a very small value.

$$M_{global} = M_{◻} \cdot R_{\theta}$$

#### Rotation matrices
Depending on the detected axis of rotation, one of the three fundamental transformation matrices is applied.

X axis:

$$R_x(\theta)=\left[\begin{array}{cccc}
1 & 0 & 0 & 0 \\
0 & \cos\theta & -\sin\theta & 0 \\
0 & \sin\theta & \cos\theta & 0 \\ 
0 & 0 & 0 & 1 \end{array}\right]$$

Y axis:

$$R_y(\theta)=\left[\begin{array}{cccc}
\cos\theta & 0 & \sin\theta & 0 \\
0 & 1 & 0 & 0 \\
-\sin\theta & 0 & \cos\theta & 0 \\
0 & 0 & 0 & 1 \end{array}\right]$$

Z axis:

$$R_z(\theta)=\left[\begin{array}{cccc}
\cos\theta & -\sin\theta & 0 & 0 \\
\sin\theta  & \cos\theta & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1 \end{array}\right]$$