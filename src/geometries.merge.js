/* eslint-disable */
import * as THREE from 'three'
import TrackballControls from 'three-trackballcontrols'
import BufferGemometryUtils from './utils/BufferGemometryUtils'

const randomizeMatrix = (function () {
  const position = new THREE.Vector3()
  const rotation = new THREE.Euler()
  const quaternion = new THREE.Quaternion()
  const scale = new THREE.Vector3()

  return function (matrix) {
    position.x = Math.random() * 40 - 20
    position.y = Math.random() * 40 - 20
    position.z = Math.random() * 40 - 20

    rotation.x = Math.random() * 2 * Math.PI
    rotation.y = Math.random() * 2 * Math.PI
    rotation.z = Math.random() * 2 * Math.PI

    quaternion.setFromEuler(rotation)

    scale.x = scale.y = scale.z = 1
    // scale.x = scale.y = scale.z = Math.random() * 1;

    matrix.compose(position, quaternion, scale)
  }
})()

function init() {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    10000
  )

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  const controls = new TrackballControls(camera, renderer.domElement)
  const axes = new THREE.AxesHelper(20)
  scene.add(axes)
  const gridHelper = new THREE.GridHelper(20, 20)
  gridHelper.position.y = -0.5
  scene.add(gridHelper)

  const geometry = new THREE.PlaneGeometry(100, 100, 1, 1)
  // geometry.rotateX(-Math.PI / 2)
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    // visible: false,
  })
  const plane = new THREE.Mesh(geometry, material)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -0.5
  scene.add(plane)

  const cubeMaterial = new THREE.MeshNormalMaterial({
    // vertexColors: true,
    castShadow: true,
    wireframe: false,
    color: '#a855f7',
    side: THREE.DoubleSide,
  })

  const width = 0.2

  const matrix = new THREE.Matrix4()

  const gemetries = []

  for (let i = 0; i < 10002; i += 1) {
    randomizeMatrix(matrix)
    const cubeGeometry = new THREE.BoxGeometry(width, width, width)
    console.log(cubeGeometry, ' cubeGeometry ---> ')
    // const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cubeGeometry.applyMatrix4(matrix)
    // cube.position.x = Math.random() * width - 1
    // cube.position.y = Math.random() * width
    // cube.position.z = 0
    gemetries.push(cubeGeometry)
  }

  scene.add(
    new THREE.Mesh(
      BufferGemometryUtils.mergeBufferGeometries(gemetries),
      cubeMaterial
    )
  )

  camera.position.set(0, 2, 2)

  controls.update()

  function render() {
    // trackballControls.update(clock.getDelta())
    controls.update()
    requestAnimationFrame(render)
    renderer.render(scene, camera)
  }
  render()
}

init()
