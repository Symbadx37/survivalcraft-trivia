class Session {
    constructor() {
        this.setupParameters = {
            // ... ()
        }
        this.quizParameters = {
            quizTier: 0,
            quizCategory: 0,
            quizLength: 0,
            quizDuration: 0,
            activeTierProbability: {},
            activeQuestion: 1,
            questionsRight: 0,
            questionsWrong: 0
        }
        this.booleanFlags = {
            isSetupValid: false,
            isActive: false,
            isTimeUp: false,
            isTimerResetNeeded: false,
            setupPreloadNeeded: true,
            quizPreloadNeeded: "",
            resultsPreloadNeeded: ""
        }
        this.quizIndexes = {
        categoryIndex: "",
        subcategoryIndex: "",
        dificultyIndex: "",
        questionIndex: "",
        indexCache: {
            1: {1: [], 2: [], 3: [], 4: [], 5: []},
            2: {1: [], 2: [], 3: [], 4: [], 5: []},
            3: {1: [], 2: [], 3: [], 4: [], 5: []},
            4: {1: [], 2: [], 3: [], 4: [], 5: []},
            5: {1: [], 2: [], 3: [], 4: [], 5: []}
        },
        nextQuestionIndex: {
            1: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
            2: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
            3: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
            4: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
            5: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
        }
    }
        this.pageElements = {
            setup: {
                node_1: {
                    nullStateHash: "1100",      // ... (elementValue, classList, isVisible, isActive)
                    elementID: "p-test",        // ... (STRING: HTML element id)
                    elementType: "paragraph",   // ... (STRING: button, division, span, paragraph, heading)
                    elementValue: "New text",   // ... (STRING: HTML text value)
                    classID: ["test", "test2"], // ... (ARRAY: HTML element id)
                    classState: [1, 1],         // ... (ARRAY: 0 = null, 1 = add, 2 = remove)
                    isVisible: 0,               // ... (FLAG: "" = null, true = show, false = hide)
                    isActive: 0,                // ... (FLAG: "" = null, true = enabled, false = disabled)
                },
                node_2: {
                    nullStateHash: "1000", 
                    elementID: "span-test",
                    elementType: "span",
                    elementValue: "New text",
                    classID: ["#"],
                    classState: [0],
                    isVisible: 0,
                    isActive: 0,
                }
            },
            quiz: {
                node_1: {
                    nullStateHash: "0000", 
                    elementID: "#",
                    elementType: "",
                    elementValue: "",
                    classID: ["#"],
                    classState: [0],
                    isVisible: 0,
                    isActive: 0,
                },
                node_2: {
                    nullStateHash: "0000", 
                    elementID: "#",
                    elementType: "",
                    elementValue: "",
                    classID: ["#"],
                    classState: [0],
                    isVisible: 0,
                    isActive: 0,
                },
                node_3: {
                    nullStateHash: "0000", 
                    elementID: "#",
                    elementType: "",
                    elementValue: "",
                    classID: ["#"],
                    classState: [0],
                    isVisible: 0,
                    isActive: 0,
                }
            },
            results: {
                node_1: {
                    nullStateHash: "0000", 
                    elementID: "#",
                    elementType: "",
                    elementValue: "",
                    classID: ["#"],
                    classState: [0],
                    isVisible: 0,
                    isActive: 0,
                },
                node_2: {
                    nullStateHash: "0000", 
                    elementID: "#",
                    elementType: "",
                    elementValue: "",
                    classID: ["#"],
                    classState: [0],
                    isVisible: 0,
                    isActive: 0,
                },
                node_3: {
                    nullStateHash: "0000", 
                    elementID: "#",
                    elementType: "",
                    elementValue: "",
                    classID: ["#"],
                    classState: [0],
                    isVisible: 0,
                    isActive: 0,
                }
            }
        }
    }
    static setData(parsedJSON) {
        localStorage.setItem("sessionData", JSON.stringify(parsedJSON));
    }
    static getData(serializedJSON) {
        return Object.assign(new Session(), JSON.parse(serializedJSON));
    }
    static clearData() {
        localStorage.removeItem("sessionData");
    }
}