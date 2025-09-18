import questionData from"../dat/QuestionData.json" with {type: "json"};
window.loadQuiz = loadQuiz;
window.gradeQuiz = gradeQuiz;

function loadQuiz() { 
    let sessionData = Session.getData(localStorage.getItem("sessionData"));
    let questionString, choiceString_a, choiceString_b, choiceString_c, choiceString_d;
    parseData();
    loadData();
    
    function parseData() {
        questionString = questionData["category_" + sessionData.categoryIndex]["difficulty_" + sessionData.difficultyIndex][sessionData.questionIndex - 1]["question"];
        choiceString_a = questionData["category_" + sessionData.categoryIndex]["difficulty_" + sessionData.difficultyIndex][sessionData.questionIndex - 1]["choice"][0];
        choiceString_b = questionData["category_" + sessionData.categoryIndex]["difficulty_" + sessionData.difficultyIndex][sessionData.questionIndex - 1]["choice"][1];
        choiceString_c = questionData["category_" + sessionData.categoryIndex]["difficulty_" + sessionData.difficultyIndex][sessionData.questionIndex - 1]["choice"][2];
        choiceString_d = questionData["category_" + sessionData.categoryIndex]["difficulty_" + sessionData.difficultyIndex][sessionData.questionIndex - 1]["choice"][3];
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
    let sessionData = Session.getData(localStorage.getItem("sessionData"));
    let userAnswer;
    switch(id) {
        case "choice_1": userAnswer = "a"; break;
        case "choice_2": userAnswer = "b"; break;
        case "choice_3": userAnswer = "c"; break;
        case "choice_4": userAnswer = "d"; break;
    }
    if (sessionData.quizState == 1) {
        sessionData.quizState = 2;
        parseData();
        Session.setData(sessionData);
    }
    else if (sessionData.quizState == 2) {
        sessionData.quizState = 3;
        Session.setData(sessionData);
    }
    function parseData() {
        if (questionData["category_" + sessionData.categoryIndex]["difficulty_" + sessionData.difficultyIndex][sessionData.questionIndex - 1]["answer"] != userAnswer) {
            if (typeof sessionData.questionsWrong == "undefined") sessionData.questionsWrong = 0;
                sessionData.questionsWrong += 1;
                console.log("[SYSTEM]: Submitted answer is incorrect" + " (" + getTime() + ").");
        } else {
            if (typeof sessionData.questionsRight == "undefined") sessionData.questionsRight = 0;
                sessionData.questionsRight += 1;
                console.log("[SYSTEM]: Submitted answer is correct" + " (" + getTime() + ").");
        } 
    }  
}