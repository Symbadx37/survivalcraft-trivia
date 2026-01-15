let timerObject;
function loadTimer(actionID) {
    switch(actionID) {
        case "set": 
            if (!sessionData.booleanFlags.isAnswerSubmitted) {
                displayTimer(); setTimer(); createTimer(); 
            } break;
        case "reset": clearTimer(); setTimer(); displayTimer(); createTimer(); break;
    }

    function setTimer() {
        if (typeof sessionData.booleanFlags.hasTimer == "undefined" || actionID == "reset") {
            switch(sessionData.quizParameters.quizDuration) {
                case 1:
                    sessionData.quizParameters.currentMinute = 3;
                    sessionData.quizParameters.currentSecond = 0; break;
                case 2:
                    sessionData.quizParameters.currentMinute = 2; 
                    sessionData.quizParameters.currentSecond = 0; break;
                case 3:
                    sessionData.quizParameters.currentMinute = 1;
                    sessionData.quizParameters.currentSecond = 0; break;
                default:
                    sessionData.booleanFlags.hasTimer = false;
            }
            sessionData.booleanFlags.hasTimer = true;
            updateSession("save");
        }
    }
}

function updateTimer() {
    // Clear object when timer reaches zero
    if (sessionData.quizParameters.currentSecond == 0 && sessionData.quizParameters.currentSecond == 0) {
        clearTimer();
        sessionData.quizParameters.isTimeUp = true;
    }

    // WIP: FIX ISSUE WITH TIMER NOT DECREMENTING AFTER HITTING 0:59
    // Decrement minute and seconds
    if (sessionData.quizParameters.currentSecond == 0) {
        sessionData.quizParameters.currentMinute -= 1;
        sessionData.quizParameters.currentSecond = 59;
        displayTimer();
    }
    // Decrement seconds
    if (sessionData.quizParameters.currentSecond !== 0) {
        sessionData.quizParameters.currentSecond -= 1;
        displayTimer();
    }
    
    updateSession("save");
}

function createTimer() {
    timerObject = setInterval(updateTimer, 1000);
}

function clearTimer() {
    clearInterval(timerObject);
}

// WIP: ADD CODE TO HIDE TIMER WHEN DURATION IS SET TO NONE
function displayTimer() {
    let lookupIndex = 1;
    while (lookupIndex <= Object.values(sessionData["pageElements"]["quiz"]).length) {
        if (sessionData["pageElements"]["quiz"]["node_" + lookupIndex]["element"]["id"] == "quiz_timeRemainingText") {
            if (sessionData.quizParameters.currentSecond < 10) {
                timeString = "0" + sessionData.quizParameters.currentMinute.toString() + ":" + "0" + sessionData.quizParameters.currentSecond.toString();
            } 
            else {
                timeString = "0" + sessionData.quizParameters.currentMinute.toString() + ":" + sessionData.quizParameters.currentSecond.toString();
            }
            sessionData["pageElements"]["quiz"]["node_" + lookupIndex]["value"]["text"] = timeString;
            updateSession("load", "quiz", "load_partial", [lookupIndex]);
            break;
        }
        lookupIndex++;
    }
}