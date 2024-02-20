export type Moves = 'L' | 'M' | 'R';
export type Direction = 'N' | 'E' | 'S' | 'W';
export type Position = {
  x: number;
  y: number;
  direction: Direction | undefined; // TODO: get rid of the undefined
};

export const GRIDSIZE: number = 5;

export type Rover = {
  name: string;
  direction: Direction;
  plateau: Plateau;
  move: () => Position | undefined;
  getPosition: () => Position | undefined;
  changeDirection: (direction: Direction) => Position | undefined;
};

// Fixed 5x5 2-D array
export type Plateau = {
  grid: (Rover | null)[][];
  addRover: (name: string) => (Rover & Position) | undefined;
  findRoverPos: (name: string) => Position | undefined;
  getRovers: () => (Rover | null)[];
  getRoverPosition: (rover: Rover) => Position | undefined;
  moveRover: (rover: Rover) => Position | undefined;
};

const moveRover = (rover: Rover, plateau: Plateau, currentPosition: Position): Position | undefined => {
  let newYPos: number = -1;
  let newXPos: number = -1;
  switch (rover.direction) {
    case 'N':
      if (currentPosition.y + 1 <= plateau.grid.length) {
        currentPosition.y++;
        console.log(currentPosition);
        newYPos = currentPosition.y;
        plateau.grid[newYPos][currentPosition.x] = rover;
      }
      break;
    case 'E':
      if (currentPosition.x + 1 <= plateau.grid[0].length) {
        currentPosition.x++;
        newXPos = currentPosition.y;
        plateau.grid[newYPos][currentPosition.x] = rover;
      }
      break;
    case 'S':
      if (currentPosition.y - 1 >= 0) {
        currentPosition.y--;
        newYPos = currentPosition.y;
        plateau.grid[newYPos][currentPosition.x] = rover;
      }
      break;
    case 'W':
      if (currentPosition.x - 1 >= 0) {
        currentPosition.x--;
        newXPos = currentPosition.x;
        plateau.grid[newYPos][currentPosition.x] = rover;
      }
      break;
  }

  if (newXPos !== -1 || newYPos !== -1) {
    plateau.grid[currentPosition.y][currentPosition.x] = null;
    return { x: currentPosition.x, y: currentPosition.y, direction: rover.direction };
  }
};

export const createPlateau = (): Plateau => {
  const plateau: Plateau = {
    grid: Array(GRIDSIZE)
      .fill(null)
      .map(() => Array(GRIDSIZE).fill(null)),
    addRover: (name: string): (Rover & Position) | undefined => {
      const position: Position | undefined = plateau.findRoverPos(name);
      if (position) throw 'Duplicate Rover added';

      const rover: Rover = createRover(name, plateau);
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
          return { x: colIndex, y: rowIndex, direction: direction };
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
        if (colIndex >= -1) return { x: colIndex, y: rowIndex, direction: rover.direction };
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
    changeDirection: (direction: Direction): Position | undefined => {
      rover.direction = direction;
      const position: Position | undefined = rover.getPosition();
      if (position) return position;
    },
  };
  return rover;
};
