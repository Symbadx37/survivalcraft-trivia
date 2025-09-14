const tierCount = 4;
const categoryCount = 5;
const questionCount = {
    1: {1: 46, 2: 24, 3: 35, 4: 14, 5: 12}, // Remove sample values
    2: {1: 25, 2: 12, 3: 53, 4: 24, 5: 35}, // Remove sample values
    3: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
    4: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
    5: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
};

const probability_beginner = {1: 0.55, 2: 0.4, 3: 0.05, 4: 0, 5: 0};
const probability_intermediate = {1: 0.4, 2: 0.3, 3: 0.15, 4: 0.5, 5: 0};
const probability_experienced = {1: 0.15, 2: 0.4, 3: 0.3, 4: 0.1, 5: 0.05};
const probability_veteran = {1: 0, 2: 0.1, 3: 0.4, 4: 0.35, 5: 0.15};

// Populates question data when preload is necessary
document.addEventListener("DOMContentLoaded", 
    function() {
        let quizData = getData("quizData");
        if (quizData.preloadNeeded) {
            generateQuestion();
            quizData.preloadNeeded = false;
            saveData("quizData", quizData);
            console.log("[SYSTEM]: Question data preload complete" + " (" + getTime() + ").");
        }
        loadQuiz();
    }
);

// Saves quiz parameters to local storage
function initializeQuiz(id) {
    let quizData = getData("quizData");
    let quizTier;
    switch(id) {
        case "tier_1":
            quizData.quizTier = 1;
            quizTier = 1;
            break;
        case "tier_2":
            quizData.quizTier = 2;
            quizTier = 2;
            break;
        case "tier_3":
            quizData.quizTier = 3;
            quizTier = 3;
            break;
        case "tier_4":
            quizData.quizTier = 4;
            quizTier = 4;
            break;
         case "tier_rdm":
            quizData.quizTier = 5;
            quizTier = 5;
            break;
        case "category_1":
            quizData.quizCategory = 1;
            break;
        case "category_2":
            quizData.quizCategory = 2;
            break;
        case "category_3":
            quizData.quizCategory = 3;
            break;
        case "category_4":
            quizData.quizCategory = 4;
            break;
        case "category_5":
            quizData.quizCategory = 5;
            break;
        case "category_rdm":
            quizData.quizCategory = 6;
            break;
        case "length_1":
            quizData.quizLength = 1;
            break;
        case "length_2":
            quizData.quizLength = 2;
            break;
        case "length_3":
            quizData.quizLength = 3;
            break;
        case "length_rdm":
            quizData.quizLength = 4;
            break;
        case "duration_1":
            quizData.quizDuration = 1;
            break;
        case "duration_2":
            quizData.quizDuration = 2;
            break;
        case "duration_3":
            quizData.quizDuration = 3;
            break;
        case "duration_none":
            quizData.quizDuration = 4;
            break;
        }
    quizData = initializeTier(quizData, quizTier);
    saveData("quizData", quizData);
}

// Initializes tier probabilities based on chosen quiz tier
function initializeTier(quizData, quizTier) {
    switch(quizTier) {
        case 1:
            quizData.tierProbability = probability_beginner;
            break;
        case 2:
            quizData.tierProbability = probability_intermediate;
            break;
        case 3:
            quizData.tierProbability = probability_experienced;
            break;
        case 4:
            quizData.tierProbability = probability_veteran;
            break;
    }
    return quizData;
}