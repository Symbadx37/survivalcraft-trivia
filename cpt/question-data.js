const questionString = [ // [difficultyIndex][questionIndex]
    // Very Easy
    ["What year did Survivalcraft 1.0 release?",
     "Which update added splitscreen multiplayer?"],
    // Easy
    ["How many game days does it take for raw meat to rot?",
     "What is the maximum number of triangles allowed for a single furniture design?",
     "What is the natural block color of granite?"],
    // Medium
    ["A single, non-adjustable delay gate provides a pulse duartion for how long?",
     "How many magnets can be placed in a single world?",
     "What additional component is required to craft a connected furniture block?",
     "What is the maximum insulation amount achievable in any survival mode?",
     "An electric button provides a pulse duration for how long?",
     "Which of the following land animals are NOT in the game?",
     "Which of the following ocean animals are NOT in the game?",
     "Can sulphur be used as a fuel source when using a furnace?"],
    // Hard
    ["If a campfire is exposed to rain or snow, by how much faster does it deplete?",
     "How many unique sound generator sounds are there?",
     "How do you make a Cyan Paint bucket?"],
     // Very Hard
    ["How do you craft Green Flickering Large Burst (Low) fireworks?"]
];

const answerString = [ // [difficultyIndex][questionIndex][choiceIndex]
    // Very Easy
    [["2009", "2011", "2013", "2015"],
     ["1.29", "2.1", "2.2", "2.3"]],
    // Easy
    [["1", "3", "5", "7"],
     ["200", "250", "300", "350"],
     ["Red Orange", "Light Gray", "White", "Dark Gray"]],
    // Medium
    [["50", "200", "300", "500"],
     ["3", "5", "8", "12"],
     ["String", "Electric Wire", "Iron Rod", "Germanium Crystal"],
     ["3.16 clo", "4.72 clo", "5.56 clo", "6.49 clo"],
     ["100 ms", "150 ms", "200 ms", "250 ms"],
     ["Cheetah", "Gnu Antelope", "Rhinocerous", "Cassowary"],
     ["Starfish", "Killer Whale", "Great White Shark", "Beluga"],
     ["Yes, it can smelt all items.",
      "Yes, but it can only smelt some items.",
      "No, it cannot smelt any items.",
      "No, the furnace will explode."]],
    // Hard
    [["20%", "40%", "60%", "80%"],
     ["287", "324", "396", "439"],
     ["Smelt water with white pigment, then smelt white paint with purple flower, then smelt purple paint with malachite.",
      "Smelt water with saltpeter, then smelt white paint with malachite, then smelt pale cyan paint with coal.",
      "Smelt water with white pigment, then smelt white paint with malachite, then smelt pale cyan paint with coal.",
      "Craft white paint with malachite and coal."]],
     // Very Hard
    [["Two sulphur, one coal, two gunpower, one canvas, pale green paint.",
      "One sulphur, two coal, two gunpowder, green paint.",
      "Two sulphur, one coal, four gunpowder, pale green paint.",
      "Two coal, four gunpowder, green paint."]]
];

const solutionString = [ // [difficultyIndex][questionIndex]
    ["Solution A.",
     "Solution B.",
     "Solution C."],
    ["Solution A.",
     "Solution B.",
     "Solution C."],
    ["Solution A.",
     "Solution B.",
     "Solution C."],
    ["Solution A.",
     "Solution B.",
     "Solution C."],
    ["Solution A.",
     "Solution B.",
     "Solution C."]
];

const questionGrade = [ // [difficultyIndex][questionIndex]
    [2,2],
    [2,3,2],
    [2,3,2,4,1,1,2,2],
    [4,4,3],
    [3]
];