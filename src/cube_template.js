const blocks = [
  [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
  [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0],
  ],
  [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [1, 0, 0],
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
]

function clone(block) {
  const result = []
  for (let i = 0; i < block.length; i += 1) {
    result[i] = []
    for (let j = 0; j < block[i].length; j += 1) {
      result[i][j] = block[i][j]
    }
  }
  return result
}

function getBlock(index) {
  if (index !== undefined && index >= 0 && index < blocks.length) {
    return clone(blocks[index])
  }
  if ((index !== undefined && index < 0) || index > blocks.length - 1) {
    throw new Error(' no index')
  }
  return clone(blocks[Math.floor(Math.random() * blocks.length)])
}
export default {
  getBlock,
}
