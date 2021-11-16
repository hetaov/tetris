import * as THREE from 'three'
import '@/styles/index.scss'
import TrackballControls from 'three-trackballcontrols'
import createAll from './render'

function GridScence() {
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
  gridHelper.position.y = -1.2
  scene.add(gridHelper)

  const geometry = new THREE.PlaneGeometry(100, 100, 1, 1)

  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  })
  const plane = new THREE.Mesh(geometry, material)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -1.2

  scene.add(plane)

  camera.position.set(0, 2, 2)

  const ambientLight = new THREE.AmbientLight(0x555555)
  scene.add(ambientLight)

  const spotLight = new THREE.SpotLight(0x000000, 1.2, 150, Math.PI / 4, 0, 2)
  spotLight.position.set(-40, 30, 30)
  spotLight.castShadow = true
  scene.add(spotLight)

  let gridsGroup = null

  controls.update()

  // update grids data
  function freshCubes(grids) {
    if (gridsGroup) {
      gridsGroup.remove()
      scene.remove(gridsGroup)
    }
    // console.log(grids, ' all grids ... ')
    gridsGroup = createAll(grids)
    if (gridsGroup) {
      scene.add(gridsGroup)
    }
  }

  function redraw() {
    controls.update()
    renderer.render(scene, camera)
  }

  function addLine(sides) {
    const path = new THREE.Path()
    path.moveTo(-1 - 1 / sides, -1 + 1 / sides)
    path.lineTo(-1 - 1 / sides, 1 + 1 / sides)
    path.lineTo(1 - 1 / sides, 1 + 1 / sides)
    path.lineTo(1 - 1 / sides, -1 + 1 / sides)
    path.lineTo(-1 - 1 / sides, -1 + 1 / sides)

    const points = path.getPoints()

    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x1890ff })

    const line = new THREE.Line(lineGeometry, lineMaterial)

    scene.add(line)
  }

  return {
    freshCubes,
    redraw,
    addLine,
  }
}

export default new GridScence()
