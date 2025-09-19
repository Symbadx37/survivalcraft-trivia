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
        if (typeof sessionData.isActive == "undefined"){
            if (typeof sessionData.tierState !== "undefined") {
                getElement(sessionData.tierState).disabled = true;
            }
            if (typeof sessionData.ctgrState !== "undefined") {
                getElement(sessionData.ctgrState).disabled = true;
            }
            if (typeof sessionData.lgthState !== "undefined") {
                getElement(sessionData.lgthState).disabled = true;
            }
            if (typeof sessionData.drtnState !== "undefined") {
                getElement(sessionData.drtnState).disabled = true;
            }
        }

        // Initialize or load quiz
        if (sessionData.preloadNeeded) {
            sessionData.preloadNeeded = false;
            Session.setData(sessionData);
            generateQuestion();
            loadQuiz();
        }
        else if (typeof sessionData.isActive !== "undefined") {
            loadQuiz();
        }
    }
);
function continueQuiz() { 
    let sessionData = Session.getData(localStorage.getItem("sessionData"));
    if (sessionData.quizState == 2 || sessionData.quizState == 3) {
        sessionData.activeQuestion += 1;
        sessionData.quizState = 1;
        Session.setData(sessionData);
        generateQuestion();
        loadQuiz();
    }
}
function initializeSetup(id) {
    let sessionData = Session.getData(localStorage.getItem("sessionData"));
    let parsedString = id.slice(0,4);
    
    // Update button states
    if (typeof sessionData[parsedString + "State"] == "undefined") {
        getElement(id).disabled = true;
        sessionData[parsedString + "State"] = id;
    } 
    else if (typeof sessionData[parsedString + "State"] !== "undefined" && id !== sessionData[parsedString + "State"]) {
        getElement(id).disabled = true;
        getElement(sessionData[parsedString + "State"]).disabled = false;
        sessionData[parsedString + "State"] = id;
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
        if (typeof sessionData.tierState == "undefined") {
            alert("Difficulty tier must be selected.");
            return;
        }
        else if (typeof sessionData.ctgrState == "undefined") {
            alert("Question category must be selected.");
            return;
        }
        else if (typeof sessionData.lgthState == "undefined") {
            alert("Question count must be selected.");
            return;
        }
        else if (typeof sessionData.drtnState == "undefined") {
            alert("Time limit must be selected.");
            return;
        } else {
            sessionData.isSetupValid = true;
            initializeData();  
        }
    }
    function initializeData() {
        // "tier_3" -> quizTier = 3
        // buttonStates = {0,0,0,0}
        // sessionData.quizTier = setupButtonStates[0];
        // delete setupButtonStates;

        delete sessionData.tierState;
        
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
        generateRandomNumber(); 
        console.log("[SYSTEM]: Parameter randomDifficulty = " + randomDifficulty + " (" + getTime() + ").");
        return randomDifficulty;

        function generateRandomNumber() {
            for(let i in sessionData.tierProbability) {
                probabilitySum += sessionData.tierProbability[i];
            }
            randomNumber = Math.random() * probabilitySum;
            for (let i in sessionData.tierProbability) {
                randomNumber -= sessionData.tierProbability[i];
                if (randomNumber <= 0) {
                    randomDifficulty = parseInt(i)
                    if (sessionData["nextIndex"][categoryIndex][randomDifficulty] > questionCount[categoryIndex][randomDifficulty]) {
                        delete sessionData["tierProbability"][randomDifficulty];
                        generateRandomNumber();
                    }
                    break;
                }  
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
            let randomQuestion = Math.floor((Math.random() * questionIndexRange) + 1);
            randomQuestion = randomNumber;
        }
        function lookupIndex() {
            for (let lookupIndex = 1; lookupIndex <= questionIndexRange; lookupIndex++) {
                if (sessionData["generatedIndexes"][categoryIndex][difficultyIndex][lookupIndex - 1] == randomQuestion) {
                    console.log("index matches, regenerating ...");
                    generateRandomIndex();
                    lookupIndex();   
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