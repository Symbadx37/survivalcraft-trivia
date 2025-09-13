function getQuestion() {
    let userData = getData("userData");

    // Logical sequence
    let randomCategory = generateCategory(userData);

    // Generate random category, if applicable
    function generateCategory(userData){
        if (userData.quizCategory == 5) {
            randomCategory = Math.floor((Math.random() * categoryCount) + 1);
            console.log("[SYSTEM]: Parameter randomCategory = " + randomCategory + " (" + getTime() + ").");
        }
    } 

    // Generate random difficulty
    function generateDifficulty() {
        // Get probability sum
        let probabilitySum = 0;
        for(let index in userData.tierProbability){
            probabilitySum += userData.tierProbability[index];
        }
        
        // Generate random number
        let randomNumber = Math.random() * probabilitySum;
        for (let randomDifficulty in userData.tierProbability) {
                randomNumber -= userData.tierProbability[randomDifficulty];
            if (randomNumber <= 0) {
                console.log("[SYSTEM]: Parameter randomDifficulty = " + randomDifficulty + " (" + getTime() + ").");
                return randomDifficulty;
            }
        }
    }


}

function encodeIndex() {

}




function generateQuestion() {

}