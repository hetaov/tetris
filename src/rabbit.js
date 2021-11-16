import gridScence from './grid_scence'
import facade from './facade'

function init() {
  facade.start()
  function render() {
    gridScence.redraw()
    // trackballControls.update(clock.getDelta())
    requestAnimationFrame(render)
  }
  render()
}

init()
