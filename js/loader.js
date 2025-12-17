// Active document deferred loader
$(document).ready(function() {
    updateSession("refresh");
    // Initialize and/or refresh session
    if (typeof localStorage.sessionData === "undefined") {
        let obj = new Session();
        Session.setData(obj);
        updateSession("refresh");
    }
    // Commence loading checks
    if (sessionData.booleanFlags.setupPreloadNeeded) {
        updateSession("load", "setup", "load_full");
    }
    else if (sessionData.booleanFlags.quizPreloadNeeded) {
        updateSession("load", "quiz", "load_full");
    }
    else if (sessionData.booleanFlags.resultsPreloadNeeded) {
        updateSession("load", "results", "load_full");
    }
    else if (sessionData.booleanFlags.isQuizActive) {
        updateSession("load", "quiz", "load_full");
    }
});

// Automates data saving, refreshing, and loading
function updateSession(functionID, pageID, actionID, nodeArray) {
    const setData = function() {
        Session.setData(sessionData);
    }
    const getData = function() {
        sessionData = Session.getData(localStorage.getItem("sessionData"));
    }
    // Sequence
    switch(functionID) {
        case "refresh": 
            getData(); break;
        case "save": 
            setData(); getData(); break;
        case "load": 
            setData(); getData(); loadDocument(pageID, actionID, nodeArray); break;
    }
}

// Document loader
function loadDocument(pageID, actionID, nodeArray) {
    let elementID, elementType, nodeLength, nodeArrayLength;
    let maxNodeIndexReached = false, nodeIndex = 1, arrayIndex = 0;
    const nodeFields = ["element", "value", "style", "class", "state"];

    if (actionID == "load_partial") nodeArrayLength = nodeArray.length;
    while (!maxNodeIndexReached) {
        // Get node length index
        if (actionID == "load_full") {
            nodeLength = Object.values(sessionData["pageElements"][pageID]).length;
        } else {
            nodeIndex = nodeArray[arrayIndex];
        }
        
        // Get elementID and elementType
        elementID = sessionData["pageElements"][pageID]["node_" + nodeIndex]["element"]["id"];
        elementType = sessionData["pageElements"][pageID]["node_" + nodeIndex]["element"]["type"];

        // Check if node is null
        if (typeof sessionData["pageElements"][pageID]["node_" + nodeIndex] === "undefined") {
            if (actionID == "load_full") {
                nodeIndex++;
                break;
            } else {
                arrayIndex++;
                break;
            }  
        } else {
            checkNullStates();  
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
    $("#setup_pageContainer").removeClass("content_loading");
    $("#quiz_pageContainer").removeClass("content_loading");
    $("#results_pageContainer").removeClass("content_loading");

    function checkNullStates() {
        let fieldIndex = 0;
        while (fieldIndex < nodeFields.length) {
            if (typeof sessionData["pageElements"][pageID]["node_" + nodeIndex][nodeFields[fieldIndex]] !== "undefined") {
                switch(nodeFields[fieldIndex]) {
                    case "value": loadValue(); break;
                    case "style": loadStyle(); break;
                    case "class": loadClass(); break;
                    case "state": loadState(); break;
                }
            }
            fieldIndex++;
        }
    }
    function loadValue() {
        if (sessionData["pageElements"][pageID]["node_" + nodeIndex]["value"]["text"] !== "") {
            let elementValue = sessionData["pageElements"][pageID]["node_" + nodeIndex]["value"]["text"];
            if (elementType == "button") {
                $("#" + elementID).val(elementValue);
            }
            else {
                $("#" + elementID).text(elementValue);
            }
        }
    }
    /* WIP
    function loadStyle() {
        let arrayLength = Object.values(sessionData["pageElements"][pageID]["node_" + nodeIndex]["style"]["attributes"]).length;
        let arrayIndex = 0;
        while (arrayIndex <= arrayLength) {
            let styleAttribute = sessionData["pageElements"][pageID]["node_" + nodeIndex]["style"]["attributes"][styleIndex];
            let styleValue = sessionData["pageElements"][pageID]["node_" + nodeIndex]["style"]["values"][styleIndex];
            let animationMode = sessionData["pageElements"][pageID]["node_" + nodeIndex]["animate"]["mode"][animationIndex];

            switch(sessionData["pageElements"][pageID]["node_" + nodeIndex]["animate"]["state"][animationIndex]) {
                case 0:
                    arrayIndex++; break;
                case 1:
                    loadAnimation("dynamic"); break;
                case 2:
                    loadAnimation("static"); break;
            }  


            function loadAnimation() {
                switch(styleAttribute) {
                    case "width": $("#" + elementID).animate({width: [styleValue, "swing"], height: 8});
                }
            }
        }
        
        
        
        for (let styleIndex = 0; styleIndex < styleLength; styleIndex++) {
            

            switch(styleAttribute) {
                // case "width": $("#" + elementID).width(styleValue); break;
                
                case "height": $("#" + elementID).height(styleValue); break;
                // ... (add more statements for adjustable style attributes)
            }
        }
    }
    */




    function loadClass() {
        let classLength = Object.values(sessionData["pageElements"][pageID]["node_" + nodeIndex]["class"]["name"]).length;
        for (let classIndex = 0; classIndex < classLength; classIndex++) {
            let classID = sessionData["pageElements"][pageID]["node_" + nodeIndex]["class"]["name"][classIndex];
            let classState = sessionData["pageElements"][pageID]["node_" + nodeIndex]["class"]["state"][classIndex];
            switch(classState) {
                case 1: $("#" + elementID).addClass(classID); break;
                case 2: $("#" + elementID).removeClass(classID); break;
            }
        }
    }
    function loadState() {
        if (typeof sessionData["pageElements"][pageID]["node_" + nodeIndex]["state"]["isVisible"] !== "undefined") {
            let visibilityState = sessionData["pageElements"][pageID]["node_" + nodeIndex]["state"]["isVisible"];
            if (visibilityState) {
                $("#" + elementID).show();
            } 
            else if (!visibilityState) {
                $("#" + elementID).hide();
            }
        }
        if (typeof sessionData["pageElements"][pageID]["node_" + nodeIndex]["state"]["isActive"] !== "undefined") {
            let buttonState = sessionData["pageElements"][pageID]["node_" + nodeIndex]["state"]["isActive"];
            if (buttonState) {
                $("#" + elementID).prop("disabled", false);
            } 
            else if (!buttonState) {
                $("#" + elementID).prop("disabled", true);
            }
        }
    }

}