import GridsWithBlock from '../src/utils/gridsWithBlock'

const gridsWithBlock = GridsWithBlock(16)

function isEqual(A, B) {
  if (A.length !== B.length) {
    return false
  }
  for (let i = 0; i < A.length; i += 1) {
    if (A[i] !== B[i]) {
      return false
    }
  }
  return true
}

function isEqualOf2D(A, B) {
  if (A.length !== B.length) {
    return false
  }
  for (let i = 0; i < A.length; i += 1) {
    for (let j = 0; j < A[i].length; j += 1) {
      if (A[i][j] !== B[i][j]) {
        return false
      }
    }
  }
  return true
}

test('rotate is ok', () => {
  const block = [
    [0, 1, 1, 0, 1],
    [0, 1, 0, 1, 0],
    [1, 1, 1, 1, 0],
    [0, 1, 0, 1, 1],
    [0, 1, 0, 1, 1],
  ];
  const flated = gridsWithBlock.getCircleIndex(block)
  const should = [0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0,
     1, 0, 1, 1, 1, 0, 1, 1];
  expect(flated.length === 24).toBe(true)
  expect(isEqual(flated, should)).toBe(true)
})

test('test flated 4', () => {
  const block = [
    [0, 1, 1, 0],
    [0, 1, 0, 1],
    [1, 1, 1, 1],
    [0, 1, 0, 1],
  ];

  const flated = gridsWithBlock.getCircleIndex(block)
  const should = [0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0,
  1, 0, 1, 1]

  expect(isEqual(flated, should)).toBe(true)
})

test('test flated 3', () => {
  const block = [
    [0, 1, 1],
    [0, 1, 0],
    [1, 1, 1],
  ];

  const flated = gridsWithBlock.getCircleIndex(block)
  const should = [0, 1, 1, 0, 1, 1, 1, 0]

  expect(isEqual(flated, should)).toBe(true)
})

test('test flated 2', () => {
  const block = [
    [0, 1],
    [0, 1],
  ];

  const flated = gridsWithBlock.getCircleIndex(block)
  const should = [0, 1, 1, 0]

  expect(isEqual(flated, should)).toBe(true)
})

test(' test grid index in background 16', () => {
  const block = [
    [0, 1, 1],
    [0, 1, 0],
    [1, 1, 1],
  ];
  const focus = [8, 2] // 横坐标偏移:8， 纵坐标偏移:2
  const index1 = gridsWithBlock.gridInGroundIndex(block, focus, [0, 0])
  expect(isEqual(index1, [1, 7])).toBe(true)
  const index2 = gridsWithBlock.gridInGroundIndex(block, focus, [0, 1])
  expect(isEqual(index2, [1, 8])).toBe(true)
  const index3 = gridsWithBlock.gridInGroundIndex(block, [8, 1], [0, 1])
  expect(isEqual(index3, [0, 8])).toBe(true)
})


test(' test grid index in background 8', () => {
  const gridsWithBlock = GridsWithBlock(8)
  // const example = [
  //   [0, 0, 0, 0, 0, 0, 0, 0]
  //   [0, 0, 0, 0, 0, 0, 0, 0]
  //   [0, 0, 0, 0, 0, 0, 0, 0]
  //   [0, 0, 0, 0, 0, 0, 0, 0]
  //   [0, 0, 0, 0, 0, 0, 0, 0]
  //   [0, 0, 0, 0, 0, 0, 0, 0]
  //   [0, 0, 0, 0, 0, 0, 0, 0]
  //   [0, 0, 0, 0, 0, 0, 0, 0]
  // ]

  const block = [
    [0, 1, 1],
    [0, 1, 0],
    [1, 1, 1],
  ];
  const focus = [4, 2] // 横坐标偏移:8， 纵坐标偏移:2
  const index1 = gridsWithBlock.gridInGroundIndex(block, focus, [0, 0])
  expect(isEqual(index1, [1, 3])).toBe(true)
  const index2 = gridsWithBlock.gridInGroundIndex(block, focus, [0, 1])
  expect(isEqual(index2, [1, 4])).toBe(true)
  const index3 = gridsWithBlock.gridInGroundIndex(block, [4, 1], [0, 1])
  expect(isEqual(index3, [0, 4])).toBe(true)
})

