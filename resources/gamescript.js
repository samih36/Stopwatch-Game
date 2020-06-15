let decimals = 0;
let seconds = 0;
let startButton = document.getElementById('startStop');
let resetButton = document.getElementById('reset');
let pressed = false;
let interval = null;
let onTitlePage = true;
let clock = document.getElementById("clockdisplay");
let roundNumber = 0;
let letsReset = false;
let firstTime = true;
let totalDifference = 0;
let currentTarget = 0;
let difference = 1;
let congrats = false;
let playAgainButton = document.getElementById('playAgain');
let highScore = Number.MAX_VALUE;

// TODO --> keep record of scores and display record at ending screen
// make a play again button as well
// consider different messages at the end based how good difference is

// stopwatch function --> when to increment

function stopwatch() {
    
    decimals++;
    // when to increment
    if (decimals / 60 === 1) {
        decimals = 0;
        seconds++;
    }
    if (decimals < 10) {
        clock.innerHTML = seconds + '.0' + decimals;
    } else {
        clock.innerHTML = seconds + '.' + decimals;
    } 
}

function generateTarget() {
    return Math.floor(Math.random() * 9) + 2;
}
currentTarget = generateTarget();
document.getElementById('targetNumber').innerHTML =  "Your target number is: " + currentTarget;

function reset() {
    window.clearInterval(interval);
    decimals = 0;
    seconds = 0;
    document.getElementById('clockdisplay').innerHTML = '0.0';
}

playAgainButton.onclick = () => {
    currentTarget = generateTarget();
    document.getElementById('targetNumber').innerHTML =  "Your target number is: " + currentTarget;
    playAgainButton.style.visibility = 'hidden';
    document.getElementById('youBrokeTheRecord').style.display = 'none';
    document.getElementById('targetNumber').style.display = "";
    document.getElementById('round').style.display = "";
    document.getElementById('round').style.width = '100%';
    document.getElementById('round').style.textAlign = 'center';
    roundNumber = 1;
    document.getElementById('round').innerHTML = 'Round ' + roundNumber;
    totalDifference = 0;
    pressed = false;
    letsReset = false;
    decimals = 0;
    seconds = 0;
    document.getElementById('gameOverMessage').style.visibility = 'hidden';
    document.getElementById('highScore').style.visibility = 'hidden';
    clock.innerHTML = "0.0";
    clock.style.fontSize = "72px";
    clock.style.fontFamily = 'Times New Roman';
    
}

function gameOver() {
    document.getElementById('targetNumber').style.display = 'none';
    document.getElementById('round').style.display = 'none';
    document.getElementById('gameOverMessage').innerHTML = "Congrats! The game is over";
    document.getElementById('gameOverMessage').style.visibility = 'visible';
    clock.innerHTML = "The total difference was " + totalDifference.toFixed(2) + ' seconds';
    if (totalDifference < highScore) {
        highScore = totalDifference;
        document.getElementById('youBrokeTheRecord').style.display = "";
        document.getElementById('youBrokeTheRecord').style.visibility = 'visible';
        document.getElementById('youBrokeTheRecord').innerHTML = 'New high score!';
        document.getElementById('youBrokeTheRecord').style.backgroundColor = 'wheat';
    }
    document.getElementById('highScore').innerHTML = 'The high score is ' + highScore.toFixed(2) + ' seconds!';
    document.getElementById('highScore').style.visibility = 'visible';
    clock.style.fontFamily = "Rock Salt";
    clock.style.fontSize = '30px';
    document.getElementById('playAgain').style.visibility = 'visible';
}



function compareTimeToTarget(target) {
    let clockTime = (100*seconds) + decimals;
    return Math.abs((100*target) - clockTime) / 100;
}


document.onkeydown = () => {
    if (onTitlePage) {
        roundNumber++;
        document.getElementById('instructionTitle').style.display = 'none';
        document.getElementById('instructions-row').style.display = 'none';
        document.getElementById('targetNumber').style.visibility = 'visible';
        document.getElementById('round').innerHTML = 'Round ' + roundNumber;
        document.getElementById('round').style.visibility = 'visible';
        clock.style.visibility = 'visible';
        onTitlePage = false;
    } else if (!pressed && !letsReset) {
    interval = window.setInterval(stopwatch, 16.5);
    pressed = true;
    firstTime = false;
    } else if (pressed && roundNumber < 4) {
        window.clearInterval(interval);
        difference = compareTimeToTarget(currentTarget);
        if (difference === 0) {
            document.getElementById('gameOverMessage').innerHTML = "Wow! Perfect!!";
            document.getElementById('gameOverMessage').style.backgroundColor = 'wheat';
            document.getElementById('gameOverMessage').style.visibility = 'visible';
            congrats = true;
        }
        totalDifference += difference;
        pressed = false;
        letsReset = true;
    } else if (letsReset && roundNumber < 3) {
        if (congrats) {
            document.getElementById('gameOverMessage').style.visibility = 'hidden';
            congrats = false;
        }
        roundNumber++;
        document.getElementById('round').innerHTML = 'Round ' + roundNumber;
        currentTarget = generateTarget();
        document.getElementById('targetNumber').innerHTML =  "Your target number is: " + currentTarget;
        reset();
        letsReset = false;
    } else {
        gameOver();
        window.clearInterval(interval);
        
    }
}

