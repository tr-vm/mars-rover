export type Moves = 'L' | 'M' | 'R';
export type Direction = 'N' | 'E' | 'S' | 'W';
export type Heading = { direction: 'N'; degrees: 0 } | { direction: 'E'; degrees: 90 } | { direction: 'S'; degrees: 180 } | { direction: 'W'; degrees: 270 };

export type Rover = {
  name: string;
  heading: Heading;
};

// Fixed 5 x 5 array
export type Plateau = {
  grid: [Rover | null, Rover | null, Rover | null, Rover | null, Rover | null][];
  addRover: (name: string) => string;
};

export const createPlateau = (): Plateau => {
  const plateau: Plateau = {
    grid: [
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ],
    addRover: (name: string): string => {
      const rover: Rover = { name: name, heading: { direction: 'N', degrees: 0 } };
      plateau.grid[0][0] = rover;

      for (const [rowIndex, row] of plateau.grid.entries()) {
        let colIndex: number = row.findIndex((rover) => rover?.name === 'Rover 1');
        if (colIndex !== -1) return `${rowIndex} ${colIndex} ${rover.heading.direction}`;
      }
      return 'Rover 1';
    },
  };
  return plateau;
};
