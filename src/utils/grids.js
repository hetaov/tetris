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

function rotateBlock(block) {
  const result = []
  const blockSides = block.length
  // const center = Math.floor(blockSides / 2)
  for (let i = 0; i < blockSides; i += 1) {
    result[i] = block.map((row) => row[i]).reverse()
  }
  return result
}
// merge block 和background grids
function mergeGrids(A, B) {
  if (A.length !== B.length) {
    throw new Error(' the length of A and B is not equal')
  }
  for (let i = 0; i < B.length; i += 1) {
    for (let j = 0; j < B[i].length; j += 1) {
      if (B[i][j]) {
        // eslint-disable-next-line
        A[i][j] = B[i][j]
      }
    }
  }
}

// 如果哪一行is full, 删掉此行, 返回行数
function clearFull(A) {
  const result = []
  for (let i = 0; i < A.length; i += 1) {
    const isFull = A[i].every((item) => item)
    if (isFull) {
      A.splice(i, 1)
      const empty = new Array(SIDES)
      empty.fill(0)
      A.unshift(empty)
      result.push(i)
    }
  }
  return result
}

function addEmptyRows(A, rows, sides) {
  for (let i = 0; i < rows; i += 1) {
    const row = new Array(sides)
    row.fill(0)
    A.unshift(row)
  }
}

function isInRange(index, sides) {
  return index.every((cor) => cor >= 0 && cor < sides)
}

export {
  emptyGrid,
  getGridByBlock,
  SIDES,
  mergeGrids,
  clearFull,
  rotateBlock,
  isInRange,
  addEmptyRows,
}
