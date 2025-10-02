# IDs
#PAGE_ELEMENT_elementName_index:selector
- page = home, setup, quiz, results
- element = BTN, TXT, ELM, CON, GRP
- index = 1,2,3, ...
- :selector = :hover, :disabled

ex:
    #QUIZ_CON_gridContainer

    #QUIZ_BTN_answerChoice_1
    #QUIZ_BTN_answerChoice_2
    #QUIZ_BTN_answerChoice_3
    #QUIZ_BTN_answerChoice_4

    #QUIZ_TXT_question
    #QUIZ_BTN_submit
    #QUIZ_BTN_quit
    #QUIZ_BTN_modalQuitYes
    #QUIZ_BTN_modalQuitNo

    #QUIZ_CON_progressContainer
    #QUIZ_ELM_progressBar
    #QUIZ_TXT_progressTitle

    #QUIZ_GRP_modalButtons
    #QUIZ_CON_modalContent
    #QUIZ_CON_modalBackground
    #QUIZ_TXT_modalMessage
    #QUIZ_TXT_modalTitle
    
* Needed for DOM references.
* Should contain unique CSS properties.
* Layout properties at top, format properties at bottom

# Classes
.type-className-index:selector
- type = BTN, TXT, CON, ELM
- className = answerChoice, ...

ex:
    .BTN-answer-choice
    .TXT-quiz-heading
    .CON-content-loading
    .ELM-progress-bar

* Should only contain common and/or reusable properties.