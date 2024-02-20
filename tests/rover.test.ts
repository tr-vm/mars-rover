import { Plateau, GRIDSIZE, createPlateau, Rover } from '../src/models';

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

    const result: string | undefined = plateau.addRover('Rover 1');

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

  it('should return 0 0 N, 0 1 N respectively', () => {
    const plateau: Plateau = createPlateau();

    const expected1: string = '0 0 N';
    const expected2: string = '0 1 N';

    let result: string | undefined = plateau.addRover('Rover 1');
    expect(result).toBe(expected1);
    result = plateau.addRover('Rover 2');
    expect(result).toBe(expected2);
  });
});
