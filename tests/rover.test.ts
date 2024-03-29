import { Plateau, Rover, Position } from '../src/types';
import { createPlateau, GRIDSIZE } from '../src/models';

describe('Initialise grid with a 5 x 5 grid', () => {
  it('should return 5x5 containing nulls array', () => {
    const expected = Array(GRIDSIZE)
      .fill(null)
      .map(() => Array(GRIDSIZE).fill(null));

    const result: Plateau = createPlateau();

    expect(result.grid).toEqual(expected);
  });
});

describe('I can add a rover to 0,0 position facing N', () => {
  it('should return 0 0 N', () => {
    const plateau: Plateau = createPlateau();

    const expected: string = '0 0 N';

    const rover: (Rover & Position) | undefined = plateau.addRover('Rover 1');
    const result: string | undefined = `${rover?.x} ${rover?.y} ${rover?.direction}`;

    expect(result).toBe(expected);
  });
});

describe('cannot add the same named  rover to the plateau', () => {
  it('should throw an error', () => {
    const plateau: Plateau = createPlateau();

    plateau.addRover('Rover 1');
    expect(() => plateau.addRover('Rover 1')).toThrow('Duplicate Rover added');
  });
});

describe('I can add more than one rover to the plateau ', () => {
  it('should return two rovers', () => {
    const expected: number = 2;

    const plateau: Plateau = createPlateau();

    plateau.addRover('Rover 1');
    plateau.addRover('Rover 2');

    const result: number = plateau.getRovers().length;

    expect(result).toBe(expected);
  });

  it('should return two rovers with names Rover 1 and Rover 2', () => {
    const names: string[] = ['Rover 1', 'Rover 2'];
    const expected: boolean = true;

    const plateau: Plateau = createPlateau();

    plateau.addRover('Rover 1');
    plateau.addRover('Rover 2');

    const rovers: (Rover | null)[] = plateau.getRovers();

    const result: boolean = rovers.every((rover) => rover?.name === names[0] || rover?.name === names[1]);

    expect(result).toBe(expected);
  });

  it('should return 0 0 N, 1 0 N respectively', () => {
    const plateau: Plateau = createPlateau();

    const expected1: string = '0 0 N';
    const expected2: string = '1 0 N';

    const rover1: (Rover & Position) | undefined = plateau.addRover('Rover 1');
    const result1: string | undefined = `${rover1?.x} ${rover1?.y} ${rover1?.direction}`;

    expect(result1).toBe(expected1);
    const rover2: (Rover & Position) | undefined = plateau.addRover('Rover 2');
    const result2: string | undefined = `${rover2?.x} ${rover2?.y} ${rover2?.direction}`;

    expect(result2).toBe(expected2);
  });
});

describe('Move rover North, then go East, then go North again', () => {
  const plateau: Plateau = createPlateau();

  const rover1: Rover | undefined = plateau.addRover('Rover 1');

  it('should have a position 0 1 N', () => {
    const expected: Position = { x: 0, y: 1, direction: 'N' };

    const position: Position | undefined = rover1?.move();

    expect(position).toEqual(expected);
  });

  it('should have a position 1 1 E', () => {
    const expected: Position = { x: 1, y: 1, direction: 'E' };

    let position: Position | undefined = rover1?.changeDirection('R');
    position = rover1?.move();

    expect(position).toEqual(expected);
  });
  it('should have a position 1 0 S', () => {
    const expected: Position = { x: 1, y: 0, direction: 'S' };

    let position: Position | undefined = rover1?.changeDirection('R');
    position = rover1?.move();

    expect(position).toEqual(expected);
  });
});

describe('Change direction', () => {
  const plateau: Plateau = createPlateau();

  const rover1: Rover | undefined = plateau.addRover('Rover 1');

  it('should have a direction E', () => {
    const expected: Position = { x: 0, y: 0, direction: 'E' };

    const position: Position | undefined = rover1?.changeDirection('R');

    expect(position).toEqual(expected);
  });

  it('should have a direction S', () => {
    const expected: Position = { x: 0, y: 0, direction: 'S' };

    const position: Position | undefined = rover1?.changeDirection('R');

    expect(position).toEqual(expected);
  });

  it('should have a direction E', () => {
    const expected: Position = { x: 0, y: 0, direction: 'E' };

    const position: Position | undefined = rover1?.changeDirection('L');

    expect(position).toEqual(expected);
  });

  it('should have a direction S', () => {
    const expected: Position = { x: 0, y: 0, direction: 'S' };

    const position: Position | undefined = rover1?.changeDirection('R');

    expect(position).toEqual(expected);
  });

  it('should have a direction W', () => {
    const expected: Position = { x: 0, y: 0, direction: 'W' };

    const position: Position | undefined = rover1?.changeDirection('R');

    expect(position).toEqual(expected);
  });

  it('should have a direction S', () => {
    const expected: Position = { x: 0, y: 0, direction: 'S' };

    const position: Position | undefined = rover1?.changeDirection('L');

    expect(position).toEqual(expected);
  });

  it('should have a direction N', () => {
    const expected: Position = { x: 0, y: 0, direction: 'N' };

    rover1?.changeDirection('R');
    const position: Position | undefined = rover1?.changeDirection('R');

    expect(position).toEqual(expected);
  });
});

