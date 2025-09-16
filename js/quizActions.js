// document.addEventListener("DOMContentLoaded", function() {getElement("").addEventListener("click", "functionName");});

// Caches quiz preload, loads quiz page
function startQuiz() { 
    let quizData = getData("quizData");
    quizData.preloadNeeded = true;
    quizData.isActive = true;
    saveData("quizData", quizData);
    window.location.replace("quiz.html");
}

// Tracks quiz progress, generates new question
function continueQuiz() { 
    let quizData = getData("quizData");
    if (quizData.isSolutionVisible) {
        if (typeof quizData.activeQuestion == "undefined") {
            quizData.activeQuestion = 1;
        } else {
            quizData.activeQuestion += 1;
        }
        saveData("quizData", quizData);
        generateQuestion();
        loadQuiz();
    }
}

// Clears quiz data, loads options page
function stopQuiz() {
    clearData();
    window.location.replace("../pgs/options.html");
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