function calculatePoints() {
    // ... (get sessionData: timeInterval, quizLength, quizCategory, wasHintUsed, isTimeUp)
    
    // Assign multipliers
    switch(quizLength) {
        case 1: timeMultiplier = 0.125; break;
        case 2: timeMultiplier = 0.25; break;
        case 3: timeMultiplier = 0.5; break;
        default: timeMultiplier = 0;
    }
    switch(quizCategory) {
        case 1: categoryMultiplier = 0.025;  break;
        case 2: categoryMultiplier = 0.05; break;
        case 3: categoryMultiplier = 0.075; break;
        case 4: categoryMultiplier = 0.15; break;
        case 5: categoryMultiplier = 0.3; break;
    }

    // Calculate static point amount
    let reductionFactor = 2.5 * (2 ** (questionDifficulty - 1));
    let baseAmount = (25 * (2 ** (questionDifficulty - 1)) - (reductionFactor * timeInterval));

    // Apply multipliers and reducers
    let pointAmount = applyModifiers();
    console.log("" + pointAmount);

    function applyModifiers() {
        let pointsAfter_cm = ((baseAmount * categoryMultiplier) + baseAmount); // applies category multiplier
        let pointsAfter_tm = ((pointsAfter_cm * timeMultiplier) + pointsAfter_cm); // applies interval multiplier
        let pointAmount = pointsAfter_tm;
        if (wasHintUsed) {
            pointAmount = pointAmount - (pointAmount * 0.5);
        }
        if (isTimeUp) {
            pointAmount = pointAmount - (pointAmount * 0.75);
        }
        return pointAmount;
    }
}