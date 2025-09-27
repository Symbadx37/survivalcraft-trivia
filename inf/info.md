# EXTERNAL OPTIONS
## Difficulty Tier
- Beginner
- Intermediate
- Average
- Experienced
- Veteran
- RANDOM; selects from all tiers.
## Question Category
- General Knowledge
- Game Mechanics
- Crafting Recipes
- Creature Behaviors (PLANNED)
- Blocks and Pickables (PLANNED)
- Updates History
- Electrics
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
- RANDOM; chooses random time limit between 3 minutes and 15 seconds.
- NONE; no time limit is allotted.
## Quiz Toggles
- MODE TYPE: Practice or Tournament (PLANNED)
  Practice mode grades results after each question, but no points are awarded; Tournament mode only grades results after the quiz is finished.

# PROBABILITIES
- Beginner...... = Very Easy, Easy, Medium
- Intermediate.. = Very Easy, Easy, Medium, Hard
- Average....... = Easy, Medium, Hard, Very Hard
- Experienced... = Medium, Hard, Very Hard, Extreme
- Veteran....... = Hard, Very Hard, Extreme

1: 55%, 40%, 05%, ---, ---, ---
2: 40%, 30%, 15%, 05%, ---, ---
3: ---, 40%, 30%, 25%, 05%, ---
4: ---, ---, 35%, 45%, 15%, 05%
5: ---, ---, ---, 35%, 50%, 15%

const probability_beginner = {1: 0.55, 2: 0.4, 3: 0.05, 4: 0, 5: 0, 6: 0};
const probability_intermediate = {1: 0.4, 2: 0.3, 3: 0.15, 4: 0.5, 5: 0, 6: 0};
const probability_average = {1: 0, 2: 0.4, 3: 0.3, 4: 0.25, 5: 0.5, 6: 0};
const probability_experienced = {1: 0, 2: 0, 3: 0.35, 4: 0.45, 5: 0.15, 6: 0.5};
const probability_veteran = {1: 0, 2: 0, 3: 0, 4: 0.35, 5: 0.50, 6: 0.15};

* Calculate points upon answer submission. If answer is incorrect, do not invoke calculatePoints() method.

## Global Multipliers
- Time Limit:
    Easy = * 0.125 (+12.5%)
    Medium = * 0.25 (+25%)
    Hard = * 0.5 (+50%)
- Category:
    General Knowledge = * 0.025 (+2.5%)
    Updates History = * 0.05 (+5%)
    Game Mechanics = * 0.075 (+7.5%)
    Crafting Recipes = * 0.15 (+15%)
    Electrics = * 0.30 (+30%)

## Global Reducers
- Show Hint: reduces points awarded by half (-50%)
- Time Up: reduces points awarded by three-quarters (-75%)
- Incorrect Answer: no points are awarded (-100%)

## Question Point Ranges
- Very Easy: 12.5/15/17.5/20/22.5/25 (-2.5)
- Easy: 25/30/35/40/45/50 (-5)
- Medium: 50/60/70/80/90/100 (-10)
- Hard: 100/120/140/160/180/200 (-20)
- Very Hard: 200/240/280/320/360/400 (-40)
- Extreme: 400/480/560/640/720/800 (-80)

## Time Intervals
- Easy: 01-30 / 31-60 / 61-90 / 91-120 / 121-150 / 151-180 seconds (-30)
- Medium: 01-20 / 00-40 / 00-60 / 00-80 / 00-100 / 00-120 seconds (-20)
- Hard: 01-10 / 11-20 / 21-30 / 31-40 / 41-50 / 51-60 seconds (-10)
- None: no effect.

# NOTES
** Allow for 1-3 categories to be selected
** Allow for unlimited question count option. Once all active indexes have been used, they are reset

Home (index.html) = Logo, description about Survivalcraft, how the quiz works and its features
Play (options.html) = Quiz setup page
About = Credits and creator biography
Contact = 
Changelog = 

# WORK IN PROGRESS
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

ACTIONS
Update classes (add, remove, toggle)
Update values (strings/numbers)
Update buttons (enabled/disabled)
Update visibility (visible/hidden)

$("id").toggleClass("class", add/remove)
$("id").val("newValue");
$("id").text("newText");
$("id").prop("disabled", true/false);
$("id").hide();
$("id").show();