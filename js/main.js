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
const probability_beginner = {1: 0.55, 2: 0.4, 3: 0.05, 4: 0, 5: 0, 6: 0};
const probability_intermediate = {1: 0.4, 2: 0.3, 3: 0.15, 4: 0.5, 5: 0, 6: 0};
const probability_average = {1: 0, 2: 0.4, 3: 0.3, 4: 0.25, 5: 0.5, 6: 0};
const probability_experienced = {1: 0, 2: 0, 3: 0.35, 4: 0.45, 5: 0.15, 6: 0.5};
const probability_veteran = {1: 0, 2: 0, 3: 0, 4: 0.35, 5: 0.50, 6: 0.15};

// Data objects
let sessionData;
// let questionData = getParser("questionData");
// let setupData = getParser("setupData");

// Event handlers
$(".btn-choice").on({
  click: function(){
    // ... function(this.id);
  }
});
$("#btn-submit").on({
  click: function(){
    // ... function(this.id);
  }
});
$("#btn-quit").on({
  click: function(){
    $("#mdl-quit").show();
    $(".modal-button-group input").on({
        click: function(){
            if (this.id == "btn-quit_yes") {
                stopQuiz();
            } else if (this.id == "btn-quit_no") {
                $("#mdl-quit").hide();
            }
        }
    });
  }
});

$("#btn-submit").on("click", updateProgressBar);

let barWidth = 0;
let quizLength = 1;
function updateProgressBar() {
    switch(quizLength) {
        case 1: widthFactor = 30; break;
        case 2: widthFactor = 15; break;
        case 3: widthFactor = 10; break;
    }
    barWidth += widthFactor; // max width is 300
    $("#progress-bar").animate({width: [barWidth, "swing"]});
}
    




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
    // Session.clearData();
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