
    function loadContent() {
        const load_quizPage_preGrade = function() {
            $("btn-continue").prop("disabled", true);
            loadData("quiz");
            // ... (load timer)
        }
        const load_quizPage_postGrade = function() {
            if (sessionData.answerState.state == "wrong") {
                $(sessionData.answerState.id).toggleClass("btn-choice_wrong", add);
            }
            else {
                $(sessionData.answerState.id).toggleClass("btn-choice_right", add);
            }
            $("btn-continue").prop("disabled", false);
            $("btn-choice_1").prop("disabled", true);
            $("btn-choice_2").prop("disabled", true);
            $("btn-choice_3").prop("disabled", true);
            $("btn-choice_4").prop("disabled", true);
            loadData("quiz");
            // ... (load timer)
        }
        
        // Sequence
        switch(functionID) {
            case 1: load_quizPage_preGrade(); break;
            case 2: load_quizPage_postGrade(); break;
        }
    }

function loadData(id) {
    let questionString, choiceString_a, choiceString_b, choiceString_c, choiceString_d;
    let tierString, categoryString, difficultyString, lengthString;
    const parseQuizData = function() {
        // Lookup question and choice strings
        questionString = questionData["category_" + sessionData.categoryIndex]["difficulty_" + sessionData.difficultyIndex][sessionData.questionIndex - 1]["question"];
        choiceString_a = questionData["category_" + sessionData.categoryIndex]["difficulty_" + sessionData.difficultyIndex][sessionData.questionIndex - 1]["choice"][0];
        choiceString_b = questionData["category_" + sessionData.categoryIndex]["difficulty_" + sessionData.difficultyIndex][sessionData.questionIndex - 1]["choice"][1];
        choiceString_c = questionData["category_" + sessionData.categoryIndex]["difficulty_" + sessionData.difficultyIndex][sessionData.questionIndex - 1]["choice"][2];
        choiceString_d = questionData["category_" + sessionData.categoryIndex]["difficulty_" + sessionData.difficultyIndex][sessionData.questionIndex - 1]["choice"][3];
    
        // Assign quiz parameter strings
        switch(sessionData.quizTier) {
            case 1: tierString = "Beginner"; break;
            case 2: tierString = "Intermediate"; break;
            case 3: tierString = "Experienced"; break;
            case 4: tierString = "Veteran"; break;
        }
        switch(sessionData.categoryIndex) {
            case 1: categoryString = "General Knowledge"; break;
            case 2: categoryString = "Game Mechanics"; break;
            case 3: categoryString = "Updates History"; break;
            case 4: categoryString = "Electrics"; break;
        }
        switch(sessionData.difficultyIndex) {
            case 1: difficultyString = "Very Easy"; break;
            case 2: difficultyString = "Easy"; break;
            case 3: difficultyString = "Medium"; break;
            case 4: difficultyString = "Hard"; break;
            case 5: difficultyString = "Very Hard"; break;
        }
        switch(sessionData.quizLength) {
            case 1: lengthString = "10"; break;
            case 2: lengthString = "20"; break;
            case 3: lengthString = "30"; break;
        }
    }
    const parseSetupData = function() {
        // ...
    }
    const loadQuizData = function() {
        $("question").val(questionString);
        $("choice_1").val(choiceString_a);
        $("choice_2").val(choiceString_b);
        $("choice_3").val(choiceString_c);
        $("choice_4").val(choiceString_d);

        $("inf-tier").val(tierString);
        $("inf-category").val(categoryString);
        $("inf-difficulty").val(difficultyString);
        $("inf-progress").val(sessionData.activeQuestion + "/" + lengthString);
    }
    const loadSetupData = function() {
        // ...
    }
    switch(id) {
        case "quiz": loadQuizData(); parseQuizData(); break;
        case "setup": loadSetupData(); parseSetupData(); break;
    }
}

// Save, refresh, and load session data
sessionData.newProperty = "";
updateSessionData("load", "quiz");

// Save and refresh session data
sessionData.newProperty = "";
updateSessionData("save");