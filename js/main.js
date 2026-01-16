// Max index counts
const tierCount = 5; // ... (Beginner, Intermediate, Average, Experienced, Veteran)
const categoryCount = 5; // ... (General Knowledge, Game Mechanics, Crafting Recipes, Updates History, Electrics)
const lengthCount = 3; // ... (Easy = 10, Medium = 20, Hard = 30)
const durationCount = 4; // ... (High = 3m, Moderate = 2m, Low = 1m, None)
const questionCount = {
    1: {1: 10, 2: 16, 3: 30, 4: 19, 5: 16, 6: 7},
    2: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0},
    3: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0},
    4: {1: 10, 2: 19, 3: 26, 4: 25, 5: 20, 6: 0},
    5: {1: 15, 2: 34, 3: 0, 4: 0, 5: 0, 6: 0}
};

// Probability sets
const probability_beginner = {1: 0.55, 2: 0.4, 3: 0.05, 4: 0, 5: 0, 6: 0};
const probability_intermediate = {1: 0.4, 2: 0.3, 3: 0.15, 4: 0.05, 5: 0, 6: 0};
const probability_average = {1: 0, 2: 0.4, 3: 0.3, 4: 0.25, 5: 0.05, 6: 0};
const probability_experienced = {1: 0, 2: 0, 3: 0.35, 4: 0.45, 5: 0.15, 6: 0.05};
const probability_veteran = {1: 0, 2: 0, 3: 0, 4: 0.35, 5: 0.50, 6: 0.15};

// Global data objects
let sessionData;
let questionData = getParser();

/* REMOVE COMMENTS BEFORE SHIPPING
// Disable console access
window.addEventListener('keydown', function(event) {
    if (event.code === 'F12') {
        event.preventDefault();
    }
    if (event.shiftKey && event.ctrlKey && event.code === 'KeyI') {
        event.preventDefault();
    }
});
window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
}); 
*/

// Setup option buttons
$("#setup_buttonGroup_1 input").on({
  click: function(){
    initializeSetup(this.id, "buttonGroup_1");
  }
});
$("#setup_buttonGroup_2 input").on({
  click: function(){
    initializeSetup(this.id, "buttonGroup_2");
  }
});
$("#setup_buttonGroup_3 input").on({
  click: function(){
    initializeSetup(this.id, "buttonGroup_3");
  }
});
$("#setup_buttonGroup_4 input").on({
  click: function(){
    initializeSetup(this.id, "buttonGroup_4");
  }
});

// Setup and quiz action buttons
$("#setup_startButton").on("click", startQuiz);
$("#setup_resetButton").on("click", resetSetup);
$("#setup_exitButton").on("click", exitSetup);
$("#quiz_quitButton").on("click", stopQuiz);
$("#quiz_continueButton").on({
  click: function(){
    continueQuiz();
    updateProgressBar();
  }
});

function updateProgressBar() {
    let widthFactor, lookupIndex = 1;
    switch(sessionData.quizParameters.quizLength) {
        case 1: widthFactor = 30; break;
        case 2: widthFactor = 15; break;
        case 3: widthFactor = 10; break;
    }
    while (lookupIndex <= Object.values(sessionData["pageElements"]["quiz"]).length) {
        if (sessionData["pageElements"]["quiz"]["node_" + lookupIndex]["element"]["id"] == "quiz_progressBar") {
            sessionData["pageElements"]["quiz"]["node_" + lookupIndex]["animation"]["values"][0] += widthFactor;
            updateSession("load", "quiz", "load_partial", [lookupIndex]);
        }
        lookupIndex++;
    }
}

