# Water Jug Riddle Solver ( 2 jugs method )

## How to run
1. Create a folder anywhere and open it with visual studio code.
2. Open the terminal and clone the repository by doing git clone https://github.com/Xuradel/waterjugchallenge.git in your terminal.
3. Change directory to project directory by doing cd waterjugchallenge in your terminal.
4. Make sure you're in the main project directory, where the public and src folders are located.
5. Run npm i to install dependencies ( node modules )
6. Run npm run start to start the application

## How to use the app
1. Put values in Jug X, Jug Y and Amount.
2. Press Solve.

### Things to consider
- There is validation implemented but for your information:
- Numbers can't be negative.
- Numbers can't be 0.
- The amount can't be the same as a jug ( there would be no reason since the solution would be to fill once ).
- The amount can't exceed the value of any of the jugs, since it would be physically impossible to solve.
- Sometimes there are no solutions, you will be notified.

### Approach to the riddle

1. Keep track of all variables, jug's sizes, amount desired, arrays for the solutions, and an error text ( for error handling )
2. Create function that validates data.
3. Created a function that handles saving every step recorded into the array.
4. Start solving the riddle.
5. Start by validating the inputs ( as mentioned in the things to consider ).
6. Create variables that will keep track of water levels and changes.
7. Create a loop that will execute while we have not found a solution, or until it stop's because there is none.

### Finding the solution

1. Fill Jug X and then empty it into Jug Y.
2. If Jug X is empty, fill it again.
3. If jug Y is full, empty it.
4. Repeat these steps until either Jug X or Jug Y water levels are same as the desired amount.
5. Save the result in an array.
6. Repeat the same process but instead Jug Y fills Jug X.
7. Save the result in an array.
7. Whichever has the least steps until the solution is found, is the most efficient.