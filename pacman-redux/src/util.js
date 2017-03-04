const Util = {};

Util.add = (a, b) => [a[0] + b[0], a[1] + b[1]];
Util.divide = (a, b) => [a[0] / b, a[1] / b];
Util.round = (v) => [Math.round(v[0]), Math.round(v[1])];
Util.multiply = (a,b) => [a[0] * b[0], a[1] * b[1]];
Util.equals = (a,b) => a[0] === b[0] && a[1] === b[1];
Util.foc = (val, sign) => sign > 0 ? Math.floor(val) : Math.ceil(val); // floor or ceil
Util.focVec = (vec, sign) => [Util.foc(vec[0], sign[0]), Util.foc(vec[1], sign[1])];
Util.mapHit = (map, pos) => map[pos[1]][pos[0]] !== 1 && map[pos[1]][pos[0]] !== 3 && map[pos[1]][pos[0]] !== 4;
Util.ghostHit = (map, pos) => map[pos[1]][pos[0]] !== 1 && map[pos[1]][pos[0]] !== 2 && map[pos[1]][pos[0]] !== 3 && map[pos[1]][pos[0]] !== 4;
Util.snap = (val, cond) => cond ? val : Math.round(val);
Util.snapVec = (val, cond) => [Util.snap(val[0], cond[0]), Util.snap(val[1], cond[1])];
Util.divisible = (vec, base) => vec[0] % base === 0 && vec[1] % base === 0;
Util.cloneMapAndSetCell = (map, pos, val) => {
  return map.map((row, rowIdx) => {
    return row.map((cell, cellIdx) => {
      return Util.equals(pos, [cellIdx, rowIdx]) ? val : cell;
    });
  });
};
Util.allDirs = [[1,0],[0,1],[-1,0],[0,-1]];
Util.keyVec = {
  '37': [-1,0],
  '38': [0,-1],
  '39': [1, 0],
  '40': [0, 1],
};

export default Util;