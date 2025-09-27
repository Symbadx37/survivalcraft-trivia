// Max index counts
const tierCount = 5; // ... (Beginner, Intermediate, Average, Experienced, Veteran)
const categoryCount = 5; // ... (General Knowledge, Game Mechanics, Crafting Recipes, Updates History, Electrics)
const questionCount = {
    category_1: {
        subcategory_1: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0},
        subcategory_2: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0},
        subcategory_3: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}
    },
    category_2: {
        subcategory_1: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0},
        subcategory_2: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0},
        subcategory_3: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}
    },
    category_3: {
        subcategory_1: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0},
        subcategory_2: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0},
        subcategory_3: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}
    },
    category_4: {
        subcategory_1: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0},
        subcategory_2: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0},
        subcategory_3: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}
    },
    category_5: {
        subcategory_1: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0},
        subcategory_2: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0},
        subcategory_3: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}
    }
};

// Probability sets
const probability_beginner = {1: 0.55, 2: 0.4, 3: 0.05, 4: 0, 5: 0};
const probability_intermediate = {1: 0.4, 2: 0.3, 3: 0.15, 4: 0.5, 5: 0};
const probability_average = {1: 0.4, 2: 0.3, 3: 0.15, 4: 0.5, 5: 0};
const probability_experienced = {1: 0.15, 2: 0.4, 3: 0.3, 4: 0.1, 5: 0.05};
const probability_veteran = {1: 0, 2: 0.1, 3: 0.4, 4: 0.35, 5: 0.15};

// Data objects
let sessionData;
let questionData = getParser("questionData");
let setupData = getParser("setupData");

// Event handlers
$(".setup-button-group_1 input").on({
  click: function(){
    console.log("button 1");
    // ... ()
  }
});

$(".setup-button-group_2 input").on({
  click: function(){
    console.log("button 2");
    // ... ()
  }
});

$("#btn-start").on("click", continueQuiz);

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
function calculatePoints() {
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