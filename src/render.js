import * as THREE from 'three'
import BufferGemometryUtils from './utils/BufferGemometryUtils'

const createAll = (blocks) => {
  const width = 2 / blocks.length
  const cubeMaterial = new THREE.MeshNormalMaterial({
    castShadow: true,
    wireframe: false,
    color: '#a855f7',
    side: THREE.DoubleSide,
  })
  const matrix = new THREE.Matrix4()
  const gemetries = []
  for (let i = 0; i < blocks.length; i += 1) {
    for (let j = 0; j < blocks[i].length; j += 1) {
      if (blocks[i][j]) {
        const position = new THREE.Vector3()
        const scale = new THREE.Vector3()
        const quaternion = new THREE.Quaternion()
        const cubeGeometry = new THREE.BoxGeometry(width, width, width)

        // eslint-disable-next-line
        scale.x = scale.y = scale.z = 1
        position.x = j * width - 1
        position.y = 1 - i * width
        position.z = 0

        matrix.compose(position, quaternion, scale)
        cubeGeometry.applyMatrix4(matrix)
        gemetries.push(cubeGeometry)
      }
    }
  }

  if (gemetries.length) {
    return new THREE.Mesh(
      BufferGemometryUtils.mergeBufferGeometries(gemetries),
      cubeMaterial
    )
  }
  return null
}

export default createAll
