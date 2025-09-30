function calculatePoints() {
    // Determine active time threshold
    calculateTimeThreshold();
    function calculateTimeThreshold() {
        let thresholdFactor = sessionData.quizDuration;
        let thresholdIndex = (sessionData.currentMinute * 60) + sessionData.currentSecond;
        
        if (thresholdIndex <= (60 * thresholdFactor) && thresholdIndex > (50 * thresholdFactor)) {
            thresholdLevel = 0;
        } else if (thresholdIndex <= (50 * thresholdFactor) && thresholdIndex > (40 * thresholdFactor)) {
            thresholdLevel = 1;
        } else if (thresholdIndex <= (40 * thresholdFactor) && thresholdIndex > (30 * thresholdFactor)) {
            thresholdLevel = 2;
        } else if (thresholdIndex <= (30 * thresholdFactor) && thresholdIndex > (20 * thresholdFactor)) {
            thresholdLevel = 3;
        } else if (thresholdIndex <= (20 * thresholdFactor) && thresholdIndex > (10 * thresholdFactor)) {
            thresholdLevel = 4;
        } else if (thresholdIndex <= (10 * thresholdFactor) && thresholdIndex > 0) {
            thresholdLevel = 5;
        }
    }

    // Calculate static point amount
    let reductionFactor = 2.5 * (2 ** (sessionData.difficultyIndex - 1));
    let baseAmount = (25 * (2 ** (sessionData.difficultyIndex - 1)) - (reductionFactor * thresholdLevel));

    // Assign multipliers
    switch(sessionData.quizLength) {
        case 1: timeMultiplier = 0.125; break;
        case 2: timeMultiplier = 0.25; break;
        case 3: timeMultiplier = 0.5; break;
        default: timeMultiplier = 0;
    }
    switch(sessionData.quizCategory) {
        case 1: categoryMultiplier = 0.025;  break;
        case 2: categoryMultiplier = 0.05; break;
        case 3: categoryMultiplier = 0.075; break;
        case 4: categoryMultiplier = 0.15; break;
        case 5: categoryMultiplier = 0.3; break;
    }

    // Apply multipliers and reducers
    let pointAmount = applyModifiers();
    function applyModifiers() {
        let pointsAfter_cm = ((baseAmount * categoryMultiplier) + baseAmount); // applies category multiplier
        let pointsAfter_tm = ((pointsAfter_cm * timeMultiplier) + pointsAfter_cm); // applies interval multiplier
        let pointAmount = pointsAfter_tm;
        if (sessionData.wasHintUsed) {
            pointAmount = pointAmount - (pointAmount * 0.5);
        }
        if (sessionData.isTimeUp) {
            pointAmount = pointAmount - (pointAmount * 0.75);
        }
        return pointAmount;
    }

    // Round and save point amount
    let totalPoints = sessionStorage.totalPoints;
    sessionStorage.totalPoints = Math.round(totalPoints + pointAmount);
    updateSessionData("save");
}