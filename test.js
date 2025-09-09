const getElement = function(id) {
    return document.getElementById(id);
}
const loadData = function() {
    getElement("choice_1").value = answerString[0][0];
    getElement("choice_2").value = answerString[0][1];
    getElement("choice_3").value = answerString[0][2];
    getElement("choice_4").value = answerString[0][3];
}

const gradeChoice = function() {
    getElement("choice_1").value = "Placeholder";
    getElement("choice_2").value = "Placeholder";
    getElement("choice_3").value = "Placeholder";
    getElement("choice_4").value = "Placeholder";
}

window.onload = function() {
    getElement("continue").onclick = loadData;
    getElement("choice_1").onclick = gradeChoice;
    getElement("choice_2").onclick = gradeChoice;
    getElement("choice_3").onclick = gradeChoice;
    getElement("choice_4").onclick = gradeChoice;
}


const answerString = [
    ["2009", "2011", "2013", "2015"]
];
