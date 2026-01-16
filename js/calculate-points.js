function calculatePoints() {
    let thresholdLevel, baseAmount, pointAmount;
    if (sessionData.quizParameters.quizDuration !== 4) {
        // thresholdLevel = calculateTimeThreshold();
        thresholdLevel = 0;
        baseAmount = calculatePointAmount();
        pointAmount = applyModifiers();
    } else {
        thresholdLevel = 0;
        baseAmount = calculatePointAmount();
        pointAmount = applyModifiers();
    }

    // Determine active time threshold
    function calculateTimeThreshold() {
        let thresholdLevel, thresholdFactor;
        let thresholdIndex = sessionData.quizParameters.secondsRemaining;
        switch(sessionData.quizParameters.quizDuration) {
            case 1: thresholdFactor = 3; break;
            case 2: thresholdFactor = 2; break;
            case 3: thresholdFactor = 1; break;
        }
        if (thresholdIndex <= (30 * thresholdFactor) && thresholdIndex > (25 * thresholdFactor)) {
            thresholdLevel = 0;
        } else if (thresholdIndex <= (25 * thresholdFactor) && thresholdIndex > (20 * thresholdFactor)) {
            thresholdLevel = 1;
        } else if (thresholdIndex <= (20 * thresholdFactor) && thresholdIndex > (15 * thresholdFactor)) {
            thresholdLevel = 2;
        } else if (thresholdIndex <= (15 * thresholdFactor) && thresholdIndex > (10 * thresholdFactor)) {
            thresholdLevel = 3;
        } else if (thresholdIndex <= (10 * thresholdFactor) && thresholdIndex > (5 * thresholdFactor)) {
            thresholdLevel = 4;
        } else if (thresholdIndex <= (5 * thresholdFactor) && thresholdIndex > 0) {
            thresholdLevel = 5;
        }
        return thresholdLevel;
    }

    // Calculate static point amount
    function calculatePointAmount() {
        let reductionFactor = 2.5 * (2 ** (sessionData.quizIndexes.difficultyIndex - 1));
        let baseAmount = (25 * (2 ** (sessionData.quizIndexes.difficultyIndex - 1)) - (reductionFactor * thresholdLevel));
        return baseAmount;
    }

    // Apply point modifiers
    function applyModifiers() {
        let categoryMultiplier, timeMultiplier;
        switch(sessionData.quizParameters.quizDuration) {
            case 1: timeMultiplier = 0.125; break;
            case 2: timeMultiplier = 0.25; break;
            case 3: timeMultiplier = 0.5; break;
            default: timeMultiplier = 0;
        }
        switch(sessionData.quizParameters.quizCategory) {
            case 1: categoryMultiplier = 0.025;  break; // General Knowledge
            case 2: categoryMultiplier = 0.05; break; // Game Mechanics
            case 3: categoryMultiplier = 0.15; break; // Crafting Recipes
            case 4: categoryMultiplier = 0.075; break; // Updates History
            case 5: categoryMultiplier = 0.3; break; // Electrics
        }
        let pointsAfter_cm = ((baseAmount * categoryMultiplier) + baseAmount); // applies category multiplier
        let pointsAfter_tm = ((pointsAfter_cm * timeMultiplier) + pointsAfter_cm); // applies interval multiplier
        let pointAmount = pointsAfter_tm;
        if (sessionData.booleanFlags.wasHintUsed) {
            pointAmount = pointAmount - (pointAmount * 0.5);
        }
        if (sessionData.booleanFlags.isTimeUp) {
            pointAmount = pointAmount - (pointAmount * 0.75);
        }
        return pointAmount;
    }

    // Round and save point amount
    let totalPoints = sessionData.quizParameters.totalPoints;
    sessionData.quizParameters.totalPoints = Math.round(totalPoints + pointAmount);
    updateSession("save");
}