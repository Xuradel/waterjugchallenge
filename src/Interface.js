import React, { useState } from 'react';
import Container from './Container';
import { GiJug } from 'react-icons/gi';
import { MdWaterDrop } from 'react-icons/md';

const Interface = () => {
    // States for measures
    const [jugXCapacity, setJugXCapacity] = useState(0);
    const [jugYCapacity, setJugYCapacity] = useState(0);
    const [zAmount, setZAmount] = useState(0);
    const [zAmount2, setZAmount2] = useState(0);
    const [jugXCapacity2, setJugXCapacity2] = useState(0);
    const [jugYCapacity2, setJugYCapacity2] = useState(0);
    // State for storing both solutions
    const [bestSolution, setBestSolution] = useState([]);
    const [worstSolution, setWorstSolution] = useState([]);

    // Message if an error or no solution is found
    const [errorText, setErrorText] = useState('');

    //Function to reset solutions on submit or reset so it doesn't overflow
    const resetSolutions = () => {
        setBestSolution([]);
        setWorstSolution([]);
        setZAmount2(0)
        setErrorText('');
    };

    //Function to validate if numbers are negative or if X or Y are the same as Z amount
    const validateInputs = () => {
        if (jugXCapacity <= 0 || jugYCapacity <= 0 || zAmount <= 0) {
            resetSolutions()
            setErrorText('Numbers can only be positive');
            return false;
        }
        if (zAmount > jugXCapacity && zAmount > jugYCapacity) {
            resetSolutions()
            setErrorText('Amount has to be lower than both X or Y');
            return false;
        }
        //If amount is the same then the solution is just one step
        if (zAmount === jugXCapacity || zAmount === jugYCapacity) {
            resetSolutions()
            setErrorText('Amount cannot be the same as X or Y');
            return false;
        }
        setErrorText('');
        return true;
    };

    // Function to add a solution step
    const addToSolution = (solution, x, y, explanation) => {
        solution.push({ x, y, explanation });
    };


    // Function to solve the riddle with the most efficient way
    const solveRiddle = () => {
        // Validates the numbers for errors
        if (!validateInputs()) {
            return;
        }

        // Initialize variables to keep track of water levels
        let jugX = 0;
        let jugY = 0;

        // Create array for the solutions steps
        const bestSolutionSteps = [];

        // Loop while we dont find the right amount of water
        while (jugX !== zAmount && jugY !== zAmount) {
            // if jug x is empty, fill it
            if (jugX === 0) {
                jugX = jugXCapacity;
                addToSolution(bestSolutionSteps, jugX, jugY, `Fill Bucket X (${jugX})`);
            }
            //  if jug y is full, empty it
            if (jugY === jugYCapacity) {
                jugY = 0;
                addToSolution(bestSolutionSteps, jugX, jugY, 'Empty Bucket Y');
            }
            // calculate the amount of water to transfer from x to y
            const pourAmount = Math.min(jugX, jugYCapacity - jugY);
            jugX -= pourAmount;
            jugY += pourAmount;
            addToSolution(bestSolutionSteps, jugX, jugY, `Transfer (${pourAmount}) from Jug X to Jug Y`);

            // if we found the solutions, return the array
            if (jugX === zAmount || jugY === zAmount) {
                setBestSolution([...bestSolutionSteps]);
                return;
            }

            // if we didnt find a solution, stop so it doesnt run infinite
            if (bestSolutionSteps.length >= 10000) {
                setErrorText('No solution found.');
                resetSolutions()
                return;
            }
        }

        setBestSolution([]);
    };

    // Function to solve the riddle with the most unefficient way
    // same as above just switching values to see the other way
    const solveRiddleWorst = () => {
        // Validates the numbers for errors
        if (!validateInputs()) {
            return;
        }

        // Initialize variables to keep track of water levels
        let jugX = 0;
        let jugY = 0;

        const bestSolutionSteps = [];

        while (jugX !== zAmount && jugY !== zAmount) {
            if (jugX === 0) {
                jugX = jugXCapacity2;
                addToSolution(bestSolutionSteps, jugX, jugY, `Fill Bucket Y (${jugX})`);
            }

            if (jugY === jugYCapacity2) {
                jugY = 0;
                addToSolution(bestSolutionSteps, jugX, jugY, 'Empty Bucket X');
            }

            const pourAmount = Math.min(jugX, jugYCapacity2 - jugY);
            jugX -= pourAmount;
            jugY += pourAmount;
            addToSolution(bestSolutionSteps, jugX, jugY, `Transfer (${pourAmount}) from Jug Y to Jug X`);

            if (jugX === zAmount || jugY === zAmount) {
                setWorstSolution([...bestSolutionSteps]);
                return;
            }

            if (bestSolutionSteps.length >= 10000) {
                setErrorText('No solution found.');
                return;
            }
        }

        setWorstSolution([]);
    };

    const handleInputChange = (e) => {
        const newValue = parseInt(e.target.value);
        setJugXCapacity(newValue);
        setJugYCapacity2(newValue);
    };
    const handleInputChangeY = (e) => {
        const newValue = parseInt(e.target.value);
        setJugYCapacity(newValue);
        setJugXCapacity2(newValue);
    };

    const handleSolutions = () => {
        setZAmount2(zAmount)
        solveRiddle()
        solveRiddleWorst()
    }

    return (
        <Container>
            <div className='main-container'>
                <div className='title'> WATER JUG RIDDLE </div>
            </div>
            <div className='jugs-containers'>
                <div className='jug jug-x'>
                    <div className='jug-title'>JUG X</div>
                    <div className='jug-icon'>
                        <GiJug size={48} fill='#fff' />
                    </div>
                    <div className='jug-amount'>
                        <div className='input'>
                            <input
                                type='number'
                                value={jugXCapacity}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
                <div className='jug jug-y'>
                    <div className='jug-title'>JUG Y</div>
                    <div className='jug-icon'>
                        <GiJug size={48} fill='#fff' />
                    </div>
                    <div className='jug-amount'>
                        <div className='input'>
                            <input
                                type='number'
                                value={jugYCapacity}
                                onChange={handleInputChangeY}
                            />
                        </div>
                    </div>
                </div>
                <div className='jug z-amount'>
                    <div className='jug-title'>AMOUNT</div>
                    <div className='jug-icon'>
                        <MdWaterDrop size={48} fill='#fff' />
                    </div>
                    <div className='jug-amount'>
                        <div className='input'>
                            <input
                                type='number'
                                value={zAmount}
                                onChange={(e) => setZAmount(parseInt(e.target.value))}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='validation-error'>{errorText}</div>

            <div className='output'>
                <div className='output-title'>
                    {zAmount2 !== 0 && (
                        <div className='output-title'>
                            {bestSolution.length === worstSolution.length ? (
                                <p>EVEN</p>
                            ) : bestSolution.length < worstSolution.length ? (
                                <p>BEST SOLUTION</p>
                            ) : (
                                <p>WORST SOLUTION</p>
                            )}
                        </div>
                    )}
                </div>

                <table className='output-table'>
                    <thead>
                        <tr>
                            <th>Bucket X</th>
                            <th>Bucket Y</th>
                            <th>Explanation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bestSolution.map((step, index) => (
                            <tr key={index}>
                                <td>{step.x}</td>
                                <td>{step.y}</td>
                                <td>{step.explanation}</td>
                            </tr>
                        ))}
                        {bestSolution.length > 0 && (
                            <tr>
                                <td>{bestSolution[bestSolution.length - 1].x}</td>
                                <td>{bestSolution[bestSolution.length - 1].y}</td>
                                <td>Solved</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className='output'>
                {zAmount2 !== 0 && (
                    <div className='output-title'>
                        {bestSolution.length === worstSolution.length ? (
                            <p>EVEN</p>
                        ) : bestSolution.length > worstSolution.length ? (
                            <p>BEST SOLUTION</p>
                        ) : (
                            <p>WORST SOLUTION</p>
                        )}
                    </div>
                )}
                <table className='output-table'>
                    <thead>
                        <tr>
                            <th>Bucket Y</th>
                            <th>Bucket X</th>
                            <th>Explanation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {worstSolution.map((step, index) => (
                            <tr key={index}>
                                <td>{step.x}</td>
                                <td>{step.y}</td>
                                <td>{step.explanation}</td>
                            </tr>
                        ))}
                        {worstSolution.length > 0 && (
                            <tr>
                                <td>{worstSolution[worstSolution.length - 1].x}</td>
                                <td>{worstSolution[worstSolution.length - 1].y}</td>
                                <td>Solved</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className='buttons'>
                <button onClick={handleSolutions}>Solve</button>
                <button onClick={resetSolutions}>Reset</button>
            </div>

        </Container>
    );
};

export default Interface;
