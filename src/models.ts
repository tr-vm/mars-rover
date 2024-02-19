export type Moves = "L" | "M" | "R";

export type Rover = {
    name: string;
};

// Fixed 5 x 5 array
export type Plateau = {
    grid: [
        Rover | null,
        Rover | null,
        Rover | null,
        Rover | null,
        Rover | null
    ][];
    addRover: (name: string) => string;
};

export const addRover = (name: string): string => {
    return "";
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
        addRover: addRover,
    };
    return plateau;
};
