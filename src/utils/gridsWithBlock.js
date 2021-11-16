import { emptyGrid } from './grids'

/* eslint no-extend-native: ["error", { "exceptions": ["Array"] }] */
Array.prototype.cycleSlice = function circleSlice(start, end) {
  if (start >= this.length) {
    return this.slice(0, end - start)
  }
  if (end <= this.length) {
    return this.slice(start, end)
  }

  return this.slice(start, this.length).concat(this.slice(0, end - this.length))
}

function GridsWithBlock(sides) {
  const SIDES = sides || 16

  function getGridByBlock(block, focus) {
    const currentGrids = emptyGrid(SIDES)
    const blockSides = block.length
    for (let row = 0; row < blockSides; row += 1) {
      const offsetX = focus[1] - Math.floor(blockSides / 2)
      for (let column = 0; column < blockSides; column += 1) {
        const x = offsetX + row
        const offsetY = focus[0] - Math.floor(blockSides / 2)
        const y = offsetY + column
        if (x >= 0 && x < SIDES && y >= 0 && y < SIDES) {
          currentGrids[x][y] = block[row][column]
        }
      }
    }
    return currentGrids
  }

  function gridInGroundIndex(block, focus, index) {
    const blockSides = block.length
    const offsetX = focus[1] - Math.floor(blockSides / 2)
    const offsetY = focus[0] - Math.floor(blockSides / 2)
    const x = offsetX + index[0]
    const y = offsetY + index[1]
    return [x, y]
  }

  function getBlockedIndex(block, circle, circleSides) {
    const result = []
    for (let i = 0; i < circle.length; i += 1) {
      if (i === circle.length - 1) {
        if (
          block[circle[i][0]][circle[i][1]] === 1 &&
          block[circle[0][0]][circle[0][1]] === 0
        ) {
          result.push(circle.cycleSlice(i + 1, i + circleSides))
        }
        // eslint-disable-next-line
        continue
      }
      if (
        block[circle[i][0]][circle[i][1]] === 1 &&
        block[circle[i + 1][0]][circle[i + 1][1]] === 0
      ) {
        result.push(circle.cycleSlice(i + 1, i + circleSides))
      }
    }
    return result.flat()
  }

  // index
  function getRoundIndex(block) {
    const blockSides = block.length
    const result = []
    for (let i = 0; i < Math.floor(blockSides / 2); i += 1) {
      const top = block[i].map((_, j) => [i, j]).slice(i, blockSides - i)
      const right = block
        .map((_, iOfRow) => [iOfRow, blockSides - i - 1])
        .slice(i, blockSides - i)
      const bottom = block[blockSides - 1 - i]
        .map((_, iOfColumn) => [blockSides - i - 1, iOfColumn])
        .slice(i, blockSides - i)
        .reverse()
      const left = block
        .map((_, iOfRow) => [iOfRow, i])
        .slice(i, blockSides - i)
        .reverse()
      const circle = []
      circle.push(top.slice(0, top.length - 1))
      circle.push(right.slice(0, right.length - 1))
      circle.push(bottom.slice(0, bottom.length - 1))
      circle.push(left.slice(0, left.length - 1))

      result.push(getBlockedIndex(block, circle.flat(), blockSides - i * 2))
    }

    return result.flat()
  }

  // value
  function getCircleIndex(block) {
    const blockSides = block.length
    const result = []
    for (let i = 0; i < Math.floor(blockSides / 2); i += 1) {
      const top = block[i].slice(i, blockSides - i)
      const right = block
        .map((row) => row[blockSides - i - 1])
        .slice(i, blockSides - i)
      const bottom = block[blockSides - 1 - i]
        .map((c) => c)
        .slice(i, blockSides - i)
        .reverse()
      const left = block
        .map((row) => row[i])
        .slice(i, blockSides - i)
        .reverse()
      const circle = []
      circle.push(top.slice(0, top.length - 1))
      circle.push(right.slice(0, right.length - 1))
      circle.push(bottom.slice(0, bottom.length - 1))
      circle.push(left.slice(0, left.length - 1))

      result.push(circle.flat())
    }
    return result.flat()
  }

  // function getRotatedIndex() {}
  // 在ground中blocked index
  function getRotateBlockedIndex(block, focus) {
    const blockedIndex = getRoundIndex(block)
    // focus 为负的情况
    return blockedIndex.map((blocked) =>
      gridInGroundIndex(block, focus, blocked)
    )
  }

  function getLeftIndex(block) {
    return block.flatMap((row, rowIndex) =>
      row.indexOf(1) === -1 ? [] : [[rowIndex, row.indexOf(1)]]
    )
  }

  function getRightIndex(block) {
    return block.flatMap((row, rowIndex) =>
      row.lastIndexOf(1) === -1 ? [] : [[rowIndex, row.lastIndexOf(1)]]
    )
  }

  function getBottomIndex(block) {
    const result = []
    for (let i = 0; i <= block.length; i += 1) {
      const column = block.map((row) => row[i])
      const index = column.lastIndexOf(1)
      if (index > -1) {
        result.push([index, i])
      }
    }
    return result
  }

  function getLeftBlockedIndex(leftIndex) {
    return leftIndex.map((index) => [index[0], index[1] - 1])
  }
  function getRightBlockedIndex(rightIndex) {
    return rightIndex.map((index) => [index[0], index[1] + 1])
  }
  function getBottomBlockedIndex(bottomIndex) {
    return bottomIndex.map((index) => [index[0] + 1, index[1]])
  }

  function isAlreadyLeftSide(block, focus) {
    const leftIndex = getLeftIndex(block)
    if (
      leftIndex.some((index) => gridInGroundIndex(block, focus, index)[1] === 0)
    ) {
      return true
    }
    return false
  }

  function isAlreadyRightSide(block, focus) {
    const rightIndex = getRightIndex(block)
    if (
      rightIndex.some(
        (index) => gridInGroundIndex(block, focus, index)[1] >= sides - 1
      )
    ) {
      return true
    }
    return false
  }

  function isAlreadyBottomSide(block, focus) {
    const bottomIndex = getBottomIndex(block)
    if (
      bottomIndex.some(
        (index) => gridInGroundIndex(block, focus, index)[0] >= sides - 1
      )
    ) {
      return true
    }
    return false
  }

  function getLeftBlockedIndexInGround(block, focus) {
    const leftIndex = getLeftIndex(block)
    // const blockedIndex = getLeftBlockedIndex(leftIndex)
    // if (blockedIndex.some(item => item[1] < 0)) {
    //   throw new Error('已经超出边界')
    // }
    // console.log(blockedIndex, ' blocked index of block', blockedIndex.map(index => gridInGroundIndex(block, focus, index)))
    return leftIndex
      .map((blocked) => gridInGroundIndex(block, focus, blocked))
      .map((item) => [item[0], item[1] - 1])
  }

  function getRightBlockedIndexInGround(block, focus) {
    const rightIndex = getRightIndex(block)
    // const blockedIndex = getRightBlockedIndex(rightIndex)
    // if (blockedIndex.some(item => item[1] >= block.length)) {
    //   throw new Error('已经超出边界')
    // }
    return rightIndex
      .map((blocked) => gridInGroundIndex(block, focus, blocked))
      .map((item) => [item[0], item[1] + 1])
  }

  function getBottomBlockedIndexInGround(block, focus) {
    const bottomIndex = getBottomIndex(block)
    return bottomIndex
      .map((blocked) => gridInGroundIndex(block, focus, blocked))
      .map((item) => [item[0] + 1, item[1]])
  }

  // function canMoveLeft(block, focus) {
  //   if (focus[0] === 0) {
  //     return false
  //   }
  //   const leftIndex = getLeftIndex(block)
  //   if (leftIndex.some(index => gridInGroundIndex(index)[0] === 0)) {
  //     return false
  //   }
  //   const blockedIndex = getLeftBlockedIndex(leftIndex)
  //   return blockedIndex.map(blocked => gridInGroundIndex(block, focus, [blocked[0] - 1, blocked[1]]))
  // }

  return {
    getGridByBlock,
    getCircleIndex,
    gridInGroundIndex,
    getBlockedIndex,
    getRoundIndex,
    getLeftIndex,
    getRotateBlockedIndex,
    getLeftBlockedIndex,
    getRightBlockedIndex,
    getBottomIndex,
    getBottomBlockedIndex,
    getRightIndex,
    // canMoveLeft,

    isAlreadyLeftSide,
    isAlreadyRightSide,
    isAlreadyBottomSide,

    getLeftBlockedIndexInGround,
    getRightBlockedIndexInGround,
    getBottomBlockedIndexInGround,
  }
}

export default GridsWithBlock
