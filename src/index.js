// Test import of a JavaScript module
// import { example } from '@/js/example'
import * as THREE from 'three'
// Test import of an asset
// import webpackLogo from '@/images/webpack-logo.svg'

// Test import of styles
import '@/styles/index.scss'
import TrackballControls from 'three-trackballcontrols'
// import Cube from './Cube'
// import Blocks from './blocks'
import god from './god'
import createAll from './render'

// Assumes there is a `camera` and `renderer` initialized.

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
  // const size = 20
  // const divisions = 20

  const axes = new THREE.AxesHelper(20)
  scene.add(axes)
  const gridHelper = new THREE.GridHelper(20, 20)
  gridHelper.position.y = -1.2
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
  plane.position.y = -1.2
  // plane.position.set(-0.8, 0, 0)
  scene.add(plane)
  // const blocks = Blocks()
  // scene.add(blocks)

  // for (let i = 0; i < 6; i += 1) {
  //   const cube = Cube(i, 1)
  //   scene.add(cube)
  // }

  camera.position.set(0, 2, 2)

  const ambientLight = new THREE.AmbientLight(0x555555)
  scene.add(ambientLight)

  const spotLight = new THREE.SpotLight(0x000000, 1.2, 150, Math.PI / 4, 0, 2)
  // spotLight.shadow.mapSize.height = 1024
  // spotLight.shadow.mapSize.width = 1024
  spotLight.position.set(-40, 30, 30)
  spotLight.castShadow = true
  scene.add(spotLight)

  controls.update()
  // const trackballControls = initTrackballControls(camera, renderer)
  // const clock = new THREE.Clock()

  let last = null
  const my = god()
  my.start()
  my.setRerenderCallback(() => {
    if (last) {
      last.remove()
      scene.remove(last)
    }
    console.log(my.getAllGrids(), ' all grids ... ')
    last = createAll(my.getAllGrids())
    if (last) {
      scene.add(last)
    }
    document.getElementById('info').innerHTML = my.getScores()
  })
  // for (let i = 0; i < 12; i += 1) {
  //   my.fall()
  // }
  // console.log(my.getAllGrids(), ' all grids ')

  document.addEventListener('keydown', (e) => {
    console.log(e.key, ' key down key')
    switch (e.key) {
    case 'ArrowLeft':
      my.moveLeft()
      break
    case 'ArrowRight':
      my.moveRight()
      break
    case ' ':
      my.pause()
      break
    case '0':
      my.rotateGrop()
      break
    default:
      break
    }
  })

  function render() {
    // trackballControls.update(clock.getDelta())
    controls.update()
    requestAnimationFrame(render)
    renderer.render(scene, camera)
  }
  render()
}

init()
