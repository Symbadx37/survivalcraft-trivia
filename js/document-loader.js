// Active document deferred loader
$(document).ready(function() {
    updateSessionData("refresh");
    // Initialize and/or refresh session
    if (typeof localStorage.sessionData === "undefined") {
        let obj = new Session();
        Session.setData(obj);
        updateSessionData("refresh");
    }
    // Commence loading checks
    if (sessionData.booleanFlags.setupPreloadNeeded) {
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
    let elementID, elementType, nodeLength, classLength;
    let maxNodeIndexReached = false, nodeIndex = 1;
    while (!maxNodeIndexReached) {
        // Get length indexes
        nodeLength = Object.values(sessionData["pageElements"][pageID]).length;
        classLength = Object.values(sessionData["pageElements"][pageID]["node_" + nodeIndex]["classID"]).length;
        
        // Get elementID and elementType
        elementID = sessionData["pageElements"][pageID]["node_" + nodeIndex]["elementID"];
        elementType = sessionData["pageElements"][pageID]["node_" + nodeIndex]["elementType"];

        // Check node state
        if (sessionData["pageElements"][pageID]["node_" + nodeIndex]["nullStateHash"] == "00000") {
            nodeIndex++;
            break;
        } else {
            checkHashStates();  
        }

        // Iterate loop
        if (nodeIndex == nodeLength) {
            maxNodeIndexReached = true;
        } else {
            nodeIndex++;
        }
    } 

    // Render page
    $("#loading-container_setup").removeClass("loading");

    function checkHashStates() {
        let hashLength = sessionData["pageElements"][pageID]["node_" + nodeIndex]["nullStateHash"].length;
        let hashString = sessionData["pageElements"][pageID]["node_" + nodeIndex]["nullStateHash"];
        for (let hashIndex = 0; hashIndex < hashLength; hashIndex++) {
            let slicedHash = hashString.charAt(hashIndex);
            switch(hashIndex) {
                case 0: 
                    if (slicedHash == 1) loadHTMLValue();
                    break;
                case 1:
                    if (slicedHash == 1) loadClassList();
                    break;
                case 2:
                    if (slicedHash == 1) loadVisibilityState();
                    break;
                case 3:
                    if (slicedHash == 1) loadButtonState();
                    break;
            }
        }    
    }
    function loadHTMLValue() {
        let elementValue = sessionData["pageElements"][pageID]["node_" + nodeIndex]["elementValue"];
        $("#" + elementID).text(elementValue);
    }
    function loadButtonState() {
        let buttonState = sessionData["pageElements"][pageID]["node_" + nodeIndex]["isActive"];
        if (buttonState) {
            $("#" + elementID).prop("disabled", false);
        } 
        else if (!buttonState) {
            $("#" + elementID).prop("disabled", true);
        }
    }
    function loadClassList() {
        for (let classIndex = 0; classIndex < classLength; classIndex++) {
            let classID = sessionData["pageElements"][pageID]["node_" + nodeIndex]["classID"][classIndex];
            let classState = sessionData["pageElements"][pageID]["node_" + nodeIndex]["classState"][classIndex];
            switch(classState) {
                case 1: $("#" + elementID).addClass(classID); break;
                case 2: $("#" + elementID).removeClass(classID); break;
            }
        }
    }
    function loadVisibilityState() {
        let visibilityState = sessionData["pageElements"][pageID]["node_" + nodeIndex]["isVisible"];
        if (visibilityState) {
            $("#" + elementID).show();
        } 
        else if (!visibilityState) {
            $("#" + elementID).hide();
        }
    }
}