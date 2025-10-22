import questionData from"../dat/QuestionData.json" with {type: "js"};
window.getParser = getParser;

function getParser() {
    return questionData;
}
