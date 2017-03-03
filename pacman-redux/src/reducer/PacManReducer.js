import Util from '../util';
import map from '../map';

export default (state, action) => {
  if(!state) {
    return {
      pacman: {
        pos: [13, 20],
        vel: [0,0]
      },
      map: map.map
    };
  }

  switch (action.type) {
    case 'TICK':

      const keyVec = {
        '37': [-1,0],
        '38': [0,-1],
        '39': [1, 0],
        '40': [0, 1],
      };
      const foc = (val, sign) => sign > 0 ? Math.floor(val) : Math.ceil(val); // floor or ceil
      const focVec = (vec, sign) => [foc(vec[0], sign[0]), foc(vec[1], sign[1])];
      const mapHit = (pos) => state.map[pos[1]][pos[0]] !== 1;
      const snap = (val, cond) => cond ? val : Math.round(val);
      const snapVec = (val, cond) => [snap(val[0], cond[0]), snap(val[1], cond[1])];

      const desiredVelocity = keyVec[action.key] || [0,0];
      const desiredPos = focVec(Util.add(state.pacman.pos, desiredVelocity), desiredVelocity);
      const newPos = mapHit(desiredPos)
        ? Util.round(state.pacman.pos)
        : Util.add(state.pacman.pos, Util.divide(desiredVelocity, 10));
      const newVel = mapHit(desiredPos)
        ? [0,0] : state.pacman.vel;
      const snapped = snapVec(newPos, desiredVelocity);
      const newState = Object.assign({}, state, {
        pacman: {
          pos: snapped,
          vel: newVel
        }
      });
      return newState;

    default:
      return state;
  }
}