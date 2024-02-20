export type Moves = 'L' | 'M' | 'R';
export type Direction = 'N' | 'E' | 'S' | 'W';
export type Heading = { direction: Direction; degrees: 0 } | { direction: Direction; degrees: 90 } | { direction: Direction; degrees: 180 } | { direction: 'W'; degrees: 270 };
export type Position = {
  x: number;
  y: number;
  heading: Heading | undefined; // TODO: get rid of the undefined
};

export const GRIDSIZE: number = 5;

export type Rover = {
  name: string;
  heading: Heading;
  plateau: Plateau;
};

// Fixed 5x5 2-D array
export type Plateau = {
  grid: (Rover | null)[][];
  addRover: (name: string) => string | undefined;
  findRoverPos: (name: string) => Position | undefined;
  getRovers: () => (Rover | null)[];
};

export const createPlateau = (): Plateau => {
  const plateau: Plateau = {
    grid: Array(GRIDSIZE)
      .fill(null)
      .map(() => Array(GRIDSIZE).fill(null)),
    addRover: (name: string): string | undefined => {
      const position: Position | undefined = plateau.findRoverPos(name);
      if (position) throw 'Duplicate Rover added';

      const rover: Rover = { name: name, plateau: plateau, heading: { direction: 'N', degrees: 0 } };
      for (const [rowIndex, row] of plateau.grid.entries()) {
        const colIndex: number = row?.findIndex((cell) => cell == null);
        if (colIndex > -1) {
          plateau.grid[rowIndex][colIndex] = rover;
          return `${rowIndex} ${colIndex} ${rover.heading.direction}`;
        }
      }
    },
    findRoverPos: (name: string): Position | undefined => {
      for (const [rowIndex, row] of plateau.grid.entries()) {
        let colIndex: number = row.findIndex((rover) => rover?.name === name);
        if (plateau.grid[rowIndex][colIndex]?.heading) {
          const heading: Heading | undefined = plateau.grid[rowIndex][colIndex]?.heading;
          return { x: colIndex, y: rowIndex, heading: heading };
        }
      }
    },
    getRovers: (): (Rover | null)[] => {
      const rovers: (Rover | null)[] = []; // TODO: Remove null
      for (const row of plateau.grid) {
        for (const cell of row) {
          if (cell !== null) rovers.push(cell);
        }
      }
      return rovers;
    },
    // isCellAvailable: (x: number, y:number) => {

    // }
  };
  return plateau;
};
