function generateQuestion() {
    if (typeof localStorage.indexData === "undefined") initializeData("indexData");
    
    let indexData = getData("indexData");
    let quizData = getData("quizData");
    let categoryIndex = getCategoryIndex();
    let difficultyIndex = getDifficultyIndex();
    let questionIndex = getQuestionIndex();

    indexData.categoryIndex = categoryIndex;
    indexData.difficultyIndex = difficultyIndex;
    indexData.questionIndex = questionIndex;
    saveData("indexData", indexData);

    function getCategoryIndex() {
        if (indexData.quizCategory == 5) {
            let randomNumber = Math.floor((Math.random() * categoryCount) + 1);
            let randomCategory = randomNumber;
            console.log("[SYSTEM]: Parameter randomCategory = " + randomCategory + " (" + getTime() + ").");
        } else {
            randomCategory = quizData.quizCategory;
            console.log("[SYSTEM]: Parameter quizCategory = " + quizData.quizCategory + " (" + getTime() + ").");
        }
        return randomCategory;
    } 
    function getDifficultyIndex() {
        let probabilitySum = 0, randomNumber = 0, randomDifficulty;
        generateRandomNumber(); 
        console.log("[SYSTEM]: Parameter randomDifficulty = " + randomDifficulty + " (" + getTime() + ").");
        return randomDifficulty;

        function generateRandomNumber() {
            for(let i in quizData.tierProbability) {
                probabilitySum += quizData.tierProbability[i];
            }
            randomNumber = Math.random() * probabilitySum;
            for (let i in quizData.tierProbability) {
                randomNumber -= quizData.tierProbability[i];
                if (randomNumber <= 0) {
                    randomDifficulty = parseInt(i)
                    if (indexData["nextIndex"][categoryIndex][randomDifficulty] > questionCount[categoryIndex][randomDifficulty]) {
                        delete quizData["tierProbability"][randomDifficulty];
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
                if (indexData["generatedIndexes"][categoryIndex][difficultyIndex][lookupIndex - 1] == randomQuestion) {
                    console.log("index matches, regenerating ...");
                    generateRandomIndex();
                    lookupIndex();   
                }
            }
            let nextIndex = indexData["nextIndex"][categoryIndex][difficultyIndex];
            indexData["generatedIndexes"][categoryIndex][difficultyIndex][nextIndex] = randomQuestion;
            indexData["nextIndex"][categoryIndex][difficultyIndex] = indexData["nextIndex"][categoryIndex][difficultyIndex] + 1;
            console.log("[SYSTEM]: Parameter randomQuestion = " + randomQuestion + " (" + getTime() + ").");
        }
    }
}