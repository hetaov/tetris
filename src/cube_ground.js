import cubeTemplate from './cube_template'
import {
  emptyGrid,
  isInRange,
  mergeGrids,
  rotateBlock,
  clearFull,
  // addEmptyRows,
} from './utils/grids'
import GridsWithBlock from './utils/gridsWithBlock'

class CubeGrid {
  constructor(SIDES) {
    this.SIDES = SIDES || 16
    this.score = 0
    this.gridsWithBlock = GridsWithBlock(this.SIDES)
    this.backgroundGrids = emptyGrid(this.SIDES)
    this.focusCross = [this.SIDES / 2, -2]
    this.currentGroup = cubeTemplate.getBlock()
    this.PAUSE = false
  }

  isOver() {
    return this.backgroundGrids[0].some((item) => item)
  }

  getGridByFocus(focus) {
    const block = this.currentGroup
    return this.gridsWithBlock.getGridByBlock(block, focus)
  }

  getActiveGrid() {
    return this.getGridByFocus(this.focusCross)
  }

  getVisibleGrid() {
    const result = []
    const currentGrids = this.getActiveGrid()
    for (let i = 0; i < this.SIDES; i += 1) {
      const empty = new Array(this.SIDES)
      empty.fill(0)
      result[i] = empty
      for (let j = 0; j < this.SIDES; j += 1) {
        if (this.backgroundGrids[i][j] || currentGrids[i][j]) {
          result[i][j] = 1
        }
      }
    }
    return result
  }

  canMoveLeft() {
    const { currentGroup: block, focusCross } = this
    if (this.gridsWithBlock.isAlreadyLeftSide(block, focusCross)) {
      return false
    }
    const leftBlockedIndex = this.gridsWithBlock.getLeftBlockedIndexInGround(
      block,
      focusCross
    )
    // 只要有一个为1就不能往左移
    return leftBlockedIndex.every(
      (item) =>
        !isInRange(item, this.SIDES) || !this.backgroundGrids[item[0]][item[1]]
    )
  }

  canMoveRight() {
    const { currentGroup: block, focusCross } = this
    if (this.gridsWithBlock.isAlreadyRightSide(block, focusCross)) {
      return false
    }
    const rightBlockedIndex = this.gridsWithBlock.getRightBlockedIndexInGround(
      block,
      focusCross
    )
    // 只要有一个为1就不能往右移
    return rightBlockedIndex.every(
      (item) =>
        !isInRange(item, this.SIDES) || !this.backgroundGrids[item[0]][item[1]]
    )
  }

  canFall() {
    const { currentGroup: block, focusCross } = this
    if (this.gridsWithBlock.isAlreadyBottomSide(block, focusCross)) {
      return false
    }
    const bottomBlockedIndex =
      this.gridsWithBlock.getBottomBlockedIndexInGround(block, focusCross)
    return bottomBlockedIndex.every(
      (item) =>
        !isInRange(item, this.SIDES) || !this.backgroundGrids[item[0]][item[1]]
    )
  }

  canRotate() {
    const blocked = this.gridsWithBlock.getRotateBlockedIndex(
      this.currentGroup,
      this.focusCross
    )
    return !blocked.some((item) => {
      try {
        // TODO 处理为负数的情况[-1, 7]
        return this.backgroundGrids[item[0]][item[1]]
      } catch (error) {
        console.log(error, item, this.backgroundGrids, ' in can rotate ')
        return false
      }
    })
  }

  settled() {
    mergeGrids(this.backgroundGrids, this.getActiveGrid())
    const rows = clearFull(this.backgroundGrids)
    // if (rows > 0) {
    //   addEmptyRows(this.backgroundGrids, rows, this.SIDES)
    // }
    this.score += rows.length * 10
    this.focusCross = [this.SIDES / 2, -2]
    this.currentGroup = cubeTemplate.getBlock()
  }

  rotate() {
    this.currentGroup = rotateBlock(this.currentGroup)
  }

  move(direction) {
    switch (direction) {
      case 'LEFT':
        if (this.canMoveLeft()) {
          this.focusCross[0] -= 1
        }
        break
      case 'RIGHT':
        if (this.canMoveRight()) {
          this.focusCross[0] += 1
        }
        break
      case 'DOWN':
        if (this.canFall()) {
          this.focusCross[1] += 1
        } else {
          // 不能落下时merge and 重新生成随机的block
          this.settled()
        }
        break
      case 'ROTATE':
        if (this.canRotate()) {
          // TODO
          this.rotate()
        }
        break
      default:
        console.log(' nothing ')
        break
    }
  }
}

export default new CubeGrid()
