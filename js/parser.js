import questionData from"../dat/QuestionData.json" with {type: "json"};
window.getParser = getParser;
function getParser() {
    return questionData;
}