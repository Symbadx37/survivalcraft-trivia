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
        console.log("preloading setup ...");
        loadDocument("setup", "load_full");
    }
    else if (sessionData.booleanFlags.quizPreloadNeeded) {
        console.log("preloading quiz ...");
        loadDocument("quiz", "load_full");
    }
    else if (sessionData.booleanFlags.resultsPreloadNeeded) {
        console.log("preloading results ...");
        loadDocument("results", "load_full");
    }
    else if (sessionData.booleanFlags.isQuizActive) {
        console.log("loading quiz ...");
        loadDocument("quiz", "load_full");
    }
});

// Automates data saving, refreshing, and loading
function updateSessionData(actionID) {
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
    }
}

// Document loader
function loadDocument(pageID, actionID, nodeArray) {
    let elementID, elementType, nodeLength, classLength, nodeArrayLength;
    let maxNodeIndexReached = false, nodeIndex = 1, arrayIndex = 0;
    
    if (actionID == "load_partial") nodeArrayLength = nodeArray.length;

    while (!maxNodeIndexReached) {
        // Get length indexes
        if (actionID == "load_full") {
            nodeLength = Object.values(sessionData["pageElements"][pageID]).length;
            classLength = Object.values(sessionData["pageElements"][pageID]["node_" + nodeIndex]["classID"]).length;
        } else {
            nodeIndex = nodeArray[arrayIndex];
        }
        
        // Get elementID and elementType
        elementID = sessionData["pageElements"][pageID]["node_" + nodeIndex]["elementID"];
        elementType = sessionData["pageElements"][pageID]["node_" + nodeIndex]["elementType"];

        // Check if node is null
        if (sessionData["pageElements"][pageID]["node_" + nodeIndex]["nullStateHash"] == "00000") {
            if (actionID == "load_full") {
                nodeIndex++;
                break;
            } else {
                arrayIndex++;
                break;
            }  
        } else {
            checkHashStates();  
        }

        // Iterate loop
        if (actionID == "load_full") {
            if (nodeIndex == nodeLength) {
                maxNodeIndexReached = true;
            } else {
                nodeIndex++;
            }
        } else {
            if (arrayIndex == (nodeArrayLength - 1)) {
                maxNodeIndexReached = true;
            } else {
                arrayIndex++;
            }
        }
    } 

    // Render page
    $("#loading-container_setup").removeClass("loading");

    function checkHashStates() {
        let hashIndex = 0;
        let hashString = sessionData["pageElements"][pageID]["node_" + nodeIndex]["nullStateHash"];
        let hashLength = sessionData["pageElements"][pageID]["node_" + nodeIndex]["nullStateHash"].length;        
        while (hashIndex < hashLength) {
            let slicedHash = hashString.charAt(hashIndex);
            if (slicedHash == 1) {
                switch(hashIndex) {
                    case 0: loadHTMLValue(); break;
                    case 1: loadClassList(); break;
                    case 2: loadVisibilityState(); break;
                    case 3: loadButtonState(); break;
                }
            }
            hashIndex++;
        }    
    }
    function loadHTMLValue() {
        if (sessionData["pageElements"][pageID]["node_" + nodeIndex]["elementValue"] !== "") {
            let elementValue = sessionData["pageElements"][pageID]["node_" + nodeIndex]["elementValue"];
            $("#" + elementID).text(elementValue);
        } else {
            return;
        }
    }
    function loadButtonState() {
        if (sessionData["pageElements"][pageID]["node_" + nodeIndex]["isActive"] !== 0) {
            let buttonState = sessionData["pageElements"][pageID]["node_" + nodeIndex]["isActive"];
            if (buttonState) {
                $("#" + elementID).prop("disabled", false);
            } 
            else if (!buttonState) {
                $("#" + elementID).prop("disabled", true);
            }
        } else {
            return;
        }
    }
    function loadClassList() {
        if (sessionData["pageElements"][pageID]["node_" + nodeIndex]["classState"][0] !== 0) {
            for (let classIndex = 0; classIndex < classLength; classIndex++) {
                let classID = sessionData["pageElements"][pageID]["node_" + nodeIndex]["classID"][classIndex];
                let classState = sessionData["pageElements"][pageID]["node_" + nodeIndex]["classState"][classIndex];
                switch(classState) {
                    case 1: $("#" + elementID).addClass(classID); break;
                    case 2: $("#" + elementID).removeClass(classID); break;
                }
            }
        } else {
            return;
        }
    }
    function loadVisibilityState() {
        if (sessionData["pageElements"][pageID]["node_" + nodeIndex]["isVisible"] !== 0) {
            let visibilityState = sessionData["pageElements"][pageID]["node_" + nodeIndex]["isVisible"];
            if (visibilityState) {
                $("#" + elementID).show();
            } 
            else if (!visibilityState) {
                $("#" + elementID).hide();
            }
        } else {
            return;
        }
    }
}