test(' test grid index in background 9', () => {
  const gridsWithBlock = GridsWithBlock(9)
  // const example = [
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0]
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0]
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0]
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0]
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0]
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0]
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0]
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0]
  // ]

  const block = [
    [0, 1, 1],
    [0, 1, 0],
    [1, 1, 1],
  ];
  const focus = [4, 2] // 横坐标偏移:8， 纵坐标偏移:2
  const index1 = gridsWithBlock.gridInGroundIndex(block, focus, [0, 0])
  expect(isEqual(index1, [1, 3])).toBe(true)
  const index2 = gridsWithBlock.gridInGroundIndex(block, focus, [0, 1])
  expect(isEqual(index2, [1, 4])).toBe(true)
  const index3 = gridsWithBlock.gridInGroundIndex(block, [4, 1], [0, 1])
  expect(isEqual(index3, [0, 4])).toBe(true)
})

test(' get blocked index of circle 3 ', () => {
  const block = [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ]
  const circleOfIndex = [
    [0, 0], [0, 1], [0, 2],
    [1, 2], [2, 2], [2, 1],
    [2, 0], [1, 0],
  ]
  const circle = [0, 1, 0, 0, 0, 1, 1, 0, 0]
  //  [ [ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 1, 0 ] ] 
  const blockedIndex = gridsWithBlock.getBlockedIndex(block, circleOfIndex, 3)
})
test(' get blocked index of circle 4 ', () => {
  
  const block = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ]
  const circleOfIndex = [
    [0, 0], [0, 1], [0, 2],
    [0, 3], [1, 3], [2, 3],
    [3, 3], [3, 2], [3, 1],
    [3, 0], [2, 0], [1, 0]
  ]
  const circle = [0, 1, 0, 0, 0, 1, 1, 0, 0]
  //  [ [ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 1, 0 ] ] 
  const should = [[3, 3], [3, 2], [3, 1], [1, 0], [0, 0], [0, 1]]
  const blockedIndex = gridsWithBlock.getBlockedIndex(block, circleOfIndex, 4)
  const isEqual = should.every((item, index) => item.every((sItem, sIndex) => blockedIndex[index][sIndex] === sItem))
  expect(isEqual).toBe(true)
})

test('get blocked index of round', () => {
  const block = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ]
  // const printed =  [ [ 3, 3 ], [ 3, 2 ], [ 1, 0 ], [ 0, 0 ], [0, 1], [ 1, 1 ], [] ]
  const blockedIndex = gridsWithBlock.getRoundIndex(block)
  
  const should = [[3, 3], [3, 2], [3, 1], [1, 0], [0, 0], [0, 1], [1, 1]] 
  const isEqual = should.every((item, index) => item.every((sItem, sIndex) => blockedIndex[index][sIndex] === sItem))
  expect(isEqual).toBe(true)
})

test('get blocked index of round 3', () => {
  const block = [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ]
  // const printed =  [ [ 3, 3 ], [ 3, 2 ], [ 1, 0 ], [ 0, 0 ], [0, 1], [ 1, 1 ], [] ]
  const blockedIndex = gridsWithBlock.getRoundIndex(block)
  
  const should = [[0, 2], [1, 2], [2, 2], [2, 1], [0, 0], [0, 1]] 
  const isEqual = should.every((item, index) => item.every((sItem, sIndex) => blockedIndex[index][sIndex] === sItem))
  expect(isEqual).toBe(true)
})

test('get blocked index of round Z', () => {
  const block = [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ]
  // const printed =  [ [ 3, 3 ], [ 3, 2 ], [ 1, 0 ], [ 0, 0 ], [0, 1], [ 1, 1 ], [] ]
  const blockedIndex = gridsWithBlock.getRoundIndex(block)
  
  const should = [[1, 2], [2, 2], [0, 0], [0, 1]] 
  const isEqual = should.every((item, index) => item.every((sItem, sIndex) => blockedIndex[index][sIndex] === sItem))
  expect(isEqual).toBe(true)
})

