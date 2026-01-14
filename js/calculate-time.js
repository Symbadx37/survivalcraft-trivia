let timerObject;
function setTimer() {
    // Create timer object
    if (typeof sessionData.booleanFlags.hasTimer == "undefined") {
        switch(sessionData.quizParameters.quizDuration) {
            case 1:
                sessionData.quizParameters.currentMinute = 1;
                sessionData.quizParameters.currentSecond = 30; break;
            case 2:
                sessionData.quizParameters.currentMinute = 1; 
                sessionData.quizParameters.currentSecond = 0; break;
            case 3:
                sessionData.quizParameters.currentMinute = 0;
                sessionData.quizParameters.currentSecond = 30; break;
            default:
                sessionData.booleanFlags.hasTimer = false;
        }
        sessionData.booleanFlags.hasTimer = true;
        timerObject = setInterval(updateTimer, 1000);
    }    
    updateSession("save");
}

function clearTimer() {
    clearInterval(timerObject);
}


function updateTimer() {
    // Clear object when timer reaches zero
    if (sessionData.quizParameters.currentSecond == 0 && sessionData.quizParameters.currentSecond == 0) {
        clearTimer();
        sessionData.quizParameters.isTimeUp = true;
    }
    // Decrement timer count
    else if (sessionData.quizParameters.currentSecond !== 0) {
        sessionData.quizParameters.currentSecond -= 1;
        displayTimer();
    }
    else if (sessionData.quizParameters.currentSecond == 0) {
        sessionData.quizParameters.currentMinute -= 1;
        sessionData.quizParameters.currentSecond = 59;
        displayTimer();
    }
    updateSession("save");
}

function displayTimer() {
    console.log("Minutes: ", sessionData.quizParameters.currentMinute);
    console.log("Seconds: ", sessionData.quizParameters.currentSecond);
}