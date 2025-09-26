document.addEventListener("DOMContentLoaded", 
    function() {
        // Initialize Session object
        if (typeof localStorage.sessionData === "undefined") {
            let sessionObject = new Session();
            Session.setData(sessionObject);
        }
        let sessionData = Session.getData(localStorage.getItem("sessionData"));
        // Load button states
        if (typeof sessionData.isActive == "undefined") {
            if (sessionData["buttonStates"]["tier"]["state"] !== 0) {
                getElement(sessionData["buttonStates"]["tier"]["id"]).disabled = true;
            }
            if (sessionData["buttonStates"]["ctgr"]["state"] !== 0) {
                getElement(sessionData["buttonStates"]["ctgr"]["id"]).disabled = true;
            }
            if (sessionData["buttonStates"]["lgth"]["state"] !== 0) {
                getElement(sessionData["buttonStates"]["lgth"]["id"]).disabled = true;
            }
            if (sessionData["buttonStates"]["drtn"]["state"] !== 0) {
                getElement(sessionData["buttonStates"]["drtn"]["id"]).disabled = true;
            }
        }
        // Preload page
        if (sessionData.preloadNeeded) {
            sessionData.preloadNeeded = false;
            getElement("continue").disabled = true;
            Session.setData(sessionData);
            generateQuestion();
            loadQuiz();
            loadTimer();
        }
        // Load quiz data
        else if (sessionData.isActive) {
            if (sessionData.quizState == 1) {
                getElement("continue").disabled = true;
                if (sessionData.isTimeUp) {
                    getElement("error_time").classList.add("elm-error-time_hidden");
                    sessionData.isTimeUp = false;
                    Session.setData(sessionData);
                }
            }
            if (sessionData.quizState == 2) {
                getElement("choice_1").disabled = true;
                getElement("choice_2").disabled = true;
                getElement("choice_3").disabled = true;
                getElement("choice_4").disabled = true;
                if (sessionData.answerState.state == "wrong") {
                    getElement(sessionData.answerState.id).classList.add("btn-choice_wrong");
                } else {
                    getElement(sessionData.answerState.id).classList.add("btn-choice_right");
                } 
            }
            loadQuiz();
            loadTimer();
        } 
        // Load results data
        else if (sessionData.isActive == false && sessionData.preloadNeeded == false) {
            loadResults();
        }
    }
);
function startQuiz() {
    let sessionData = Session.getData(localStorage.getItem("sessionData"));
    validateSetup();
    if (sessionData.isSetupValid == true) {
        sessionData.preloadNeeded = true;
        sessionData.isActive = true;
        Session.setData(sessionData);
        window.location.replace("quiz.html");
    }
    function validateSetup() {
        if (sessionData["buttonStates"]["tier"]["state"] == 0) {
            alert("Difficulty tier must be selected.");
            return;
        }
        else if (sessionData["buttonStates"]["ctgr"]["state"] == 0) {
            alert("Question category must be selected.");
            return;
        }
        else if (sessionData["buttonStates"]["lgth"]["state"] == 0) {
            alert("Question count must be selected.");
            return;
        }
        else if (sessionData["buttonStates"]["drtn"]["state"] == 0) {
            alert("Time limit must be selected.");
            return;
        } else {
            sessionData.isSetupValid = true;
            initializeData();  
        }
    }
    function initializeData() {
        sessionData.quizTier = sessionData["buttonStates"]["tier"]["state"];
        sessionData.quizCategory = sessionData["buttonStates"]["ctgr"]["state"];
        sessionData.quizLength = sessionData["buttonStates"]["lgth"]["state"];
        sessionData.quizDuration = sessionData["buttonStates"]["drtn"]["state"];
        
        if (sessionData.quizTier == 5) {
            let randomTier = Math.floor((Math.random() * quizTierMax) + 1)
            sessionData.quizTier = randomTier;
            console.log("[SYSTEM]: Parameter randomTier = " + sessionData.quizTier + " (" + getTime() + ").");
        }
        if (sessionData.quizLength == 4) {
            let randomLength = Math.floor((Math.random() * quizLengthMax) + 1)
            sessionData.quizLength = randomLength;
            console.log("[SYSTEM]: Parameter randomLength = " + sessionData.quizLength + " (" + getTime() + ").");
        }
        if (sessionData.quizDuration == 5) {
            let randomDuration = Math.floor((Math.random() * quizDurationMax) + 1)
            sessionData.quizDuration = randomDuration;
            console.log("[SYSTEM]: Parameter randomDuration = " + sessionData.quizDuration + " (" + getTime() + ").");
        }
        switch(sessionData.quizTier) {
            case 1: sessionData.tierProbability = probability_beginner; break;
            case 2: sessionData.tierProbability = probability_intermediate; break;
            case 3: sessionData.tierProbability = probability_experienced; break;
            case 4: sessionData.tierProbability = probability_veteran; break;
        }
        Session.setData(sessionData);
    } 
}
function continueQuiz() { 
    let sessionData = Session.getData(localStorage.getItem("sessionData"));
    if (sessionData.quizState == 2) {
        switch(sessionData.quizLength) {
            case 1: 
                if (sessionData.activeQuestion == 10) {
                    sessionData.isActive = false;
                    Session.setData(sessionData);
                    window.location.replace("results.html");
                }
                break;
            case 2:
                if (sessionData.activeQuestion == 20) {
                    sessionData.isActive = false;
                    Session.setData(sessionData);
                    window.location.replace("results.html");
                }
                break;
            case 3:
                if (sessionData.activeQuestion == 30) {
                    sessionData.isActive = false;
                    Session.setData(sessionData);
                    window.location.replace("results.html");
                }
                break;
        }  
        if (sessionData.isActive) {
            sessionData.activeQuestion += 1;
            sessionData.quizState = 1;
            sessionData.isTimerResetNeeded = true;
            getElement("continue").disabled = true;
            if (sessionData.answerState.state == "wrong") getElement(sessionData.answerState.id).classList.remove("btn-choice_wrong");
            else getElement(sessionData.answerState.id).classList.remove("btn-choice_right");
            getElement("choice_1").disabled = false;
            getElement("choice_2").disabled = false;
            getElement("choice_3").disabled = false;
            getElement("choice_4").disabled = false;
            Session.setData(sessionData);
            generateQuestion();
            loadQuiz();
            loadTimer();
        }
    }
}
function initializeSetup(id) {
    let sessionData = Session.getData(localStorage.getItem("sessionData"));
    let parsedInt = parseInt(id.charAt(5));
    let parsedString = id.slice(0,4);

    // Update button states
    if (sessionData["buttonStates"][parsedString]["state"] == 0) {
        getElement(id).disabled = true;
        sessionData["buttonStates"][parsedString]["id"] = id;
        sessionData["buttonStates"][parsedString]["state"] = parsedInt;
    } 
    else if (sessionData["buttonStates"][parsedString]["state"] !== 0 && id !== sessionData["buttonStates"][parsedString]["state"]) {
        getElement(id).disabled = true;
        getElement(sessionData["buttonStates"][parsedString]["id"]).disabled = false;
        sessionData["buttonStates"][parsedString]["id"] = id;
        sessionData["buttonStates"][parsedString]["state"] = parsedInt;
    }
    Session.setData(sessionData);
}
function generateQuestion() {
    let sessionData = Session.getData(localStorage.getItem("sessionData"));
    let categoryIndex = getCategoryIndex();
    let difficultyIndex = getDifficultyIndex();
    let questionIndex = getQuestionIndex();

    sessionData.categoryIndex = categoryIndex;
    sessionData.difficultyIndex = difficultyIndex;
    sessionData.questionIndex = questionIndex;
    Session.setData(sessionData);

    function getCategoryIndex() {
        if (sessionData.quizCategory == 5) {
            let randomCategory = Math.floor((Math.random() * quizCategoryMax) + 1);
            console.log("[SYSTEM]: Parameter randomCategory = " + randomCategory + " (" + getTime() + ").");
        } else {
            randomCategory = sessionData.quizCategory;
            console.log("[SYSTEM]: Parameter quizCategory = " + sessionData.quizCategory + " (" + getTime() + ").");
        }
        return randomCategory;
    } 
    function getDifficultyIndex() {
        let probabilitySum = 0, randomNumber = 0, randomDifficulty;
        generateRandomIndex();
        validateIndex();
        console.log("[SYSTEM]: Parameter randomDifficulty = " + randomDifficulty + " (" + getTime() + ").");
        return randomDifficulty;

        function generateRandomIndex() {
            for(let i in sessionData.tierProbability) {
                probabilitySum += sessionData.tierProbability[i];
            }
            randomNumber = Math.random() * probabilitySum;
            for (let i in sessionData.tierProbability) {
                randomNumber -= sessionData.tierProbability[i];
                if (randomNumber <= 0) {
                    randomDifficulty = parseInt(i)
                    break; 
                }  
            }
        }
        function validateIndex() {
            if (sessionData["nextIndex"][categoryIndex][randomDifficulty] > quizQuestionMax[categoryIndex][randomDifficulty]) {
                delete sessionData["tierProbability"][randomDifficulty];
                generateRandomIndex();
            }
        }
    }
    function getQuestionIndex() {
        let questionIndexRange = quizQuestionMax[categoryIndex][difficultyIndex];
        let randomQuestion;
        generateRandomIndex();
        lookupIndex();
        return randomQuestion;

        function generateRandomIndex() {
            randomQuestion = Math.floor((Math.random() * questionIndexRange) + 1);
        }
        function lookupIndex() {
            let lookupNeeded = true;
            let lookupIndex = 0;
            while (lookupNeeded) {
                if (sessionData["generatedIndexes"][categoryIndex][difficultyIndex][lookupIndex - 1] == randomQuestion) {
                    console.log("has match, regenerating ...");
                    generateRandomIndex();
                    lookupIndex = 0;
                } 
                else if (lookupIndex >= questionIndexRange || lookupIndex == sessionData.activeQuestion - 1) {
                    console.log("no match, exiting ...");
                    lookupNeeded = false;
                    break;
                } else {
                    lookupIndex++;
                }
            }
            let nextIndex = sessionData["nextIndex"][categoryIndex][difficultyIndex];
            sessionData["generatedIndexes"][categoryIndex][difficultyIndex][nextIndex] = randomQuestion;
            sessionData["nextIndex"][categoryIndex][difficultyIndex] = sessionData["nextIndex"][categoryIndex][difficultyIndex] + 1;
            console.log("[SYSTEM]: Parameter randomQuestion = " + randomQuestion + " (" + getTime() + ").");
        }
    }
}
function loadQuiz() { 
    let sessionData = Session.getData(localStorage.getItem("sessionData"));
    let questionData = getParser();
    let questionString, choiceString_a, choiceString_b, choiceString_c, choiceString_d;
    parseData();
    loadData();
    
    function parseData() {
        questionString = questionData["category_" + sessionData.categoryIndex]["difficulty_" + sessionData.difficultyIndex][sessionData.questionIndex - 1]["question"];
        choiceString_a = questionData["category_" + sessionData.categoryIndex]["difficulty_" + sessionData.difficultyIndex][sessionData.questionIndex - 1]["choice"][0];
        choiceString_b = questionData["category_" + sessionData.categoryIndex]["difficulty_" + sessionData.difficultyIndex][sessionData.questionIndex - 1]["choice"][1];
        choiceString_c = questionData["category_" + sessionData.categoryIndex]["difficulty_" + sessionData.difficultyIndex][sessionData.questionIndex - 1]["choice"][2];
        choiceString_d = questionData["category_" + sessionData.categoryIndex]["difficulty_" + sessionData.difficultyIndex][sessionData.questionIndex - 1]["choice"][3];
    }
    function loadData() {
        let tierString, categoryString, difficultyString, lengthString;
        switch(sessionData.quizTier) {
            case 1: tierString = "Beginner"; break;
            case 2: tierString = "Intermediate"; break;
            case 3: tierString = "Experienced"; break;
            case 4: tierString = "Veteran"; break;
        }
        switch(sessionData.categoryIndex) {
            case 1: categoryString = "General Knowledge"; break;
            case 2: categoryString = "Game Mechanics"; break;
            case 3: categoryString = "Updates History"; break;
            case 4: categoryString = "Electrics"; break;
        }
        switch(sessionData.difficultyIndex) {
            case 1: difficultyString = "Very Easy"; break;
            case 2: difficultyString = "Easy"; break;
            case 3: difficultyString = "Medium"; break;
            case 4: difficultyString = "Hard"; break;
            case 5: difficultyString = "Very Hard"; break;
        }
        switch(sessionData.quizLength) {
            case 1: lengthString = "10"; break;
            case 2: lengthString = "20"; break;
            case 3: lengthString = "30"; break;
        }
        getElement("question").innerHTML = questionString;
        getElement("choice_1").value = choiceString_a;
        getElement("choice_2").value = choiceString_b;
        getElement("choice_3").value = choiceString_c;
        getElement("choice_4").value = choiceString_d;
        getElement("inf-tier").innerHTML = tierString;
        getElement("inf-category").innerHTML = categoryString;
        getElement("inf-difficulty").innerHTML = difficultyString;
        getElement("inf-progress").innerHTML = sessionData.activeQuestion + "/" + lengthString   
    }
}
function gradeQuiz(id) { 
    let sessionData = Session.getData(localStorage.getItem("sessionData"));
    let questionData = getParser();
    let userAnswer;
    switch(id) {
        case "choice_1": userAnswer = "a"; break;
        case "choice_2": userAnswer = "b"; break;
        case "choice_3": userAnswer = "c"; break;
        case "choice_4": userAnswer = "d"; break;
    }
    if (sessionData.quizState == 1) {
        sessionData.quizState = 2;
        getElement("continue").disabled = false;
        getElement("choice_1").disabled = true;
        getElement("choice_2").disabled = true;
        getElement("choice_3").disabled = true;
        getElement("choice_4").disabled = true;
        parseData();
        Session.setData(sessionData);
    }
    function parseData() {
        if (questionData["category_" + sessionData.categoryIndex]["difficulty_" + sessionData.difficultyIndex][sessionData.questionIndex - 1]["answer"] != userAnswer) {
            if (typeof sessionData.questionsWrong == "undefined") sessionData.questionsWrong = 0;
                sessionData.questionsWrong += 1;
                sessionData.answerState.state = "wrong";
                sessionData.answerState.id = id;
                getElement(id).classList.add("btn-choice_wrong");   
        } else {
            if (typeof sessionData.questionsRight == "undefined") sessionData.questionsRight = 0;
                sessionData.questionsRight += 1;
                sessionData.answerState.state = "right";
                sessionData.answerState.id = id;
                getElement(id).classList.add("btn-choice_right"); 
        } 
    }  
}
function loadTimer() {
    let timerObject;
    let timerData = Timer.getData(localStorage.getItem("timerData"));
    let sessionData = Session.getData(localStorage.getItem("sessionData"));
    if (typeof sessionData.hasTimer == "undefined") {
        setTimer();
    } 
    else if (sessionData.isTimerResetNeeded) {
        sessionData.isTimerResetNeeded = false;
        setTimer();
    }
    if (sessionData.hasTimer) {
        displayTimer();
        timerObject = setInterval(updateCount, 1000);
    } else {
        displayTimer();
        return;
    }
    function setTimer() {
        switch(sessionData.quizDuration) {
        case 1: timerData.currentMinute = 3; timerData.currentSecond = 0; sessionData.hasTimer = true; break;
        case 2: timerData.currentMinute = 2; timerData.currentSecond = 0; sessionData.hasTimer = true; break;
        case 3: timerData.currentMinute = 1; timerData.currentSecond = 0; sessionData.hasTimer = true; break;
        case 4: sessionData.hasTimer = false; break;
        }
        Session.setData(sessionData);
    }
    function updateCount() {
        let sessionData_active = Session.getData(localStorage.getItem("sessionData"));
        if (sessionData_active.quizState == 2) {
            clearInterval(timerObject);
        }
        else if (timerData.currentSecond == 0 && timerData.currentMinute == 0) {
            clearInterval(timerObject);
            getElement("error_time").classList.remove("elm-error-time_hidden");
            sessionData.isTimeUp = true;
            Session.setData(sessionData);  
        }
        else if (timerData.currentSecond !== 0) {
            timerData.currentSecond -= 1;
            Timer.setData(timerData);  
            displayTimer();
        } 
        else if (timerData.currentSecond == 0) {
            timerData.currentMinute -= 1;
            timerData.currentSecond = 59;
            Timer.setData(timerData);  
            displayTimer();
        } 
    }
    function displayTimer() {
        if (sessionData.hasTimer == false) {
            getElement("inf-time").innerHTML = "N/A";
        }
        else if (timerData.currentSecond < 10) {
            getElement("inf-time").innerHTML = timerData.currentMinute + ":" + "0" + timerData.currentSecond;
        } else {
            getElement("inf-time").innerHTML = timerData.currentMinute + ":" + timerData.currentSecond;
        }
    }
}
function loadResults() {
    let sessionData = Session.getData(localStorage.getItem("sessionData"));
    let lengthString;
    switch(sessionData.quizLength) {
        case 1: lengthString = "10"; break;
        case 2: lengthString = "20"; break;
        case 3: lengthString = "30"; break;
    }
    getElement("inf-points").innerHTML = 0;
    getElement("inf-accuracy").innerHTML = sessionData.questionsRight + "/" + lengthString;
}

function getElement(id) {
    return document.getElementById(id);
}
function getDate() {
    let currentDate = new Date().toLocaleDateString();
    return currentDate;
}
function getTime() {
    let currentTime = new Date().toLocaleTimeString();
    return currentTime;
}