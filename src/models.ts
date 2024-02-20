export type Moves = 'L' | 'M' | 'R';
export type Direction = 'N' | 'E' | 'S' | 'W';
export type Heading = { direction: 'N'; degrees: 0 } | { direction: 'E'; degrees: 90 } | { direction: 'S'; degrees: 180 } | { direction: 'W'; degrees: 270 };

export const GRIDSIZE: number = 5;

export type Rover = {
  name: string;
  heading: Heading;
};

// Fixed 5x5 2-D array
export type Plateau = {
  grid: (Rover | null)[][];
  addRover: (name: string) => string;
};

export const createPlateau = (): Plateau => {
  const plateau: Plateau = {
    grid: Array(GRIDSIZE)
      .fill(null)
      .map(() => Array(GRIDSIZE).fill(null)),
    addRover: (name: string): string => {
      const rover: Rover = { name: name, heading: { direction: 'N', degrees: 0 } };
      plateau.grid[0][0] = rover;

      for (const [rowIndex, row] of plateau.grid.entries()) {
        let colIndex: number = row.findIndex((rover) => rover?.name === name);
        if (colIndex !== -1) return `${rowIndex} ${colIndex} ${rover.heading.direction}`;
      }
      return name;
    },
  };
  return plateau;
};
