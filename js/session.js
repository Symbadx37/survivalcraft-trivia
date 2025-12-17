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
            difficultyIndex: "",
            questionIndex: "",
            indexCache: {
                1: {1: [], 2: [], 3: [], 4: [], 5: [], 6: []},
                2: {1: [], 2: [], 3: [], 4: [], 5: [], 6: []},
                3: {1: [], 2: [], 3: [], 4: [], 5: [], 6: []},
                4: {1: [], 2: [], 3: [], 4: [], 5: [], 6: []},
                5: {1: [], 2: [], 3: [], 4: [], 5: [], 6: []}
            },
            nextQuestionIndex: {
                1: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0},
                2: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0},
                3: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0},
                4: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0},
                5: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}
            }
        }
        this.pageElements = {
            setup: {
                node_1: {
                    element: {
                        id: "setup_tierButton_1",
                        group: "buttonGroup_1",
                        type: "button",
                    },
                    state: {
                        isActive: true
                    }
                },
                node_2: {
                    element: {
                        id: "setup_tierButton_2",
                        group: "buttonGroup_1",
                        type: "button",
                    },
                    state: {
                        isActive: true
                    }
                },
                node_3: {
                    element: {
                        id: "setup_tierButton_3",
                        group: "buttonGroup_1",
                        type: "button",
                    },
                    state: {
                        isActive: true
                    }
                },
                node_4: {
                    element: {
                        id: "setup_tierButton_4",
                        group: "buttonGroup_1",
                        type: "button",
                    },
                    state: {
                        isActive: true
                    }
                },
                node_5: {
                    element: {
                        id: "setup_tierButton_5",
                        group: "buttonGroup_1",
                        type: "button",
                    },
                    state: {
                        isActive: true
                    }
                },
                node_6: {
                    element: {
                        id: "setup_tierButton_6",
                        group: "buttonGroup_1",
                        type: "button",
                    },
                    state: {
                        isActive: true
                    }
                },
                node_7: {
                    element: {
                        id: "setup_categoryButton_1",
                        group: "buttonGroup_2",
                        type: "button",
                    },
                    state: {
                        isActive: true
                    }
                },
                node_8: {
                    element: {
                        id: "setup_categoryButton_2",
                        group: "buttonGroup_2",
                        type: "button",
                    },
                    state: {
                        isActive: true
                    }
                },
                node_9: {
                    element: {
                        id: "setup_categoryButton_3",
                        group: "buttonGroup_2",
                        type: "button",
                    },
                    state: {
                        isActive: true
                    }
                },
                node_10: {
                    element: {
                        id: "setup_categoryButton_4",
                        group: "buttonGroup_2",
                        type: "button",
                    },
                    state: {
                        isActive: true
                    }
                },
                node_11: {
                    element: {
                        id: "setup_categoryButton_5",
                        group: "buttonGroup_2",
                        type: "button",
                    },
                    state: {
                        isActive: true
                    }
                },
                node_12: {
                    element: {
                        id: "setup_categoryButton_6",
                        group: "buttonGroup_2",
                        type: "button",
                    },
                    state: {
                        isActive: true
                    }
                },
                node_13: {
                    element: {
                        id: "setup_lengthButton_1",
                        group: "buttonGroup_3",
                        type: "button",
                    },
                    state: {
                        isActive: true
                    }
                },
                node_14: {
                    element: {
                        id: "setup_lengthButton_2",
                        group: "buttonGroup_3",
                        type: "button",
                    },
                    state: {
                        isActive: true
                    }
                },
                node_15: {
                    element: {
                        id: "setup_lengthButton_3",
                        group: "buttonGroup_3",
                        type: "button",
                    },
                    state: {
                        isActive: true
                    }
                },
                node_16: {
                    element: {
                        id: "setup_lengthButton_4",
                        group: "buttonGroup_3",
                        type: "button",
                    },
                    state: {
                        isActive: true
                    }
                },
                node_17: {
                    element: {
                        id: "setup_durationButton_1",
                        group: "buttonGroup_4",
                        type: "button",
                    },
                    state: {
                        isActive: true
                    }
                },
                node_18: {
                    element: {
                        id: "setup_durationButton_2",
                        group: "buttonGroup_4",
                        type: "button",
                    },
                    state: {
                        isActive: true
                    }
                },
                node_19: {
                    element: {
                        id: "setup_durationButton_3",
                        group: "buttonGroup_4",
                        type: "button",
                    },
                    state: {
                        isActive: true
                    }
                },
                node_20: {
                    element: {
                        id: "setup_durationButton_4",
                        group: "buttonGroup_4",
                        type: "button",
                    },
                    state: {
                        isActive: true
                    }
                },
                node_21: {
                    element: {
                        id: "setup_durationButton_5",
                        group: "buttonGroup_4",
                        type: "button",
                    },
                    state: {
                        isActive: true
                    }
                },
            },
            quiz: {
                node_1: {
                    element: {
                        id: "quiz_progressBar",
                        type: "element",
                    },
                    style: {
                        attributes: ["width", "height"], // animation attributes
                        values: [0,8] // attribute values
                    },
                    animation: {
                        mode: ["swing", "swing"], // animation type
                        state: [1,2] // 0 = null, 1 = dynamic, 2 = static
                    }
                },
                node_2: {
                    element: {
                        id: "quiz_questionText",
                        type: "paragraph",
                    },
                    value: {
                        text: ""
                    }
                },
                node_3: {
                    element: {
                        id: "quiz_answerChoiceButton_1",
                        group: "answerGroup",
                        type: "button",
                    },
                    value: {
                        text: ""
                    },
                    class: {
                        name: ["btn-answer-choice-right", "btn-answer-choice-wrong"],
                        state: [0, 0]
                    },
                    state: {
                        isActive: true
                    }
                },
                node_4: {
                    element: {
                        id: "quiz_answerChoiceButton_2",
                        group: "answerGroup",
                        type: "button",
                    },
                    value: {
                        text: ""
                    },
                    class: {
                        name: ["btn-answer-choice-right", "btn-answer-choice-wrong"],
                        state: [0, 0]
                    },
                    state: {
                        isActive: true
                    }
                },
                node_5: {
                    element: {
                        id: "quiz_answerChoiceButton_3",
                        group: "answerGroup",
                        type: "button",
                    },
                    value: {
                        text: ""
                    },
                    class: {
                        name: ["btn-answer-choice-right", "btn-answer-choice-wrong"],
                        state: [0, 0]
                    },
                    state: {
                        isActive: true
                    }
                },
                node_6: {
                    element: {
                        id: "quiz_answerChoiceButton_4",
                        group: "answerGroup",
                        type: "button",
                    },
                    value: {
                        text: ""
                    },
                    class: {
                        name: ["btn-answer-choice-right", "btn-answer-choice-wrong"],
                        state: [0, 0]
                    },
                    state: {
                        isActive: true
                    }
                },
                node_7: {
                    element: {
                        id: "quiz_continueButton",
                        type: "button",
                    },
                    state: {
                        isActive: false
                    }
                }
            },
            results: {
                node_1: {}
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