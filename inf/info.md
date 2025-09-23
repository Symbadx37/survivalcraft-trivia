** Allow for 1-3 categories to be selected
** Allow for unlimited question count option. Once all active indexes have been used, they are reset

Home (index.html) = Logo, description about Survivalcraft, how the quiz works and its features
Play (options.html) = Quiz setup page
About = Credits and creator biography
Contact = 

# External Options
## Difficulty Tier
- Beginner
- Intermediate
- Experienced
- Veteran
## Question Category
- General Knowledge
- Game Mechanics
- Crafting Recipes (PLANNED)
- Creature Behaviors (PLANNED)
- Blocks and Pickables (PLANNED)
- Updates History
- Electrics (PLANNED)
- RANDOM; selects from all categories.
## Question Count
- Low; 10 questions
- Medium; 20 questions
- High; 30 questions
- RANDOM; chooses random count between 10 and 30 questions.
## Time Limit
- Easy; 3 minutes per question
- Medium; 2 minutes per question
- Hard; 1 minute per question
- Very Hard; 30 seconds per question (PLANNED)
- Insane; 15 seconds per question (PLANNED)
- NONE; no time limit is allotted.
## Quiz Toggles
- MODE TYPE: Quiz or Test (PLANNED)
  Quiz mode grades results after each question; Test mode only grades results after the quiz is finished.
- CALCULATE POINTS: Yes or no (PLANNED)
- SHOW SOLUTION: Yes or no (PLANNED)

## STATIC POINTS
### Difficulty Tier
- Beginner = 50
- Intermediate = 100
- Experienced = 200
- Veteran = 400
- Expert (PLANNED)
- RANDOM; points are awarded for the selected category.
### Question Category
- General Knowledge = 10
- Game Mechanics = 20
- Crafting Recipes = 50
- Creature Behaviors = 25
- Blocks and Pickables = 25
- Updates History = 15
- Electrics = 150
- RANDOM; points are awarded for the selected category.
### Question Count
- Low = 125
- Medium = 250
- High = 500
- RANDOM; points are awarded for the selected category.
### Time Limit
- Easy = 250
- Medium = 500
- Hard = 1000
- NONE; reduced point amounts for questions.

## DYNAMIC POINTS
### Point Values
- Very Easy = 5/15/25 points (-10)
- Easy = 20/35/50 points (-15)
- Medium = 50/75/100 points (-25)
- Hard = 120/160/200 points (-40)
- Very Hard = 180/240/300 points (-60)
### Time Limits
- Easy = 60/120/180 seconds (-60)
- Medium = 40/80/120 seconds (-40)
- Hard = 20/40/60 seconds (-20)

## WORK IN PROGRESS
let thresholdFactor = 60;
let countIndex = (minutes * 60) + seconds
let thresholdIndex = countIndex - thresholdFactor;

if (thresholdIndex > 120) {
    activeThreshold = "green";
} else if (thresholdIndex <= 120 && thresholdIndex > 60) {
    activeThreshold = "yellow";
} else {
    activeThreshold = "red";
}

- determining score based off of current time threshold
- displaying "no points awarded" if time reaches "0:00" before answer
- central loadDocument() method for loading data (setup/quiz/results)

* Pass parameters when calling load methods to indicate preload, load, or reload
* Update all HTML button IDs to reflect new ones

preloading QUIZ:
- construct sessionData
- load button states (continue and choices)
- load class states (timeUp, correct/incorrect)
- load elements (question, choices, active stats, timer position)
- invoke generateQuestion() and updateTimer()

loading SETUP:
- load button states (options)

loading QUIZ:
- load button states (continue and choices)
- load class states (timeUp, correct/incorrect)
- load elements (question, choices, active stats, timer position)

loading RESULTS:
- load elements (points, accuracy)
