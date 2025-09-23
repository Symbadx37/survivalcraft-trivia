class Timer {
    static setData(parsedJSON) {
        localStorage.setItem("timerData", JSON.stringify(parsedJSON));
    }
    static getData(serializedJSON) {
        return Object.assign(new Timer(), JSON.parse(serializedJSON));
    }
    static clearData() {
        localStorage.removeItem("timerData");
    }
}