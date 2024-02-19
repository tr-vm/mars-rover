import { Plateau, Rover, createPlateau } from "../src/models";

describe("Initialise grid with a 5 x 5 grid", () => {
    it("should return all nulls in a 5x5 array", () => {
        const expected = [
                [null, null, null, null, null],
                [null, null, null, null, null],
                [null, null, null, null, null],
                [null, null, null, null, null],
                [null, null, null, null, null]
            ];

        const result: Plateau = createPlateau();

        expect(result.grid).toEqual(expected);
    });
});

describe("I can add a rover to 0,0 position facing N", () => {
    it("should return 0,0", () => {
        
        const emptyPlateau: Plateau = createPlateau();

        const expected: string = "0 0 N";

        const result: string = emptyPlateau.addRover("Rover 1");

        expect(result).toBe(expected);
    });
});
