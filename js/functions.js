// Global variables
let quizTier, quizCategory, quizLength, quizDuration;
let categoryIndex, difficultyIndex, questionIndex, tierProbability;

// Question index
const questionCount = {
    ve_general: 0, ve_mechanics: 0, ve_recipes: 0, ve_updates: 0, ve_electrics: 0,
    e_general: 0, e_mechanics: 0, e_recipes: 0, e_updates: 0, e_electrics: 0,
    m_general: 0, m_mechanics: 0, m_recipes: 0, m_updates: 0, m_electrics: 0,
    h_general: 0, h_mechanics: 0, h_recipes: 0, h_updates: 0, h_electrics: 0,
    ve_general: 0, ve_mechanics: 0, ve_recipes: 0, ve_updates: 0, ve_electrics: 0,
};

const questionTotal = 
    questionCount.ve_general + questionCount.ve_mechanics + questionCount.ve_recipes + questionCount.ve_updates + questionCount.ve_electrics
    + questionCount.e_general + questionCount.e_mechanics + questionCount.e_recipes + questionCount.e_updates + questionCount.e_electrics
    + questionCount.m_general + questionCount.m_mechanics + questionCount.m_recipes + questionCount.m_updates + questionCount.m_electrics
    + questionCount.h_general + questionCount.h_mechanics + questionCount.h_recipes + questionCount.h_updates + questionCount.h_electrics
    + questionCount.vh_general + questionCount.vh_mechanics + questionCount.vh_recipes + questionCount.vh_updates + questionCount.vh_electrics;

// GLOBAL FUNCTIONS
// Retrieves user data from local storage and saves it to global variables
document.addEventListener('DOMContentLoaded', 
    function() {
        let savedData = getData();
        quizTier = savedData.quizTier;
        quizCategory = savedData.quizCategory;
        quizLength = savedData.quizLength;
        quizDuration = savedData.quizDuration;

        console.log("[SYSTEM]: User data saved to global variables" + " (" + getTime() + ").");
    }
);

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

function startQuiz(id) {    
    if (id == "start")
        // getRandomQuestion();
        window.location.replace("quiz.html");
}

function stopQuiz(id) {    
    if (id == "back")
        window.location.replace("../index.html");
}

function initializeTier(quizTier) {
    // Objects for storing probabilities
    const probability_beginner = {1:0.55, 2:0.4, 3:0.05, 4:0.0, 5:0.0}; // Very Easy, Easy, and Medium questions.
    const probability_intermediate = {1:0.4, 2:0.3, 3:0.15, 4:0.5, 5:0.0}; // Very Easy, Easy, Medium, and Hard questions.
    const probability_experienced = {1:0.15, 2:0.40, 3:0.3, 4:0.1, 5:0.05}; // Very Easy, Easy, Medium, Hard, and Very Hard questions.
    const probability_veteran = {1:0.00, 2:0.1, 3:0.4, 4:0.35, 5:0.15}; // Easy, Medium, Hard, and Very Hard questions.

    // Assign active array
    switch(quizTier) {
        case "1":
            tierProbability = probability_beginner;
            break;
        case "2":
            tierProbability = probability_intermediate;
            break;
        case "3":
            tierProbability = probability_experienced;
            break;
        case "4":
            tierProbability = probability_veteran;
            break;
        default:
            tierProbability = probability_beginner;
    }
}

function initializeQuiz(id) {
    let data = {};
    switch(id) {
        case "tier_1":
            data.quizTier = 1;
            break;
        case "tier_2":
            data.quizTier = 2;
            break;
        case "tier_3":
            data.quizTier = 3;
            break;
        case "tier_4":
            data.quizTier = 4;
            break;
         case "tier_rdm":
            data.quizTier = 5;
            break;
        case "category_1":
            data.quizCategory = 1;
            break;
        case "category_2":
            data.quizCategory = 2;
            break;
        case "category_3":
            data.quizCategory = 3;
            break;
        case "category_4":
            data.quizCategory = 4;
            break;
        case "category_5":
            data.quizCategory = 5;
            break;
        case "category_rdm":
            data.quizCategory = 6;
            break;
        case "length_1":
            data.quizLength = 1;
            break;
        case "length_2":
            data.quizLength = 2;
            break;
        case "length_3":
            data.quizLength = 3;
            break;
        case "length_rdm":
            data.quizLength = 4;
            break;
        case "duration_1":
            data.quizDuration = 1;
            break;
        case "duration_2":
            data.quizDuration = 2;
            break;
        case "duration_3":
            data.quizDuration = 3;
            break;
        case "duration_none":
            data.quizDuration = 4;
            break;
        }
    saveData(data);
    initializeTier(quizTier);
}

function getRandomQuestion() {
    // Get probability sum
    let sum = 0;
    for(let i in tierProbability){
        sum += tierProbability[i];
    }

    // Generate random difficulty
    function generateRandomDifficulty() {
        let value = Math.random() * sum;
        for (let randomDifficulty in tierProbability) {
            value -= tierProbability[randomDifficulty];

            if (value <= 0) {
                console.log("Random Difficulty = " + randomDifficulty);
                return randomDifficulty;
            }
        }
    }

    // Generate random question
    function generateRandomQuestion() {
        let questionCount, randomQuestion;
        switch(quizTier) {
            case 1:
                questionCount = questionCount_ve;
                break;
            case 2:
                questionCount = questionCount_e;
                break;
            case 3:
                questionCount = questionCount_m;
                break;
            case 4:
                questionCount = questionCount_h;
                break;
            case 5:
                questionCount = questionCount_vh;
                break;
        }
        randomQuestion = Math.floor((Math.random() * questionCount) + 1);
        console.log("Random Question = " + randomQuestion);
        return randomQuestion;
    }

    // Parse question index
    function parseIndex() {
        difficultyIndex = randomDifficulty - 1;
        questionIndex = randomQuestion - 1;
    }

    let randomDifficulty = generateRandomDifficulty();
    let randomQuestion = generateRandomQuestion();
    parseIndex()
}

function continueQuiz() { // Tracks quiz progress, generates new question
    getElement("question").innerHTML = "test";
}

function gradeQuiz() { // Validates choice input, tracks quiz score, displays question solution

}

function loadQuiz() { // Accepts indexes, accesses string arrays, loads DOM with question/choice data
    getElement("question").innerHTML = "test";
    console.log("Question loaded");
}