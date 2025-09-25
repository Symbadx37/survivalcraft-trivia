import questionData from"../dat/QuestionData.json" with {type: "json"};
import setupData from"../dat/SetupData.json" with {type: "json"};
window.getParser = getParser;

function getParser(id) {
    if (id == "questionData") {
        return questionData;
    }
    else if (id == "setupData") {
        return setupData;
    }
}