describe('Move two rovers', () => {
  const plateau: Plateau = createPlateau();

  const rover1: (Rover & Position) | undefined = plateau.addRover('Rover 1');
  const rover2: (Rover & Position) | undefined = plateau.addRover('Rover 2');

  it('both rovers should be at 0 0 N and 1 0 N respectively', () => {
    expect(rover1?.x).toBe(0);
    expect(rover1?.y).toBe(0);
    expect(rover1?.direction).toBe('N');
    expect(rover2?.x).toBe(1);
    expect(rover2?.y).toBe(0);
    expect(rover2?.direction).toBe('N');
  });

  it('should have a position 1 1 E, 2 1 S', () => {
    const expected1: Position = { x: 4, y: 1, direction: 'E' };
    const expected2: Position = { x: 1, y: 2, direction: 'W' };

    rover1?.move();
    rover1?.changeDirection('R');
    rover1?.move();
    rover1?.move();
    rover1?.move();
    const position1: Position | undefined = rover1?.move();

    rover2?.move();
    rover2?.move();
    rover2?.changeDirection('R');
    rover2?.move();
    rover2?.changeDirection('R');
    rover2?.changeDirection('R');

    const position2: Position | undefined = rover2?.move();

    expect(position1).toEqual(expected1);

    expect(position2).toEqual(expected2);
  });
});

describe('Move a Rover by a list of movements RMMMNMMM', () => {
  const plateau: Plateau = createPlateau();

  const rover1: (Rover & Position) | undefined = plateau.addRover('Rover 1');

  it('both rovers should be at 0 0 N ', () => {
    expect(rover1?.x).toBe(0);
    expect(rover1?.y).toBe(0);
    expect(rover1?.direction).toBe('N');
  });

  it('position should be at 3 3 N', () => {
    const expected: Position = { x: 3, y: 3, direction: 'N' };

    const position: Position | undefined = rover1?.moveByCmdList('RMMMLMMM');

    expect(position).toEqual(expected);
  });
});

describe('Move a Rover by a list of movements LMLMLMLMM', () => {
  const plateau: Plateau = createPlateau();

  const rover1: (Rover & Position) | undefined = plateau.addRover('Rover 1', { x: 1, y: 2, direction: 'N' });

  it('rover should be at 1 2 N ', () => {
    expect(rover1?.x).toBe(1);
    expect(rover1?.y).toBe(2);
    expect(rover1?.direction).toBe('N');
  });

  it('position should be at 1 3 N', () => {
    const expected: Position = { x: 1, y: 3, direction: 'N' };

    const position: Position | undefined = rover1?.moveByCmdList('LMLMLMLMM');

    expect(position).toEqual(expected);
  });
});

describe('Move a Rover by a list of movements MMRMMRMRRM', () => {
  const plateau: Plateau = createPlateau();
  const rover2: (Rover & Position) | undefined = plateau.addRover('Rover 1', { x: 3, y: 3, direction: 'E' });

  it('rover should be at 3 3 E ', () => {
    expect(rover2?.x).toBe(3);
    expect(rover2?.y).toBe(3);
    expect(rover2?.direction).toBe('E');
  });

  it('position should be at 5 1 E', () => {
    const expected: Position = { x: 5, y: 1, direction: 'E' };

    const position: Position | undefined = rover2?.moveByCmdList('MMRMMRMRRM');

    expect(position).toEqual(expected);
  });
});

describe('test collision detection', () => {
  const plateau: Plateau = createPlateau();
  const rover1: (Rover & Position) | undefined = plateau.addRover('Rover 1');
  const rover2: (Rover & Position) | undefined = plateau.addRover('Rover 2');

  it('rover 2 should collide with rover 1', () => {
    rover1?.move();
    rover1?.changeDirection('R');
    rover1?.move();

    expect(() => rover2?.move()).toThrow('Cannot move Rover 2');
  });
});
