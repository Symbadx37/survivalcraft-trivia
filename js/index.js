const tierCount = 4;
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
        // Load Session data
        let sessionData = Session.getData(localStorage.getItem("sessionData"));
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

function initializeQuiz(id) {
    let sessionData = Session.getData(localStorage.getItem("sessionData"));
    let quizTier;
    switch(id) {
        case "tier_1":
            sessionData.quizTier = 1;
            quizTier = 1;
            break;
        case "tier_2":
            sessionData.quizTier = 2;
            quizTier = 2;
            break;
        case "tier_3":
            sessionData.quizTier = 3;
            quizTier = 3;
            break;
        case "tier_4":
            sessionData.quizTier = 4;
            quizTier = 4;
            break;
         case "tier_rdm":
            sessionData.quizTier = 5;
            quizTier = 5;
            break;
        case "category_1":
            sessionData.quizCategory = 1;
            break;
        case "category_2":
            sessionData.quizCategory = 2;
            break;
        case "category_3":
            sessionData.quizCategory = 3;
            break;
        case "category_4":
            sessionData.quizCategory = 4;
            break;
        case "category_5":
            sessionData.quizCategory = 5;
            break;
        case "category_6":
            sessionData.quizCategory = 6;
            break;
        case "category_7":
            sessionData.quizCategory = 7;
            break;
        case "category_rdm":
            sessionData.quizCategory = 8;
            break;
        case "length_1":
            sessionData.quizLength = 1;
            break;
        case "length_2":
            sessionData.quizLength = 2;
            break;
        case "length_3":
            sessionData.quizLength = 3;
            break;
        case "length_rdm":
            sessionData.quizLength = 4;
            break;
        case "duration_1":
            sessionData.quizDuration = 1;
            break;
        case "duration_2":
            sessionData.quizDuration = 2;
            break;
        case "duration_3":
            sessionData.quizDuration = 3;
            break;
        case "duration_none":
            sessionData.quizDuration = 4;
            break;
        }
    sessionData = initializeTier(sessionData, quizTier);
    Session.setData(sessionData);
}
function initializeTier(sessionData, quizTier) {
    switch(quizTier) {
        case 1:
            sessionData.tierProbability = probability_beginner;
            break;
        case 2:
            sessionData.tierProbability = probability_intermediate;
            break;
        case 3:
            sessionData.tierProbability = probability_experienced;
            break;
        case 4:
            sessionData.tierProbability = probability_veteran;
            break;
    }
    return sessionData;
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
            let randomNumber = Math.floor((Math.random() * categoryCount) + 1);
            let randomCategory = randomNumber;
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
            let randomNumber = Math.floor((Math.random() * questionIndexRange) + 1);
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
function startQuiz() { 
    let sessionData = Session.getData(localStorage.getItem("sessionData"));
    sessionData.preloadNeeded = true;
    sessionData.isActive = true;
    Session.setData(sessionData);
    window.location.replace("quiz.html");
}
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
function stopQuiz() {
    Session.clearData();
    window.location.replace("../pgs/options.html");
}
function exitSetup() {
    Session.clearData();
    window.location.replace("index.html");
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