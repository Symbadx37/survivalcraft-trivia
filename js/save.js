// Save data
function saveData(id) {
    if (id == "save") {
        let value = 5;
        sessionStorage.setItem("data", value);
        console.log("Data = " + sessionStorage.getItem("data"));
    }
}

// Read data
function readData(id) {
    if (id == "read") {
        let value = sessionStorage.getItem("data");
        console.log("Data = " + sessionStorage.getItem("data"));
    }
}

// Clear data
function clearData(id) {
    if (id == "clear") {
        let value = sessionStorage.removeItem("data");
        console.log(sessionStorage.getItem("Data = " + "data"));
    }
}