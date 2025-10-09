class Session {
    constructor() {
        this.setupParameters = {
           // ...
        }
        this.quizParameters = {
            quizTier: 0,
            quizCategory: 0,
            quizLength: 0,
            quizDuration: 0,
            activeTierProbability: {},
            activeQuestion: 1,
            questionsRight: 0,
            questionsWrong: 0,
            totalPoints: 0,
            currentMinute: 0,
            currentSecond: 0
        }
        this.booleanFlags = {
            isSetupValid: false,
            isQuizActive: false,
            isAnswerSubmitted: false,
            isActive: false,
            isTimeUp: false,
            isTimerResetNeeded: false,
            wasHintUsed: false,
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
                    nullStateHash: "0001",
                    elementID: "setup_tierButton_1",
                    elementGroup: "buttonGroup_1",
                    elementType: "button",
                    elementValue: "",
                    classID: [""],
                    classState: [0],
                    isVisible: 0,
                    isActive: true,
                },
                node_2: {
                    nullStateHash: "0001", 
                    elementID: "setup_tierButton_2",
                    elementGroup: "buttonGroup_1",
                    elementType: "button",
                    elementValue: "",
                    classID: [""],
                    classState: [0],
                    isVisible: 0,
                    isActive: true,
                },
                node_3: {
                    nullStateHash: "0001", 
                    elementID: "setup_tierButton_3",
                    elementGroup: "buttonGroup_1",
                    elementType: "button",
                    elementValue: "",
                    classID: [""],
                    classState: [0],
                    isVisible: 0,
                    isActive: true,
                },
                node_4: {
                    nullStateHash: "0001", 
                    elementID: "setup_tierButton_4",
                    elementGroup: "buttonGroup_1",
                    elementType: "button",
                    elementValue: "",
                    classID: [""],
                    classState: [0],
                    isVisible: 0,
                    isActive: true,
                },
                node_5: {
                    nullStateHash: "0001", 
                    elementID: "setup_tierButton_5",
                    elementGroup: "buttonGroup_1",
                    elementType: "button",
                    elementValue: "",
                    classID: [""],
                    classState: [0],
                    isVisible: 0,
                    isActive: true,
                },
                node_6: {
                    nullStateHash: "0001", 
                    elementID: "setup_tierButton_6",
                    elementGroup: "buttonGroup_1",
                    elementType: "button",
                    elementValue: "",
                    classID: [""],
                    classState: [0],
                    isVisible: 0,
                    isActive: true,
                },
            },
            quiz: {
                node_1: {
                    nullStateHash: "0000", 
                    elementID: "",
                    elementGroup: "",
                    elementType: "",
                    elementValue: "",
                    classID: [""],
                    classState: [0],
                    isVisible: 0,
                    isActive: 0,
                }
            },
            results: {
                node_1: {
                    nullStateHash: "0000", 
                    elementID: "",
                    elementGroup: "",
                    elementType: "",
                    elementValue: "",
                    classID: [""],
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