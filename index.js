

const enterNumber = () => {
    return new Promise((resolve, reject) => {
        const userNumber = Number(window.prompt('Enter a number between 1 - 6'));
        const randomNumber = Math.floor(Math.random() * 6 + 1);
        // If not a real number.

        if (isNaN(userNumber)) {
            reject(new Error('Wrong input type, try again!'));
        }

        if (userNumber === randomNumber) {
            // if userNumber equals random number give 2 points.
            resolve({
                points: 2,
                randomNumber
            });
            // if userNumber is different by 1 point
        } else if (userNumber === randomNumber -1 || userNumber === randomNumber + 1) {
            resolve({
                points: 1,
                randomNumber
            });
            // No points given
        } else {
            resolve({
                points: 0,
                randomNumber
            })
        }
    });
};

const continueGame = () => {
    return new Promise(resolve => {
        if (window.confirm('Do you want to continue?')) {
            resolve(true);
        }
        else {
            resolve(false);
        }
    })
};

const handleGuess = async () => {
    try {
        const result = await enterNumber(); // Instead of the then method, we can get the result directly by just putting await before the promise

        alert(`Dice: ${result.randomNumber}: you got ${result.points} points`);

        const isContinuing = await continueGame();

        if (isContinuing) {
            await handleGuess();
        } else {
            alert("Game ends");
        }
    } catch (error) { // Instead of catch method, we can use the try, catch syntax
        alert(error);
    }
};

handleGuess();