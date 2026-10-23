/**
 * GRADE 6 BOOSTER LESSONS · based on Cambridge Lower Secondary Computing 7 (Hodder Education)
 * Explanations are original summaries written for this booster course; page numbers point students
 * to the matching pages in the Student's Book. Teachers can edit everything in the portal.
 * Question format: [question, A, B, C, D, answer]  — leave A–D empty for short answer ("ans1|ans2").
 */
var BOOK_LESSONS = (typeof BOOK_LESSONS !== 'undefined') ? BOOK_LESSONS : [];
(function () {
  var B = 'Cambridge Lower Secondary Computing 7, ';
  var U1 = '7.1 Block it out: Moving from blocks to text';
  var U2 = '7.2 Decomposing problems: Creating a smart solution';
  var U3 = '7.3 Connections are made: Accessing the internet';
  var U4 = '7.4 The power of data: Using data modelling';
  var U5 = '7.5 Living with AI: Digital data';
  var U6 = '7.6 Sequencing and pattern recognition: Getting the message across';
  var MB = 'https://python.microbit.org/v/3';

  BOOK_LESSONS.push(

  /* ======================= UNIT 7.1 ======================= */
  { key: 'g6-7.1-1', grade: '6', unit: U1, order: 1, title: 'From Scratch to Python: your first program',
    bookRef: B + 'Unit 7.1, pp. 11–17',
    objectives: [
      'Explain the difference between block-based and text-based programming',
      'Use the Python shell (interactive mode) and script mode',
      'Write a Python program that displays text with print()'
    ],
    explanation: [
      'In **Scratch** you build programs by dragging blocks. In **Python** you type the instructions as text. Both follow the same idea: the computer carries out instructions one after another, in **sequence**.',
      '',
      '### Two ways to use Python',
      '- **Interactive mode (the shell):** type one command, press Enter, see the result straight away. Good for quick tests.',
      '- **Script mode:** write several lines in a file, save it (e.g. `hello.py`), then run it. Use this for real programs.',
      '',
      '### Displaying output',
      'The `print()` function shows a message on the screen. Text must go inside quotation marks — this text is called a **string**.',
      '',
      'Python is **case-sensitive** and fussy about spelling. `print` works; `Print` and `prnt` cause an error.'
    ],
    syntax: 'print("your message here")',
    example: ['# My first Python program', 'print("Hello, World!")', 'print("I am learning Python")', 'print("Scratch uses blocks; Python uses text")'],
    note: 'The Scratch block **say Hello** does the same job as `print("Hello")` in Python.',
    questions: [
      ['Which type of language is Python?', 'Block-based', 'Text-based', 'Machine code only', 'A spreadsheet language', 'B'],
      ['What is the Python shell used for?', 'Running one command at a time and seeing the result immediately', 'Saving long programs', 'Drawing flowcharts', 'Connecting to the internet', 'A'],
      ['Which line correctly displays Hello?', 'Print("Hello")', 'print(Hello)', 'print("Hello")', 'print "Hello"', 'C'],
      ['What file extension do Python program files use?', '.doc', '.py', '.sb3', '.txt', 'B'],
      ['Type the name of the Python function that displays output on the screen.', '', '', '', '', 'print|print()']
    ] },

  { key: 'g6-7.1-2', grade: '6', unit: U1, order: 2, title: 'Variables, input and output',
    bookRef: B + 'Unit 7.1, pp. 18–21',
    objectives: [
      'Explain what a variable is and choose a sensible variable name',
      'Use input() to ask the user for data',
      'Combine text and variables in print()'
    ],
    explanation: [
      'A **variable** is a named storage space in the computer\'s memory. You give it a name and store a value in it with the **assignment** operator `=`.',
      '',
      '- `name = "Mai"` stores the string "Mai" in the variable `name`.',
      '- A variable\'s value can change while the program runs.',
      '',
      '### Getting data from the user',
      '`input()` shows a prompt, waits for the user to type, and gives back what they typed. Store it in a variable so you can use it later.',
      '',
      '### Good variable names',
      '- Describe the data: `age`, `total_score` (not `x` or `a1`).',
      '- No spaces — use an underscore: `first_name`.',
      '- Do not start with a number, and do not use Python keywords such as `print` or `if`.',
      '',
      'When you print a variable, **do not** put it in quotation marks — otherwise Python prints the word itself.'
    ],
    syntax: ['variable_name = value', 'variable_name = input("prompt message ")'],
    example: ['name = input("What is your name? ")', 'school = "Booster Academy"', 'print("Hello", name)', 'print("Welcome to", school)'],
    note: '`print("name")` shows the word **name**. `print(name)` shows the value stored in the variable.',
    questions: [
      ['What is a variable?', 'A named storage location for data', 'A type of loop', 'An error message', 'A flowchart symbol', 'A'],
      ['Which variable name is valid in Python?', 'first name', '2nd_score', 'first_name', 'print', 'C'],
      ['What does input() do?', 'Displays a picture', 'Waits for the user to type something and returns it', 'Deletes a variable', 'Repeats code', 'B'],
      ['name = "Ali". What does print("name") display?', 'Ali', 'name', '"Ali"', 'An error', 'B'],
      ['Which symbol is used to assign a value to a variable in Python?', '', '', '', '', '=']
    ] },

  { key: 'g6-7.1-3', grade: '6', unit: U1, order: 3, title: 'Data types and casting',
    bookRef: B + 'Unit 7.1, pp. 22–25',
    objectives: [
      'Identify the data types string, integer and real (float)',
      'Choose the right data type for a piece of data',
      'Use casting with int(), float() and str() to change a data type'
    ],
    explanation: [
      'Every value in Python has a **data type**. The data type tells the computer what kind of data it is and what it can do with it.',
      '',
      '- **String** (`str`) — text, inside quotation marks: `"Hanoi"`, `"123"`',
      '- **Integer** (`int`) — whole numbers: `7`, `-12`, `2026`',
      '- **Real / float** (`float`) — numbers with a decimal point: `3.5`, `-0.25`',
      '',
      '### Why casting matters',
      '`input()` **always gives back a string**, even if the user types a number. You cannot do maths with a string, so you must **cast** (convert) it:',
      '- `int("15")` → `15`',
      '- `float("2.5")` → `2.5`',
      '- `str(42)` → `"42"`',
      '',
      'You can check a value\'s type with `type()`.'
    ],
    syntax: ['int(value)    # convert to an integer', 'float(value)  # convert to a real number', 'str(value)    # convert to a string'],
    example: ['age = int(input("How old are you? "))', 'height = float(input("Height in metres? "))', 'print("Next year you will be", age + 1)', 'print(type(height))'],
    note: 'Without `int()`, typing 12 and adding 1 gives a **TypeError**, because Python cannot add a string and an integer.',
    questions: [
      ['Which data type is 3.75?', 'String', 'Integer', 'Real (float)', 'Boolean', 'C'],
      ['Which data type is "123" (with quotation marks)?', 'Integer', 'String', 'Real', 'None of these', 'B'],
      ['What data type does input() always return?', 'Integer', 'Real', 'String', 'It depends on what the user types', 'C'],
      ['Which line correctly stores a whole number typed by the user?', 'n = input(int("Number? "))', 'n = int(input("Number? "))', 'n = str(input("Number? "))', 'n = input("Number? ") + int', 'B'],
      ['Changing a value from one data type to another is called…', '', '', '', '', 'casting|type casting|type conversion|conversion']
    ] },

  { key: 'g6-7.1-4', grade: '6', unit: U1, order: 4, title: 'Arithmetic operators and BIDMAS',
    bookRef: B + 'Unit 7.1, pp. 26–28',
    objectives: [
      'Use the arithmetic operators + - * / // % and **',
      'Predict the result of a calculation using BIDMAS',
      'Write a program that performs a calculation on user input'
    ],
    explanation: [
      'Python can work like a calculator. These are the **arithmetic operators**:',
      '',
      '- `+` add · `-` subtract · `*` multiply · `/` divide (always gives a real number)',
      '- `//` integer division (whole-number part only): `7 // 2` → `3`',
      '- `%` modulus (the remainder): `7 % 2` → `1`',
      '- `**` power: `2 ** 3` → `8`',
      '',
      '### BIDMAS',
      'Python follows the same order of operations as maths: **B**rackets, **I**ndices (powers), **D**ivision and **M**ultiplication, **A**ddition and **S**ubtraction.',
      '',
      '`3 + 4 * 2` → `11`, but `(3 + 4) * 2` → `14`. Use brackets to make your meaning clear.'
    ],
    syntax: 'result = number1 operator number2',
    example: ['length = float(input("Length of rectangle: "))', 'width = float(input("Width of rectangle: "))', 'area = length * width', 'perimeter = 2 * (length + width)', 'print("Area =", area)', 'print("Perimeter =", perimeter)'],
    note: '`%` is useful for checking even numbers: if `number % 2` is 0, the number is even.',
    questions: [
      ['What is the result of 7 // 2 in Python?', '3.5', '3', '1', '4', 'B'],
      ['What is the result of 7 % 2?', '1', '3', '3.5', '0', 'A'],
      ['What does 3 + 4 * 2 evaluate to?', '14', '11', '10', '24', 'B'],
      ['Which operator raises a number to a power?', '^', '**', '//', '%%', 'B'],
      ['What is the value of (3 + 4) * 2? Type the number.', '', '', '', '', '14']
    ] },

  { key: 'g6-7.1-5', grade: '6', unit: U1, order: 5, title: 'Testing, errors and debugging',
    bookRef: B + 'Unit 7.1, pp. 29–31',
    objectives: [
      'Explain the difference between a syntax error and a logic error',
      'Find and fix errors in a Python program (debugging)',
      'Use a test plan with normal and unexpected test data'
    ],
    explanation: [
      'Programs rarely work perfectly the first time. Finding and fixing mistakes is called **debugging**.',
      '',
      '### Types of error',
      '- **Syntax error** — the code breaks Python\'s rules (missing bracket, misspelt keyword, missing quotation mark). The program will not run.',
      '- **Logic error** — the program runs but gives the wrong answer, e.g. using `+` instead of `*`.',
      '- **Runtime error** — the program crashes while running, e.g. `int("hello")`.',
      '- **Variable naming mismatch** — `Score` and `score` are different variables in Python.',
      '',
      '### Test plans',
      'A **test plan** is a table listing what you will test, the data you will enter, the **expected outcome**, the **actual outcome**, and pass/fail. Test with normal data and also unexpected data (e.g. letters when a number is expected).'
    ],
    syntax: ['Test | Data entered | Expected outcome | Actual outcome | Pass/Fail'],
    example: ['# This program has errors to find:', '# print("Total is" total)    -> missing comma (syntax error)', '# Total = 5 + 3; print(total) -> naming mismatch', '', 'total = 5 + 3', 'print("Total is", total)'],
    note: 'Read the **last line** of a Python error message first — it names the error type and usually the line number.',
    questions: [
      ['A program runs but calculates the wrong answer. What type of error is this?', 'Syntax error', 'Logic error', 'Typing error', 'Network error', 'B'],
      ['print("Hello" is missing a bracket. What type of error is this?', 'Logic error', 'Syntax error', 'Runtime error', 'No error', 'B'],
      ['Which column in a test plan shows what SHOULD happen?', 'Actual outcome', 'Expected outcome', 'Pass/Fail', 'Test number', 'B'],
      ['Why should Score and score not be used for the same variable?', 'Python is case-sensitive, so they are different variables', 'Capital letters are not allowed', 'Variables cannot contain the letter S', 'It makes the program slower', 'A'],
      ['What is the process of finding and fixing errors in a program called?', '', '', '', '', 'debugging|debug']
    ] },

  { key: 'g6-7.1-6', grade: '6', unit: U1, order: 6, title: 'Flowcharts, selection and comparison operators',
    bookRef: B + 'Unit 7.1, pp. 26, 32–35',
    objectives: [
      'Recognise the flowchart symbols: terminator, input/output, process and decision',
      'Predict the outcome of a flowchart that uses selection (IF THEN ELSE)',
      'Choose the correct comparison operator: == != > < >= <='
    ],
    explanation: [
      'An **algorithm** is a set of step-by-step instructions to solve a problem. A **flowchart** shows an algorithm using standard symbols:',
      '',
      '- **Terminator** (rounded rectangle): Start / Stop',
      '- **Input/Output** (parallelogram): e.g. INPUT age, OUTPUT "Hello"',
      '- **Process** (rectangle): a calculation, e.g. total = a + b',
      '- **Decision** (diamond): a yes/no question — this is **selection**',
      '',
      '### Selection',
      'Selection lets a program choose a path: **IF** a condition is true **THEN** do one thing, **ELSE** do something else.',
      '',
      '### Comparison operators',
      '`==` equal to · `!=` not equal to · `>` greater than · `<` less than · `>=` greater than or equal to · `<=` less than or equal to'
    ],
    syntax: ['if condition:', '    # runs when the condition is True', 'else:', '    # runs when the condition is False'],
    example: ['score = int(input("Enter your score: "))', 'if score >= 85:', '    print("Target reached!")', 'else:', '    print("Keep practising")'],
    note: '`=` stores a value; `==` compares two values. Mixing them up is one of the most common beginner errors.',
    questions: [
      ['Which flowchart symbol is used for a decision?', 'Rectangle', 'Diamond', 'Parallelogram', 'Rounded rectangle', 'B'],
      ['Which flowchart symbol is used for INPUT and OUTPUT?', 'Parallelogram', 'Diamond', 'Circle', 'Rectangle', 'A'],
      ['Which operator means "greater than or equal to"?', '=>', '>=', '==', '!=', 'B'],
      ['A flowchart asks "Is age >= 13?". The user enters 12. Which path is followed?', 'Yes', 'No', 'Both', 'Neither', 'B'],
      ['Choosing between two paths with IF THEN ELSE is called…', '', '', '', '', 'selection']
    ] },

  { key: 'g6-7.1-7', grade: '6', unit: U1, order: 7, title: 'Sub-routines in algorithms',
    bookRef: B + 'Unit 7.1, pp. 36–41',
    objectives: [
      'Explain what a sub-routine is and why it is useful',
      'Follow a flowchart that calls a sub-routine',
      'Edit and correct an algorithm that uses sub-routines'
    ],
    explanation: [
      'A **sub-routine** is a named block of instructions that does one job. The main program **calls** the sub-routine whenever it needs that job done.',
      '',
      '### Why use sub-routines?',
      '- **Reuse:** write the code once, call it many times.',
      '- **Decomposition:** break a big problem into smaller parts that are easier to solve.',
      '- **Easier to test and fix:** each part can be checked on its own.',
      '',
      'In a flowchart, a sub-routine is drawn as a rectangle with double lines on each side. It has its own flowchart starting with its name and ending with Return.',
      '',
      'In Python, a sub-routine is written with `def`. A calculator program might have separate sub-routines for add, subtract, multiply and divide, with a menu choosing which one to call.'
    ],
    syntax: ['def subroutine_name():', '    # instructions (indented)', '', 'subroutine_name()   # call it'],
    example: ['def area_of_square():', '    side = float(input("Side length: "))', '    print("Area =", side * side)', '', 'def area_of_rectangle():', '    l = float(input("Length: "))', '    w = float(input("Width: "))', '    print("Area =", l * w)', '', 'choice = input("Square (s) or rectangle (r)? ")', 'if choice == "s":', '    area_of_square()', 'else:', '    area_of_rectangle()'],
    note: 'The code inside `def` must be **indented** (4 spaces). Python uses indentation to know which lines belong to the sub-routine.',
    questions: [
      ['What is a sub-routine?', 'A named block of code that performs a specific task', 'A type of variable', 'A syntax error', 'A data type', 'A'],
      ['Which is a benefit of sub-routines?', 'Code can be reused without rewriting it', 'Programs never have errors', 'Variables are not needed', 'Flowcharts are not needed', 'A'],
      ['Which Python keyword starts a sub-routine?', 'sub', 'def', 'call', 'run', 'B'],
      ['Breaking a large problem into smaller parts is called…', 'Debugging', 'Decomposition', 'Casting', 'Encryption', 'B'],
      ['When the main program runs a sub-routine, we say it ___ the sub-routine. Type the missing word.', '', '', '', '', 'calls|call|invokes']
    ] },

  /* ======================= UNIT 7.2 ======================= */
  { key: 'g6-7.2-1', grade: '6', unit: U2, order: 1, title: 'Systems software, applications software and simulators',
    bookRef: B + 'Unit 7.2, pp. 47–49',
    objectives: [
      'Describe the difference between systems software and applications software',
      'Give examples of each type of software',
      'Explain how simulators are used to model real-life systems'
    ],
    explanation: [
      '**Software** is the set of programs that tells hardware what to do. There are two main groups:',
      '',
      '- **Systems software** runs and manages the computer itself. Examples: the **operating system** (Windows, macOS, Android, iOS), device drivers, utilities such as antivirus.',
      '- **Applications software** lets the user do a task. Examples: word processors, web browsers, games, spreadsheets, the micro:bit code editor.',
      '',
      '### Simulators',
      'A **simulator** is applications software that models a real system so it can be tested safely and cheaply. Examples:',
      '- Flight simulators to train pilots',
      '- Driving simulators',
      '- Weather and traffic simulations',
      '- The **micro:bit simulator**, which lets you test code on screen before flashing it to the real device'
    ],
    example: ['# Systems software:      operating system, drivers, antivirus', '# Applications software: browser, game, word processor, simulator'],
    note: 'Ask: "Does it help the **computer** run, or help the **user** do a task?" The first is systems software; the second is applications software.',
    questions: [
      ['Which of these is systems software?', 'A web browser', 'An operating system', 'A game', 'A word processor', 'B'],
      ['Which of these is applications software?', 'A device driver', 'An operating system', 'A spreadsheet program', 'A utility that defragments disks', 'C'],
      ['Why are flight simulators used to train pilots?', 'They are safer and cheaper than training in a real plane', 'They make planes fly faster', 'They replace airports', 'They store passenger data', 'A'],
      ['What does the micro:bit simulator let you do?', 'Test your code on screen before using the real device', 'Charge the micro:bit', 'Connect to the internet', 'Print your code', 'A'],
      ['Windows, macOS and Android are examples of which type of systems software?', '', '', '', '', 'operating system|operating systems|os']
    ] },

  { key: 'g6-7.2-2', grade: '6', unit: U2, order: 2, title: 'MicroPython on the micro:bit: inputs and outputs',
    bookRef: B + 'Unit 7.2, pp. 53–59',
    tryIt: MB,
    objectives: [
      'Create a text-based MicroPython program with an input and an output',
      'Identify the difference between a string and an integer on the micro:bit display',
      'Flash a program to the micro:bit or test it in the simulator'
    ],
    explanation: [
      'The **BBC micro:bit** is a small programmable device. You can program it with blocks (MakeCode) or with text using **MicroPython**.',
      '',
      '- Every MicroPython program starts with `from microbit import *`',
      '- **Inputs:** buttons A and B, light sensor, temperature sensor, accelerometer, microphone (V2)',
      '- **Outputs:** the 5×5 LED display, the speaker (V2)',
      '',
      '### Showing output',
      '- `display.scroll("Hi")` scrolls text across the LEDs',
      '- `display.show(Image.HAPPY)` shows a built-in picture',
      '',
      '### Reading an input',
      '`button_a.is_pressed()` is **True** while button A is held down. Programs usually run inside `while True:` so the micro:bit keeps checking its inputs.'
    ],
    syntax: ['from microbit import *', '', 'while True:', '    if button_a.is_pressed():', '        display.scroll("text")'],
    example: ['from microbit import *', '', 'while True:', '    if button_a.is_pressed():', '        display.scroll("Hello")', '    elif button_b.is_pressed():', '        display.scroll("Goodbye")', '    else:', '        display.clear()'],
    note: '`display.scroll(5)` shows the integer 5; `display.scroll("5")` shows the string "5". They look the same on the LEDs, but only the integer can be used in a calculation.',
    questions: [
      ['Which line must start every micro:bit MicroPython program?', 'import microbit.all', 'from microbit import *', 'start microbit', 'include microbit', 'B'],
      ['Which is an INPUT device on the micro:bit?', 'LED display', 'Button A', 'Speaker', 'Screen of the laptop', 'B'],
      ['What does display.scroll("Hi") do?', 'Moves the text Hi across the LED display', 'Reads a button', 'Turns off the micro:bit', 'Plays a sound', 'A'],
      ['Why is while True: used in micro:bit programs?', 'So the program keeps repeating and checking inputs', 'To stop the program', 'To make a variable', 'To print an error', 'A'],
      ['Copying your program onto the real micro:bit is called ___ the program. Type the missing word.', '', '', '', '', 'flashing|flash|downloading']
    ] },

  { key: 'g6-7.2-3', grade: '6', unit: U2, order: 3, title: 'Sensors, selection and flowcharts on the micro:bit',
    bookRef: B + 'Unit 7.2, pp. 60–69',
    tryIt: MB,
    objectives: [
      'Follow the flow of a flowchart with selection',
      'Create a flowchart that uses a sensor value in a decision',
      'Create and correct programs with more than one input and output'
    ],
    explanation: [
      'Sensors measure the real world and turn it into numbers the micro:bit can use:',
      '',
      '- `display.read_light_level()` → 0 (dark) to 255 (bright)',
      '- `temperature()` → degrees Celsius',
      '- `accelerometer.was_gesture("shake")` → True or False',
      '',
      '### Planning with a flowchart',
      'Before coding, draw the flowchart. A decision diamond holds the condition, e.g. **light level < 100?** The **Yes** path might switch on a "night light" image; the **No** path clears the display.',
      '',
      'Then turn each symbol into code: decision → `if`, process → a calculation, output → `display.show()` or `display.scroll()`.'
    ],
    syntax: ['if sensor_value < threshold:', '    # output for Yes', 'else:', '    # output for No'],
    example: ['from microbit import *', '', 'while True:', '    light = display.read_light_level()', '    if light < 100:', '        display.show(Image.YES)   # dark: night light on', '    else:', '        display.clear()          # bright: off', '    sleep(500)'],
    note: '`sleep(500)` pauses for 500 milliseconds (half a second). 1000 ms = 1 second.',
    questions: [
      ['What range of values does display.read_light_level() give?', '0 to 9', '0 to 100', '0 to 255', '1 to 1000', 'C'],
      ['In a flowchart, a sensor check such as "light < 100?" goes in which symbol?', 'Diamond (decision)', 'Rectangle (process)', 'Parallelogram (input/output)', 'Terminator', 'A'],
      ['How long does sleep(1000) pause for?', '1 millisecond', '1 second', '10 seconds', '1 minute', 'B'],
      ['A night light should turn on when it is dark. Which condition is correct?', 'light > 200', 'light < 100', 'light == 255', 'light != 0', 'B'],
      ['Which micro:bit function returns the temperature in degrees Celsius? Type it with brackets.', '', '', '', '', 'temperature()|temperature']
    ] },

  { key: 'g6-7.2-4', grade: '6', unit: U2, order: 4, title: 'Planning, testing and evaluating a smart solution',
    bookRef: B + 'Unit 7.2, pp. 68–79',
    tryIt: MB,
    objectives: [
      'Discuss why a flowchart is important as a project plan',
      'Choose the correct data type for values in an algorithm',
      'Use a test plan to check a micro:bit program',
      'Evaluate a flowchart and program'
    ],
    explanation: [
      'A **smart solution** uses sensors and decisions to respond to the world automatically, for example a plant monitor or a security alarm.',
      '',
      '### Plan first',
      'A flowchart is a **project plan**: it shows every step and decision before you write code, so mistakes are cheaper to fix and others can understand your idea.',
      '',
      '### Data types in the plan',
      'Light level → integer · temperature → integer · a message → string · button pressed? → Boolean (True/False).',
      '',
      '### Test and evaluate',
      'Write a test plan: e.g. *cover the light sensor → expected: alarm image shows*. Then **evaluate**: Does it meet the brief? Is the output clear? What would you improve?'
    ],
    example: ['from microbit import *', '', '# Simple security alarm: shake = movement detected', 'while True:', '    if accelerometer.was_gesture("shake"):', '        display.show(Image.ANGRY)', '        sleep(2000)', '    display.clear()'],
    note: 'Good evaluation answers say **what works**, **what does not**, and **one specific improvement**.',
    questions: [
      ['Why is a flowchart useful as a project plan?', 'It shows the steps and decisions before coding, so errors are found early', 'It makes the program run faster', 'It replaces testing', 'It stores data', 'A'],
      ['What data type is the result of "Is button A pressed?"', 'String', 'Integer', 'Boolean', 'Real', 'C'],
      ['What should a test plan include?', 'Test data, expected outcome and actual outcome', 'Only the program code', 'The cost of the micro:bit', 'Pictures of the device', 'A'],
      ['Which is a good evaluation comment?', 'It is good', 'The alarm works, but it should also sound a buzzer so people hear it', 'I like micro:bits', 'Done', 'B'],
      ['What data type should store a light level such as 128?', '', '', '', '', 'integer|int']
    ] },

  /* ======================= UNIT 7.3 ======================= */
  { key: 'g6-7.3-1', grade: '6', unit: U3, order: 1, title: 'How devices transmit data',
    bookRef: B + 'Unit 7.3, pp. 85–88',
    objectives: [
      'Explain different ways that devices can transmit data',
      'Compare wired, Wi-Fi, Bluetooth and cellular connections',
      'Describe transmission characteristics such as speed and range'
    ],
    explanation: [
      'Devices send data to each other using **wired** or **wireless** connections.',
      '',
      '- **Wired (Ethernet cable / fibre-optic):** fast and reliable, hard to intercept, but the device cannot move far.',
      '- **Wi-Fi:** wireless connection to a router, usually within a home or school building.',
      '- **Bluetooth:** short range (around 10 m), low power — headphones, keyboards, smartwatches.',
      '- **Cellular data (4G/5G):** uses mobile phone masts, so it works almost anywhere with signal.',
      '',
      '### Comparing connections',
      'Think about **speed** (bandwidth), **range**, **reliability**, **security** and **cost**. A gaming PC might use a cable for speed; a phone on a bus needs cellular data.'
    ],
    example: ['# Which connection?', '# Wireless earbuds -> Bluetooth (short range, low power)', '# School desktop   -> Ethernet cable (fast, reliable)', '# Phone on a bus   -> Cellular 4G/5G (works away from Wi-Fi)'],
    note: 'Wireless signals get weaker with distance and through walls, which can slow down or interrupt a connection.',
    questions: [
      ['Which connection is best for wireless headphones?', 'Ethernet', 'Bluetooth', 'Fibre-optic', 'Cellular', 'B'],
      ['Which connection usually gives the fastest, most reliable speed for a desktop computer?', 'Bluetooth', 'Wired Ethernet', 'Infrared', 'Cellular', 'B'],
      ['Which connection lets a phone use the internet far away from any Wi-Fi?', 'Bluetooth', 'Cellular data (4G/5G)', 'USB cable', 'Ethernet', 'B'],
      ['What is a disadvantage of a wired connection?', 'It is very slow', 'The device cannot move around freely', 'It is easy to intercept', 'It needs a mobile mast', 'B'],
      ['Which short-range wireless technology connects devices about 10 metres apart?', '', '', '', '', 'bluetooth']
    ] },

  { key: 'g6-7.3-2', grade: '6', unit: U3, order: 2, title: 'IP addresses, URLs and DNS',
    bookRef: B + 'Unit 7.3, pp. 89–94',
    objectives: [
      'Explain how IP addresses and web servers work',
      'Identify the parts of a URL',
      'Explain the steps DNS takes to find a website'
    ],
    explanation: [
      'Every device on the internet has an **IP address**, a unique number such as `142.250.66.78`. Websites are stored on **web servers**, which also have IP addresses.',
      '',
      '### URLs',
      'People remember names better than numbers, so we use a **URL** (Uniform Resource Locator):',
      '`https://www.example.com/lessons/python.html`',
      '- `https://` — the **protocol**',
      '- `www.example.com` — the **domain name**',
      '- `/lessons/python.html` — the **path** to the page on the server',
      '',
      '### DNS — the internet\'s contacts list',
      '1. You type a URL into the browser.',
      '2. The browser asks a **DNS server** for that domain\'s IP address.',
      '3. The DNS server looks it up and sends back the IP address.',
      '4. The browser contacts the web server at that IP address.',
      '5. The web server sends the web page back to the browser.',
      '',
      'If DNS cannot find the server, you see an error such as **404** or "server not found".'
    ],
    example: ['URL:       https://www.example.com/news/today.html', 'Protocol:  https', 'Domain:    www.example.com', 'Path:      /news/today.html'],
    note: 'A **web browser** (Chrome, Safari, Edge) is applications software: it requests pages from web servers and displays them.',
    questions: [
      ['What does DNS do?', 'Translates a domain name into an IP address', 'Encrypts passwords', 'Stores web pages', 'Speeds up Wi-Fi', 'A'],
      ['In https://www.school.edu.vn/maths, what is www.school.edu.vn?', 'The protocol', 'The domain name', 'The path', 'The IP address', 'B'],
      ['What is an IP address?', 'A unique number that identifies a device on a network', 'The name of a website', 'A type of cable', 'A password', 'A'],
      ['Where are websites stored?', 'On DNS servers', 'On web servers', 'In the browser history', 'On the router', 'B'],
      ['A web browser is which type of software: systems or applications?', '', '', '', '', 'applications|application|applications software']
    ] },

  { key: 'g6-7.3-3', grade: '6', unit: U3, order: 3, title: 'Secure websites: HTTPS, encryption and certificates',
    bookRef: B + 'Unit 7.3, pp. 95–101',
    objectives: [
      'Explain what types of encryption are used on websites',
      'Find information on the security certificate of a website',
      'Spot signs of an insecure website'
    ],
    explanation: [
      'When you send data to a website, it travels through many devices and could be **intercepted**.',
      '',
      '- **HTTP** sends data as plain, readable text.',
      '- **HTTPS** (the S means **secure**) **encrypts** the data using SSL/TLS, so anyone who intercepts it sees scrambled characters.',
      '',
      '### The padlock and certificates',
      'A padlock beside the address means the site uses HTTPS and has a **security certificate**. Click the padlock to see who the certificate was issued to, who issued it, and when it expires.',
      '',
      '### Warning signs',
      '- No padlock, or the browser says **Not secure**',
      '- Misspelt domain names (e.g. `g00gle.com`)',
      '- Pop-ups demanding personal details',
      '',
      'Never type passwords or payment details on a site without HTTPS.'
    ],
    example: ['http://example.com    -> data sent as plaintext (insecure)', 'https://example.com   -> data encrypted with SSL/TLS (secure)'],
    note: 'A padlock means the connection is encrypted — it does not prove the business is honest. Still check the domain name carefully.',
    questions: [
      ['What does the S in HTTPS stand for?', 'Simple', 'Secure', 'Server', 'Speed', 'B'],
      ['What does encryption do to data?', 'Scrambles it so only the intended receiver can read it', 'Deletes it', 'Makes it larger', 'Prints it', 'A'],
      ['What does the padlock in the address bar show?', 'The site uses an encrypted HTTPS connection', 'The site is free', 'The site has no adverts', 'The site is a government site', 'A'],
      ['Which is a warning sign of an unsafe site?', 'A padlock icon', 'A misspelt domain name like paypa1.com', 'A valid certificate', 'An https:// address', 'B'],
      ['Data before it is encrypted (readable by anyone) is called…', '', '', '', '', 'plaintext|plain text']
    ] },

  { key: 'g6-7.3-4', grade: '6', unit: U3, order: 4, title: 'Ciphers and errors in data transmission',
    bookRef: B + 'Unit 7.3, pp. 100–103',
    objectives: [
      'Encode and decode messages using a Caesar cipher and a substitution cipher',
      'Modify a flowchart algorithm for a basic cipher',
      'Explain how errors can occur when data is transmitted'
    ],
    explanation: [
      '### Ciphers',
      'A **cipher** is an algorithm that turns **plaintext** into **cipher text**.',
      '- **Caesar cipher:** shift every letter a fixed number of places. With a shift of 2: A→C, B→D, … Y→A, Z→B. So `CAT` → `ECV`.',
      '- **Substitution cipher:** each letter is swapped for a random letter. You need the whole key table to decode it.',
      '',
      'To **decode** a Caesar cipher, shift the letters back by the same amount.',
      '',
      '### Errors in transmission',
      'Data travels as **bits** (0s and 1s); 8 bits make a **byte**. Bits can be flipped or lost because of:',
      '- electrical interference',
      '- damaged or broken cables',
      '- power surges',
      '',
      'If one bit flips, `01000101` might arrive as `00000101` — the data is **corrupted**. Computers use checking methods to spot this and ask for the data again.'
    ],
    syntax: ['# Caesar cipher: new letter = letter shifted by key', 'cipher_letter = alphabet[(position + key) % 26]'],
    example: ['alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"', 'message = "HELLO"', 'key = 2', 'secret = ""', 'for letter in message:', '    position = alphabet.index(letter)', '    secret = secret + alphabet[(position + key) % 26]', 'print(secret)   # JGNNQ'],
    note: '`% 26` makes the alphabet "wrap round", so Z shifted by 2 becomes B.',
    questions: [
      ['Using a Caesar cipher with a shift of 2, what does CAT become?', 'DBU', 'ECV', 'BZS', 'CAT', 'B'],
      ['To decode a Caesar cipher with a shift of 3, you…', 'Shift each letter back by 3', 'Shift each letter forward by 6', 'Reverse the word', 'Add 3 to each number', 'A'],
      ['Which can cause errors in data transmission?', 'Electrical interference', 'Using HTTPS', 'A strong password', 'Using a padlock icon', 'A'],
      ['How many bits are in one byte?', '2', '4', '8', '16', 'C'],
      ['Decode this Caesar cipher (shift 1): DPEF', '', '', '', '', 'CODE|code']
    ] },

  { key: 'g6-7.3-5', grade: '6', unit: U3, order: 5, title: 'Search engines and AI',
    bookRef: B + 'Unit 7.3, pp. 103–109',
    objectives: [
      'Understand how search engines categorise and store data',
      'Choose effective keywords for a search',
      'Explain how AI is used to improve search-engine results'
    ],
    explanation: [
      'A **search engine** keeps a huge database (an **index**) of web pages and their keywords. Programs called **crawlers** visit pages and record what they contain.',
      '',
      '### How a search works',
      '1. You type a query. The search engine picks out the **keywords** ("show me the latest game consoles" → *game consoles*).',
      '2. It finds matching pages in its index.',
      '3. It **ranks** them, putting the most useful results first.',
      '',
      '### How AI improves results',
      '- **Machine learning** notices which results people actually click and moves useful pages higher.',
      '- **Location** helps: "bike repair shop" shows shops near you.',
      '- **Image search / reverse image search** recognises what is in a picture.',
      '- Understanding meaning, not just exact words.'
    ],
    example: ['Query:    "what is the tallest mountain in Vietnam?"', 'Keywords: tallest mountain Vietnam', 'Result:   pages about Fansipan ranked first'],
    note: 'Use two or three precise keywords. Put a phrase in "quotation marks" to search for those exact words together.',
    questions: [
      ['What does a search engine store to find pages quickly?', 'An index (database) of web pages and keywords', 'Every user\'s password', 'Only images', 'Only news pages', 'A'],
      ['Which are the best keywords for "show me cheap flights from Hanoi to Da Nang"?', 'show me', 'cheap flights Hanoi Da Nang', 'from to', 'me cheap', 'B'],
      ['How does machine learning improve search results?', 'It learns which results people find useful and ranks them higher', 'It deletes old websites', 'It encrypts searches', 'It makes the internet faster', 'A'],
      ['Why might two people in different cities get different results for "pizza restaurant"?', 'The search engine uses their location', 'One person typed it wrong', 'Search engines are random', 'One uses HTTPS', 'A'],
      ['Computer systems that learn by analysing patterns in data use ___ learning. Type the missing word.', '', '', '', '', 'machine']
    ] },

  /* ======================= UNIT 7.4 ======================= */
  { key: 'g6-7.4-1', grade: '6', unit: U4, order: 1, title: 'Data models and simulations',
    bookRef: B + 'Unit 7.4, pp. 115–118',
    objectives: [
      'Explain what is meant by a data model',
      'Identify real-life scenarios where data models and simulations are used',
      'Describe how data is used to model scenarios in different industries'
    ],
    explanation: [
      'A **data model** uses data and rules (formulas) to represent a real situation, so we can ask **"What if…?"** questions.',
      '',
      'A **simulation** runs the model to see what might happen, without the cost or risk of doing it for real.',
      '',
      '### Where models are used',
      '- **Weather and climate:** forecasting rain and storms',
      '- **Finance:** budgets, savings and loans',
      '- **Transport:** traffic flow and bus timetables',
      '- **Health:** how a disease might spread',
      '- **Engineering:** testing a bridge design before building it',
      '',
      'Models are only as good as their data and rules. Wrong or missing data gives misleading results.'
    ],
    example: ['What-if question: "If we sell 40 more tickets, will the school trip make a profit?"', 'Model: profit = tickets_sold * price - bus_cost'],
    note: 'Spreadsheets and databases are both used to build data models (next topics).',
    questions: [
      ['What is a data model?', 'A representation of a real situation using data and rules', 'A photo of a computer', 'A type of cable', 'A website address', 'A'],
      ['Why are simulations useful?', 'They let us test situations without real cost or risk', 'They make data disappear', 'They replace all experiments forever', 'They only work for games', 'A'],
      ['Which is an example of a data model?', 'A weather forecast system', 'A keyboard', 'A printer', 'A USB stick', 'A'],
      ['What can make a model\'s results misleading?', 'Inaccurate or missing data', 'Using a spreadsheet', 'Using formulas', 'Asking what-if questions', 'A'],
      ['A model is often used to answer "What ___?" questions. Type the missing word.', '', '', '', '', 'if']
    ] },

  { key: 'g6-7.4-2', grade: '6', unit: U4, order: 2, title: 'Spreadsheet models and conditional formatting',
    bookRef: B + 'Unit 7.4, pp. 119–124',
    objectives: [
      'Describe how a spreadsheet can model a real-life scenario',
      'Use cell references and formulas in a model',
      'Write rules for conditional formatting to highlight important data'
    ],
    explanation: [
      'A **spreadsheet** is a grid of **cells**. Each cell has a **cell reference** made from its column letter and row number, e.g. `B3`.',
      '',
      '### Formulas',
      'A formula starts with `=` and recalculates automatically when data changes — this is what makes a spreadsheet a model.',
      '- `=B2*C2` multiply two cells',
      '- `=SUM(D2:D10)` add a range',
      '- `=AVERAGE(D2:D10)` find the mean',
      '',
      '### Conditional formatting',
      'Conditional formatting changes a cell\'s colour automatically when a **rule** is true, so important data stands out. Example rules:',
      '- If balance < 0 → fill red',
      '- If score >= 85 → fill green'
    ],
    syntax: ['=cell operator cell        e.g. =B2*C2', '=SUM(first_cell:last_cell)', 'Rule: IF cell value [condition] THEN apply format'],
    example: ['   A          B (Income)   C (Spending)   D (Balance)', '2  Student 1  200000       150000         =B2-C2', '3  Student 2  100000       130000         =B3-C3', '', 'Conditional formatting on column D: value < 0 -> red fill'],
    note: 'Changing one input cell and watching the results update is how you ask a "what if?" question with a spreadsheet.',
    questions: [
      ['What does every spreadsheet formula start with?', '+', '=', '#', '$', 'B'],
      ['Which formula adds the values in cells D2 to D10?', '=ADD(D2-D10)', '=SUM(D2:D10)', '=TOTAL D2 D10', 'SUM=D2:D10', 'B'],
      ['What is conditional formatting used for?', 'Highlighting cells automatically when a rule is met', 'Deleting rows', 'Printing the sheet', 'Sorting names', 'A'],
      ['Cell B2 = 200 and C2 = 150. What does =B2-C2 show?', '350', '50', '-50', 'B2-C2', 'B'],
      ['What is the cell reference for column C, row 7?', '', '', '', '', 'C7|c7']
    ] },

  { key: 'g6-7.4-3', grade: '6', unit: U4, order: 3, title: 'Databases, field types and primary keys',
    bookRef: B + 'Unit 7.4, pp. 125–131',
    objectives: [
      'Describe how a database can model a real-life scenario',
      'Explain why a primary key is needed in a database table',
      'Identify an appropriate field to use as the primary key'
    ],
    explanation: [
      'A **database** stores organised data so it can be searched and sorted quickly.',
      '',
      '- A **table** holds data about one kind of thing (e.g. Students).',
      '- A **record** is one row — all the data about one student.',
      '- A **field** is one column — one piece of data, e.g. FirstName.',
      '',
      '### Field data types',
      'Short text, number, date/time, currency, Yes/No (Boolean). Choosing the right type stops wrong data being entered.',
      '',
      '### Primary key',
      'A **primary key** is a field whose value is **unique** for every record, e.g. `StudentID`. Names cannot be primary keys because two students can share a name. The primary key lets the database find exactly one record.'
    ],
    example: ['StudentID (PK) | FirstName | LastName | DateOfBirth | Grade', 'S001           | An        | Nguyen   | 2014-03-02  | 6', 'S002           | Binh      | Tran     | 2014-07-19  | 6', 'S003           | An        | Le       | 2013-11-30  | 6'],
    note: 'In the table above, FirstName "An" appears twice — that is why StudentID, not FirstName, is the primary key.',
    questions: [
      ['In a database table, what is a record?', 'One column of data', 'One row with all the data about one item', 'The table name', 'A formula', 'B'],
      ['What is a field?', 'One column (a single piece of data about each record)', 'The whole database', 'A printed report', 'A password', 'A'],
      ['Why is a primary key needed?', 'To uniquely identify each record', 'To make the table colourful', 'To store passwords', 'To sort names alphabetically', 'A'],
      ['Which field is the best primary key for a table of students?', 'FirstName', 'StudentID', 'Grade', 'DateOfBirth', 'B'],
      ['Which field data type is best for a field that stores only Yes or No?', '', '', '', '', 'boolean|yes/no|yes no|yesno']
    ] },

  { key: 'g6-7.4-4', grade: '6', unit: U4, order: 4, title: 'Data capture forms',
    bookRef: B + 'Unit 7.4, pp. 131–136',
    objectives: [
      'Explain the purpose of a data capture form',
      'Evaluate the layout of a form to decide if it is effective and easy to use',
      'Design a user-friendly data capture form'
    ],
    explanation: [
      'A **data capture form** collects data from people in an organised way, on paper or online. Online form data goes straight into a database.',
      '',
      '### What makes a good form?',
      '- A clear **title** and instructions',
      '- Fields in a **logical order** (name before address, etc.)',
      '- **Labels** that say exactly what to enter',
      '- **Drop-down lists, tick boxes and radio buttons** to limit choices and reduce mistakes',
      '- Enough space for each answer',
      '- Only asking for data that is really needed',
      '',
      'A good form is easy to complete and gives accurate data. A confusing form gives incomplete or wrong data.'
    ],
    example: ['Booster Club Registration', '---------------------------------', 'First name:  [__________]', 'Grade:       ( ) 6  ( ) 7  ( ) 8', 'Date of birth: [DD]/[MM]/[YYYY]', 'Interests:   [ ] Coding  [ ] Robotics  [ ] Games', '[ Submit ]'],
    note: 'Using a drop-down list for "Grade" stops someone typing "sixth", "6th" or "Gr6" — the data stays consistent.',
    questions: [
      ['What is the main purpose of a data capture form?', 'To collect data in an organised way', 'To delete data', 'To design logos', 'To print reports', 'A'],
      ['Why use a drop-down list on a form?', 'It limits choices so data is consistent and accurate', 'It makes the form longer', 'It hides the form', 'It encrypts the data', 'A'],
      ['Which is a feature of a good form?', 'Fields in a logical order with clear labels', 'Tiny text with no labels', 'Asking for unnecessary personal data', 'No title', 'A'],
      ['Which input type is best for choosing ONE grade from 6, 7 or 8?', 'Radio buttons', 'A large text box', 'A signature box', 'A password box', 'A'],
      ['Data from an online form is usually stored directly in a…', '', '', '', '', 'database']
    ] },

  { key: 'g6-7.4-5', grade: '6', unit: U4, order: 5, title: 'Searching a database with criteria',
    bookRef: B + 'Unit 7.4, pp. 135–145',
    objectives: [
      'Use criteria such as > and < to search a database',
      'Combine criteria to find useful information',
      'Highlight important data in a database'
    ],
    explanation: [
      'A **query** searches a database for records that match **criteria** (conditions).',
      '',
      '### Writing criteria',
      '- Text: `= "Hanoi"` finds records where City is Hanoi',
      '- Numbers: `> 85` finds scores above 85; `<= 12` finds ages 12 or under',
      '- Dates: `> 01/01/2014` finds dates after 1 January 2014',
      '',
      '### Combining criteria',
      '- **AND:** both must be true — Grade = 6 AND Score > 85',
      '- **OR:** at least one must be true — City = "Hanoi" OR City = "Hue"',
      '',
      'Queries turn a large table into the small set of records you actually need, e.g. "students below the 85% target".'
    ],
    syntax: ['Field: Score      Criteria: >= 85', 'Field: Grade      Criteria: = 6', 'Field: City       Criteria: "Hanoi" OR "Hue"'],
    example: ['Question: Which Grade 6 students scored under 85?', 'Field  | Grade | Score', 'Criteria | 6   | < 85'],
    note: '`>` means "more than" and does **not** include the number itself. Use `>=` to include it.',
    questions: [
      ['Which criteria finds scores of 85 or more?', '> 85', '>= 85', '< 85', '= 85', 'B'],
      ['What does a database query do?', 'Finds records that match given criteria', 'Deletes the database', 'Changes field names', 'Encrypts the data', 'A'],
      ['Grade = 6 AND Score > 85 will find…', 'All Grade 6 students', 'Students in Grade 6 who also scored above 85', 'Anyone who scored above 85', 'Anyone in any grade', 'B'],
      ['Which criteria finds ages 12 and under?', '< 12', '>= 12', '<= 12', '> 12', 'C'],
      ['Which logical operator means BOTH conditions must be true?', '', '', '', '', 'AND|and']
    ] },

  /* ======================= UNIT 7.5 ======================= */
  { key: 'g6-7.5-1', grade: '6', unit: U5, order: 1, title: 'What is AI?',
    bookRef: B + 'Unit 7.5, pp. 153–159',
    objectives: [
      'Explain the difference between systems software and applications software',
      'Explain what artificial intelligence (AI) means',
      'Give examples of AI applications used at home and school'
    ],
    explanation: [
      '**Artificial intelligence (AI)** is an area of computing that makes computer systems able to do tasks that normally need human intelligence: understanding speech, recognising faces, making decisions and learning from experience.',
      '',
      'AI programs are **applications software**. They run on top of **systems software** such as the operating system.',
      '',
      '### AI around you',
      '- Voice assistants (Siri, Google Assistant)',
      '- Video and music recommendations',
      '- Email spam filters',
      '- Face unlock on phones',
      '- Translation apps',
      '- Navigation apps that predict traffic',
      '',
      'Many AI systems use **machine learning**: instead of being given every rule, they learn patterns from large amounts of data.'
    ],
    example: ['Spam filter: learns from thousands of emails marked as spam', '-> new email contains similar patterns -> moved to the spam folder'],
    note: 'AI is not only robots. Most AI you use is invisible software inside apps and websites.',
    questions: [
      ['What does AI stand for?', 'Automatic Internet', 'Artificial Intelligence', 'Advanced Input', 'Applied Information', 'B'],
      ['Which is an example of AI?', 'A voice assistant that understands spoken questions', 'A pencil', 'A light switch', 'A USB cable', 'A'],
      ['What is machine learning?', 'A system learning patterns from data instead of being given every rule', 'Repairing machines', 'Typing very fast', 'Building robots by hand', 'A'],
      ['AI apps such as translators are which type of software?', 'Systems software', 'Applications software', 'Hardware', 'Firmware only', 'B'],
      ['Name the type of AI tool that filters unwanted emails. (two words)', '', '', '', '', 'spam filter|spam filters|spam-filter']
    ] },

  { key: 'g6-7.5-2', grade: '6', unit: U5, order: 2, title: 'AI in industry, sensors and input–process–output',
    bookRef: B + 'Unit 7.5, pp. 158–164',
    objectives: [
      'Explain how AI helps automate tasks in some industries',
      'Describe how AI uses sensor data from its surroundings to produce an output',
      'Evaluate the pros and cons of AI systems'
    ],
    explanation: [
      'AI systems collect data from their surroundings using **sensors**, **process** it to make a decision, and produce an **output**.',
      '',
      '### Input → Process → Output',
      'Smart thermostat: **input** temperature and humidity sensors → **process** compare with the user\'s preferred temperature and learn their routine → **output** switch heating or cooling on/off.',
      '',
      '### Common sensors',
      'Temperature, humidity, light, motion (PIR), sound (microphone), pressure, camera (image).',
      '',
      '### AI in industry',
      'Self-checkout and stock control in shops, robots in factories, crop monitoring in farming, fraud detection in banks, scan analysis in hospitals.',
      '',
      '### Pros and cons',
      'Pros: works 24/7, fast, accurate, does dangerous or boring jobs. Cons: expensive to set up, can replace jobs, can make mistakes if trained on poor data, privacy concerns.'
    ],
    example: ['INPUT:   motion sensor detects movement at night', 'PROCESS: is it a person? is it after 10 pm?', 'OUTPUT:  turn on the light and send an alert to the phone'],
    note: 'For exam answers, name the **sensor**, say what the AI **decides**, and state the **output**.',
    questions: [
      ['Which sensor would a smart irrigation system use to decide when to water plants?', 'Moisture/humidity sensor', 'Microphone', 'Keyboard', 'Speaker', 'A'],
      ['In input–process–output, what does the PROCESS stage do?', 'Makes a decision using the input data', 'Collects data', 'Displays the result', 'Turns the device off', 'A'],
      ['Which is a disadvantage of AI in industry?', 'It can work all day without breaks', 'It can replace some human jobs', 'It is very fast', 'It can do dangerous jobs', 'B'],
      ['A camera used to recognise faces is which part of the system?', 'Input', 'Process', 'Output', 'Storage only', 'A'],
      ['Which sensor detects movement?', 'Light sensor', 'Motion (PIR) sensor', 'Temperature sensor', 'Humidity sensor', 'B']
    ] },

  { key: 'g6-7.5-3', grade: '6', unit: U5, order: 3, title: 'Representing images: pixels, resolution and colour depth',
    bookRef: B + 'Unit 7.5, pp. 165–170',
    objectives: [
      'Describe how an analogue image is converted into a digital format',
      'Explain pixels, resolution and colour depth',
      'Compare bitmap and vector graphics'
    ],
    explanation: [
      'Computers store everything as **binary** (0s and 1s). To store a picture, a digital camera or scanner divides it into a grid of tiny squares called **pixels** and stores a binary number for each pixel\'s colour. This turns an **analogue** image into a **digital** one.',
      '',
      '- **Resolution:** how many pixels make up the image (e.g. 1920 × 1080). More pixels = more detail and a bigger file.',
      '- **Colour depth:** how many bits are used per pixel. 1 bit = 2 colours (black/white); 8 bits = 256 colours; 24 bits ≈ 16.7 million colours.',
      '',
      '**File size (bits) = width × height × colour depth.** A 10 × 10 black-and-white image needs 10 × 10 × 1 = 100 bits.',
      '',
      '### Bitmap vs vector',
      '- **Bitmap:** stored pixel by pixel; good for photos; goes blocky (pixelated) when enlarged.',
      '- **Vector:** stored as shapes and instructions (lines, circles, colours); stays sharp at any size; good for logos.',
      '',
      '**Image recognition** in AI looks for patterns in these pixel values.'
    ],
    syntax: ['file size (bits) = width × height × colour depth', 'file size (bytes) = bits ÷ 8'],
    example: ['1-bit image, 5 x 5 pixels (1 = black, 0 = white):', '0 1 0 1 0', '0 1 0 1 0', '0 0 0 0 0', '1 0 0 0 1', '0 1 1 1 0', 'Size = 5 x 5 x 1 = 25 bits'],
    note: 'Doubling the colour depth doubles the file size; doubling both width and height makes it four times bigger.',
    questions: [
      ['What is a pixel?', 'The smallest single point of colour in a digital image', 'A type of camera', 'A vector shape', 'A file format', 'A'],
      ['How many colours can a 1-bit colour depth show?', '1', '2', '8', '256', 'B'],
      ['What happens to a bitmap image when it is enlarged too much?', 'It becomes pixelated (blocky)', 'It becomes sharper', 'It turns into a vector', 'Its file gets smaller', 'A'],
      ['Which type of graphic is best for a logo that must look sharp at any size?', 'Bitmap', 'Vector', 'Analogue', 'Photograph', 'B'],
      ['How many bits are needed for a 10 x 10 pixel image with a colour depth of 1? Type the number.', '', '', '', '', '100']
    ] },

  { key: 'g6-7.5-4', grade: '6', unit: U5, order: 4, title: 'Binary: representing sound and text',
    bookRef: B + 'Unit 7.5, pp. 171–172',
    objectives: [
      'Explain what a binary number is',
      'Explain how binary represents text using character codes',
      'Describe how sound is stored as binary samples'
    ],
    explanation: [
      '**Binary** is a number system that uses only two digits, 0 and 1. Each digit is a **bit**. Computers use binary because their circuits are either **off (0)** or **on (1)**.',
      '',
      '### Place values (8 bits)',
      '`128 64 32 16 8 4 2 1` — add the place values where there is a 1.',
      '`00000101` = 4 + 1 = **5**.',
      '',
      '### Text',
      'Each character has a number code (ASCII/Unicode), stored in binary. `H` = 72 = `01001000`; `e` = 101 = `01100101`.',
      '',
      '### Sound',
      'A microphone produces an analogue wave. The computer **samples** the height of the wave thousands of times a second and stores each sample as a binary number. More samples per second (**sample rate**) means better quality and bigger files.'
    ],
    syntax: ['place values: 128 64 32 16 8 4 2 1'],
    example: ['Binary 00001101', '= 8 + 4 + 1', '= 13', '', '# In Python:', 'print(int("00001101", 2))   # 13', 'print(bin(13))              # 0b1101'],
    note: 'A capital letter and a small letter have different codes: `A` = 65 but `a` = 97.',
    questions: [
      ['Which digits does binary use?', '0 to 9', '0 and 1', '1 and 2', 'A to F', 'B'],
      ['What is binary 00000101 in denary (normal numbers)?', '5', '6', '101', '3', 'A'],
      ['How is text stored in a computer?', 'Each character has a number code stored in binary', 'As pictures of letters', 'As sound waves', 'It cannot be stored', 'A'],
      ['How is sound turned into digital data?', 'The sound wave is sampled many times a second and each sample is stored in binary', 'The sound is drawn as a vector', 'The microphone stores letters', 'It is printed', 'A'],
      ['What is binary 00001010 in denary? Type the number.', '', '', '', '', '10']
    ] },

  { key: 'g6-7.5-5', grade: '6', unit: U5, order: 5, title: 'Logic gates: AND, OR and NOT',
    bookRef: B + 'Unit 7.5, pp. 173–181',
    objectives: [
      'Explain what a logic gate is and what is meant by Boolean logic',
      'Explain how AND, OR and NOT gates work',
      'Complete a truth table for each gate'
    ],
    explanation: [
      'Computers make decisions using **logic gates**: tiny circuits that take inputs of 1 (true/on) or 0 (false/off) and produce one output. This is called **Boolean logic**.',
      '',
      '- **AND:** output is 1 only if **both** inputs are 1.',
      '- **OR:** output is 1 if **at least one** input is 1.',
      '- **NOT:** has one input and gives the **opposite** (1 → 0, 0 → 1).',
      '',
      'A **truth table** lists every possible input and the output for each.',
      '',
      'Everyday example: "I can have a cheese sandwich if there is bread **AND** there is cheese."'
    ],
    syntax: ['A AND B   -> 1 only when A = 1 and B = 1', 'A OR B    -> 1 when A = 1 or B = 1 (or both)', 'NOT A     -> the opposite of A'],
    example: ['AND        OR         NOT', 'A B | Z    A B | Z    A | Z', '0 0 | 0    0 0 | 0    0 | 1', '0 1 | 0    0 1 | 1    1 | 0', '1 0 | 0    1 0 | 1', '1 1 | 1    1 1 | 1'],
    note: 'In Python the same logic uses the keywords `and`, `or` and `not`.',
    questions: [
      ['An AND gate has inputs A = 1 and B = 0. What is the output?', '0', '1', '2', 'It depends', 'A'],
      ['An OR gate has inputs A = 0 and B = 1. What is the output?', '0', '1', '2', 'It depends', 'B'],
      ['A NOT gate has input 1. What is the output?', '1', '0', '2', '10', 'B'],
      ['Which gate outputs 1 only when BOTH inputs are 1?', 'OR', 'NOT', 'AND', 'None', 'C'],
      ['What is the name of the table that shows every input and output of a logic gate? (two words)', '', '', '', '', 'truth table']
    ] },

  /* ======================= UNIT 7.6 ======================= */
  { key: 'g6-7.6-1', grade: '6', unit: U6, order: 1, title: 'Software prototypes',
    bookRef: B + 'Unit 7.6, pp. 186–188',
    objectives: [
      'Explain the purpose of a software prototype',
      'Describe evolutionary and throwaway prototyping',
      'Evaluate a prototype to help debug and improve it'
    ],
    explanation: [
      'A **prototype** is an early, simple version of a product. It lets users try the idea and give feedback before the full product is built.',
      '',
      '### Two types',
      '- **Throwaway prototyping:** build a quick model, collect feedback, then throw it away and build the real product properly.',
      '- **Evolutionary prototyping:** keep improving the same prototype, version after version, until it becomes the final product.',
      '',
      '### Why prototype?',
      '- Find problems early, when they are cheap to fix',
      '- Check the design meets the user\'s needs',
      '- Users feel involved',
      '',
      'Evaluating a prototype means testing it, listing what works and what does not, and deciding on improvements.'
    ],
    example: ['Version 1: micro:bit shows a sad face when sound is too loud', 'Feedback:  "Hard to notice when wearing headphones"', 'Version 2: also flashes the LEDs and plays a tone'],
    note: 'Each round of feedback and improvement is called an **iteration**.',
    questions: [
      ['What is a prototype?', 'An early, simple version of a product used to test ideas', 'The final finished product', 'A type of virus', 'A database table', 'A'],
      ['In evolutionary prototyping, the prototype is…', 'Thrown away', 'Improved step by step until it becomes the final product', 'Never tested', 'Sold immediately', 'B'],
      ['Why are prototypes useful?', 'Problems are found early, when they are cheaper to fix', 'They remove the need for users', 'They make code longer', 'They stop all errors', 'A'],
      ['In throwaway prototyping, what happens after feedback is collected?', 'The prototype is discarded and the real product is built', 'The prototype is sold', 'Nothing changes', 'The users are removed', 'A'],
      ['Each cycle of testing and improving a prototype is called an…', '', '', '', '', 'iteration']
    ] },

  { key: 'g6-7.6-2', grade: '6', unit: U6, order: 2, title: 'Pattern recognition: blocks, MicroPython and Python',
    bookRef: B + 'Unit 7.6, pp. 189–197',
    tryIt: MB,
    objectives: [
      'Use pattern recognition to find similarities between programs',
      'Compare MakeCode blocks with MicroPython code',
      'Spot patterns between flowcharts and text-based code'
    ],
    explanation: [
      '**Pattern recognition** means looking for similarities between problems or solutions, so you can reuse what you already know.',
      '',
      '### Patterns between languages',
      '- MakeCode block **on button A pressed → show icon** ↔ MicroPython `if button_a.is_pressed(): display.show(Image.HAPPY)`',
      '- Scratch **say** ↔ Python `print()`',
      '- Scratch **forever** ↔ Python `while True:`',
      '',
      '### Patterns in code',
      'Two parts of a program that differ only in the button or picture can follow the **same pattern**. Spotting this lets you copy the structure and change just the values — and later turn it into a sub-routine.'
    ],
    example: ['from microbit import *', '', 'while True:', '    if button_a.is_pressed():      # pattern: check input', '        display.show(Image.HAPPY)   #          show output', '    if button_b.is_pressed():      # same pattern,', '        display.show(Image.SAD)     # different values'],
    note: 'Pattern recognition is one of the four computational thinking skills, along with decomposition, abstraction and algorithms.',
    questions: [
      ['What is pattern recognition?', 'Finding similarities between problems or solutions', 'Drawing pictures', 'Encrypting messages', 'Removing all code', 'A'],
      ['Which Python code matches the Scratch "forever" block?', 'for i in range(1):', 'while True:', 'if True:', 'stop()', 'B'],
      ['Which Python code matches the Scratch "say Hello" block?', 'say("Hello")', 'print("Hello")', 'input("Hello")', 'display("Hello")', 'B'],
      ['Why is spotting a pattern in code useful?', 'You can reuse the structure and only change the values', 'It makes the program longer', 'It removes the need to test', 'It deletes errors automatically', 'A'],
      ['Breaking a problem into parts, pattern recognition, abstraction and algorithms are together called computational ___. Type the missing word.', '', '', '', '', 'thinking']
    ] },

  { key: 'g6-7.6-3', grade: '6', unit: U6, order: 3, title: 'AND, OR and NOT in flowcharts and MicroPython',
    bookRef: B + 'Unit 7.6, pp. 198–202',
    tryIt: MB,
    objectives: [
      'Follow and explain the logic of AND, OR and NOT in a flowchart',
      'Use and, or and not in a MicroPython program',
      'Predict the outcome of a flowchart that uses Boolean operators'
    ],
    explanation: [
      'Sometimes an output should depend on **more than one input**. Boolean operators combine conditions:',
      '',
      '- `and` — True only if **both** conditions are True',
      '- `or` — True if **either** condition (or both) is True',
      '- `not` — reverses a condition',
      '',
      '### Examples',
      '- Play a tune if button A **and** button B are pressed together.',
      '- Show a heart if button A **or** button B is pressed.',
      '- Show a cross while button A is **not** pressed.',
      '',
      'In a flowchart, the decision diamond holds the whole combined condition, e.g. **A pressed AND B pressed?**'
    ],
    syntax: ['if condition1 and condition2:', 'if condition1 or condition2:', 'if not condition:'],
    example: ['from microbit import *', '', 'while True:', '    if button_a.is_pressed() and button_b.is_pressed():', '        display.show(Image.HEART)', '    elif button_a.is_pressed() or button_b.is_pressed():', '        display.show(Image.SMILE)', '    else:', '        display.clear()'],
    note: 'Check the `and` condition **first**. If the `or` check came first, pressing both buttons would match `or` and the heart would never appear.',
    questions: [
      ['button_a.is_pressed() and button_b.is_pressed() is True when…', 'Only A is pressed', 'Only B is pressed', 'Both A and B are pressed', 'Neither is pressed', 'C'],
      ['button_a.is_pressed() or button_b.is_pressed() is True when…', 'At least one button is pressed', 'Only both are pressed', 'No buttons are pressed', 'The micro:bit is shaken', 'A'],
      ['What does not button_a.is_pressed() mean?', 'Button A is pressed', 'Button A is NOT pressed', 'Button B is pressed', 'Both buttons are pressed', 'B'],
      ['A flowchart decision says "Is it raining OR is it cold?". It is cold but not raining. Which path?', 'Yes', 'No', 'Both', 'The program stops', 'A'],
      ['Which Python keyword reverses a condition (True becomes False)?', '', '', '', '', 'not']
    ] },

  { key: 'g6-7.6-4', grade: '6', unit: U6, order: 4, title: 'Project plans, test plans and debugging',
    bookRef: B + 'Unit 7.6, pp. 203–209',
    tryIt: MB,
    objectives: [
      'Explain the purpose of a project plan',
      'Create a test plan for a flowchart and program',
      'Identify errors and debug a MicroPython program'
    ],
    explanation: [
      'Before building a program, developers write a **project plan**: the problem, the users, the inputs and outputs, a flowchart and the success criteria.',
      '',
      '### Test plans',
      'A test plan lists each test, the data entered, the expected outcome, the actual outcome and pass/fail.',
      '',
      '### Debugging checklist',
      '1. Compare the code with the flowchart — is the **sequence** the same?',
      '2. Check **syntax**: colons after `if` and `while`, brackets, quotation marks, capital letters (`Image.HAPPY`, not `image.happy`).',
      '3. Check **indentation** — lines inside `if` and `while` must be indented.',
      '4. Check **logic** — is the condition the right way round (`<` vs `>`)?',
      '5. Run the test plan again after every fix.'
    ],
    syntax: ['Test | Input | Expected outcome | Actual outcome | Pass/Fail', '1    | Press A | Alarm shows | ... | ...'],
    example: ['# Buggy version:', '#   if microphone.sound_level() > 100', '#       display.show(image.YES)', '# Fixed version:', 'from microbit import *', 'while True:', '    if microphone.sound_level() > 100:', '        display.show(Image.YES)', '    else:', '        display.clear()'],
    note: '`microphone.sound_level()` only works on the micro:bit **V2** (the version with a built-in microphone).',
    questions: [
      ['What is the purpose of a project plan?', 'To set out the problem, inputs, outputs and design before coding', 'To list game scores', 'To replace testing', 'To print the code', 'A'],
      ['Which line has a syntax error?', 'if light < 100:', 'if light < 100', 'display.clear()', 'while True:', 'B'],
      ['A program shows the alarm in bright light instead of darkness. What kind of error is this?', 'Syntax error', 'Logic error', 'Hardware error', 'No error', 'B'],
      ['Why must lines inside an if statement be indented?', 'Python uses indentation to know which lines belong to the if', 'It makes the code colourful', 'It is optional decoration', 'It saves memory', 'A'],
      ['After fixing a bug, what should you do again? Type two words: run the test ___', '', '', '', '', 'plan|test plan|the test plan']
    ] },

  { key: 'g6-7.6-5', grade: '6', unit: U6, order: 5, title: 'LED patterns and sequences on the micro:bit',
    bookRef: B + 'Unit 7.6, pp. 210–222',
    tryIt: MB,
    objectives: [
      'Use a grid to plan a pattern of LED lights',
      'Develop a MicroPython program that displays a sequence of LED images',
      'Change LED brightness using values 0 to 9'
    ],
    explanation: [
      'The micro:bit has a 5 × 5 grid of LEDs. You can design your own image by giving each LED a brightness from **0 (off) to 9 (brightest)**.',
      '',
      '### Planning on a grid',
      'Draw a 5 × 5 grid, shade the squares you want on, then write each row as five digits. Rows are separated with colons.',
      '',
      '### Making a sequence',
      'Show one image, `sleep()`, show the next image — like frames of a cartoon. Put the sequence inside `while True:` to repeat it.',
      '',
      '### Brightness',
      'Values between 1 and 8 make dimmer lights, so you can create fading effects.'
    ],
    syntax: ['Image("row1:row2:row3:row4:row5")   # each row = 5 digits from 0 to 9'],
    example: ['from microbit import *', '', 'small = Image("00000:00000:00900:00000:00000")', 'medium = Image("00000:09990:09090:09990:00000")', 'large = Image("99999:90009:90009:90009:99999")', '', 'while True:', '    display.show(small)', '    sleep(300)', '    display.show(medium)', '    sleep(300)', '    display.show(large)', '    sleep(300)'],
    note: 'Every row must have exactly **5 digits**, and there must be exactly **5 rows** — otherwise you get an error.',
    questions: [
      ['How many LEDs are on the micro:bit display?', '9', '16', '25', '36', 'C'],
      ['In Image("..."), what does the digit 0 mean for an LED?', 'Brightest', 'Off', 'Half brightness', 'Flashing', 'B'],
      ['What is the brightest value an LED can have?', '1', '5', '9', '10', 'C'],
      ['How do you create an animation with LED images?', 'Show one image, pause with sleep(), then show the next', 'Use only one image', 'Turn the micro:bit upside down', 'Use input()', 'A'],
      ['How many digits must each row of an Image string contain? Type the number.', '', '', '', '', '5|five']
    ] }

  );
})();
