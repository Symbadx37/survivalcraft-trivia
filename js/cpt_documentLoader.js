let sessionData;
// let questionData = getParser("questionData");
// let setupData = getParser("setupData");

// Active document deferred loader
$(document).ready(function() {
    // Initialize and/or refresh session
    updateSessionData("refresh");
    if (typeof localStorage.sessionData === "undefined") {
        let obj = new Session();
        Session.setData(obj);
        updateSessionData("refresh");
    } 
    // Commence loading checks
    if (sessionData.booleanFlags.setupPreloadNeeded) {
        console.log("preloading ...");
        loadDocument("setup");
    }
    else if (sessionData.booleanFlags.quizPreloadNeeded) {
        loadDocument("quiz");
    }
    else if (sessionData.booleanFlags.resultsPreloadNeeded) {
        loadDocument("results");
    }
    else if (sessionData.booleanFlags.isActive && sessionData.quizParameters.quizState > 0) {
        updateSessionData("quiz");
    }
});

// Automates data saving, refreshing, and loading
function updateSessionData(actionID, pageID) {
    const setData = function() {
        Session.setData(sessionData);
    }
    const getData = function() {
        sessionData = Session.getData(localStorage.getItem("sessionData"));
    }
    // Sequence
    switch(actionID) {
        case "refresh": getData(); break;
        case "save": setData(); getData(); break;
        case "load": setData(); getData(); loadDocument(pageID);
    }
}

// Document loader
function loadDocument(pageID) {
    let elementID, elementType, nodeLength, classLength, nodeIndex = 0;
    assignLengthIndexes();
    console.log("nodeLength = " + nodeLength);
    
    // Lookup iterator
    for (nodeIndex = 0; nodeIndex < nodeLength; nodeIndex++) {
        // Get elementID and elementType
        elementID = sessionData["pageElements"][pageID]["node_" + (nodeIndex + 1)]["elementID"];
        elementType = sessionData["pageElements"][pageID]["node_" + (nodeIndex + 1)]["elementType"];

        // Update relevant element properties
        switch(elementType) {
            case "paragraph": loadHTMLValue(); break;
            case "heading": loadHTMLValue(); break;
            case "span": loadHTMLValue(); break;
            case "button": loadButtonState(); break;
        }
        // Update element class list
        loadVisibilityState();

        // Update element visibility state
        loadClassList();

        // Reassign length indexes
        assignLengthIndexes();
    } 

    function assignLengthIndexes() {
        if (nodeIndex == 0) {
            nodeLength = Object.values(sessionData["pageElements"][pageID]).length;
            classLength = Object.values(sessionData["pageElements"][pageID]["node_" + 1]["classID"]).length;
        } else {
            nodeLength = Object.values(sessionData["pageElements"][pageID]).length;
            classLength = Object.values(sessionData["pageElements"][pageID]["node_" + (nodeIndex + 1)]["classID"]).length;
        }
    }
    function loadHTMLValue() {
        console.log("loading HTML value ...");
        let elementValue = sessionData["pageElements"][pageID]["node_" + (nodeIndex + 1)]["elementValue"];
       
        if (elementValue !== "") {
            $(elementID).text(elementValue); // Fix code
        } else {
            return;
        }
    }
    function loadButtonState() {
        console.log("loading button states ...");
        let buttonState = sessionData["pageElements"][pageID]["node_" + (nodeIndex + 1)]["isActive"];
        if (buttonState) {
            $(elementID).prop("disabled", false);
        } 
        else if (!buttonState) {
            $(elementID).prop("disabled", true);
        } else {
            return;
        }
    }
    function loadClassList() {
        console.log("loading class list ...");
        if (sessionData["pageElements"][pageID]["node_" + (nodeIndex + 1)]["classID"] !== "") {
            for (let classIndex = 0; classIndex < classLength; classIndex++) {
                let classID = sessionData["pageElements"][pageID]["node_" + (nodeIndex + 1)]["classID"][classIndex];
                let classState = sessionData["pageElements"][pageID]["node_" + (nodeIndex + 1)]["classState"][classIndex];
                switch(classState) {
                    case 1: $(elementID).toggleClass(classID, add); break;
                    case 2: $(elementID).toggleClass(classID, remove); break;
                }
            }
        } else {
            return;
        }   
    }
    function loadVisibilityState() {
        console.log("loading visibility ...");
        let visibilityState = sessionData["pageElements"][pageID]["node_" + (nodeIndex + 1)]["isVisible"];
        if (visibilityState) {
            $(elementID).show();
        } 
        else if (!visibilityState) {
            $(elementID).hide();
        } else {
            return;
        }
    }
}