function initializeSetup(elementID, elementGroup) {
    let nodeIndex, isNodeFound = false;
    let activeNodes = [];
    let lookupIndex_1 = 1, lookupIndex_2 = 1, lookupIndex_3 = 1, activeNodeThreshold = 0;

    // Gets active button node
    while (!isNodeFound) {
        if (sessionData["pageElements"]["setup"]["node_" + lookupIndex_1]["element"]["id"] == elementID) {
            nodeIndex = lookupIndex_1;
            isNodeFound = true;
            sessionData["pageElements"]["setup"]["node_" + nodeIndex]["state"]["isActive"] = false;
            updateSession("load", "setup", "load_partial", [nodeIndex]);
        } else {
            lookupIndex_1++;
        }
    }
    // Gets total number of button nodes in active group, pushes active nodes to array
    while (lookupIndex_2 <= Object.values(sessionData["pageElements"]["setup"]).length) {
        if (sessionData["pageElements"]["setup"]["node_" + lookupIndex_2]["element"]["group"] == elementGroup) {
            activeNodes.push(lookupIndex_2);
            activeNodeThreshold++;
        }
        lookupIndex_2++;
    }
    // Updates states of all inactive and unselected buttons
    while (lookupIndex_3 <= activeNodeThreshold) {
        if (sessionData["pageElements"]["setup"]["node_" + activeNodes[lookupIndex_3 - 1]]["element"]["group"] == elementGroup &&
            sessionData["pageElements"]["setup"]["node_" + activeNodes[lookupIndex_3 - 1]]["element"]["id"] !== elementID &&
            sessionData["pageElements"]["setup"]["node_" + activeNodes[lookupIndex_3 - 1]]["state"]["isActive"] == false) {
                sessionData["pageElements"]["setup"]["node_" + activeNodes[lookupIndex_3 - 1]]["state"]["isActive"] = true; 
                updateSession("load", "setup", "load_partial", [activeNodes[lookupIndex_3 - 1]]);
        } 
        lookupIndex_3++;
    }
}

function startQuiz() {
    validateSetup();
    generateQuestion();
    parseQuizData();
    loadTimer("set");

    // Update session flags
    if (sessionData.booleanFlags.isSetupValid) {
        sessionData.booleanFlags.setupPreloadNeeded = false;
        sessionData.booleanFlags.quizPreloadNeeded = true;
        sessionData.booleanFlags.isActive = true;
        updateSession("save");
        window.location.replace("quiz.html");
    }

    function validateSetup() {
        let activeGroup = [], lookupIndex = 1;
        while (lookupIndex <= Object.values(sessionData["pageElements"]["setup"]).length) {
            if (sessionData["pageElements"]["setup"]["node_" + lookupIndex]["state"]["isActive"] == false) {
                activeGroup.push(sessionData["pageElements"]["setup"]["node_" + lookupIndex]["element"]["group"]);
            }
            lookupIndex++;
        }
        if (activeGroup.length == 4) {
            sessionData.booleanFlags.isSetupValid = true;
            updateSession("save");
            initializeData();
        } else {
            alert("All options must be selected.");
        }
    }
    function initializeData() {
        let lookupIndex = 1;
        while (lookupIndex <= Object.values(sessionData["pageElements"]["setup"]).length) {
            let nodeID, groupID, nodeSlice, groupSlice;
            if (sessionData["pageElements"]["setup"]["node_" + lookupIndex]["state"]["isActive"] == false) {
                nodeID = sessionData["pageElements"]["setup"]["node_" + lookupIndex]["element"]["id"];
                groupID = sessionData["pageElements"]["setup"]["node_" + lookupIndex]["element"]["group"];
                nodeSlice = parseInt(nodeID.charAt(nodeID.length - 1));
                groupSlice = parseInt(groupID.charAt(groupID.length - 1));
                switch (groupSlice) {
                    case 1: sessionData.quizParameters.quizTier = nodeSlice; break;
                    case 2: sessionData.quizParameters.quizCategory = nodeSlice; break;
                    case 3: sessionData.quizParameters.quizLength = nodeSlice; break;
                    case 4: sessionData.quizParameters.quizDuration = nodeSlice; break;
                }
            }
            lookupIndex++;
        }
        if (sessionData.quizParameters.quizTier == 6) {
            const randomTier = Math.floor((Math.random() * tierCount) + 1)
            sessionData.quizParameters.quizTier = randomTier;
            console.info("SYSTEM: Parameter randomTier = " + sessionData.quizParameters.quizTier + " (at " + getTime() + ").");
        }
        if (sessionData.quizParameters.quizLength == 4) {
            const randomLength = Math.floor((Math.random() * lengthCount) + 1)
            sessionData.quizParameters.quizLength = randomLength;
            console.info("SYSTEM: Parameter randomLength = " + sessionData.quizParameters.quizLength + " (at " + getTime() + ").");
        }
        if (sessionData.quizParameters.quizDuration == 5) {
            const randomDuration = Math.floor((Math.random() * durationCount) + 1)
            sessionData.quizParameters.quizDuration = randomDuration;
            console.info("SYSTEM: Parameter randomDuration = " + sessionData.quizParameters.quizDuration + " (at " + getTime() + ").");
        }
        switch(sessionData.quizParameters.quizTier) {
            case 1: sessionData.quizParameters.activeTierProbability = probability_beginner; break;
            case 2: sessionData.quizParameters.activeTierProbability = probability_intermediate; break;
            case 3: sessionData.quizParameters.activeTierProbability = probability_average; break;
            case 4: sessionData.quizParameters.activeTierProbability = probability_experienced; break;
            case 5: sessionData.quizParameters.activeTierProbability = probability_veteran; break;
        }
        updateSession("save");
    }
}

