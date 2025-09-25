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
                    elementID: "p-test",
                    elementType: "paragraph", // (span, input, paragraph, ...)
                    elementValue: "New text",
                    classID: "",
                    classState: "", // (null/add/remove)
                    isVisible: 0, // (null/true/false)
                    isActive: 0, // (null/true/false)
                }
            },
            quiz: {
                node_1: {
                    elementID: "#",
                    elementType: "", // (span, input, paragraph, ...)
                    elementValue: "",
                    classID: ["#", "#", "#"],
                    classState: [0, 0, 0], // (null/add/remove)
                    isVisible: 0, // (null/true/false)
                    isActive: 0, // (null/true/false)
                },
                node_2: {
                    elementID: "#",
                    elementType: "", // (span, input, paragraph, ...)
                    elementValue: "",
                    classID: ["#", "#", "#"],
                    classState: [0, 0, 0], // (null/add/remove)
                    isVisible: 0, // (null/true/false)
                    isActive: 0, // (null/true/false)
                },
                node_3: {
                    elementID: "#",
                    elementType: "", // (span, input, paragraph, ...)
                    elementValue: "",
                    classID: ["#", "#", "#"],
                    classState: [0, 0, 0], // (null/add/remove)
                    isVisible: 0, // (null/true/false)
                    isActive: 0, // (null/true/false)
                }
            },
            results: {
                node_1: {
                    elementID: "#",
                    elementType: "", // (span, input, paragraph, ...)
                    elementValue: "",
                    classID: ["#", "#", "#"],
                    classState: [0, 0, 0], // (null/add/remove)
                    isVisible: 0, // (null/true/false)
                    isActive: 0, // (null/true/false)
                },
                node_2: {
                    elementID: "#",
                    elementType: "", // (span, input, paragraph, ...)
                    elementValue: "",
                    classID: ["#", "#", "#"],
                    classState: [0, 0, 0], // (null/add/remove)
                    isVisible: 0, // (null/true/false)
                    isActive: 0, // (null/true/false)
                },
                node_3: {
                    elementID: "#",
                    elementType: "", // (span, input, paragraph, ...)
                    elementValue: "",
                    classID: ["#", "#", "#"],
                    classState: [0, 0, 0], // (null/add/remove)
                    isVisible: 0, // (null/true/false)
                    isActive: 0, // (null/true/false)
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