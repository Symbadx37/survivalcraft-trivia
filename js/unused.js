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