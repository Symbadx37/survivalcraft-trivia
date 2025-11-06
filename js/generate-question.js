function generateQuestion() {
    let categoryIndex = getCategoryIndex();
    let difficultyIndex = getDifficultyIndex();
    let questionIndex = getQuestionIndex();

    sessionData.quizIndexes.categoryIndex = categoryIndex;
    sessionData.quizIndexes.difficultyIndex = difficultyIndex;
    sessionData.quizIndexes.questionIndex = questionIndex;
    updateSession("save");

    function getCategoryIndex() {
        if (sessionData.quizParameters.quizCategory == 5) {
            let randomCategory = Math.floor((Math.random() * quizCategoryMax) + 1);
            console.log("[SYSTEM]: Parameter randomCategory = " + randomCategory + " (" + getTime() + ").");
        } else {
            randomCategory = sessionData.quizParameters.quizCategory;
            console.log("[SYSTEM]: Parameter quizCategory = " + sessionData.quizParameters.quizCategory + " (" + getTime() + ").");
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
            for(let i in sessionData.quizParameters.activeTierProbability) {
                probabilitySum += sessionData.quizParameters.activeTierProbability[i];
            }
            randomNumber = Math.random() * probabilitySum;
            for (let i in sessionData.quizParameters.activeTierProbability) {
                randomNumber -= sessionData.quizParameters.activeTierProbability[i];
                if (randomNumber <= 0) {
                    randomDifficulty = parseInt(i)
                    break; 
                }  
            }
        }
        function validateIndex() {
            if (sessionData["quizIndexes"]["nextQuestionIndex"][categoryIndex][randomDifficulty] > questionCount[categoryIndex][randomDifficulty]) {
                delete sessionData["quizParameters"]["activeactiveTierProbability"][randomDifficulty];
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
                if (sessionData["quizIndexes"]["indexCache"][categoryIndex][difficultyIndex][lookupIndex] == randomQuestion) {
                    console.log("has match, regenerating ...");
                    generateRandomIndex();
                    lookupIndex = 0;
                } 
                else if (lookupIndex >= questionIndexRange || lookupIndex == sessionData.quizParameters.activeQuestion - 1) {
                    console.log("no match, exiting ...");
                    lookupNeeded = false;
                    break;
                } else {
                    lookupIndex++;
                }
            }
            let nextIndex = sessionData["quizIndexes"]["nextQuestionIndex"][categoryIndex][difficultyIndex];
            sessionData["quizIndexes"]["indexCache"][categoryIndex][difficultyIndex][nextIndex] = randomQuestion;
            sessionData["quizIndexes"]["nextQuestionIndex"][categoryIndex][difficultyIndex] = sessionData["quizIndexes"]["nextQuestionIndex"][categoryIndex][difficultyIndex] + 1;
            console.log("[SYSTEM]: Parameter randomQuestion = " + randomQuestion + " (" + getTime() + ").");
        }
    }
}