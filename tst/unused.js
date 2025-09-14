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

let category = "general";
let tier = "veryEasy";
let field = "choice";
let index1 = 0, index2 = 0;

console.log(data["category_" + category][index1]["difficulty_" + tier][index2][field][2]);


// Fires during document load
document.addEventListener("DOMContentLoaded", 
    // Retrieves and saves user data to global variables
    function() {
        let userData = getData("userData");
        quizTier = userData.quizTier;
        quizCategory = userData.quizCategory;
        quizLength = userData.quizLength;
        quizDuration = userData.quizDuration;
        tierProbability = userData.tierProbability;
        console.log("[SYSTEM]: User data saved to global variables" + " (" + getTime() + ").");

        // Populates question data when preload is necessary
        if (userData.preloadNeeded) {
            loadQuiz();
            userData.preloadNeeded = false;
            saveData("userData", userData);
            console.log("[SYSTEM]: Question data preload complete" + " (" + getTime() + ").");
        }
    }
);



const questionCount = {
    general: {veryEasy: 0, easy: 0, medium: 0, hard: 0, veryHard: 0},
    gameMechanics: {veryEasy: 0, easy: 0, medium: 0, hard: 0, veryHard: 0},
    craftingRecipes: {veryEasy: 0, easy: 0, medium: 0, hard: 0, veryHard: 0},
    updatesHistory: {veryEasy: 0, easy: 0, medium: 0, hard: 0, veryHard: 0},
    electrics: {veryEasy: 0, easy: 0, medium: 0, hard: 0, veryHard: 0}
};

switch(userData.quizCategory) {
            case "general":
                switch(randomDifficulty) {
                    case "veryEasy": questionIndexRange = questionCount.general.veryEasy; break;
                    case "easy": questionIndexRange = questionCount.general.easy; break;
                    case "medium": questionIndexRange = questionCount.general.medium; break;
                    case "hard": questionIndexRange = questionCount.general.hard; break;
                    case "veryHard": questionIndexRange = questionCount.general.veryHard; break;
                }
                break;
           case "gameMechanics":
                switch(randomDifficulty) {
                    case "veryEasy": questionIndexRange = questionCount.gameMechanics.veryEasy; break;
                    case "easy": questionIndexRange = questionCount.gameMechanics.easy; break;
                    case "medium": questionIndexRange = questionCount.gameMechanics.medium; break;
                    case "hard": questionIndexRange = questionCount.gameMechanics.hard; break;
                    case "veryHard": questionIndexRange = questionCount.gameMechanics.veryHard; break;
                }
                break;
            case "craftingRecipes":
                switch(randomDifficulty) {
                    case "veryEasy": questionIndexRange = questionCount.craftingRecipes.veryEasy; break;
                    case "easy": questionIndexRange = questionCount.craftingRecipes.easy; break;
                    case "medium": questionIndexRange = questionCount.craftingRecipes.medium; break;
                    case "hard": questionIndexRange = questionCount.craftingRecipes.hard; break;
                    case "veryHard": questionIndexRange = questionCount.craftingRecipes.veryHard; break;
                }
                break;
             case "updatesHistory":
                switch(randomDifficulty) {
                    case "veryEasy": questionIndexRange = questionCount.updatesHistory.veryEasy; break;
                    case "easy": questionIndexRange = questionCount.updatesHistory.easy; break;
                    case "medium": questionIndexRange = questionCount.updatesHistory.medium; break;
                    case "hard": questionIndexRange = questionCount.updatesHistory.hard; break;
                    case "veryHard": questionIndexRange = questionCount.updatesHistory.veryHard; break;
                }
                break;
            case "electrics":
                switch(randomDifficulty) {
                    case "veryEasy": questionIndexRange = questionCount.electrics.veryEasy; break;
                    case "easy": questionIndexRange = questionCount.electrics.easy; break;
                    case "medium": questionIndexRange = questionCount.electrics.medium; break;
                    case "hard": questionIndexRange = questionCount.electrics.hard; break;
                    case "veryHard": questionIndexRange = questionCount.electrics.veryHard; break;
                }
                break;
        }


indexData["nextIndex"][categoryIndex][difficultyIndex] = indexData["nextIndex"][categoryIndex][difficultyIndex] + 1;
let nextIndex = indexData["nextIndex"][categoryIndex][difficultyIndex];
indexData["generatedIndexes"][categoryIndex][difficultyIndex][nextIndex - 1] = questionIndex;