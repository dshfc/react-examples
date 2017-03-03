import Util from '../util'

export default (state, action) => {

  if(!state || !state.ghosts) {
    const newState = state || {};
    const myState = {
      ghosts: [
        {
          pos: [13, 10],
          vel: [1, 0]
        }
      ]
    };
    return Object.assign({}, newState, myState);
  }

  switch (action.type) {
    case 'TICK':
      const ghosts = state.ghosts.map((ghost) => {
        const foc = (val, sign) => sign > 0 ? Math.floor(val) : Math.ceil(val); // floor or ceil
        const focVec = (vec, sign) => [foc(vec[0], sign[0]), foc(vec[1], sign[1])];
        const mapHit = (pos) => state.map[pos[1]][pos[0]] !== 1;
        const snap = (val, cond) => cond ? val : Math.round(val);
        const snapVec = (val, cond) => [snap(val[0], cond[0]), snap(val[1], cond[1])];

        const desiredVelocity = ghost.vel;
        const desiredPos = focVec(Util.add(ghost.pos, desiredVelocity), desiredVelocity);
        const newPos = mapHit(desiredPos)
          ? Util.round(ghost.pos)
          : Util.add(ghost.pos, Util.divide(desiredVelocity, 10));
        const newVel = mapHit(desiredPos)
          ? Util.multiply(ghost.vel, [-1,-1]) : ghost.vel;
        const snapped = snapVec(newPos, desiredVelocity);
        return {
          pos: snapped,
          vel: newVel
        };
      });
      return Object.assign({}, state, {
        ghosts: ghosts
      });

    default:
      return state;
  }
}