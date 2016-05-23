Postprocessing

加载图片
new THREE.TextureLoader().load("img"); 


法线
Face3( a, b, c, normal, color, materialIndex )
a — Vertex A index.
b — Vertex B index.
c — Vertex C index.
normal — Face normal or array of vertex normals.
color — Face color or array of vertex colors.
materialIndex — Material index.

.vertexNormals

Array of 3 vertex normals.

Vector3

.divideScalar ( s ) this

Divides this vector by scalar s.
Set vector to ( 0, 0, 0 ) if s == 0.