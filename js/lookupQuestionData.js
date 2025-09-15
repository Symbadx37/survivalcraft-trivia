import questionData from"../dat/QuestionData.json" with {type: "json"};
window.loadQuiz = loadQuiz;
window.gradeQuiz = gradeQuiz;

let quizData = getData("quizData");
let indexData = getData("indexData");
let category, difficulty, userAnswer;

function assignIndexes(id) {
    switch(id) {
        case "choice_1": userAnswer = "a"; break;
        case "choice_2": userAnswer = "b"; break;
        case "choice_3": userAnswer = "c"; break;
        case "choice_4": userAnswer = "d"; break;
        default: break;
    }
    switch(indexData.categoryIndex) {
        case 1: category = "generalKnowledge"; break;
        case 2: category = "gameMechanics"; break;
        case 3: category = "craftingRecipes"; break;
        case 4: category = "updatesHistory"; break;
        case 5: category = "electrics"; break;
    }
    switch(indexData.difficultyIndex) {
        case 1: difficulty = "veryEasy"; break;
        case 2: difficulty = "easy"; break;
        case 3: difficulty = "medium"; break;
        case 4: difficulty = "hard"; break;
        case 5: difficulty = "veryHard"; break;
    }
}


function loadQuiz() { 
    let questionString, choiceString_a, choiceString_b, choiceString_c, choiceString_d;
    assignIndexes();
    parseData();
    loadData();

    function parseData() {
        questionString = questionData
            ["category_" + category]
            [indexData.difficultyIndex - 1]
            ["difficulty_" + difficulty]
            [indexData.questionIndex - 1]
            ["question"];
        choiceString_a = questionData
            ["category_" + category]
            [indexData.difficultyIndex - 1]
            ["difficulty_" + difficulty]
            [indexData.questionIndex - 1]
            ["choice"][0];
        choiceString_b = questionData
            ["category_" + category]
            [indexData.difficultyIndex - 1]
            ["difficulty_" + difficulty]
            [indexData.questionIndex - 1]
            ["choice"][1];
        choiceString_c = questionData
            ["category_" + category]
            [indexData.difficultyIndex - 1]
            ["difficulty_" + difficulty]
            [indexData.questionIndex - 1]
            ["choice"][2];
        choiceString_d = questionData
            ["category_" + category]
            [indexData.difficultyIndex - 1]
            ["difficulty_" + difficulty]
            [indexData.questionIndex - 1]
            ["choice"][3];
    }

    function loadData() {
        getElement("question").innerHTML = questionString;
        getElement("choice_1").value = choiceString_a;
        getElement("choice_2").value = choiceString_b;
        getElement("choice_3").value = choiceString_c;
        getElement("choice_4").value = choiceString_d;
        
        console.log("[SYSTEM]: Question loaded = " + '"' + questionString + '"' + " (" + getTime() + ").");
        console.log("[SYSTEM]: Choice A loaded = " + '"' + choiceString_a + '"' + " (" + getTime() + ").");
        console.log("[SYSTEM]: Choice B loaded = " + '"' + choiceString_b + '"' + " (" + getTime() + ").");
        console.log("[SYSTEM]: Choice C loaded = " + '"' + choiceString_c + '"' + " (" + getTime() + ").");
        console.log("[SYSTEM]: Choice D loaded = " + '"' + choiceString_d + '"' + " (" + getTime() + ").");
    }
}

function gradeQuiz(id) { 
    quizData.isSolutionVisible = true;
    assignIndexes(id);
    parseData();

    function parseData() {
        if (questionData["category_" + category][indexData.difficultyIndex - 1]["difficulty_" + difficulty][indexData.questionIndex - 1]["answer"] != userAnswer) {
            quizData.questionsWrong += 1;
            console.log("[SYSTEM]: Submitted answer is incorrect" + " (" + getTime() + ").");
        } else {
            quizData.questionsRight += 1;
            console.log("[SYSTEM]: Submitted answer is correct" + " (" + getTime() + ").");
        }
        saveData("quizData", quizData);
    }
}