function parseQuizData() {
    let choiceIndex = 0, lookupIndex = 1;
    randomizeChoiceOrder();

    // Generate random choice order
    function randomizeChoiceOrder() {
        let orderIndex = 0;
        const choiceOrder = [];
        while (orderIndex < 4) {
            const num = Math.floor(Math.random() * 4);
            if (choiceOrder[orderIndex] == "") {
                choiceOrder.push(num);
                orderIndex++;
            }
            else if (!(choiceOrder.includes(num))) {
                choiceOrder.push(num);
                orderIndex++;
            } 
        }
        sessionData.quizIndexes.choiceOrder = choiceOrder;
        updateSession("save");
    }
    
    // Set node text values
    while (lookupIndex <= Object.values(sessionData["pageElements"]["quiz"]).length) {
        if (sessionData["pageElements"]["quiz"]["node_" + lookupIndex]["element"]["group"] == "answerGroup") {
            // Check for variable choice strings
            let variableChoiceIndex, answer_1, answer_2;
            const choices = questionData["category_" + sessionData.quizIndexes.categoryIndex]["difficulty_" + sessionData.quizIndexes.difficultyIndex][sessionData.quizIndexes.questionIndex - 1]["choice"]
            const choiceLength = Object.values(choices).length
            for (let index = 0; index < choiceLength; index++) {
                if (/^\b(?:both|Both)\b\s[a-dA-D]\s\b(?:and|And)\b\s[a-dA-D]$/.test(choices[index])) {
                    variableChoiceIndex = choices.indexOf(choices[index]);
                    console.log("Variable Choice Found: ", variableChoiceIndex);

                    //NOTE: HARDCODED INDEXES
                    // Slice variable answer values
                    answer_1 = (choices[index].charAt(5));
                    answer_2 = (choices[index].charAt(11));

                    // Convert answer values to numeric index
                    switch(answer_1) {
                        case "A": answer_1 = 0; break;
                        case "B": answer_1 = 1; break;
                        case "C": answer_1 = 2; break;
                        case "D": answer_1 = 3; break;
                    }
                    switch(answer_2) {
                        case "A": answer_2 = 0; break;
                        case "B": answer_2 = 1; break;
                        case "C": answer_2 = 2; break;
                        case "D": answer_2 = 3; break;
                    }

                    // Get randomized choice index
                    let index_1 = choiceOrder.indexOf(answer_1);
                    let index_2 = choiceOrder.indexOf(answer_2);

                    // Convert numeric index back to alphanumeric values
                    switch(index_1) {
                        case 0: answer_1 = "A"; break;
                        case 1: answer_1 = "B"; break;
                        case 2: answer_1 = "C"; break;
                        case 3: answer_1 = "D"; break;
                    }
                    switch(index_2) {
                        case 0: answer_1 = "A"; break;
                        case 1: answer_1 = "B"; break;
                        case 2: answer_1 = "C"; break;
                        case 3: answer_1 = "D"; break;
                    }
                    sessionData["pageElements"]["quiz"]["node_" + lookupIndex]["value"]["text"] = "Both " + answer_1 + "and " + answer_2;
                    break;
                } else {
                    sessionData["pageElements"]["quiz"]["node_" + lookupIndex]["value"]["text"] = questionData["category_" + sessionData.quizIndexes.categoryIndex]["difficulty_" + sessionData.quizIndexes.difficultyIndex][sessionData.quizIndexes.questionIndex - 1]["choice"][sessionData.quizIndexes.choiceOrder[choiceIndex]];
                }
            }
            updateSession("load", "quiz", "load_partial", [lookupIndex]);
            choiceIndex++;
        }
        else if (sessionData["pageElements"]["quiz"]["node_" + lookupIndex]["element"]["id"] == "quiz_questionText") {
            sessionData["pageElements"]["quiz"]["node_" + lookupIndex]["value"]["text"] = questionData["category_" + sessionData.quizIndexes.categoryIndex]["difficulty_" + sessionData.quizIndexes.difficultyIndex][sessionData.quizIndexes.questionIndex - 1]["question"]; 
            updateSession("load", "quiz", "load_partial", [lookupIndex]);
        }
        lookupIndex++;
    }
}

