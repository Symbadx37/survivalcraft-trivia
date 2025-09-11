// Saves user data to local storage
function saveData(data) {
    localStorage.setItem('data', JSON.stringify(data));
    console.log("[SYSTEM]: User data saved to local storage" + " (" + getTime() + ").");
}

// Reads saved user data and prints to console
function readData() {
    if (typeof localStorage.data !== "undefined") {
        let savedData = getData();
        console.log("[SYSTEM]: User data (quizTier) = " + JSON.parse(savedData.quizTier) + "."
           + "\n" + "[SYSTEM]: User data (quizCategory) = " + JSON.parse(savedData.quizCategory) + "."
           + "\n" + "[SYSTEM]: User data (quizLength) = " + JSON.parse(savedData.quizLength) + "."
           + "\n" + "[SYSTEM]: User data (quizDuration) = " + JSON.parse(savedData.quizDuration) + "."
        );
    } else {
        console.log("[SYSTEM]: User data is undefined" + " (" + getTime() + ").");
    }
}

// Retrieves saved user data from local storage
function getData() {
    let data = {};
    if (typeof localStorage.data !== "undefined") {
        data = JSON.parse(localStorage.data);
    }
    return data;
}

// Clears saves user data from local storage
function clearData() {
    localStorage.removeItem('data')
    console.log("[SYSTEM]: User data cleared from local storage" + " (" + getTime() + ").");
}