import * as THREE from 'three'

const Cube = function (x, y) {
  const width = 0.2
  const geometry = new THREE.BoxGeometry(width, width, width)
  const colors = []
  const color = new THREE.Color()
  const positionAttribute = geometry.getAttribute('position')
  for (let i = 0; i < positionAttribute.count; i += 3) {
    color.set(Math.random() * 0xffffff)
    // define the same color for each vertex of a triangle
    colors.push(color.r, color.g, color.b)
    colors.push(color.r, color.g, color.b)
    colors.push(color.r, color.g, color.b)
  }

  // define the new attribute
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

  const material = new THREE.MeshBasicMaterial({
    // color: 0x00ff00,
    vertexColors: true,
    wireframe: false,
  })
  const cube = new THREE.Mesh(geometry, material)

  cube.position.x = x * width
  cube.position.y = y * width
  cube.position.z = 0
  return cube
}

export default Cube
