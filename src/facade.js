import _ from 'lodash'
import gridScence from './grid_scence'
import cubeGround from './cube_ground'

function Facade() {
  let PAUSE = false
  const SIDES = 16
  cubeGround.SIDES = SIDES
  const SPEED = 1000

  let GAMEOVER = false
  let throttled = null

  gridScence.addLine(SIDES)

  const play = () => {
    if (GAMEOVER || cubeGround.isOver()) {
      return
    }
    if (!PAUSE) {
      cubeGround.move('DOWN')
      gridScence.freshCubes(cubeGround.getVisibleGrid())
      document.getElementById('info').innerHTML = cubeGround.score
    }
    throttled = _.debounce(play, SPEED)
    throttled()
  }

  function start() {
    play()
  }
  function pause() {
    PAUSE = !PAUSE
  }
  function over() {
    GAMEOVER = true
    throttled.cancel()
  }

  document.addEventListener('keydown', (e) => {
    console.log(e.key, ' key down key')
    switch (e.key) {
      case 'ArrowLeft':
        cubeGround.move('LEFT')
        break
      case 'ArrowRight':
        cubeGround.move('RIGHT')
        break
      case ' ':
        pause()
        break
      case '0':
        // rotate()
        cubeGround.move('ROTATE')
        break
      case 'q':
        over()
        break
      default:
        gridScence.redraw()
        break
    }
  })

  return {
    start,
    pause,
    over,
  }
}

export default new Facade()
