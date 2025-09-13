// Caches quiz preload, loads quiz page
function startQuiz() { 
    let userData = getData("userData");
    userData.preloadNeeded = true;
    saveData("userData", userData);
    window.location.replace("quiz.html");
}

// Clears quiz data, loads options page
function stopQuiz() {
    clearData();
    window.location.replace("../pgs/options.html");
}

// Tracks quiz progress, generates new question
function continueQuiz() { 
}

// Accepts indexes, accesses string arrays, loads DOM with question/choice data
function loadQuiz() { 
    getElement("question").innerHTML = "test";
    console.log("[SYSTEM]: Question loaded" + " (" + getTime() + ").");
}

// Validates choice input, tracks quiz score, displays question solution
function gradeQuiz() { 
}

// Returns requested element ID
function getElement(id) {
    return document.getElementById(id);
}

// Returns current date
function getDate() {
    let currentDate = new Date().toLocaleDateString();
    return currentDate;
}

// Returns current time
function getTime() {
    let currentTime = new Date().toLocaleTimeString();
    return currentTime;
}