// Max index counts
const tierCount = 5; // ... (Beginner, Intermediate, Average, Experienced, Veteran)
const categoryCount = 5; // ... (General Knowledge, Game Mechanics, Crafting Recipes, Updates History, Electrics)
const questionCount = {
    category_1: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0},
    category_2: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0},
    category_3: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0},
    category_4: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0},
    category_5: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}
};

// Probability sets
const probability_beginner = {1: 0.55, 2: 0.4, 3: 0.05, 4: 0, 5: 0, 6: 0};
const probability_intermediate = {1: 0.4, 2: 0.3, 3: 0.15, 4: 0.5, 5: 0, 6: 0};
const probability_average = {1: 0, 2: 0.4, 3: 0.3, 4: 0.25, 5: 0.5, 6: 0};
const probability_experienced = {1: 0, 2: 0, 3: 0.35, 4: 0.45, 5: 0.15, 6: 0.5};
const probability_veteran = {1: 0, 2: 0, 3: 0, 4: 0.35, 5: 0.50, 6: 0.15};

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

// Data objects
let sessionData;
let questionData = getParser();

// Event handlers
$("#setup_buttonGroup_1 input").on("click", );
$("#setup_buttonGroup_2 input").on("click", );
$("#setup_buttonGroup_3 input").on("click", );
$("#setup_buttonGroup_4 input").on("click", );
$("#setup_startButton").on("click", startQuiz);
$("#setup_resetButton").on("click", resetSetup);
$("#setup_exitButton").on("click", exitSetup);

// Quiz action functions: WIP
function startQuiz() {
    // ... ()
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