function gradeQuiz(id) {
    // Update flags
    sessionData.booleanFlags.isAnswerSubmitted = true;
    updateSession("save");

    loadTimer("stop");
    lookupAnswer();
    updateButtonStates();

    function updateButtonStates() {
        let lookupIndex = 1;
        while (lookupIndex <= Object.values(sessionData["pageElements"]["quiz"]).length) {
            if (sessionData["pageElements"]["quiz"]["node_" + lookupIndex]["element"]["group"] == "answerGroup") {
                sessionData["pageElements"]["quiz"]["node_" + lookupIndex]["state"]["isActive"] = false;
                updateSession("load", "quiz", "load_partial", [lookupIndex]);
            }
            else if (sessionData["pageElements"]["quiz"]["node_" + lookupIndex]["element"]["id"] == "quiz_continueButton") {
                sessionData["pageElements"]["quiz"]["node_" + lookupIndex]["state"]["isActive"] = true;
                updateSession("load", "quiz", "load_partial", [lookupIndex]);
            }
            lookupIndex++;
        }
    }

    function lookupAnswer() {
        let lookupIndex = 1;
        while (lookupIndex <= Object.values(sessionData["pageElements"]["quiz"]).length) {
            if (sessionData["pageElements"]["quiz"]["node_" + lookupIndex]["element"]["id"] == id) {
                let validAnswer, userAnswer;
                switch(questionData["category_" + sessionData.quizIndexes.categoryIndex]["difficulty_" + sessionData.quizIndexes.difficultyIndex][sessionData.quizIndexes.questionIndex - 1]["answer"]) {
                    case "a": validAnswer = 0; break;
                    case "b": validAnswer = 1; break;
                    case "c": validAnswer = 2; break;
                    case "d": validAnswer = 3; break;
                }
                switch(id) {
                    case "quiz_answerChoiceButton_1": userAnswer = 0; break;
                    case "quiz_answerChoiceButton_2": userAnswer = 1; break;
                    case "quiz_answerChoiceButton_3": userAnswer = 2; break;
                    case "quiz_answerChoiceButton_4": userAnswer = 3; break;
                }
                if (userAnswer == (sessionData.quizIndexes.choiceOrder.indexOf(validAnswer))) {
                    sessionData.quizParameters.questionsRight += 1;
                    sessionData["pageElements"]["quiz"]["node_" + lookupIndex]["class"]["state"][0] = 1;
                    calculatePoints();
                    break;
                } else {
                    sessionData.quizParameters.questionsWrong += 1;
                    sessionData["pageElements"]["quiz"]["node_" + lookupIndex]["class"]["state"][1] = 1;
                    break;
                }
            }
            lookupIndex++;
        }
    }
}

