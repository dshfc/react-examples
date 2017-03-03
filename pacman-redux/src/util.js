const Util = {};

Util.add = (a, b) => [a[0] + b[0], a[1] + b[1]];
Util.divide = (a, b) => [a[0] / b, a[1] / b];
Util.round = (v) => [Math.round(v[0]), Math.round(v[1])];
Util.multiply = (a,b) => [a[0] * b[0], a[1] * b[1]];
Util.equals = (a,b) => a[0] === b[0] && a[1] === b[1];

export default Util;