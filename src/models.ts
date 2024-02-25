import { Rover, Plateau, Position, Direction, DirectionChange } from './types';

export const GRIDSIZE: number = 5;

const moveRover = (rover: Rover, plateau: Plateau, currentPosition: Position): Position | undefined => {
  let newYPos: number = -1;
  let newXPos: number = -1;
  plateau.grid[currentPosition.y][currentPosition.x] = null; // This is bad, and indicates a suboptimal representation of the grid
  //  We should add to the grid first then remove
  const tryMoveRover = (x: number, y: number) => {
    if (!plateau.grid[y] || !plateau.grid[y][x]) {
      // Is there a Rover at the coordinate
      if (!plateau.grid[y]) plateau.grid[y] = [];
      plateau.grid[y][x] = rover;
    } else {
      throw `Cannot move ${rover.name}`;
    }
  };

  switch (rover.direction) {
    case 'N':
      if (currentPosition.y + 1 <= plateau.grid.length) {
        currentPosition.y++;
        newYPos = currentPosition.y;
        tryMoveRover(currentPosition.x, newYPos);
      }
      break;
    case 'E':
      if (currentPosition.x + 1 <= plateau.grid[0].length) {
        currentPosition.x++;
        newXPos = currentPosition.x;
        tryMoveRover(newXPos, currentPosition.y);
      }
      break;
    case 'S':
      if (currentPosition.y - 1 >= 0) {
        currentPosition.y--;
        newYPos = currentPosition.y;
        tryMoveRover(currentPosition.x, newYPos);
      }
      break;
    case 'W':
      if (currentPosition.x - 1 >= 0) {
        currentPosition.x--;
        newXPos = currentPosition.x;
        tryMoveRover(newXPos, currentPosition.y);
      }
      break;
  }

  if (newXPos !== -1 || newYPos !== -1) {
    return { x: currentPosition.x, y: currentPosition.y, direction: rover.direction };
  } else {
    throw `Cannot move "${rover}" beyond Plateau`;
  }
};

export const createPlateau = (): Plateau => {
  const plateau: Plateau = {
    grid: Array(GRIDSIZE)
      .fill(null)
      .map(() => Array(GRIDSIZE).fill(null)),
    addRover: (name: string, startPosition?: Position): (Rover & Position) | undefined => {
      const position: Position | undefined = plateau.findRoverPos(name);
      if (position) throw 'Duplicate Rover added';

      const rover: Rover = createRover(name, plateau);

      if (startPosition) {
        rover.direction = startPosition.direction;
        plateau.grid[startPosition.y][startPosition.x] = rover;
        return { ...rover, ...startPosition };
      }

      for (const [rowIndex, row] of plateau.grid.entries()) {
        const colIndex: number = row?.findIndex((cell) => cell == null);
        if (colIndex > -1) {
          plateau.grid[rowIndex][colIndex] = rover;
          return { ...rover, x: colIndex, y: rowIndex, direction: 'N' };
        }
      }
    },
    findRoverPos: (name: string): Position | undefined => {
      for (const [rowIndex, row] of plateau.grid.entries()) {
        let colIndex: number = row.findIndex((rover) => rover?.name === name);
        if (colIndex !== -1) {
          const direction: Direction | undefined = plateau.grid[rowIndex][colIndex]?.direction;
          if (direction) return { x: colIndex, y: rowIndex, direction: direction };
        }
      }
    },
    getRovers: (): (Rover | null)[] => {
      const rovers: (Rover | null)[] = plateau.grid.flat().filter((cell) => cell !== null); // TODO: Remove null

      return rovers;
    },
    getRoverPosition: (rover: Rover): Position | undefined => {
      for (const [rowIndex, row] of plateau.grid.entries()) {
        const colIndex: number = row?.findIndex((cell) => cell === rover);
        if (colIndex > -1) return { x: colIndex, y: rowIndex, direction: rover.direction };
      }
    },
    moveRover: (rover: Rover): Position | undefined => {
      const position: Position | undefined = plateau.findRoverPos(rover.name);
      if (position) return moveRover(rover, plateau, position);
      throw 'Rover does not exist';
    },
  };
  return plateau;
};

const createRover = (name: string, plateau: Plateau): Rover => {
  const rover: Rover = {
    name: name,
    plateau: plateau,
    direction: 'N',
    move: (): Position | undefined => {
      return plateau.moveRover(rover);
    },
    getPosition: (): Position | undefined => {
      const position: Position | undefined = plateau.getRoverPosition(rover);
      if (position) return { x: position.x, y: position.y, direction: rover.direction };
    },
    changeDirection: (directionChange: DirectionChange): Position | undefined => {
      switch (rover.direction) {
        case 'N':
          rover.direction = directionChange === 'L' ? 'W' : 'E';
          break;
        case 'E':
          rover.direction = directionChange === 'L' ? 'N' : 'S';
          break;
        case 'S':
          rover.direction = directionChange === 'L' ? 'E' : 'W';
          break;
        case 'W':
          rover.direction = directionChange === 'L' ? 'S' : 'N';
          break;
      }
      const position: Position | undefined = rover.getPosition();
      if (position) return position;
    },
    moveByCmdList: (cmdList: string): Position | undefined => {
      const cmds: string[] = cmdList.split('');
      let position: Position | undefined;
      cmds.forEach((cmd) => {
        switch (cmd) {
          case 'L':
          case 'R':
            position = rover.changeDirection(cmd);
            break;
          case 'M':
            position = rover.move();
            break;
          default:
            throw `Invalid move: ${cmd}`;
        }
      });
      return position;
    },
  };
  return rover;
};
