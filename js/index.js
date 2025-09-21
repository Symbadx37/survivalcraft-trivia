const tierCount = 4;
const quizLengthMax = 4;
const quizDurationMax = 5;
const categoryCount = 7;
const questionCount = {
    1: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
    2: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
    3: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
    4: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
    5: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
    6: {1: 10, 2: 19, 3: 26, 4: 25, 5: 20},
    7: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
};

const probability_beginner = {1: 0.55, 2: 0.4, 3: 0.05, 4: 0, 5: 0};
const probability_intermediate = {1: 0.4, 2: 0.3, 3: 0.15, 4: 0.5, 5: 0};
const probability_experienced = {1: 0.15, 2: 0.4, 3: 0.3, 4: 0.1, 5: 0.05};
const probability_veteran = {1: 0, 2: 0.1, 3: 0.4, 4: 0.35, 5: 0.15};

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
        // Load page data
        if (sessionData.preloadNeeded) {
            sessionData.preloadNeeded = false;
            Session.setData(sessionData);
            generateQuestion();
            loadQuiz();
        }
        else if (sessionData.isActive) {
            loadQuiz();
        } 
        else if (sessionData.isActive == false && sessionData.preloadNeeded == false) {
            // loadResults();
        }
    }
);
function continueQuiz() { 
    let sessionData = Session.getData(localStorage.getItem("sessionData"));
    if (sessionData.quizState == 2 || sessionData.quizState == 3) {
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
            Session.setData(sessionData);
            generateQuestion();
            loadQuiz();
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
            let randomTier = Math.floor((Math.random() * tierCount) + 1)
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
        if (sessionData.quizCategory == 8) {
            let randomCategory = Math.floor((Math.random() * categoryCount) + 1);
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
            if (sessionData["nextIndex"][categoryIndex][randomDifficulty] > questionCount[categoryIndex][randomDifficulty]) {
                delete sessionData["tierProbability"][randomDifficulty];
                generateRandomIndex();
            }
        }
    }
    function getQuestionIndex() {
        let questionIndexRange = questionCount[categoryIndex][difficultyIndex];
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
function stopQuiz() {
    Session.clearData();
    window.location.replace("../pgs/options.html");
}
function exitSetup() {
    Session.clearData();
    window.location.replace("../index.html");
}
function resetSetup() {
    Session.clearData();
    window.location.reload();
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