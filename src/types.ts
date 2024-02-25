export type Moves = 'L' | 'M' | 'R';
export type DirectionChange = 'L' | 'R';
export type Direction = 'N' | 'E' | 'S' | 'W';
export type Position = {
  x: number;
  y: number;
  direction: Direction;
};

export type Rover = {
  name: string;
  direction: Direction;
  plateau: Plateau; // Same with this, bad decision. See README
  move: () => Position | undefined;
  getPosition: () => Position | undefined;
  changeDirection: (directionChange: DirectionChange) => Position | undefined;
  moveByCmdList: (movements: string) => Position | undefined;
};

// Fixed 5x5 2-D array
export type Plateau = {
  grid: (Rover | null)[][]; // With hindsight this was a bad decisiom. See more in README.
  addRover: (name: string, startPosition?: Position | undefined) => (Rover & Position) | undefined;
  findRoverPos: (name: string) => Position | undefined;
  getRovers: () => (Rover | null)[];
  getRoverPosition: (rover: Rover) => Position | undefined;
  moveRover: (rover: Rover) => Position | undefined;
};
