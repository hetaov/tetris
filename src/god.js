import CubeGroup from './cube_group'

const SIDES = 16

function emptyGrid(sides) {
  const result = []
  for (let i = 0; i < sides; i += 1) {
    result[i] = []
    for (let j = 0; j < sides; j += 1) {
      result[i][j] = 0
    }
  }
  return result
}
function god() {
  let GAMEOVER = false
  const backgroundGrids = emptyGrid(SIDES)
  // const backgroundGrids = [
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  // ]
  let reRender = null
  let scores = 0

  let currentGroup = null

  let PAUSE = false
  // grid和block的交叉点
  const focusCross = [SIDES / 2, -2]

  const isOver = () => backgroundGrids[0].some((item) => item)

  const getGridByFocus = (focus) => {
    // const currentGrids = [
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // ]
    const currentGrids = emptyGrid(SIDES)
    // const block = blocks[index]
    const block = currentGroup.getBlock()
    for (let row = 0; row < 4; row += 1) {
      for (let column = 0; column < 4; column += 1) {
        const x = focus[1] + 1 - row
        const y = focus[0] + 1 - column
        // console.log(x, y, row, column)
        if (x >= 0 && x < SIDES && y >= 0 && y < SIDES) {
          currentGrids[x][y] = block[row][column]
        }
      }
    }
    return currentGrids
  }

  // 获取现有block左、右、上、下的邻格
  // 首先判断是否到左、右和下的边界
  // 如果没有到边界，生成一个向左或右，或下的矩阵 用这个矩阵和现有的矩阵对应，只要
  const getNextLeft = () => getGridByFocus([focusCross[0] - 1, focusCross[1]])
  const getNextRight = () => getGridByFocus([focusCross[0] + 1, focusCross[1]])
  const getNextBottom = () => getGridByFocus([focusCross[0], focusCross[1] + 1])

  const getValidGrid = () => getGridByFocus(focusCross)

  // 是否能下落
  const canFall = () => {
    // TODO 检查边界
    const currentGrids = getValidGrid()
    // console.log(currentGrids, ' can fall current grid .... ', focusCross)
    const isBound = currentGrids[11].some((v) => v)
    if (isBound) {
      return false
    }

    const nextGrids = getNextBottom()
    for (let i = 0; i < backgroundGrids.length; i += 1) {
      for (let j = 0; j < backgroundGrids[i].length; j += 1) {
        if (nextGrids[i][j] && backgroundGrids[i][j]) {
          return false
        }
      }
    }
    return true
  }

  const canMoveLeft = () => {
    const currentGrids = getValidGrid()
    const isBound = currentGrids.map((row) => row[0]).some((v) => v)
    if (isBound) {
      return false
    }
    const nextGrids = getNextLeft()
    for (let i = 0; i < backgroundGrids.length; i += 1) {
      for (let j = 0; j < backgroundGrids.length; j += 1) {
        if (nextGrids[i][j] && backgroundGrids[i][j]) {
          return false
        }
      }
    }
    return true
  }

  const canMoveRight = () => {
    const currentGrids = getValidGrid()
    const isBound = currentGrids.map((row) => row[11]).some((v) => v)
    if (isBound) {
      return false
    }
    const nextGrids = getNextRight()
    for (let i = 0; i < backgroundGrids.length; i += 1) {
      for (let j = 0; j < backgroundGrids.length; j += 1) {
        if (nextGrids[i][j] && backgroundGrids[i][j]) {
          return false
        }
      }
    }
    return true
  }

  const nextRound = () => {
    focusCross[0] = SIDES / 2
    focusCross[1] = -2
    // generateIndex()
    currentGroup = new CubeGroup()
  }

  const clearFull = () => {
    for (let i = 0; i < backgroundGrids.length; i += 1) {
      const isFull = backgroundGrids[i].every((item) => item)
      if (isFull) {
        backgroundGrids.splice(i, 1)
        const empty = new Array(SIDES)
        empty.fill(0)
        backgroundGrids.unshift(empty)
        scores += 10
      }
    }
  }

  const settle = () => {
    const currentGrids = getValidGrid()
    for (let i = 0; i < currentGrids.length; i += 1) {
      for (let j = 0; j < currentGrids[i].length; j += 1) {
        if (currentGrids[i][j]) {
          backgroundGrids[i][j] = currentGrids[i][j]
        }
      }
    }
  }

  const fall = () => {
    if (PAUSE) {
      return
    }
    if (canFall()) {
      focusCross[1] += 1
    } else {
      if (isOver()) {
        GAMEOVER = true
        return
      }
      settle()
      clearFull()
      nextRound()
    }
  }

  const moveLeft = () => {
    if (!PAUSE && canMoveLeft()) {
      focusCross[0] -= 1
    }
  }

  const moveRight = () => {
    if (!PAUSE && canMoveRight()) {
      focusCross[0] += 1
    }
  }

  const pause = () => {
    PAUSE = !PAUSE
  }

  const restart = () => {
    PAUSE = false
  }

  const getAllGrids = () => {
    const result = []
    const currentGrids = getValidGrid()
    for (let i = 0; i < SIDES; i += 1) {
      const empty = new Array(SIDES)
      empty.fill(0)
      result[i] = empty
      for (let j = 0; j < SIDES; j += 1) {
        if (backgroundGrids[i][j] || currentGrids[i][j]) {
          result[i][j] = 1
        }
      }
    }
    return result
  }

  const play = () => {
    if (GAMEOVER) {
      return
    }
    if (!PAUSE) {
      if (reRender) {
        reRender()
      }
      fall()
    }
    setTimeout(play, 5000)
  }

  const start = () => {
    // generateIndex()
    currentGroup = new CubeGroup()
    // fall()
    play()
  }

  const setRerenderCallback = (callback) => {
    reRender = callback
  }

  const rotateGrop = () => {
    currentGroup.rotate()
    if (reRender) {
      reRender()
    }
  }

  const getScores = () => scores

  return {
    setRerenderCallback,
    fall,
    getValidGrid,
    moveLeft,
    moveRight,
    settle,
    pause,
    restart,
    canMoveLeft,
    canMoveRight,
    nextRound,
    clearFull,
    getAllGrids,
    start,
    rotateGrop,
    getScores,
  }
}

export default god
