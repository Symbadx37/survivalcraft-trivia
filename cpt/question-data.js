class question {
    constructor() {
    }


}


questionString = "This is a question.";
difficultyTier = "Beginner", "Intermediate", "Experienced", "Veteran";
quizLength = 5-30; // Custom cap cannot be higher than the static totalQuestionIndex
questionTier = "Very Easy", "Easy", "Medium", "Hard", "Very Hard";
questionType = "Multiple Choice", "True or False", "Short Answer";
solutionString = "This is a solution.";
answerIndex = 1-4;


// Question strings
const questionString_ve = [
    "What year did Survivalcraft 1.0 release?",
    "Which update added splitscreen multiplayer?"
];
const questionString_e = [
    "How many game days does it take for raw meat to rot?",
    "What is the maximum number of triangles allowed for a single furniture design?",
    "Is limestone a paintable block?",
    "What is the natural block color of granite?"
];
const questionString_m = [
    "A single, non-adjustable delay gate provides a pulse duartion for how long?",
    "How many magnets can be placed in a single world?",
    "What additional component is required to craft a connected furniture block?",
    "What is the maximum insulation amount achievable in any survival mode?",
    "An electric button provides a pulse duration for how long?",
    "Which of the following land animals are NOT in the game?",
    "Which of the following ocean animals are NOT in the game?",
    "Can sulphur be used as a fuel source when using a furnace?"
];
const questionString_h = [
    "If a campfire is exposed to rain or snow, by how much faster does it deplete?",
    "How many unique sound generator sounds are there?",
    "How do you make a Cyan Paint bucket?"
];
const questionString_vh = [
    "How do you craft Green Flickering Large Burst (Low) fireworks?"
];


const answerString = [
    // Very easy (x2)
    [["2009", "2011", "2013", "2015"],
     ["1.29", "2.1", "2.2", "2.3"]],
    // Easy (x4)
    [["1", "3", "5", "7"],
     ["200", "250", "300", "350"]
     ["Red Orange", "Light Gray", "White", "Dark Gray"]
     ["Yes", "No"]],
    // Medium (x8)
    [["answer3-1-1", "answer3-1-2", "answer3-1-3", "answer3-1-4"],
     ["answer3-2-1", "answer3-2-2", "answer3-2-3", "answer3-2-4"]
     ["answer1-1-1", "answer1-1-2", "answer1-1-3", "answer1-1-4"]
     ["answer1-1-1", "answer1-1-2", "answer1-1-3", "answer1-1-4"]
     ["answer1-1-1", "answer1-1-2", "answer1-1-3", "answer1-1-4"]
     ["answer1-1-1", "answer1-1-2", "answer1-1-3", "answer1-1-4"]
     ["answer1-1-1", "answer1-1-2", "answer1-1-3", "answer1-1-4"]
     ["answer1-1-1", "answer1-1-2", "answer1-1-3", "answer1-1-4"]],
    // Hard (x3)
    [["answer4-1-1", "answer4-1-2", "answer4-1-3", "answer4-1-4"],
     ["answer4-2-1", "answer4-2-2", "answer4-2-3", "answer4-2-4"]
     ["answer1-1-1", "answer1-1-2", "answer1-1-3", "answer1-1-4"]],
    // Very hard (x1)
    [["answer5-1-1", "answer5-1-2", "answer5-1-3", "answer5-1-4"]]
];