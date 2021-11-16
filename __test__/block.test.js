import { rotateBlock } from '../src/utils/grids';

function isEqual(A, B) {
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

test('test rotate L', () => {
  const block = [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ];  

  const should = [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ];

  const result = rotateBlock(block);
  expect(isEqual(result, should)).toBe(true)
})

test('test rotate I', () => {
  const block = [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ];  

  const should = [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const result = rotateBlock(block);
  expect(isEqual(result, should)).toBe(true)
})

test('test rotate E', () => {
  const block = [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ];  

  const should = [
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0],
  ];

  const result = rotateBlock(block);
  expect(isEqual(result, should)).toBe(true)
})

