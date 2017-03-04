import Util from '../util';
import initialState from '../InitialState'

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

      // Power up
      const powerup = onSquare && state.map[curMapPos[1]][curMapPos[0]] === 4;
      const power = powerup ? 60 * 5 : Math.max(0, state.pacman.power - 1);

      // Obey the law of immutability, and deep copy the whole map but remove the pellet pacman just ate
      const newMap = onSquare ? Util.cloneMapAndSetCell(state.map, curMapPos, 3) : state.map;

      // Die when you hit a ghost
      const dist = state.ghosts.reduce((accumulator, ghost) => {
        const dist = Util.dist(ghost.pos, state.pacman.pos);
        return dist < accumulator ? dist : accumulator;
      }, Number.POSITIVE_INFINITY);
      const dying = power <= 0 && dist < 10 ? state.pacman.dying + 1 : state.pacman.dying;
      const finalPos = dying > 0 ? state.pacman.pos : newPos;

      // Update and return the state
      const newState = Object.assign({}, state, {
        map: newMap,
        pacman: {
          pos: finalPos,
          vel: newVel,
          dying: dying,
          power: power
        },
        time: state.time + 1
      });
      return dying > 100 ? initialState : newState;

    default:
      return state;
  }
}