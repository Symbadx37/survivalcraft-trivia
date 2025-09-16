import questionData from"../dat/QuestionData.json" with {type: "json"};
window.loadQuiz = loadQuiz;
window.gradeQuiz = gradeQuiz;
let category, difficulty, userAnswer;

function loadQuiz() { 
    let indexData = getData("indexData");
    let questionString, choiceString_a, choiceString_b, choiceString_c, choiceString_d;
    assignIndexes();
    parseData();
    loadData();

    function parseData() {
        questionString = questionData[category][difficulty][indexData.questionIndex - 1]["question"];
        choiceString_a = questionData[category][difficulty][indexData.questionIndex - 1]["choice"][0];
        choiceString_b = questionData[category][difficulty][indexData.questionIndex - 1]["choice"][1];
        choiceString_c = questionData[category][difficulty][indexData.questionIndex - 1]["choice"][2];
        choiceString_d = questionData[category][difficulty][indexData.questionIndex - 1]["choice"][3];
    }

    function loadData() {
        getElement("question").innerHTML = questionString;
        getElement("choice_1").value = choiceString_a;
        getElement("choice_2").value = choiceString_b;
        getElement("choice_3").value = choiceString_c;
        getElement("choice_4").value = choiceString_d;
    }
}

function gradeQuiz(id) { 
    let quizData = getData("quizData");
    let indexData = getData("indexData");
    
    if (quizData.isSolutionVisible == false) {
        quizData.isSolutionVisible = true;
        assignIndexes(id);
        parseData();
        saveData("quizData", quizData);
    }
    
    function parseData() {
        if (questionData[category][difficulty][indexData.questionIndex - 1]["answer"] != userAnswer) {
            if (typeof quizData.questionsWrong == "undefined") quizData.questionsWrong = 0;
                quizData.questionsWrong += 1;
                console.log("[SYSTEM]: Submitted answer is incorrect" + " (" + getTime() + ").");
        } else {
            if (typeof quizData.questionsRight == "undefined") quizData.questionsRight = 0;
                quizData.questionsRight += 1;
                console.log("[SYSTEM]: Submitted answer is correct" + " (" + getTime() + ").");
        } 
    }  
}

function assignIndexes(id) {
    let indexData = getData("indexData");
    switch(id) {
        case "choice_1": userAnswer = "a"; break;
        case "choice_2": userAnswer = "b"; break;
        case "choice_3": userAnswer = "c"; break;
        case "choice_4": userAnswer = "d"; break;
    }
    switch(indexData.categoryIndex) {
        case 1: category = "generalKnowledge"; break;
        case 2: category = "gameMechanics"; break;
        case 3: category = "craftingRecipes"; break;
        case 4: category = "creatureBehaviors"; break;
        case 5: category = "blocksPickables"; break;
        case 6: category = "updatesHistory"; break;
        case 7: category = "electrics"; break;
    }
    switch(indexData.difficultyIndex) {
        case 1: difficulty = "veryEasy"; break;
        case 2: difficulty = "easy"; break;
        case 3: difficulty = "medium"; break;
        case 4: difficulty = "hard"; break;
        case 5: difficulty = "veryHard"; break;
    }
}