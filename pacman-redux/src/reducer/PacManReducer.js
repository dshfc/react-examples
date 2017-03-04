import Util from '../util';

export default (state, action) => {
  switch (action.type) {
    case 'TICK':

      // If pacman is exactly on a tile, and the tile in the direction of the last keypress is free, change direction
      // Otherwise, retain existing velocity
      const desiredVel = Util.keyVec[action.key] || [0,0];
      const curMapPos = Util.divide(state.pacman.pos, 10);
      const onSquare = Util.divisible(state.pacman.pos, 10);
      const newVel = onSquare && !Util.mapHit(state.map, Util.add(curMapPos, desiredVel))
        ? desiredVel
        : state.pacman.vel;

      // Move pacman to the next position, unless that position collides with a wall
      const nextPos = Util.add(state.pacman.pos, newVel);
      const newPos = onSquare && Util.mapHit(state.map, Util.add(curMapPos, newVel))
        ? state.pacman.pos
        : nextPos;

      // Obey the law of immutability, and deep copy the whole map but remove the pellet pacman just ate
      const newMap = onSquare ? Util.cloneMapAndSetCell(state.map, curMapPos, 3) : state.map;

      // Update and return the state
      const newState = Object.assign({}, state, {
        map: newMap,
        pacman: {
          pos: newPos,
          vel: newVel
        },
        time: state.time + 1
      });
      return newState;

    default:
      return state;
  }
}