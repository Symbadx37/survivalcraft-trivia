## Difficulty Tiers
- Beginner
- Intermediate
- Experienced
- Veteran
## Question Tiers
- Very Easy
- Easy
- Medium
- Hard
- Very Hard
## Quiz Length
- Short (5-10)
- Moderate (10-20)
- Long (20-30)
- Custom

18 current questions

## Question Data Structure
difficultyTier
quizLength

questionString = "This is a question.";
questionTier = "Very Easy", "Easy", "Medium", "Hard", "Very Hard";
questionType = "Multiple Choice", "True or False", "Short Answer";
solutionString = "This is a solution.";
answerIndex = 1-4;

Get difficultyTier and questionCount from user.
Wait for event START; generate random number based on inputted parameters.
Get question data from questions arrays and update DOM.
Wait for event CHOOSE; track and display userGrade, get and display questionSolution.
Wait for event CONTINUE; track questionIndex, 