class Session {
    constructor() {
        this.activeQuestion = 1;
        this.quizState = 1;
        this.generatedIndexes = {
            1: {1: [], 2: [], 3: [], 4: [], 5: []},
            2: {1: [], 2: [], 3: [], 4: [], 5: []},
            3: {1: [], 2: [], 3: [], 4: [], 5: []},
            4: {1: [], 2: [], 3: [], 4: [], 5: []},
            5: {1: [], 2: [], 3: [], 4: [], 5: []},
            6: {1: [], 2: [], 3: [], 4: [], 5: []},
            7: {1: [], 2: [], 3: [], 4: [], 5: []}
        }
        this.nextIndex = {
            1: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
            2: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
            3: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
            4: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
            6: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
            7: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
            5: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
        }
        this.buttonStates = {
            tier: {id: "", state: 0},
            ctgr: {id: "", state: 0},
            lgth: {id: "", state: 0},
            drtn: {id: "", state: 0}
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