test('get blocked index of round L', () => {
  const block = [
    [0, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ]
  // const printed =  [ [ 3, 3 ], [ 3, 2 ], [ 1, 0 ], [ 0, 0 ], [0, 1], [ 1, 1 ], [] ]
  const blockedIndex = gridsWithBlock.getRoundIndex(block)
  
  const should = [[1, 2], [2, 2], [2, 0], [1, 0]] 
  const isEqual = should.every((item, index) => item.every((sItem, sIndex) => blockedIndex[index][sIndex] === sItem))
  expect(isEqual).toBe(true)
})

test('get blocked index of round L in background', () => {
  const block = [
    [0, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ]
  const focus = [4, 2] 
  const gridsWithBlock = GridsWithBlock(9)
  // const example = [
  //   [0, 0, 0, 0, 0, 0, 0, 0]
  //   [0, 0, 0, 0, 0, 0, 0, 0]
  //   [0, 0, 0, 0, 0, 0, 0, 0]
  //   [0, 0, 0, 0, 0, 0, 0, 0]
  //   [0, 0, 0, 0, 0, 0, 0, 0]
  //   [0, 0, 0, 0, 0, 0, 0, 0]
  //   [0, 0, 0, 0, 0, 0, 0, 0]
  //   [0, 0, 0, 0, 0, 0, 0, 0]
  // ]
  const should = [[2, 5], [3, 5], [3, 3], [2, 3]]
  const blockedIndex = gridsWithBlock.getRotateBlockedIndex(block, focus)
  // console.log(blockedIndex, ' blocked index ----> ')
  const isEqual = should.every((item, index) => item.every((sItem, sIndex) => blockedIndex[index][sIndex] === sItem))
  expect(isEqual).toBe(true)
})

test('left index of block', () => {
  const gridsWithBlock = GridsWithBlock(9)
  const block = [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ]
  const result = gridsWithBlock.getLeftIndex(block)
  const should = [
    [0, 0],
    [1, 1],
    [2, 1]
  ]
  expect(isEqualOf2D(result, should)).toBe(true)
})
test('left index of block E', () => {
  const gridsWithBlock = GridsWithBlock(9)
  const block = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ]
  const result = gridsWithBlock.getLeftIndex(block)
  const should = [
    [1, 0],
    [2, 1],
  ]
  expect(isEqualOf2D(result, should)).toBe(true)
})

test('bottom index of block E', () => {
  const gridsWithBlock = GridsWithBlock(9)
  const block = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ]
  const result = gridsWithBlock.getBottomIndex(block)
  const should = [
    [1, 0],
    [2, 1],
    [1, 2]
  ]
  expect(isEqualOf2D(result, should)).toBe(true)

})

test('right index of block E', () => {
  const gridsWithBlock = GridsWithBlock(9)
  const block = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ]
  const result = gridsWithBlock.getRightIndex(block)
  const should = [
    [1, 2],
    [2, 1]
  ]
  expect(isEqualOf2D(result, should)).toBe(true)

})

test('bottom index of block I', () => {
  const gridsWithBlock = GridsWithBlock(9)
  const block = [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]
  const result = gridsWithBlock.getBottomIndex(block)
  const should = [
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3]
  ]
  expect(isEqualOf2D(result, should)).toBe(true)

})


test('bottom index of block rotated I', () => {
  const gridsWithBlock = GridsWithBlock(9)
  const block = [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ]
  const result = gridsWithBlock.getBottomIndex(block)
  const should = [
    [3, 1]
  ]
  expect(isEqualOf2D(result, should)).toBe(true)

})

test('is already left side', () => {
  const focus = [0, 2]
  const gridsWithBlock = GridsWithBlock(9)
  const block = [
    [0, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ]
  expect(gridsWithBlock.isAlreadyLeftSide(block, focus)).toBe(true)
  expect(gridsWithBlock.isAlreadyLeftSide(block, [1, 2])).toBe(false)
  const LBlock = [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ]
  expect(gridsWithBlock.isAlreadyLeftSide(LBlock, [1, 2])).toBe(true)
})

test('is already right side', () => {
  const focus = [8, 2]
  const gridsWithBlock = GridsWithBlock(9)
  const block = [
    [0, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ]
  expect(gridsWithBlock.isAlreadyRightSide(block, focus)).toBe(true)
  expect(gridsWithBlock.isAlreadyRightSide(block, [7, 2])).toBe(true)
  const LBlock = [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ]
  expect(gridsWithBlock.isAlreadyRightSide(LBlock, [7, 2])).toBe(false)
})

test('left blocked index', () => {
  // const focus = [8, 2]
  const gridsWithBlock = GridsWithBlock(12)

  // const block = [
  //   [0, 1, 1],
  //   [0, 1, 0],
  //   [0, 1, 0],
  // ]

  const leftIndex = [[0, 1], [1, 1], [2, 1]]

  const should = [[0, 0], [1, 0], [2, 0]]

  const result = gridsWithBlock.getLeftBlockedIndex(leftIndex)
  expect(isEqualOf2D(result, should)).toBe(true)
})

test('left blocked index in ground ', () => {

  const gridsWithBlock = GridsWithBlock(12)
  const block = [
    [0, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ]
  const focus = [2, 2]

  const result = gridsWithBlock.getLeftBlockedIndexInGround(block, focus)
  const should = [[1, 1], [2, 1], [3, 1]]
  expect(isEqualOf2D(result, should)).toBe(true)
})