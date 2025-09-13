// Saves data to local storage
function saveData(id, obj) {
    if (id === 'userData') {
        localStorage.setItem('userData', JSON.stringify(obj));
        let userData = getData(id);
        console.log("[SYSTEM]: User data saved to local storage" + " (" + getTime() + ").");
    }
    else if (id === 'indexData') {
        localStorage.setItem('indexData', JSON.stringify(obj));
        let indexData = getData(id);
        console.log("[SYSTEM]: Index data saved to local storage" + " (" + getTime() + ").");
    }
}

// Retrieves saved data from local storage
function getData(id) {
    let obj = {};
    if (id === 'userData' && typeof localStorage.userData !== "undefined") {
        obj = JSON.parse(localStorage.userData);
    } 
    else if (id === 'indexData' && typeof localStorage.userData !== "undefined") {
        obj = JSON.parse(localStorage.indexData);
    }
    return obj;
}

// Clears saves data from local storage
function clearData() {
    localStorage.removeItem('userData')
    localStorage.removeItem('indexData')
    console.log("[SYSTEM]: User data cleared from local storage" + " (" + getTime() + ").");
}