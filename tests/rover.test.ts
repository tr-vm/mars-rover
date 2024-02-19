import {Plateau } from '../src/models';

describe('I can add a rover to 0,0 position facing N', ()=> {
    it('should return 0,0', ()=> {
        
        const plateau: Plateau = {
            grid: [
                [{name: 'Rover 1'},null,null,null,null],
                [{name: 'Rover 1'},null,null,null,null],
                [{name: 'Rover 1'},null,null,null,null],
                [{name: 'Rover 1'},null,null,null,null],
                [{name: 'Rover 1'},null,null,null,null],
            ]
        };
        
        const expected: string = '0 0 N';

        const result: string = plateau.addRover('Rover 1');

        expect(result).toBe(expected);

    });
});