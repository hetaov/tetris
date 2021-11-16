const blocks = [
  [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0],
    [1, 1, 1, 0],
    [1, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
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

function CubeGroup(index) {
  this.index = index || Math.floor(Math.random() * blocks.length)
  this.block = clone(blocks[this.index])
}

CubeGroup.prototype.getBlock = function getBlock() {
  return this.block
}

CubeGroup.prototype.rotate = function rotate() {
  const result = []
  const blockData = this.block

  for (let i = 0; i < 4; i += 1) {
    result[i] = blockData.map((row) => row[i]).reverse()
  }
  this.block = result
}

export default CubeGroup