function continueQuiz() {
    // Update flags
    updateSession("refresh");
    sessionData.booleanFlags.isAnswerSubmitted = false;
    updateSession("save");
    
    updateButtonStates();
    checkQuizPosition();
    loadTimer("reset");

    // Reset button states to default state
    function updateButtonStates() {
        let lookupIndex = 1;
        while (lookupIndex <= Object.values(sessionData["pageElements"]["quiz"]).length) {
            if (sessionData["pageElements"]["quiz"]["node_" + lookupIndex]["element"]["group"] == "answerGroup") {
                sessionData["pageElements"]["quiz"]["node_" + lookupIndex]["class"]["state"][0] = 2;
                sessionData["pageElements"]["quiz"]["node_" + lookupIndex]["class"]["state"][1] = 2;
                sessionData["pageElements"]["quiz"]["node_" + lookupIndex]["state"]["isActive"] = true;
                updateSession("load", "quiz", "load_partial", [lookupIndex]);
            }
            else if (sessionData["pageElements"]["quiz"]["node_" + lookupIndex]["element"]["id"] == "quiz_continueButton") {
                sessionData["pageElements"]["quiz"]["node_" + lookupIndex]["state"]["isActive"] = false;
                updateSession("load", "quiz", "load_partial", [lookupIndex]);
            }
            lookupIndex++;
        }
    }

    // Check if active question has hit max question threshold
    function checkQuizPosition() {
        switch (sessionData.quizParameters.quizLength) {
            case 1: 
                if (sessionData.quizParameters.activeQuestion == 10) {
                    loadResults(); 
                } else {
                    generateQuestion();
                    parseQuizData();
                }
                break;
            case 2:
                if (sessionData.quizParameters.activeQuestion == 20) {
                    loadResults();
                } else {
                    generateQuestion();
                    parseQuizData();
                }
                break;
            case 3:
                if (sessionData.quizParameters.activeQuestion == 30) {
                    loadResults();
                } else {
                    generateQuestion();
                    parseQuizData();
                }
                break;
        }
    }
    function loadResults() {
        let lookupIndex = 1, totalQuestions;
        while (lookupIndex <= Object.values(sessionData["pageElements"]["results"]).length) {
            if (sessionData["pageElements"]["results"]["node_" + lookupIndex]["element"]["id"] == "results_pointCount") {
                const totalPoints = sessionData.quizParameters.totalPoints;
                sessionData["pageElements"]["results"]["node_" + lookupIndex]["value"]["text"] = parseFloat(totalPoints.toFixed(0)).toLocaleString('en');
            }
            else if (sessionData["pageElements"]["results"]["node_" + lookupIndex]["element"]["id"] == "results_accuracyCount") {
                switch(sessionData.quizParameters.quizLength) {
                    case 1: totalQuestions = 10; break;
                    case 2: totalQuestions = 20; break;
                    case 3: totalQuestions = 30; break;
                }
                sessionData["pageElements"]["results"]["node_" + lookupIndex]["value"]["text"] = sessionData.quizParameters.questionsRight + "/" + totalQuestions;
            }
            lookupIndex++;
        }
        // Update flags and redirect page
        sessionData.booleanFlags.resultsPreloadNeeded = true;
        sessionData.booleanFlags.quizPreloadNeeded = false;
        updateSession("save");
        setTimeout(() => {window.location.replace("results.html")}, 400);
    }
    // Update active question count
    sessionData.quizParameters.activeQuestion += 1;
    updateSession("save");
}

function stopQuiz() {
    Session.clearData();
    window.location.replace("../pgs/setup.html");
}
function resetSetup() {
    Session.clearData();
    window.location.reload();
}
function exitSetup() {
    Session.clearData();
    window.location.replace("../index.html");
}
function getDate() {
    let currentDate = new Date().toLocaleDateString();
    return currentDate;
}
function getTime() {
    let currentTime = new Date().toLocaleTimeString();
    return currentTime;
}