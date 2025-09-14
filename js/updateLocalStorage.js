// Saves data to local storage
function saveData(id, obj) {
    if (id === "quizData") {
        localStorage.setItem("quizData", JSON.stringify(obj));
        console.log("[SYSTEM]: User data saved to local storage" + " (" + getTime() + ").");
    }
    else if (id === "indexData") {
        localStorage.setItem("indexData", JSON.stringify(obj));
        console.log("[SYSTEM]: Index data saved to local storage" + " (" + getTime() + ").");
    }
}

// Retrieves saved data from local storage
function getData(id) {
    let obj = {};
    if (id === "quizData" && typeof localStorage.quizData !== "undefined") {
        obj = JSON.parse(localStorage.quizData);
    } 
    else if (id === "indexData" && typeof localStorage.quizData !== "undefined") {
        obj = JSON.parse(localStorage.indexData);
    }
    return obj;
}

// Initializes local storage object keys
function initializeData(id) {
    if (id === "indexData_generatedIndexes") {
        let obj = { 
            generatedIndexes: {
                1: {1: [], 2: [], 3: [], 4: [], 5: []},
                2: {1: [], 2: [], 3: [], 4: [], 5: []},
                3: {1: [], 2: [], 3: [], 4: [], 5: []},
                4: {1: [], 2: [], 3: [], 4: [], 5: []},
                5: {1: [], 2: [], 3: [], 4: [], 5: []}
            },
            nextIndex: {
            1: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
            2: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
            3: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
            4: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
            5: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
            }
        }
        localStorage.setItem("indexData", JSON.stringify(obj));
        console.log("[SYSTEM]: Index data, generated indexes initialized" + " (" + getTime() + ").");
    }
}

// Clears saves data from local storage
function clearData() {
    localStorage.removeItem("quizData")
    localStorage.removeItem("indexData")
    console.log("[SYSTEM]: User data cleared from local storage" + " (" + getTime() + ").");
}