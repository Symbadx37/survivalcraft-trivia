let timerObject;
function loadTimer(actionID) {
    if (sessionData.quizParameters.quizDuration !== 4) {
        switch(actionID) {
            case "set": 
                if (!sessionData.booleanFlags.isAnswerSubmitted) {
                    displayTimer(); setTimer(); createTimer(); 
                } break;
            case "reset": clearTimer(); setTimer(); displayTimer(); createTimer(); break;
            case "stop": clearTimer(); break;
        }
    }

    function setTimer() {
        if (typeof sessionData.booleanFlags.hasTimer == "undefined" || actionID == "reset") {
            switch(sessionData.quizParameters.quizDuration) {
                case 1:
                    sessionData.quizParameters.secondsRemaining = 90; break;
                case 2:
                    sessionData.quizParameters.secondsRemaining = 60; break;
                case 3:
                    sessionData.quizParameters.secondsRemaining = 30; break;
                default:
                    sessionData.booleanFlags.hasTimer = false;
            }

            // Update flags
            sessionData.quizParameters.isTimeUp = false;
            sessionData.booleanFlags.hasTimer = true;
            updateSession("save");
        }
    }

    function updateTimer() {
        // Decrement count
        if (sessionData.quizParameters.secondsRemaining !== 0) {
            sessionData.quizParameters.secondsRemaining -= 1;
            displayTimer();
        } else {
            sessionData.quizParameters.isTimeUp = true;
            clearTimer();
            displayTimer();
        }
        updateSession("save");
    }

    function displayTimer() {
        let lookupIndex = 1;
        while (lookupIndex <= Object.values(sessionData["pageElements"]["quiz"]).length) {
            if (sessionData["pageElements"]["quiz"]["node_" + lookupIndex]["element"]["id"] == "quiz_timeRemainingText") {
                if (!sessionData.quizParameters.isTimeUp) {
                    const currentMinute = Math.floor(sessionData.quizParameters.secondsRemaining / 60);
                    const currentSecond = sessionData.quizParameters.secondsRemaining % 60;
                    if (currentSecond < 10) {
                        sessionData["pageElements"]["quiz"]["node_" + lookupIndex]["value"]["text"] = "0" + currentMinute.toString() + ":" + "0" + currentSecond.toString();
                    } 
                    else {
                        sessionData["pageElements"]["quiz"]["node_" + lookupIndex]["value"]["text"] = "0" + currentMinute.toString() + ":" + currentSecond.toString();
                    }
                } else {
                    sessionData["pageElements"]["quiz"]["node_" + lookupIndex]["value"]["text"] = "Time up. Awarded points will be reduced.";
                }
                updateSession("load", "quiz", "load_partial", [lookupIndex]);
                break;
            }
            lookupIndex++;
        }
    }

    function createTimer() {
        timerObject = setInterval(updateTimer, 1000);
    }
    
    function clearTimer() {
        clearInterval(timerObject);
    }
}