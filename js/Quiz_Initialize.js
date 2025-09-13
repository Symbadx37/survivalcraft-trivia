// Global constants
const tierCount = 4;
const categoryCount = 5;
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
    
// Populates question data when preload is necessary
document.addEventListener("DOMContentLoaded", 
    function() {
        let userData = getData("userData");
        if (userData.preloadNeeded) {
            loadQuiz();
            userData.preloadNeeded = false;
            saveData("userData", userData);
            console.log("[SYSTEM]: Question data preload complete" + " (" + getTime() + ").");
        }
    }
);

// Listens to option buttons, assigns case values to data variables, saves to local storage, then invokes methods for sub-initialization
function initializeQuiz(id) {
    let userData = getData("userData");
    let quizTier;
    switch(id) {
        case "tier_1":
            userData.quizTier = 1;
            quizTier = 1;
            break;
        case "tier_2":
            userData.quizTier = 2;
            quizTier = 2;
            break;
        case "tier_3":
            userData.quizTier = 3;
            quizTier = 3;
            break;
        case "tier_4":
            userData.quizTier = 4;
            quizTier = 4;
            break;
         case "tier_rdm":
            userData.quizTier = 5;
            quizTier = 5;
            break;
        case "category_1":
            userData.quizCategory = 1;
            break;
        case "category_2":
            userData.quizCategory = 2;
            break;
        case "category_3":
            userData.quizCategory = 3;
            break;
        case "category_4":
            userData.quizCategory = 4;
            break;
        case "category_5":
            userData.quizCategory = 5;
            break;
        case "category_rdm":
            userData.quizCategory = 6;
            break;
        case "length_1":
            userData.quizLength = 1;
            break;
        case "length_2":
            userData.quizLength = 2;
            break;
        case "length_3":
            userData.quizLength = 3;
            break;
        case "length_rdm":
            userData.quizLength = 4;
            break;
        case "duration_1":
            userData.quizDuration = 1;
            break;
        case "duration_2":
            userData.quizDuration = 2;
            break;
        case "duration_3":
            userData.quizDuration = 3;
            break;
        case "duration_none":
            userData.quizDuration = 4;
            break;
        }
    userData = initializeTier(userData, quizTier);
    saveData("userData", userData);
}

// Initializes tier probabilities based on chosen quiz tier
function initializeTier(userData, quizTier) {
    // Objects for storing probabilities
    const probability_beginner = {
        "veryEasy": 0.55,
        "easy": 0.4,
        "medium": 0.05,
        "hard": 0,
        "veryHard": 0
    };
    const probability_intermediate = {
        "veryEasy": 0.4,
        "easy": 0.3,
        "medium": 0.15,
        "hard": 0.5, 
        "veryHard": 0
    };
    const probability_experienced = {
        "veryEasy": 0.15, 
        "easy": 0.4, 
        "medium": 0.3, 
        "hard": 0.1, 
        "veryHard": 0.05
    };
    const probability_veteran = {
        "veryEasy": 0,
        "easy": 0.1,
        "medium": 0.4,
        "hard": 0.35,
        "veryHard": 0.15
    };

    // Assign active array to user data
    switch(quizTier) {
        case 1:
            userData.tierProbability = probability_beginner;
            break;
        case 2:
            userData.tierProbability = probability_intermediate;
            break;
        case 3:
            userData.tierProbability = probability_experienced;
            break;
        case 4:
            userData.tierProbability = probability_veteran;
            break;
    }
    return userData;
}