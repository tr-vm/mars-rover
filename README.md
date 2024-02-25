# Mars Rover

## Features
- All basic features including basic moves, and handling a list of commands in a single string
- Add multiple rovers
- Collision detection
- Configurable grid size

## Features
- The grid is represented with a 2-D array.
- All the types in the "Engine" are represented in *types.ts*. 
- The tests have an almost 100% coverage of code.

## Considerations
- An objective was to utilize TypeScript types for hinting the properties and behavior of objects (Rover and Plateau) as a type. This involves incorporating literal types to articulate the direction and heading of the Rover.
- Another design objective aimed for a loose coupling between objects and an intuitive definition of behavior. For instance, allowing a rover to move through a call to rover.move() rather than having a move function directly on the Plateau object. The proposed refactoring of the grid, as suggested below, would have successfully realised this goal.

## Future thoughts 

With hindsight, representing the grid as a 2-D array is too expensive in size and performance. A 1-D array of Rovers with their position represented with the Position type on the Rover type would have been a better representation:
  - The Rover would not need a reference to the Plateau. Less memory.
  - Only one for loop to determine the position of a Rover.
  
``
    export type Rover = {
        name: string;
        direction: Direction;
        plateau: Plateau;
        **position: Position;**
        ...
    };
``
``
    export type Plateau = {
        **grid: (Rover | null)[]; **
        addRover: (name: string, startPosition?: Position | undefined) => (Rover & Position) | undefined;
       ...
    };
``

- There were some initial attempts to build a UI with [Terminal draw](https://www.npmjs.com/package/command-line-draw).However, there were issues with a package upstream that prevented further progress. I then switched to using HTML canvas and started the scaffold for implementing Web Sockets to send updates of the Grid to the web page. 
- Finally, I would represent the heading in degrees to represent more fine grained directions i.e. 20 degrees North
