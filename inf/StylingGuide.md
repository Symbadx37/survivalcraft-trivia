# IDs

#PAGE_ELEMENT_elementClass_elementName_index:selector


- page = home, setup, quiz, results
- element = button, text, division, container, modal, grid, flexbox
- elementName = confirmQuit, buttonGroup, ...
- index = 1,2,3, ...
- :selector = :hover, :disabled

ex:
    #QUIZ_CONTAINER_MODAL_confirmQuit
    #QUIZ_CONTAINER_GRID_mainQuestion
    #QUIZ_DIVISION_buttonGroup_1
    #QUIZ_TEXT_HEADING_confirmQuit
    #QUIZ_TEXT_PARAGRAPH_confirmQuit

    #SETUP_BUTTON_answerChoice_1
    #SETUP_TEXT_confirmQuitTitle

* Needed for DOM references.
* Should contain unique CSS properties.
* Layout properties at top, format properties at bottom

# Classes

.type-className-index:selector

- type = btn, txt, elm, ...
- className = answerChoice, ...

ex:
    .BTN-answer-choice
    .TXT-quiz-heading
    .ELM-content-loading

* Should only contain common and/or reusable properties.