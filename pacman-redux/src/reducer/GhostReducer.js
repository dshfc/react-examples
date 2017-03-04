import Util from '../util'

export default (state, action) => {
  switch (action.type) {
    case 'TICK':
      const ghosts = state.ghosts.map((ghost) => {
        const allDirs = [[1,0],[0,1],[-1,0],[0,-1]];
        const availableDirs = allDirs.reduce((ar, dir) => {
          return Util.equals(ghost.vel, dir) || Util.equals(Util.multiply(ghost.vel, [-1,-1]), dir)
            ? ar
            : [...ar, dir]
        }, []);
        const nextDir = availableDirs[state.rand(availableDirs.length)];


        const desiredVelocity = ghost.vel;
        const desiredPos = Util.focVec(Util.add(ghost.pos, desiredVelocity), desiredVelocity);
        const newPos = Util.ghostHit(state.map, desiredPos)
          ? Util.round(ghost.pos)
          : Util.add(ghost.pos, Util.divide(desiredVelocity, 10));
        const newVel = Util.ghostHit(state.map, desiredPos)
          ? nextDir : ghost.vel;
        const snapped = Util.snapVec(newPos, desiredVelocity);
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