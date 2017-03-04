import Util from '../util'

export default (state, action) => {
  switch (action.type) {
    case 'TICK':
      const ghosts = state.ghosts.map((ghost, i) => {
        try {

          const desiredVel = ghost.vel;
          const curMapPos = Util.divide(ghost.pos, 10);
          const onSquare = Util.divisible(ghost.pos, 10);

          const computeAvailable = () => {
            return Util.allDirs.reduce((ar, dir) => {
              const isForward = Util.equals(ghost.vel, dir);
              const isBackward = Util.equals(Util.multiply(ghost.vel, [-1, -1]), dir);
              const isBlocked = Util.ghostHit(state.map, Util.add(curMapPos, dir));
              return (isForward || isBackward || isBlocked) ? ar : [...ar, dir]
            }, []);
          };
          const computeNext = () => {
            const availableDirs = computeAvailable();
            const idx = state.rand(availableDirs.length);
            const nextDir = availableDirs[idx];
            return nextDir;
          };
          const nextDir = onSquare ? computeNext() : ghost.vel;

          const newVel = onSquare && Util.mapHit(state.map, Util.add(curMapPos, desiredVel))
            ? nextDir
            : desiredVel;
          const newPos = Util.add(ghost.pos, newVel);
          const finalPos = state.pacman.dying > 0 ? ghost.pos : newPos;

          return {
            pos: finalPos,
            vel: newVel
          };
        } catch (ex) {
          console.log('ghost ', i, ' error: ', ex);
          return ghost;
        }
      });

      // Return the new state
      return Object.assign({}, state, {
        ghosts: ghosts
      });

    default:
      return state;
  }
}