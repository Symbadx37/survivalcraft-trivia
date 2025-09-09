/* const getElement = function(id) {
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
]; */




function getRandomQuestion(difficultyTier) {
    // Get probability sum
    let sum = 0;
    for(let i in activeArray){
        sum += activeArray[i];
    }

    // Generate random number
    function generateRandom(activeArray) {
        let value = Math.random() * sum;
        for (let num in activeArray) {
            value -= activeArray[num];

            if (value <= 0) {
                return num;
            }
        }
    }

    let randomNum = generateRandom(activeArray);
    let questionIndex = parseIndex(randomNum);


    
    // Parse question index
    function parseIndex(randomNum, difficultyTier) {

    }

}

