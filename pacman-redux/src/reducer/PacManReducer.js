import Util from '../util';
import map from '../map';

export default (state, action) => {
  if(!state || !state.ghosts) {
    const newState = state || {};
    const myState = {
      pacman: {
        pos: [130, 200],
        vel: [0,0]
      },
      map: map
    };
    return Object.assign({}, newState, myState);
  }

  switch (action.type) {
    case 'TICK':

      const keyVec = {
        '37': [-1,0],
        '38': [0,-1],
        '39': [1, 0],
        '40': [0, 1],
      };

      const cloneRowAndSetCell = (row, rowIdx, pos, val) => {
        return row.map((cell, cellIdx) => {
          return Util.equals(pos, [cellIdx, rowIdx]) ? val : cell;
        });
      };
      const cloneMapAndSetCell = (map, pos, val) => {
        return map.map((row, rowIdx) => cloneRowAndSetCell(row, rowIdx, pos, val));
      };

      const desiredVel = keyVec[action.key] || [0,0];
      const mapPos = Util.divide(state.pacman.pos, 10);
      const newVel = Util.divisible(state.pacman.pos, 10) && !Util.mapHit(state.map, Util.add(mapPos, desiredVel))
        ? desiredVel
        : state.pacman.vel;

      const nextPos = Util.add(state.pacman.pos, newVel);
      const newPos = Util.divisible(state.pacman.pos, 10) && Util.mapHit(state.map, Util.add(mapPos, newVel))
        ? state.pacman.pos
        : nextPos;

      const newMap = Util.divisible(state.pacman.pos, 10) ? cloneMapAndSetCell(state.map, mapPos, 3) : state.map;
      const newState = Object.assign({}, state, {
        map: newMap,
        pacman: {
          pos: newPos,
          vel: newVel
        }
      });
      return newState;

    default:
      return state;
  }
}