// Global variables
let quizTier, quizLength, activeTierArray;
let difficultyIndex, questionIndex;
const questionCount_ve = 2, questionCount_e = 3, questionCount_m = 8, questionCount_h = 3, questionCount_vh = 1;
const questionCount_total = questionCount_ve + questionCount_e + questionCount_m + questionCount_h + questionCount_vh;

// Global functions
function getElement(id) {
    return document.getElementById(id);
}

function startQuiz(id) {    
    if (id == "start")
        getRandomQuestion();
        console.log("Random Difficulty " + difficultyIndex)
        console.log("Random Question " + questionIndex)
        window.location.replace("take-quiz.html");
}

function initializeTier(quizTier) {
    // Probability arrays
    const probability_beginner = {1:0.55, 2:0.4, 3:0.05, 4:0.0, 5:0.0}; // Very Easy, Easy, and Medium questions.
    const probability_intermediate = {1:0.4, 2:0.3, 3:0.15, 4:0.5, 5:0.0}; // Very Easy, Easy, Medium, and Hard questions.
    const probability_experienced = {1:0.15, 2:0.40, 3:0.3, 4:0.1, 5:0.05}; // Very Easy, Easy, Medium, Hard, and Very Hard questions.
    const probability_veteran = {1:0.00, 2:0.1, 3:0.4, 4:0.35, 5:0.15}; // Easy, Medium, Hard, and Very Hard questions.

    // Assign active array
    switch(quizTier) {
        case "1":
            activeTierArray = probability_beginner;
            break;
        case "2":
            activeTierArray = probability_intermediate;
            break;
        case "3":
            activeTierArray = probability_experienced;
            break;
        case "4":
            activeTierArray = probability_veteran;
            break;
        default:
            activeTierArray = probability_beginner;
    }
}

function initializeQuiz(id) {
    switch(id) {
        case "tier_1":
            quizTier = 1;
            break;
        case "tier_2":
            quizTier = 2;
            break;
        case "tier_3":
            quizTier = 3;
            break;
        case "tier_4":
            quizTier = 4;
            break;
        case "length_1":
            quizLength = 1;
            break;
        case "length_2":
            quizLength = 2;
            break;
        case "length_3":
            quizLength = 3;
            break;
        }
    console.log("Tier = " + quizTier);
    console.log("Length = " + quizLength);
    initializeTier(quizTier);
}

function getRandomQuestion() {
    // Get probability sum
    let sum = 0;
    for(let i in activeTierArray){
        sum += activeTierArray[i];
    }

    // Generate random difficulty
    function generateRandomDifficulty() {
        let value = Math.random() * sum;
        for (let randomDifficulty in activeTierArray) {
            value -= activeTierArray[randomDifficulty];

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