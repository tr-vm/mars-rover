
export type Moves = 'L' |'M' | 'R';

export type Rover = {
    name: string;
}

export type Plateau = {
    grid: (Rover | null) [][];
    addRover: (name: string) => string
}
