// Max index counts
const quizTierMax = 4;
const quizLengthMax = 4;
const quizDurationMax = 5;
const quizCategoryMax = 4;
const quizQuestionMax = {
    1: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
    2: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
    3: {1: 10, 2: 19, 3: 26, 4: 25, 5: 20},
    4: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
    5: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
};
// Probability sets
const probability_beginner = {1: 0.55, 2: 0.4, 3: 0.05, 4: 0, 5: 0};
const probability_intermediate = {1: 0.4, 2: 0.3, 3: 0.15, 4: 0.5, 5: 0};
const probability_experienced = {1: 0.15, 2: 0.4, 3: 0.3, 4: 0.1, 5: 0.05};
const probability_veteran = {1: 0, 2: 0.1, 3: 0.4, 4: 0.35, 5: 0.15};