// Max index counts
const tierCount = 5; // ... (Beginner, Intermediate, Average, Experienced, Veteran)
const categoryCount = 5; // ... (General Knowledge, Game Mechanics, Crafting Recipes, Updates History, Electrics)
const lengthCount = 3; // ... (Easy = 10, Medium = 20, Hard = 30)
const durationCount = 4; // ... (High = 3m, Moderate = 2m, Low = 1m, None)
const questionCount = {
    1: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0},
    2: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0},
    3: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0},
    4: {1: 34, 2: 24, 3: 46, 4: 85, 5: 35, 6: 64},
    5: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}
};

// Probability sets
const probability_beginner = {1: 0.55, 2: 0.4, 3: 0.05, 4: 0, 5: 0, 6: 0};
const probability_intermediate = {1: 0.4, 2: 0.3, 3: 0.15, 4: 0.5, 5: 0, 6: 0};
const probability_average = {1: 0, 2: 0.4, 3: 0.3, 4: 0.25, 5: 0.5, 6: 0};
const probability_experienced = {1: 0, 2: 0, 3: 0.35, 4: 0.45, 5: 0.15, 6: 0.5};
const probability_veteran = {1: 0, 2: 0, 3: 0, 4: 0.35, 5: 0.50, 6: 0.15};

/* REMOVE COMMENTS BEFORE SHIPPING
// Disable console access
window.addEventListener('keydown', function(event) {
    if (event.code === 'F12') {
        event.preventDefault();
        console.log('Blocked F12');
    }
    if (event.shiftKey && event.ctrlKey && event.code === 'KeyI') {
        event.preventDefault();
        console.log('Blocked Ctrl + Shift + i');
    }
});
window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    console.log('Blocked RightClick');
}); 

*/

// Data objects
let sessionData;
let questionData = getParser();

// Event handlers
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

$("#setup_startButton").on("click", startQuiz);
$("#setup_resetButton").on("click", resetSetup);
$("#setup_exitButton").on("click", exitSetup);
$("#quiz_submitButton").on("click", continueQuiz);
$("#quiz_quitButton").on("click", stopQuiz);

function initializeSetup(elementID, elementGroup) {
    let nodeIndex, isNodeFound = false;
    let activeNodes = [];
    const nodeLength = Object.values(sessionData["pageElements"]["setup"]).length;
    let lookupIndex_1 = 1, lookupIndex_2 = 1, lookupIndex_3 = 1, activeNodeThreshold = 0;

    // Gets active button node
    while (!isNodeFound) {
        if (sessionData["pageElements"]["setup"]["node_" + lookupIndex_1]["elementID"] == elementID) {
            nodeIndex = lookupIndex_1;
            isNodeFound = true;
            sessionData["pageElements"]["setup"]["node_" + nodeIndex]["isActive"] = false;
            updateSession("load", "setup", "load_partial", [nodeIndex]);
        } else {
            lookupIndex_1++;
        }
    }

    // Gets total number of button nodes in active group, pushes active nodes to array
    while (lookupIndex_2 <= nodeLength) {
        if (sessionData["pageElements"]["setup"]["node_" + lookupIndex_2]["elementGroup"] == elementGroup) {
            activeNodes.push(lookupIndex_2);
            activeNodeThreshold++;
        }
        lookupIndex_2++;
    }

    // Updates states of all inactive and unselected buttons
    while (lookupIndex_3 <= activeNodeThreshold) {
        if (sessionData["pageElements"]["setup"]["node_" + activeNodes[lookupIndex_3 - 1]]["elementGroup"] == elementGroup &&
            sessionData["pageElements"]["setup"]["node_" + activeNodes[lookupIndex_3 - 1]]["elementID"] !== elementID &&
            sessionData["pageElements"]["setup"]["node_" + activeNodes[lookupIndex_3 - 1]]["isActive"] == false) {
                sessionData["pageElements"]["setup"]["node_" + activeNodes[lookupIndex_3 - 1]]["isActive"] = true; 
                updateSession("load", "setup", "load_partial", [activeNodes[lookupIndex_3 - 1]]);
        } 
        lookupIndex_3++;
    }
}

function startQuiz() {
    const nodeLength = Object.values(sessionData["pageElements"]["setup"]).length;
    validateSetup();
    generateQuestion();

    /*
    // Update session flags
    if (sessionData.booleanFlags.isSetupValid) {
        sessionData.booleanFlags.setupPreloadNeeded = false;
        sessionData.booleanFlags.quizPreloadNeeded = true;
        sessionData.booleanFlags.isActive = true;
        updateSession("save");
        window.location.replace("quiz.html");
    }
    */

    function validateSetup() {
        let activeGroup = [], lookupIndex = 1;
        while (lookupIndex <= nodeLength) {
            if (sessionData["pageElements"]["setup"]["node_" + lookupIndex]["isActive"] == false) {
                activeGroup.push(sessionData["pageElements"]["setup"]["node_" + lookupIndex]["elementGroup"]);
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
        while (lookupIndex <= nodeLength) {
            let nodeID, groupID, nodeSlice, groupSlice;
            if (sessionData["pageElements"]["setup"]["node_" + lookupIndex]["isActive"] == false) {
                nodeID = sessionData["pageElements"]["setup"]["node_" + lookupIndex]["elementID"];
                groupID = sessionData["pageElements"]["setup"]["node_" + lookupIndex]["elementGroup"];
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
        
        if (sessionData.quizParameters.quizTier == 5) {
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
function continueQuiz() {
    // ... ()
}
function gradeQuiz() {
    // ... ()
}
function generateQuestion() {
    // ... ()
}
function parseQuizData() {
    // ... ()
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