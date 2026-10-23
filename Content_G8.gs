/**
 * GRADE 8 BOOSTER LESSONS · based on Cambridge Lower Secondary Computing 9 (Hodder Education)
 * Original summaries for this booster course; page numbers point to the Student's Book.
 * Question format: [question, A, B, C, D, answer] — leave A–D empty for short answer ("ans1|ans2").
 */
var BOOK_LESSONS = (typeof BOOK_LESSONS !== 'undefined') ? BOOK_LESSONS : [];
(function () {
  var B = 'Cambridge Lower Secondary Computing 9, ';
  var U1 = '9.1 Presenting choices: Combining constructs';
  var U2 = '9.2 Design your own network: Shape and size';
  var U3 = '9.3 Coding and testing: Game development for the micro:bit';
  var U4 = '9.4 Drilling down: How the processor handles instructions';
  var U5 = '9.5 Big Data modelling and analysis: Databases and spreadsheets';
  var U6 = '9.6 An array of skills';
  var MB = 'https://python.microbit.org/v/3';

  BOOK_LESSONS.push(

  /* ======================= UNIT 9.1 ======================= */
  { key: 'g8-9.1-1', grade: '8', unit: U1, order: 1, title: 'Chatbots and data types',
    bookRef: B + 'Unit 9.1, pp. 8–16',
    objectives: [
      'Identify and describe data types in Python: integer, real, character, string and Boolean',
      'Explain the difference between rule-based and AI chatbots',
      'Choose a suitable data type for each variable in a program'
    ],
    explanation: [
      'A **chatbot** is a program that holds a conversation with a user.',
      '- **Rule-based chatbots** follow fixed rules written by a programmer: IF the user types X THEN reply Y. They can only answer what they were programmed for.',
      '- **AI chatbots** use machine learning and natural language processing to understand questions and give more flexible answers.',
      '',
      '### Data types',
      '- **Integer** — whole number: `hours = 3`',
      '- **Real (float)** — number with a decimal part: `activityTime = 1.5`',
      '- **Character** — a single letter, digit or symbol: `"Y"`. Python has no separate character type; it stores a character as a string of length 1.',
      '- **String** — a series of characters: `activity = "Swimming"`',
      '- **Boolean** — `True` or `False`: `likesWater = True`',
      '',
      'Choosing the right type lets the program store and process the data correctly (you can do maths with integers and reals, but not with strings).'
    ],
    syntax: ['variable_name = value', 'type(variable_name)   # shows the data type'],
    example: ['name = input("Hi! What is your name? ")            # string', 'answer = input("Do you like water sports? Y/N ")   # character', 'hours = int(input("Hours free each week? "))       # integer', 'likes_water = answer == "Y"                         # Boolean', 'if likes_water and hours >= 2:', '    print("Try swimming,", name)', 'else:', '    print("Try chess club,", name)'],
    note: '`answer == "Y"` is a comparison, so its result is a Boolean — True or False.',
    questions: [
      ['Which data type is 1.5?', 'Integer', 'Real (float)', 'Character', 'Boolean', 'B'],
      ['Which data type is "Y" (a single letter)?', 'Character', 'Integer', 'Real', 'Boolean', 'A'],
      ['How does a rule-based chatbot reply?', 'It follows fixed rules written by a programmer', 'It learns from millions of conversations', 'It guesses randomly', 'It asks a human every time', 'A'],
      ['Which data type stores True or False?', 'String', 'Boolean', 'Real', 'Character', 'B'],
      ['Which data type is "Swimming"?', '', '', '', '', 'string|str']
    ] },

  { key: 'g8-9.1-2', grade: '8', unit: U1, order: 2, title: 'Trace tables and dry runs',
    bookRef: B + 'Unit 9.1, pp. 16–23',
    objectives: [
      'Follow, understand, edit and correct algorithms presented as pseudocode',
      'Use a trace table to dry run an algorithm',
      'Predict the outcome of an algorithm'
    ],
    explanation: [
      'A **dry run** means working through an algorithm by hand, line by line, without a computer.',
      '',
      'A **trace table** records the value of each variable (and each condition and output) every time it changes. It shows exactly how data flows through the algorithm, so you can predict the output and find mistakes.',
      '',
      '### How to complete a trace table',
      '1. Make a column for each variable, each condition and the output.',
      '2. Work through the algorithm one line at a time.',
      '3. Write a new value in the table whenever a variable changes.',
      '4. For a condition, write True or False.',
      '5. Record anything that is output.'
    ],
    syntax: ['Line | variable1 | variable2 | condition | OUTPUT'],
    example: ['# Pseudocode:', '# 1 number = 4', '# 2 number = number * 2', '# 3 IF number < 10 THEN OUTPUT "small" ELSE OUTPUT "big"', '', '# Trace table:', '# Line | number | number < 10 | OUTPUT', '#  1   |   4    |             |', '#  2   |   8    |             |', '#  3   |        |    True     | small'],
    note: 'Trace tables are especially useful for finding **logic errors**, where the program runs but gives the wrong result.',
    questions: [
      ['What is a trace table used for?', 'Recording variable values as an algorithm runs, to predict output and find errors', 'Drawing networks', 'Storing passwords', 'Compressing files', 'A'],
      ['What is a dry run?', 'Working through an algorithm by hand without a computer', 'Running a program with no data', 'Deleting a program', 'A test with water', 'A'],
      ['number = 3, then number = number + 5. What is number?', '3', '5', '8', '35', 'C'],
      ['In a trace table, what should you write for a condition?', 'True or False', 'The line number only', 'Nothing', 'The variable name', 'A'],
      ['number = 6. What is output? IF number < 10 THEN OUTPUT "small" ELSE OUTPUT "big"', '', '', '', '', 'small']
    ] },

  { key: 'g8-9.1-3', grade: '8', unit: U1, order: 3, title: 'Finding logic errors with trace tables',
    bookRef: B + 'Unit 9.1, pp. 24–28',
    objectives: [
      'Use trace tables to find and fix logic errors',
      'Test conditions with boundary values',
      'Use iterative development to improve a program'
    ],
    explanation: [
      'A **logic error** means the program runs without crashing but gives the wrong result. Python cannot spot logic errors for you — you must test.',
      '',
      '### Classic example: grade bands',
      'A chatbot gives feedback on a score out of 100:',
      '- 90 and above → "Excellent"',
      '- 51 to 89 → "Good"',
      '- 20 to 50 → "Keep practising"',
      '- below 20 → "Ask for help"',
      '',
      'If the first condition is written `score > 90`, a score of exactly **90** falls into the "Good" band — a logic error. Testing the **boundary values** (19, 20, 50, 51, 89, 90) with a trace table finds it. The fix is `score >= 90`.'
    ],
    syntax: ['if score >= 90:', '    ...', 'elif score >= 51:', '    ...', 'elif score >= 20:', '    ...', 'else:', '    ...'],
    example: ['score = int(input("Enter your score: "))', 'if score >= 90:', '    print("Excellent")', 'elif score >= 51:', '    print("Good")', 'elif score >= 20:', '    print("Keep practising")', 'else:', '    print("Ask for help")'],
    note: 'Boundary values are where `>` vs `>=` mistakes hide. Always test the value exactly on each boundary.',
    questions: [
      ['What is a logic error?', 'The program runs but gives the wrong result', 'The program will not start because of a typing mistake', 'The computer has no power', 'The internet is down', 'A'],
      ['Code: if score > 90: print("Excellent"). The user enters 90. Is "Excellent" printed?', 'Yes', 'No', 'It crashes', 'Only sometimes', 'B'],
      ['Which values are the best boundary tests for the band 51–89?', '60 and 70', '50, 51, 89 and 90', '0 and 100', '1 and 2', 'B'],
      ['Which tool helps you follow the values of variables to find a logic error?', 'A trace table', 'A firewall', 'A spreadsheet chart', 'A compiler', 'A'],
      ['Which operator should replace > so that 90 counts as "Excellent"?', '', '', '', '', '>=']
    ] },

  { key: 'g8-9.1-4', grade: '8', unit: U1, order: 4, title: 'Count-controlled loops (for loops)',
    bookRef: B + 'Unit 9.1, pp. 29–35',
    objectives: [
      'Use and explain count-controlled loops in pseudocode, flowcharts and Python',
      'Predict the outcome of algorithms that use iteration',
      'Compare two algorithms for the same task and decide which is more efficient'
    ],
    explanation: [
      '**Iteration** means repeating instructions. A **count-controlled loop** repeats a **set number of times**.',
      '',
      '### Pseudocode',
      '`FOR i = 0 TO 2` … `NEXT i` repeats 3 times (i = 0, 1, 2).',
      '',
      '### Python',
      '`for i in range(3):` repeats 3 times with i = 0, 1, 2.',
      '- `for` starts the loop',
      '- `i` is the **counter** variable',
      '- `range(3)` gives the values 0, 1, 2 (it stops **before** 3)',
      '- the colon and the indented lines show what repeats',
      '',
      '`range(1, 6)` gives 1, 2, 3, 4, 5. `range(0, 10, 2)` gives 0, 2, 4, 6, 8.',
      '',
      '### Efficiency',
      'Asking the user for three favourite subjects with three separate INPUT lines works, but a loop does the same with fewer lines, is easier to change (just change the number) and has less chance of copy-paste mistakes.'
    ],
    syntax: ['for counter in range(start, stop):', '    # repeated code (indented)'],
    example: ['for i in range(3):', '    subject = input("Name one of your favourite subjects: ")', '    print("You like", subject)', '', 'for n in range(1, 6):', '    print(n, "x 7 =", n * 7)'],
    note: '`range(5)` runs 5 times but the counter goes from **0 to 4**, not 1 to 5.',
    questions: [
      ['How many times does for i in range(4): repeat?', '3', '4', '5', 'Forever', 'B'],
      ['What values does range(1, 4) produce?', '1, 2, 3, 4', '1, 2, 3', '0, 1, 2, 3', '2, 3, 4', 'B'],
      ['What is a count-controlled loop?', 'A loop that repeats a set number of times', 'A loop that never ends', 'An if statement', 'A type of variable', 'A'],
      ['Why is a loop more efficient than repeating the same lines three times?', 'Fewer lines, easier to change and fewer mistakes', 'It makes the program longer', 'Loops run without a computer', 'It removes variables', 'A'],
      ['What is the last number printed by: for i in range(5): print(i)', '', '', '', '', '4|four']
    ] },

  { key: 'g8-9.1-5', grade: '8', unit: U1, order: 5, title: 'One-dimensional arrays (lists)',
    bookRef: B + 'Unit 9.1, pp. 36–45',
    objectives: [
      'Identify and explain the purpose of a one-dimensional array',
      'Access data from an array using an index in Python',
      'Use a for loop to process every item in an array'
    ],
    explanation: [
      'An **array** stores many related values under **one name**. In Python, arrays are written as **lists** in square brackets:',
      '`rainbow = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]`',
      '',
      '### Index',
      'Each item has a numbered position called an **index**, starting at **0**.',
      '- `rainbow[0]` → "red"',
      '- `rainbow[2]` → "yellow"',
      '- `len(rainbow)` → 7 items',
      '',
      '### Why use arrays?',
      'Instead of seven separate variables (`colour1`, `colour2`, …), one array holds everything, and a loop can process each item.',
      '',
      '### Adding items',
      '`list.append(item)` adds an item to the end — useful for storing several user answers.'
    ],
    syntax: ['array_name = [item0, item1, item2]', 'array_name[index]', 'array_name.append(new_item)', 'for item in array_name:'],
    example: ['water = ["Swimming", "Canoeing", "Sailing"]', 'print(water[0])          # Swimming', 'print(len(water))        # 3', '', 'water.append("Diving")', 'for activity in water:', '    print("You could try", activity)'],
    note: 'Asking for an index that does not exist (e.g. `water[10]`) causes an **IndexError**.',
    questions: [
      ['What is the index of the first item in a Python list?', '0', '1', '-1', 'It depends', 'A'],
      ['colours = ["red", "green", "blue"]. What is colours[1]?', 'red', 'green', 'blue', 'An error', 'B'],
      ['What is the purpose of an array?', 'To store many related values under one name', 'To store only one number', 'To repeat code', 'To draw shapes', 'A'],
      ['Which line adds "pink" to the end of the list colours?', 'colours.add("pink")', 'colours.append("pink")', 'colours + "pink"', 'append(colours, pink)', 'B'],
      ['pets = ["cat", "dog", "fish", "bird"]. What does len(pets) return?', '', '', '', '', '4|four']
    ] },

  { key: 'g8-9.1-6', grade: '8', unit: U1, order: 6, title: 'Combining sequence, selection and iteration',
    bookRef: B + 'Unit 9.1, pp. 40–47',
    objectives: [
      'Create an algorithm using sequence, selection and count-controlled iteration together',
      'Follow flowchart or pseudocode algorithms that use loops',
      'Convert a combined algorithm into Python'
    ],
    explanation: [
      'Every program is built from three **programming constructs**:',
      '- **Sequence** — instructions run in order',
      '- **Selection** — choosing a path with IF/ELSE',
      '- **Iteration** — repeating with a loop',
      '',
      'Powerful programs combine all three. For example, a chatbot that suggests activities:',
      '1. (sequence) Greet the user',
      '2. (iteration) FOR each activity in the array…',
      '3. (selection) …IF the activity matches the user\'s interest THEN suggest it',
      '',
      'In pseudocode: `FOR each colour IN ARRAY rainbow` … `NEXT`. In a flowchart, a loop is shown by an arrow that goes **back up** to an earlier step, with a decision checking whether the count has been reached.'
    ],
    syntax: ['for item in array:', '    if condition:', '        ...', '    else:', '        ...'],
    example: ['activities = ["Swimming", "Football", "Chess", "Canoeing"]', 'water = ["Swimming", "Canoeing"]', 'likes_water = input("Do you like water? (yes/no) ").lower() == "yes"', '', 'for activity in activities:', '    if activity in water and likes_water:', '        print("Try", activity)', '    elif activity not in water and not likes_water:', '        print("Try", activity)'],
    note: '`in` checks whether a value is inside a list: `"Chess" in water` is False.',
    questions: [
      ['What are the three basic programming constructs?', 'Input, output, storage', 'Sequence, selection and iteration', 'Loops, lists and libraries', 'Bits, bytes and nibbles', 'B'],
      ['Which construct makes a choice between paths?', 'Sequence', 'Selection', 'Iteration', 'Variable', 'B'],
      ['In a flowchart, how is iteration shown?', 'An arrow that goes back to an earlier step', 'A parallelogram', 'A double-sided rectangle', 'A dotted line', 'A'],
      ['water = ["Swimming", "Canoeing"]. Is "Chess" in water True or False?', 'True', 'False', 'Error', 'None', 'B'],
      ['Which construct repeats instructions?', '', '', '', '', 'iteration|loop|loops']
    ] },

  { key: 'g8-9.1-7', grade: '8', unit: U1, order: 7, title: 'Syntax, runtime and logic errors; test plans',
    bookRef: B + 'Unit 9.1, pp. 46–48',
    objectives: [
      'Explain the difference between syntax, runtime and logic errors',
      'Read a traceback message to find an error',
      'Test a program with normal, extreme and invalid data'
    ],
    explanation: [
      '### Three types of error',
      '- **Syntax error** — the code breaks the rules of the language (missing colon, bracket or quotation mark). It is found **as soon as you try to run** the program; nothing runs.',
      '- **Runtime error** — the program starts but **crashes part-way through**, e.g. dividing by zero, `int("abc")`, or an index that does not exist. Python shows a **traceback** naming the line and the error type.',
      '- **Logic error** — the program runs to the end but the output is **wrong**. Only careful testing finds it.',
      '',
      '### Test plan with three kinds of data',
      'For a program that accepts 1–10:',
      '- **Normal:** 5',
      '- **Extreme:** 1 and 10 (the boundaries)',
      '- **Invalid:** 0, 11, "seven"'
    ],
    syntax: ['Traceback (most recent call last):', '  File "chatbot.py", line 9, in <module>', 'ValueError: invalid literal for int() with base 10: \'seven\''],
    example: ['# Syntax error:  print("Hello"      -> missing )', '# Runtime error: number = int("seven")  -> ValueError', '# Logic error:   average = a + b / 2   -> should be (a + b) / 2', '', 'a = 6', 'b = 10', 'average = (a + b) / 2', 'print(average)   # 8.0'],
    note: 'Read a traceback from the **bottom up**: the last line gives the error type, the line above tells you where.',
    questions: [
      ['A program crashes halfway through with a ValueError. What type of error is this?', 'Syntax error', 'Runtime error', 'Logic error', 'No error', 'B'],
      ['average = a + b / 2 gives the wrong answer. What type of error is this?', 'Syntax error', 'Runtime error', 'Logic error', 'Hardware error', 'C'],
      ['A missing colon after an if statement causes which type of error?', 'Syntax error', 'Runtime error', 'Logic error', 'None', 'A'],
      ['A program accepts 1–10. Which value is invalid test data?', '1', '5', '10', '11', 'D'],
      ['What is the message Python shows when a runtime error happens called?', '', '', '', '', 'traceback|a traceback|traceback message']
    ] },

  { key: 'g8-9.1-8', grade: '8', unit: U1, order: 8, title: 'String manipulation',
    bookRef: B + 'Unit 9.1, pp. 49–53',
    objectives: [
      'Develop Python programs using string manipulation: length, uppercase and lowercase',
      'Make user input easier to compare',
      'Loop through two arrays together with zip()'
    ],
    explanation: [
      '**String manipulation** means changing or examining text.',
      '',
      '- `len(text)` — number of characters, including spaces',
      '- `text.upper()` — converts to UPPERCASE',
      '- `text.lower()` — converts to lowercase',
      '- `text.title()` — Capitalises Each Word',
      '- `text[0]` — the first character',
      '',
      '### Why it matters',
      'Users type in different ways: "Swimming", "SWIMMING", "swimming". Converting input with `.lower()` before comparing means all three are accepted.',
      '',
      '### zip()',
      '`zip(list1, list2)` pairs up items from two arrays so one loop can use both: `for name, subject in zip(names, subjects):`'
    ],
    syntax: ['len(string)', 'string.upper()', 'string.lower()', 'for a, b in zip(list1, list2):'],
    example: ['activity = input("Enter an activity: ").lower()', 'print("You typed", len(activity), "characters")', 'print("Shouting it:", activity.upper())', '', 'names = ["An", "Binh", "Chi"]', 'subjects = ["Maths", "Art", "Computing"]', 'for name, subject in zip(names, subjects):', '    print(name, "likes", subject)'],
    note: 'String methods return a **new** string. `text.upper()` alone does nothing unless you print it or store it: `text = text.upper()`.',
    questions: [
      ['What does len("Hello") return?', '4', '5', '6', 'Hello', 'B'],
      ['What does "Python".upper() return?', 'python', 'PYTHON', 'Python', 'pYTHON', 'B'],
      ['Why convert user input with .lower() before comparing?', 'So answers typed in any capitals are accepted', 'To make the program slower', 'To delete the input', 'To encrypt it', 'A'],
      ['What does zip(names, subjects) do?', 'Pairs up items from the two lists so one loop can use both', 'Compresses the lists', 'Deletes both lists', 'Sorts the lists', 'A'],
      ['What does len("Hi there") return? (spaces count)', '', '', '', '', '8|eight']
    ] },

  /* ======================= UNIT 9.2 ======================= */
  { key: 'g8-9.2-1', grade: '8', unit: U2, order: 1, title: 'Network topologies: bus, ring and star',
    bookRef: B + 'Unit 9.2, pp. 55–63',
    objectives: [
      'Explain how bus, ring and star topologies transfer information between devices',
      'Compare the advantages and disadvantages of each topology',
      'Choose a suitable topology for a scenario'
    ],
    explanation: [
      'A **topology** is the layout of how devices in a network are connected.',
      '',
      '### Bus',
      'All devices connect to one main cable (the **backbone**) with a **terminator** at each end. Data travels along the cable in both directions.',
      '+ cheap, little cable · − if the backbone breaks the whole network fails; slows down with heavy traffic; data collisions',
      '',
      '### Ring',
      'Each device connects to two others, forming a circle. Data travels **one way** around the ring, passing through each device.',
      '+ no collisions, works well under heavy load · − one broken device or cable can stop the whole ring; adding devices disrupts the network',
      '',
      '### Star',
      'Every device has its own cable to a central **switch**.',
      '+ reliable — if one cable fails only that device is affected; easy to add devices; fast · − more cable; if the central switch fails, the whole network fails',
      '',
      'Most modern school and office LANs use a **star** topology.'
    ],
    example: ['Bus:   [PC]--[PC]--[PC]--[PC]   (one backbone cable)', 'Ring:  PC -> PC -> PC -> PC -> back to the first PC', 'Star:        PC', '         PC - SWITCH - PC', '              PC'],
    note: 'Exam tip: always say **what happens when something fails** — that is the biggest difference between the topologies.',
    questions: [
      ['In which topology does every device connect to a central switch?', 'Bus', 'Ring', 'Star', 'Mesh', 'C'],
      ['What happens in a bus topology if the main cable breaks?', 'Only one device stops', 'The whole network fails', 'Nothing', 'It gets faster', 'B'],
      ['In a ring topology, how does data travel?', 'In one direction around the ring through each device', 'Directly to a central switch', 'Randomly', 'Only by Wi-Fi', 'A'],
      ['Which is a disadvantage of a star topology?', 'If the central switch fails, the network fails', 'It has no cables', 'Adding devices is impossible', 'Data collisions on the backbone', 'A'],
      ['What is placed at each end of a bus backbone cable?', '', '', '', '', 'terminator|terminators|a terminator']
    ] },

  { key: 'g8-9.2-2', grade: '8', unit: U2, order: 2, title: 'Protocols, packets and IP addresses',
    bookRef: B + 'Unit 9.2, pp. 64–66',
    objectives: [
      'Explain the role of protocols in data transmission',
      'Describe what a data packet contains',
      'Describe common protocols such as TCP/IP, HTTP and HTTPS'
    ],
    explanation: [
      'A **protocol** is a set of **rules** that devices agree to follow so they can communicate, whatever company made them. Without shared protocols, a phone from one maker could not talk to a server from another.',
      '',
      '### Packets',
      'Large files are split into small **packets**. Each packet contains:',
      '- **Header:** sender\'s IP address, receiver\'s IP address, packet number (and how many packets in total)',
      '- **Payload:** the actual piece of data',
      '- **Trailer:** an error check and an "end of packet" marker',
      '',
      'Packets may take different routes and arrive out of order; the packet numbers let the receiver put them back together.',
      '',
      '### Common protocols',
      '- **TCP/IP** — splits data into packets, addresses and routes them across the internet, and reassembles them',
      '- **HTTP** — lets web browsers request web pages from web servers',
      '- **HTTPS** — HTTP with encryption (secure)',
      '- **FTP** — transfers files · **SMTP/IMAP** — send and receive email'
    ],
    example: ['Packet 3 of 12', '  Header:  from 83.23.55.31  to 142.250.66.78  | packet 3/12', '  Payload: ...part of the photo...', '  Trailer: error check value | END'],
    note: 'IP addresses are like postal addresses for devices; protocols are like the agreed format for writing a letter.',
    questions: [
      ['What is a protocol?', 'A set of rules that devices follow to communicate', 'A type of cable', 'A computer virus', 'A network topology', 'A'],
      ['What does a packet header contain?', 'The sender and receiver IP addresses and the packet number', 'Only the data', 'The user\'s password', 'A picture', 'A'],
      ['Why do packets have numbers?', 'So the receiver can put them back in the right order', 'To make them larger', 'To encrypt them', 'They are not numbered', 'A'],
      ['Which protocol encrypts web traffic between a browser and a server?', 'HTTP', 'HTTPS', 'FTP', 'SMTP', 'B'],
      ['Data is split into small units called ___ before being sent across a network.', '', '', '', '', 'packets|packet|data packets']
    ] },

  { key: 'g8-9.2-3', grade: '8', unit: U2, order: 3, title: 'Scalability in network design',
    bookRef: B + 'Unit 9.2, pp. 67–70',
    objectives: [
      'Explain what scalability factors are and how they can affect a network',
      'Explain why scalability should be considered when designing a network',
      'Describe how networks can be designed to scale up'
    ],
    explanation: [
      '**Scalability** is how easily a network can grow (more users, devices, data or locations) without losing performance.',
      '',
      '### Scalability factors',
      '- Number of **users and devices**',
      '- Amount of **data traffic** and bandwidth needed',
      '- **Storage** space on servers',
      '- **Physical space** and cabling',
      '- **Cost** of upgrades',
      '- **Security** — more users means more accounts and more risk',
      '',
      'If a network is not designed to scale, it becomes slow, unreliable, or important files cannot be accessed at busy times — a serious problem in a hospital or bank.',
      '',
      '### Designing to scale up',
      '- Use a **star** topology with switches that have spare ports',
      '- Buy servers and routers that can be upgraded',
      '- Use **cloud** storage that grows as needed',
      '- Use a network operating system to manage users and resources centrally'
    ],
    example: ['Year 1: 30 staff, 1 switch (48 ports), 1 file server', 'Year 3: 90 staff -> add a second switch, expand cloud storage, upgrade internet bandwidth'],
    note: 'Planning for growth at the start is usually cheaper than rebuilding the network later.',
    questions: [
      ['What is scalability?', 'How easily a network can grow without losing performance', 'How fast the CPU is', 'The size of the monitor', 'The number of passwords', 'A'],
      ['Which is a scalability factor?', 'The number of users and devices', 'The colour of the cables', 'The name of the company', 'The weather', 'A'],
      ['Why is a star topology good for scalability?', 'New devices can be added to the switch without disrupting others', 'It has no switch', 'It uses one cable for everything', 'It cannot grow', 'A'],
      ['What might happen if a network cannot scale?', 'It becomes slow and unreliable as more users join', 'It becomes faster', 'It uses less electricity', 'Nothing', 'A'],
      ['Which type of storage can grow easily as an organisation needs more space?', '', '', '', '', 'cloud|cloud storage']
    ] },

  { key: 'g8-9.2-4', grade: '8', unit: U2, order: 4, title: 'Parity bits and parity blocks',
    bookRef: B + 'Unit 9.2, pp. 71–73, 79–80',
    objectives: [
      'Explain what a parity bit is and its role in error detection',
      'Perform parity-bit calculations using even and odd parity',
      'Use a parity block to identify the position of an error'
    ],
    explanation: [
      'Devices agree to use **even** or **odd** parity.',
      '',
      '### Parity bit',
      'One bit of each byte is a **parity bit**, set to 0 or 1 so that the total number of 1s is:',
      '- **Even parity:** an even number (0, 2, 4, 6 or 8)',
      '- **Odd parity:** an odd number (1, 3, 5 or 7)',
      '',
      'Example (even parity, parity bit first): data `1001100` has three 1s → parity bit = **1** → byte `11001100` (four 1s).',
      '',
      'If the receiver counts the wrong kind of total, the byte contains an error and is sent again.',
      '',
      '### Limitation',
      'If **two** bits flip, the count stays even (or odd) and the error is not detected.',
      '',
      '### Parity block',
      'Several bytes are sent together as a block, with parity bits for every **row** *and* every **column** (a parity byte at the end). If one row and one column both have the wrong parity, the error is at the bit where they **cross** — so it can be found and corrected.'
    ],
    syntax: ['Even parity: total number of 1s must be even', 'Odd parity:  total number of 1s must be odd'],
    example: ['def even_parity_bit(bits):', '    ones = bits.count("1")', '    return "0" if ones % 2 == 0 else "1"', '', 'data = "1001100"', 'p = even_parity_bit(data)', 'print("Byte sent:", p + data)   # 11001100'],
    note: 'Count the 1s carefully — this is where most marks are lost.',
    questions: [
      ['Using even parity, which byte has been received correctly?', '01010101', '01010100', '11100000', '00000001', 'A'],
      ['Even parity. The 7 data bits are 1101000. What should the parity bit be?', '0', '1', '2', '7', 'B'],
      ['Odd parity. Which byte contains an error?', '00000111', '10000000', '11000000', '11111110', 'C'],
      ['Why can a parity check miss an error?', 'If two bits flip, the number of 1s stays even (or odd)', 'Parity checks never miss errors', 'It only checks letters', 'It only works on Wi-Fi', 'A'],
      ['In a parity block, the error is found where an incorrect row and an incorrect ___ cross.', '', '', '', '', 'column']
    ] },

  { key: 'g8-9.2-5', grade: '8', unit: U2, order: 5, title: 'Securing information on a network',
    bookRef: B + 'Unit 9.2, pp. 74–78',
    objectives: [
      'Describe security methods such as firewalls, biometrics, access levels and encryption',
      'Explain how machine learning helps detect threats',
      'Explain the choices made when securing data, including cost, accessibility and how sensitive the data is'
    ],
    explanation: [
      'Data on a network can be very valuable, so organisations protect it in layers.',
      '',
      '### Security methods',
      '- **Firewall** — examines incoming and outgoing traffic against rules and blocks anything not allowed',
      '- **User names, passwords and access levels** — users only see what their job needs',
      '- **Biometrics** — fingerprint, face or iris scans; hard to copy or forget',
      '- **Two-factor authentication** — password plus a code sent to a phone',
      '- **Encryption** — stolen data cannot be read without the key',
      '- **Machine learning** — security software learns what normal traffic looks like and flags unusual behaviour (e.g. logins from a new country at 3 am)',
      '',
      '### Making choices',
      'More security is not always better. Consider:',
      '- **Cost** — biometric scanners and expert staff are expensive',
      '- **Accessibility** — very strict security can stop staff getting data quickly (a doctor in an emergency)',
      '- **Sensitivity of the dataset** — public timetables need little protection; medical or bank records need the strongest'
    ],
    example: ['Dataset                  Sensitivity   Suitable protection', 'School lunch menu        Low           Read-only shared folder', 'Student grades           Medium        Passwords + access levels', 'Bank customer accounts   High          Encryption + biometrics + 2FA + firewall'],
    note: 'Good answers match the protection to the **value and sensitivity** of the data, and mention a trade-off.',
    questions: [
      ['What is biometric security?', 'Using a body feature such as a fingerprint to identify a user', 'A strong password', 'A type of cable', 'Backing up data', 'A'],
      ['Why might very strict security be a problem in a hospital?', 'Staff may not be able to access data quickly in an emergency', 'It makes data public', 'It is always free', 'It speeds up computers', 'A'],
      ['How does machine learning help network security?', 'It learns normal behaviour and flags unusual activity', 'It deletes all data', 'It replaces passwords with nothing', 'It turns off the firewall', 'A'],
      ['Which dataset needs the strongest protection?', 'A school lunch menu', 'Customer bank account details', 'A public bus timetable', 'A list of club meeting days', 'B'],
      ['Which security method requires a password plus a second code, such as one sent to a phone? (abbreviation or full name)', '', '', '', '', '2FA|two-factor authentication|two factor authentication|2fa|two-step verification']
    ] },

  /* ======================= UNIT 9.3 ======================= */
  { key: 'g8-9.3-1', grade: '8', unit: U3, order: 1, title: 'Using the accelerometer as a game controller',
    bookRef: B + 'Unit 9.3, pp. 88–97',
    tryIt: MB,
    objectives: [
      'Follow and correct a pseudocode algorithm for a micro:bit game',
      'Use the accelerometer to detect gestures',
      'Download and test a program on the micro:bit'
    ],
    explanation: [
      'A **physical computing device** like the micro:bit can be part of a game, just like a games-console controller.',
      '',
      'The **accelerometer** measures movement and tilt in three directions (x, y, z). MicroPython can detect **gestures**:',
      '`"up"`, `"down"`, `"left"`, `"right"`, `"face up"`, `"face down"`, `"shake"`',
      '',
      '- `accelerometer.was_gesture("left")` → True if that gesture happened since the last check',
      '- `accelerometer.current_gesture()` → the gesture happening right now',
      '',
      'Plan in pseudocode first:',
      '`IF micro:bit moved to left THEN OUTPUT arrow W`'
    ],
    syntax: ['if accelerometer.was_gesture("left"):', '    display.show(Image.ARROW_W)'],
    example: ['from microbit import *', '', 'while True:', '    if accelerometer.was_gesture("left"):', '        display.show(Image.ARROW_W)', '    elif accelerometer.was_gesture("right"):', '        display.show(Image.ARROW_E)', '    elif accelerometer.was_gesture("shake"):', '        display.show(Image.SURPRISED)', '    sleep(200)'],
    note: 'Arrow images use compass directions: `ARROW_N` (up), `ARROW_S`, `ARROW_E` (right), `ARROW_W` (left).',
    questions: [
      ['What does the accelerometer measure?', 'Movement and tilt', 'Light level', 'Temperature', 'Sound', 'A'],
      ['Which code checks if the micro:bit was shaken?', 'button_a.is_pressed()', 'accelerometer.was_gesture("shake")', 'display.shake()', 'temperature()', 'B'],
      ['Which image shows an arrow pointing left?', 'Image.ARROW_N', 'Image.ARROW_E', 'Image.ARROW_W', 'Image.ARROW_S', 'C'],
      ['Why plan a micro:bit game in pseudocode first?', 'To work out the logic before writing exact code', 'Because the micro:bit runs pseudocode', 'It is not useful', 'To avoid testing', 'A'],
      ['Which gesture name detects the micro:bit being moved quickly back and forth?', '', '', '', '', 'shake']
    ] },

  { key: 'g8-9.3-2', grade: '8', unit: U3, order: 2, title: 'Arrays and random choices on the micro:bit',
    bookRef: B + 'Unit 9.3, pp. 98–103',
    tryIt: MB,
    objectives: [
      'Store game items in an array and access them by index',
      'Use the random library to select an item',
      'Test that random output is working'
    ],
    explanation: [
      'A "What am I?" guessing game needs a list of possible items. Store them in an **array** (list):',
      '`animals = ["cat", "dog", "owl"]` — index 0, 1, 2.',
      '',
      '### Random selection',
      'Import the **random** library:',
      '- `random.randint(0, 2)` → a random index from 0 to 2, then use `animals[index]`',
      '- `random.choice(animals)` → picks a random item directly',
      '',
      'Images can go in an array too: `images = [Image.DUCK, Image.GIRAFFE, Image.TORTOISE]` and `display.show(random.choice(images))`.',
      '',
      '### Testing randomness',
      'Shake the micro:bit 10 times and record each output in a table. Over many tries every item should appear.'
    ],
    syntax: ['import random', 'item = random.choice(array_name)', 'index = random.randint(0, len(array_name) - 1)'],
    example: ['from microbit import *', 'import random', '', 'images = [Image.DUCK, Image.GIRAFFE, Image.TORTOISE, Image.RABBIT]', '', 'while True:', '    if accelerometer.was_gesture("shake"):', '        display.show(random.choice(images))', '        sleep(1500)', '        display.clear()'],
    note: 'The highest index is always `len(list) - 1`, because counting starts at 0.',
    questions: [
      ['animals = ["cat", "dog", "owl"]. What is the index of "owl"?', '1', '2', '3', '0', 'B'],
      ['What does random.choice(images) do?', 'Picks a random item from the list', 'Deletes a random item', 'Sorts the list', 'Shows every item', 'A'],
      ['Which line must come before using random.randint()?', 'import random', 'import radio', 'from random import microbit', 'random()', 'A'],
      ['A list has 5 items. What is the highest valid index?', '5', '4', '6', '0', 'B'],
      ['A numbered position of an item in an array is called its…', '', '', '', '', 'index']
    ] },

  { key: 'g8-9.3-3', grade: '8', unit: U3, order: 3, title: 'Count-controlled loops and trace tables on the micro:bit',
    bookRef: B + 'Unit 9.3, pp. 103–107',
    tryIt: MB,
    objectives: [
      'Use count-controlled loops in a MicroPython program',
      'Use a trace table to follow a loop',
      'Predict the output of a loop'
    ],
    explanation: [
      'A `for` loop on the micro:bit repeats a set number of times — great for times tables, countdowns or flashing lights.',
      '',
      '### Times table example',
      'Each time round the loop:',
      '1. the counter increases',
      '2. `answer = counter * table` is calculated',
      '3. the answer is scrolled on the display',
      '',
      '### Trace table',
      'A trace table shows the counter and the answer for each **iteration**, so you can predict exactly what will appear and spot errors (e.g. starting at 0 instead of 1).'
    ],
    syntax: ['for counter in range(start, stop):', '    ...'],
    example: ['from microbit import *', '', 'table = 3', 'for counter in range(1, 6):', '    answer = counter * table', '    display.scroll(answer)', '    sleep(300)', '', '# Trace table:', '# counter | answer | display', '#    1    |   3    |   3', '#    2    |   6    |   6', '#    3    |   9    |   9', '#    4    |  12    |  12', '#    5    |  15    |  15'],
    note: 'For a countdown, use a negative step: `range(5, 0, -1)` gives 5, 4, 3, 2, 1.',
    questions: [
      ['How many times does for counter in range(1, 6): repeat?', '4', '5', '6', '1', 'B'],
      ['table = 4. In the 3rd iteration of range(1, 6), what is counter * table?', '8', '12', '16', '3', 'B'],
      ['What values does range(5, 0, -1) produce?', '5, 4, 3, 2, 1', '0, 1, 2, 3, 4', '5, 4, 3, 2, 1, 0', '1, 2, 3, 4, 5', 'A'],
      ['Why use a trace table for a loop?', 'To see the value of each variable on every iteration', 'To speed up the micro:bit', 'To draw an image', 'To connect to radio', 'A'],
      ['table = 2. What is the last value displayed by: for c in range(1, 4): display.scroll(c * table)', '', '', '', '', '6|six']
    ] },

  { key: 'g8-9.3-4', grade: '8', unit: U3, order: 4, title: 'Sound output: speech and music',
    bookRef: B + 'Unit 9.3, pp. 108–116',
    tryIt: MB,
    objectives: [
      'Output speech and music using the micro:bit buzzer or speaker',
      'Store notes or words in an array and play them in a loop',
      'Convert a number to a string so it can be spoken'
    ],
    explanation: [
      'The micro:bit can make sounds through its built-in speaker (V2) or a buzzer/headphones on pin 0.',
      '',
      '### Speech',
      '`import speech` then `speech.say("Go")`. Speech needs **text**, so convert numbers: `speech.say(str(number))`.',
      '',
      '### Music',
      '`import music` then `music.play(tune)`.',
      '- Built-in tunes: `music.BIRTHDAY`, `music.POWER_UP`, `music.POWER_DOWN`',
      '- Your own tune: a list of notes like `"C4:4"` — letter, **octave**, then **duration**.',
      '',
      '### Loops and arrays',
      'Store each line of a tune in an array and play it with a loop. A trace table shows which line plays on each iteration.'
    ],
    syntax: ['import music', 'music.play(["C4:4", "E4:4", "G4:8"])', '', 'import speech', 'speech.say(str(number))'],
    example: ['from microbit import *', 'import music', 'import speech', '', 'for n in range(3, 0, -1):', '    display.show(n)', '    speech.say(str(n))', '    sleep(500)', 'speech.say("Go")', '', 'correct_tune = ["C4:2", "E4:2", "G4:4"]', 'music.play(correct_tune)'],
    note: '`speech.say(3)` causes an error; `speech.say(str(3))` works.',
    questions: [
      ['Which library plays tunes on the micro:bit?', 'speech', 'music', 'radio', 'random', 'B'],
      ['Why is str() needed in speech.say(str(score))?', 'speech.say() needs text, not a number', 'To make it louder', 'To delete the score', 'It is not needed', 'A'],
      ['In the note "C4:4", what does the 4 after the colon mean?', 'The duration', 'The volume', 'The octave', 'The speed of the CPU', 'A'],
      ['Which built-in tune plays "Happy Birthday"?', 'music.BIRTHDAY', 'music.POWER_UP', 'music.BIRTH', 'music.SONG', 'A'],
      ['Which function converts the number 5 to the string "5"? Type it without the 5.', '', '', '', '', 'str()|str']
    ] },

  { key: 'g8-9.3-5', grade: '8', unit: U3, order: 5, title: 'Building and testing a "What am I?" game',
    bookRef: B + 'Unit 9.3, pp. 116–128',
    tryIt: MB,
    objectives: [
      'Create an algorithm that combines arrays, loops and selection',
      'Design a custom image using a grid',
      'Test a game with a test plan and evaluate it'
    ],
    explanation: [
      'The final game combines everything:',
      '- an **array** of images',
      '- **selection**: IF button A is pressed THEN show a random image',
      '- a **loop** to keep the game running or to give the player a set number of rounds',
      '- **sound** for correct/incorrect answers',
      '',
      '### Custom images',
      'Plan a question mark on a 5 × 5 grid, then write it as `Image("09990:00090:00900:00000:00900")` and add it to the array.',
      '',
      '### Test plan',
      'Test each input: press A → random image shown; press B → question mark shown; shake → screen clears. Record expected and actual results.',
      '',
      '### Challenge: a time limit',
      'Use `running_time()` (milliseconds since start) to end the game after, say, 30 seconds.'
    ],
    syntax: ['question = Image("09990:00090:00900:00000:00900")', 'start = running_time()', 'while running_time() - start < 30000:'],
    example: ['from microbit import *', 'import random', '', 'question = Image("09990:00090:00900:00000:00900")', 'images = [Image.DUCK, Image.GIRAFFE, Image.TORTOISE, question]', 'score = 0', 'start = running_time()', '', 'while running_time() - start < 30000:', '    if button_a.was_pressed():', '        display.show(random.choice(images))', '    if button_b.was_pressed():', '        score = score + 1', '        display.clear()', 'display.scroll("Score " + str(score))'],
    note: 'Use `was_pressed()` instead of `is_pressed()` so one press counts only once.',
    questions: [
      ['Which constructs does the final game combine?', 'Only sequence', 'Arrays, loops and selection', 'Only loops', 'Only variables', 'B'],
      ['What does running_time() return?', 'The number of milliseconds since the micro:bit started', 'The current date', 'The battery level', 'The temperature', 'A'],
      ['30 seconds is how many milliseconds?', '300', '3,000', '30,000', '300,000', 'C'],
      ['Why use button_a.was_pressed() instead of is_pressed() for scoring?', 'Each press is counted only once', 'It is faster to type', 'It turns off the display', 'It plays music', 'A'],
      ['In a micro:bit Image string, which digit turns an LED off?', '', '', '', '', '0|zero']
    ] },

  /* ======================= UNIT 9.4 ======================= */
  { key: 'g8-9.4-1', grade: '8', unit: U4, order: 1, title: 'Operating systems and utility programs',
    bookRef: B + 'Unit 9.4, pp. 129–135',
    objectives: [
      'Explain which tasks an operating system carries out',
      'Describe utility programs including drivers, security software and defragmentation',
      'Explain why defragmentation speeds up a hard disk'
    ],
    explanation: [
      '### Operating system tasks',
      '- Provides the **user interface**',
      '- **Memory management** — allocates RAM to programs',
      '- **Process management / multitasking** — shares CPU time',
      '- **File management** — folders, saving, permissions',
      '- **Peripheral management** — uses drivers to talk to devices',
      '- **Security** — user accounts and passwords',
      '',
      '### Utility programs',
      '- **Device drivers** — translate between the OS and a specific piece of hardware (printer, graphics card)',
      '- **Security software** — antivirus, anti-spyware, firewall',
      '- **Defragmentation** — on a magnetic hard disk, files get split into pieces (**fragments**) scattered across the disk. Defragmenting moves the pieces so each file is stored together; the read head moves less, so files open faster and free space is grouped together.',
      '- Backup and compression utilities'
    ],
    example: ['Before defrag:  [A1][B1][A2][free][B2][A3]', 'After defrag:   [A1][A2][A3][B1][B2][free]'],
    note: 'SSDs (solid state drives) have no moving parts, so they should **not** be defragmented.',
    questions: [
      ['Which is a task of the operating system?', 'Memory management', 'Writing essays', 'Editing photos', 'Browsing websites', 'A'],
      ['What does a device driver do?', 'Lets the operating system communicate with a specific hardware device', 'Drives a car', 'Removes viruses', 'Compresses files', 'A'],
      ['What does defragmentation do?', 'Reorganises file fragments so each file is stored together', 'Deletes files', 'Encrypts files', 'Adds more RAM', 'A'],
      ['Why should an SSD not be defragmented?', 'It has no moving parts, so it does not speed it up', 'It is too small', 'It has no files', 'It is a network', 'A'],
      ['Sharing CPU time between several running programs is called multi___. Type the missing word.', '', '', '', '', 'tasking']
    ] },

  { key: 'g8-9.4-2', grade: '8', unit: U4, order: 2, title: 'Digitising sound',
    bookRef: B + 'Unit 9.4, pp. 136–137',
    objectives: [
      'Explain how analogue sound is digitised',
      'Explain sample rate and bit depth',
      'Describe how sample rate and bit depth affect quality and file size'
    ],
    explanation: [
      'Sound in the real world is an **analogue** wave. Computers store sound as **digital** binary numbers.',
      '',
      '### How sound is digitised',
      '1. A microphone turns the sound wave into an electrical signal.',
      '2. An **ADC (analogue-to-digital converter)** measures the height (amplitude) of the wave at fixed intervals. Each measurement is a **sample**.',
      '3. Each sample is stored as a binary number.',
      '',
      '### Key terms',
      '- **Sample rate** — samples taken per second, measured in hertz (Hz). CD quality is 44,100 Hz.',
      '- **Bit depth** — number of bits used to store each sample (e.g. 16 bits).',
      '',
      'Higher sample rate and higher bit depth → the digital sound is **closer to the original** (better quality) but the **file is bigger**.',
      '',
      '**File size (bits) = sample rate × bit depth × seconds** (× channels for stereo).'
    ],
    syntax: ['file size (bits) = sample rate × bit depth × duration (s) × channels'],
    example: ['sample_rate = 44100   # Hz', 'bit_depth = 16', 'seconds = 10', 'bits = sample_rate * bit_depth * seconds', 'print(bits / 8 / 1000, "kilobytes")   # 882.0 kilobytes (mono)'],
    note: 'A **DAC** (digital-to-analogue converter) does the reverse so speakers can play the sound.',
    questions: [
      ['What does an ADC do?', 'Converts an analogue signal into digital data', 'Plays music', 'Encrypts sound', 'Stores files in the cloud', 'A'],
      ['What is the sample rate?', 'The number of samples taken per second', 'The volume of the sound', 'The number of speakers', 'The length of the song', 'A'],
      ['What happens when the bit depth increases?', 'Better quality and a bigger file', 'Worse quality and a smaller file', 'No change', 'The sound becomes analogue', 'A'],
      ['What unit is sample rate measured in?', 'Bytes', 'Hertz (Hz)', 'Pixels', 'Metres', 'B'],
      ['A single measurement of a sound wave\'s height is called a…', '', '', '', '', 'sample']
    ] },

  { key: 'g8-9.4-3', grade: '8', unit: U4, order: 3, title: 'Storage units and conversions',
    bookRef: B + 'Unit 9.4, pp. 138–139',
    objectives: [
      'Name storage units from bit to petabyte in order',
      'Convert between storage units',
      'Calculate how much storage a set of files needs'
    ],
    explanation: [
      '- **bit** — a single 0 or 1 (binary digit)',
      '- **nibble** — 4 bits',
      '- **byte** — 8 bits (enough for one character)',
      '',
      'Then each unit is **1000** times the one before (as used in the Student\'s Book):',
      '- 1 **kilobyte** (KB) = 1000 bytes',
      '- 1 **megabyte** (MB) = 1000 KB',
      '- 1 **gigabyte** (GB) = 1000 MB',
      '- 1 **terabyte** (TB) = 1000 GB',
      '- 1 **petabyte** (PB) = 1000 TB',
      '',
      '### Converting',
      '- To a **bigger** unit → **divide** by 1000 (2400 bytes = 2.4 KB)',
      '- To a **smaller** unit → **multiply** by 1000 (3 GB = 3000 MB)',
      '',
      'Bits ↔ bytes: divide or multiply by **8**.'
    ],
    syntax: ['smaller unit -> bigger unit: ÷ 1000', 'bigger unit -> smaller unit: × 1000', 'bits -> bytes: ÷ 8'],
    example: ['song_mb = 3            # a 3-minute MP3 at 1 MB per minute', 'songs = 500', 'total_mb = song_mb * songs', 'print(total_mb / 1000, "GB")   # 1.5 GB'],
    note: 'Some computers use 1024 instead of 1000 (binary prefixes). Use 1000 unless a question tells you otherwise.',
    questions: [
      ['How many bits are in a byte?', '4', '8', '10', '1000', 'B'],
      ['Which unit is the largest?', 'Gigabyte', 'Megabyte', 'Petabyte', 'Terabyte', 'C'],
      ['What is 2400 bytes in kilobytes?', '24 KB', '2.4 KB', '240 KB', '0.24 KB', 'B'],
      ['What is 3 GB in megabytes?', '300 MB', '3000 MB', '30 MB', '0.003 MB', 'B'],
      ['How many bits are in a nibble?', '', '', '', '', '4|four']
    ] },

  { key: 'g8-9.4-4', grade: '8', unit: U4, order: 4, title: 'Programming languages and translators',
    bookRef: B + 'Unit 9.4, pp. 140–143',
    objectives: [
      'Describe machine code, assembly language and high-level languages',
      'Explain the different types of translator',
      'Describe the main characteristics of compilers and interpreters'
    ],
    explanation: [
      'The CPU can only run **machine code** — binary instructions.',
      '',
      '### Language levels',
      '- **Machine code** — binary (e.g. `10110000 01100001`). Runs directly; very hard for people to write.',
      '- **Assembly language** — short codes (mnemonics) such as `LDA`, `ADD`, `STO`. Each instruction matches one machine-code instruction. A **low-level** language.',
      '- **High-level languages (HLL)** — Python, Java, C#. Use English-like words; easy to read; one line can do many machine operations.',
      '',
      '### Translators',
      'Anything that is not machine code must be translated:',
      '- **Assembler** — assembly language → machine code',
      '- **Compiler** — translates the **whole program at once** into an executable file. Runs fast afterwards and the source code can be kept private, but errors are reported only after compiling the whole program.',
      '- **Interpreter** — translates and runs the program **one line at a time**. Stops at the first error, which makes debugging easier, but runs slower and needs the interpreter every time. (Python is usually interpreted.)'
    ],
    example: ['High-level (Python):   total = a + b', 'Assembly:              LDA a', '                        ADD b', '                        STO total', 'Machine code:          binary instructions the CPU runs'],
    note: 'Compiler = translate everything first, then run. Interpreter = translate a line, run it, repeat.',
    questions: [
      ['Which language can the CPU run directly?', 'Python', 'Assembly language', 'Machine code', 'Java', 'C'],
      ['What does an assembler do?', 'Translates assembly language into machine code', 'Translates Python line by line', 'Compresses files', 'Draws flowcharts', 'A'],
      ['Which translator converts the whole program at once into an executable file?', 'Interpreter', 'Compiler', 'Assembler', 'Debugger', 'B'],
      ['Which is an advantage of an interpreter?', 'It stops at the first error, making debugging easier', 'The program runs faster than compiled code', 'It produces an executable file', 'It needs no translator', 'A'],
      ['Short codes such as LDA and ADD are used in which language? (two words)', '', '', '', '', 'assembly language|assembly']
    ] },

  { key: 'g8-9.4-5', grade: '8', unit: U4, order: 5, title: 'The fetch–decode–execute cycle',
    bookRef: B + 'Unit 9.4, pp. 143–146',
    objectives: [
      'Explain how computers store lists of instructions to be run one at a time',
      'Explain the fetch–decode–execute cycle',
      'Trace the cycle for a short program'
    ],
    explanation: [
      'A program is stored in **RAM** as a list of instructions. The **CPU** runs them one at a time, repeating the **fetch–decode–execute cycle** billions of times a second.',
      '',
      '1. **Fetch** — the CPU gets the next instruction from RAM. The **program counter** holds the address of that instruction, then increases by 1 ready for the next one.',
      '2. **Decode** — the **control unit** works out what the instruction means.',
      '3. **Execute** — the instruction is carried out, e.g. the **ALU (arithmetic logic unit)** does a calculation, or data is moved to/from memory.',
      '',
      'Then the cycle repeats with the next instruction.',
      '',
      'A program to add two numbers and store the result needs three cycles: load the first number · add the second · store the result.',
      '',
      'The **clock speed** (e.g. 3 GHz) tells you how many cycles the CPU can perform each second.'
    ],
    example: ['Address  Instruction', '0        LOAD 10     <- cycle 1: fetch, decode, execute', '1        ADD 11      <- cycle 2', '2        STORE 12    <- cycle 3'],
    note: 'Remember the order with "**F**irst **D**o **E**verything": Fetch, Decode, Execute.',
    questions: [
      ['What is the correct order of the cycle?', 'Decode, fetch, execute', 'Fetch, decode, execute', 'Execute, fetch, decode', 'Fetch, execute, decode', 'B'],
      ['Where are program instructions fetched from?', 'RAM', 'The keyboard', 'The monitor', 'The printer', 'A'],
      ['Which part of the CPU carries out calculations?', 'Control unit', 'ALU (arithmetic logic unit)', 'Program counter', 'Hard disk', 'B'],
      ['What does the program counter hold?', 'The address of the next instruction', 'The answer to a calculation', 'The user\'s password', 'The clock speed', 'A'],
      ['In which stage does the control unit work out what an instruction means?', '', '', '', '', 'decode|decoding']
    ] },

  { key: 'g8-9.4-6', grade: '8', unit: U4, order: 6, title: 'Logic circuits and Boolean expressions',
    bookRef: B + 'Unit 9.4, pp. 147–149',
    objectives: [
      'Draw logic circuits for Boolean expressions',
      'Write a Boolean expression from a real-life rule',
      'Complete a truth table for a circuit with more than one gate'
    ],
    explanation: [
      'Logic gates can be joined together to make **logic circuits** that follow more complex rules.',
      '',
      '### From a rule to a Boolean expression',
      '"A student can go on the trip if they are in **Stage 9 (A)**, OR if they are in **Stage 8 (B) AND have special permission (C)**."',
      '',
      '**Z = A OR (B AND C)**',
      '',
      'To draw the circuit: B and C go into an **AND** gate; its output and A go into an **OR** gate; the OR gate gives output Z.',
      '',
      '### Truth table',
      'With three inputs there are **2³ = 8** rows. Work out the bracket first (B AND C), then the final gate.'
    ],
    syntax: ['Z = A OR (B AND C)', 'Python: z = a or (b and c)'],
    example: ['for a in (0, 1):', '    for b in (0, 1):', '        for c in (0, 1):', '            z = a or (b and c)', '            print(a, b, c, "->", int(bool(z)))'],
    note: 'Always work out the part in **brackets** first, just like BIDMAS in maths.',
    questions: [
      ['Z = A OR (B AND C). A = 0, B = 1, C = 1. What is Z?', '0', '1', '2', 'It cannot be worked out', 'B'],
      ['Z = A OR (B AND C). A = 0, B = 1, C = 0. What is Z?', '0', '1', '2', 'None', 'A'],
      ['How many rows does a truth table with 3 inputs have?', '3', '4', '6', '8', 'D'],
      ['"The alarm sounds if the door is open AND the alarm is set." Which gate?', 'OR', 'AND', 'NOT', 'None', 'B'],
      ['Z = NOT A. A = 1. What is Z?', '', '', '', '', '0|zero']
    ] },

  { key: 'g8-9.4-7', grade: '8', unit: U4, order: 7, title: 'Machine learning and computerisation in industry',
    bookRef: B + 'Unit 9.4, pp. 150–153',
    objectives: [
      'Describe what is meant by machine learning',
      'Identify applications and scenarios where machine learning is used',
      'Explain the benefits and risks of computerising tasks in industry and manufacturing'
    ],
    explanation: [
      '**Machine learning (ML)** is a type of AI where a program improves at a task by finding patterns in data, rather than following rules a programmer wrote.',
      '',
      '### Where ML is used',
      'Digital assistants understanding speech · face recognition · product and video recommendations · fraud detection in banks · medical scan analysis · predictive text · self-driving vehicles.',
      '',
      '### Computerisation in industry',
      'Many tasks once done by people are now done by computers and robots: car assembly lines, warehouse picking, online banking, self-service checkouts.',
      '',
      '**Benefits:** faster, more accurate, works 24/7, cheaper over time, robots do dangerous or repetitive jobs, better global communication.',
      '',
      '**Risks:** some jobs disappear and workers need retraining, high set-up cost, reliance on technology (failures stop production), cyber-attacks, privacy concerns about collected data.'
    ],
    example: ['Before: workers check every product by eye for faults', 'After:  a camera + ML model spots faulty products in milliseconds', 'Benefit: faster and consistent | Risk: inspectors need new roles'],
    note: 'Balanced answers give at least one **benefit** and one **risk**, each linked to the scenario.',
    questions: [
      ['What is machine learning?', 'A program improving at a task by finding patterns in data', 'Fixing broken machines', 'Typing quickly', 'A kind of keyboard', 'A'],
      ['Which is an example of machine learning?', 'A video app recommending videos based on what you watched', 'A light switch', 'A paper map', 'A calculator adding numbers', 'A'],
      ['Which is a benefit of computerisation in manufacturing?', 'Robots can work 24 hours a day', 'Workers always keep the same jobs', 'There is no set-up cost', 'Systems never fail', 'A'],
      ['Which is a risk of computerisation?', 'Some jobs may be lost', 'Products are made faster', 'Fewer mistakes are made', 'Dangerous jobs are done by robots', 'A'],
      ['Machine learning is a branch of which wider area of computing? (two-letter abbreviation)', '', '', '', '', 'AI|ai|artificial intelligence']
    ] },

  { key: 'g8-9.4-8', grade: '8', unit: U4, order: 8, title: 'Designing digital devices: user experience and accessibility',
    bookRef: B + 'Unit 9.4, pp. 154–157',
    objectives: [
      'Identify improvements to the design of a digital device based on prototypes',
      'Explain why user experience, accessibility, ergonomics and emerging technologies matter in design',
      'Evaluate a device design'
    ],
    explanation: [
      'Designers build **prototypes** — early versions — and test them with real users before the final product is released.',
      '',
      '### Design factors',
      '- **User experience (UX)** — is it easy, quick and pleasant to use?',
      '- **Accessibility** — can everyone use it, including people with visual, hearing or movement impairments? (screen readers, captions, large text, voice control)',
      '- **Ergonomics** — is it comfortable and safe to use for long periods? (shape, weight, button size, posture)',
      '- **Emerging technologies** — could new tech improve it? (faster networks, AI, better batteries, flexible screens)',
      '',
      '### Improving from a prototype',
      'Watch users test it, collect feedback, list problems, then improve the design in the next version.'
    ],
    example: ['Prototype: school tablet app with small grey text', 'Feedback:  hard to read for some students', 'Improvement: larger text option, high contrast mode, read-aloud button (accessibility)'],
    note: 'Accessibility features usually help **everyone**, not only users with a disability (e.g. captions in a noisy room).',
    questions: [
      ['What does ergonomics focus on?', 'Comfort and safety when using a device', 'The price of the device', 'The internet speed', 'The colour of the logo', 'A'],
      ['Which is an accessibility feature?', 'A screen reader for visually impaired users', 'A faster processor', 'A bigger hard drive', 'A brighter logo', 'A'],
      ['Why test a prototype with real users?', 'To find problems and improve the design before release', 'To make the device more expensive', 'To skip the final design', 'Because prototypes are sold', 'A'],
      ['What does UX stand for?', 'User experience', 'Universal exit', 'Unit index', 'Upgrade extra', 'A'],
      ['Designing so that people with impairments can use a device is called…', '', '', '', '', 'accessibility|accessible design|inclusive design']
    ] },

  /* ======================= UNIT 9.5 ======================= */
  { key: 'g8-9.5-1', grade: '8', unit: U5, order: 1, title: 'Big Data and the 5 Vs',
    bookRef: B + 'Unit 9.5, pp. 160–165',
    objectives: [
      'Explain the term Big Data',
      'Describe Big Data using the 5 Vs',
      'Describe real-life applications of Big Data analytics'
    ],
    explanation: [
      '**Big Data** means data sets so large and complex that ordinary software such as a single spreadsheet cannot store or analyse them. Analysing it is called **Big Data analytics**.',
      '',
      '### The 5 Vs',
      '- **Volume** — the huge amount of data (terabytes, petabytes)',
      '- **Velocity** — the speed at which new data arrives and must be processed (e.g. live traffic data)',
      '- **Variety** — the range of formats: text, images, video, sensor readings, clicks',
      '- **Veracity** — how accurate and trustworthy the data is',
      '- **Value** — the usefulness of what can be learned from it',
      '',
      '### Applications',
      '- **Transport:** map apps choose routes that avoid traffic',
      '- **Delivery companies:** vehicle sensor data plans routes and predicts maintenance',
      '- **Healthcare:** search trends help predict where flu outbreaks may happen',
      '- **Streaming services:** viewing habits decide which programmes to make',
      '- **Mobile networks:** predict which customers may leave'
    ],
    example: ['Is a school\'s homework website data "Big Data"?', 'Volume: a few thousand records -> small', 'Velocity: updated a few times a day -> slow', 'Conclusion: probably not Big Data, but useful data'],
    note: 'Big Data raises **privacy** questions: people should know what data is collected about them and why.',
    questions: [
      ['What is Big Data?', 'Data sets too large and complex for ordinary software to process', 'Any spreadsheet', 'A large font size', 'A big hard drive', 'A'],
      ['Which V describes how fast new data arrives?', 'Volume', 'Velocity', 'Variety', 'Value', 'B'],
      ['Which V describes the different formats of data, such as video, text and sensor readings?', 'Variety', 'Veracity', 'Volume', 'Velocity', 'A'],
      ['How do map apps use Big Data?', 'To plan routes that avoid traffic', 'To print paper maps', 'To delete roads', 'To make phones heavier', 'A'],
      ['Which V describes the accuracy and quality of the data?', '', '', '', '', 'veracity']
    ] },

  { key: 'g8-9.5-2', grade: '8', unit: U5, order: 2, title: 'Flat-file and relational databases',
    bookRef: B + 'Unit 9.5, pp. 166–169',
    objectives: [
      'Explain the difference between a flat-file and a relational database',
      'Identify problems caused by repeated data',
      'Identify primary keys and the common field that links two tables'
    ],
    explanation: [
      '### Flat-file database',
      'All the data is stored in **one table**. This often causes **data redundancy** — the same data repeated many times. For example, a countries table repeating the continent\'s size and population on every row.',
      '',
      '**Problems:** wasted storage; typing the same data repeatedly causes mistakes; if a value changes it must be updated in many places, so data can become **inconsistent**.',
      '',
      '### Relational database',
      'Data is split into **two or more tables**, each about one thing (e.g. `countryTBL` and `continentTBL`). The tables are **linked** by a common field.',
      '- Each table has a **primary key** (unique for every record).',
      '- The primary key of one table appears in another table as a **foreign key**, creating the link (relationship).',
      '',
      'Continent data is now stored **once**, and each country simply refers to it.'
    ],
    example: ['continentTBL                       countryTBL', 'continent (PK) | population        country (PK) | capital  | continent (FK)', 'Asia           | 4.4 billion       Vietnam      | Hanoi    | Asia', 'Europe         | 0.7 billion       India        | New Delhi| Asia', '                                    France       | Paris    | Europe'],
    note: 'PK = primary key, FK = foreign key. The foreign key must match a primary key value in the linked table.',
    questions: [
      ['What is a flat-file database?', 'A database that stores all data in one table', 'A database with many linked tables', 'A spreadsheet chart', 'A paper file', 'A'],
      ['What is a problem with data redundancy?', 'Repeated data wastes space and can become inconsistent', 'Data is easier to update', 'It makes searches impossible', 'It encrypts data', 'A'],
      ['How are tables linked in a relational database?', 'By a common field (primary key in one, foreign key in the other)', 'By colour', 'By file name', 'They are not linked', 'A'],
      ['What is a foreign key?', 'A field that links to the primary key of another table', 'A password from another country', 'The first field in every table', 'A key for a locked door', 'A'],
      ['Repeating the same data many times in a database is called data ___.', '', '', '', '', 'redundancy|duplication|repetition']
    ] },

  { key: 'g8-9.5-3', grade: '8', unit: U5, order: 3, title: 'Creating relational databases',
    bookRef: B + 'Unit 9.5, pp. 170–175',
    objectives: [
      'Create a relational database with two or more linked tables',
      'Use a data dictionary to set field names and data types',
      'Explain referential integrity'
    ],
    explanation: [
      '### Steps (Microsoft Access)',
      '1. Plan each table with a **data dictionary**: field name, data type, field size, primary key.',
      '2. Create each table in **Design View** and set the primary key.',
      '3. Open **Database Tools › Relationships**, add the tables and drag the primary key onto the matching foreign key.',
      '4. Tick **Enforce Referential Integrity**.',
      '5. Enter data — enter the "one" side (e.g. students) before the "many" side (e.g. loans).',
      '',
      '### Referential integrity',
      'A rule that every foreign key value must match an existing primary key value. It stops you recording a loan for a student who does not exist, or deleting a student who still has books on loan.',
      '',
      '### One-to-many relationships',
      'One student can borrow **many** books, but each loan belongs to **one** student.'
    ],
    syntax: ['studentTBL (studentID PK, studentName, class)', 'loanTBL    (loanID PK, studentID FK, bookID FK, dateBorrowed)', 'bookTBL    (bookID PK, bookTitle, bookAuthor)'],
    example: ['Relationship: studentTBL.studentID  1 ----- ∞  loanTBL.studentID', 'Relationship: bookTBL.bookID        1 ----- ∞  loanTBL.bookID'],
    note: 'The linked fields must have the **same data type** (e.g. both Short Text) or Access will not create the relationship.',
    questions: [
      ['What does referential integrity ensure?', 'Every foreign key value matches an existing primary key value', 'All data is encrypted', 'Tables are sorted alphabetically', 'Fields are coloured', 'A'],
      ['One student can borrow many books. What type of relationship is this?', 'One-to-one', 'One-to-many', 'Many-to-many', 'No relationship', 'B'],
      ['What must be true of the two fields used to link tables?', 'They must have the same data type', 'They must have different names', 'They must both be primary keys', 'They must be empty', 'A'],
      ['Which document plans each table\'s field names and data types?', 'A data dictionary', 'A trace table', 'A truth table', 'A test plan', 'A'],
      ['In Access, which window do you open to link tables together?', '', '', '', '', 'relationships|relationship']
    ] },

  { key: 'g8-9.5-4', grade: '8', unit: U5, order: 4, title: 'Complex queries and parameter queries',
    bookRef: B + 'Unit 9.5, pp. 176–181, 191–192',
    objectives: [
      'Create complex searches using two or more criteria',
      'Create a parameter query',
      'Search across linked tables in a relational database'
    ],
    explanation: [
      '### Two or more criteria',
      '- **AND** criteria go on the **same** Criteria row in Query Design: class = "9A" AND dateDue < Date() → overdue books in 9A',
      '- **OR** criteria go on **different** rows: author = "Rowling" OR author = "Tolkien"',
      '- Ranges: `Between 1/9/2026 And 30/9/2026`',
      '- Wildcards: `Like "A*"` finds anything starting with A',
      '',
      '### Parameter queries',
      'Instead of fixing the criteria, show a prompt so the user types the value each time. Put text in square brackets in the Criteria row: `[Please enter book title]`. One query can now search for any title.',
      '',
      '### Queries across tables',
      'Add two linked tables to one query to combine their fields, e.g. student name (studentTBL) with book title (bookTBL) via loanTBL. Untick **Show** for fields you need for criteria but do not want displayed.',
      '',
      'Behind the scenes, Access builds queries in **SQL (Structured Query Language)**.'
    ],
    syntax: ['Criteria (AND, same row):  class: "9A"     dateDue: <Date()', 'Criteria (OR, next row):   author: "Rowling"  /  or: "Tolkien"', 'Parameter:                 [Please enter book title]', 'SQL: SELECT bookTitle FROM bookTBL WHERE bookAuthor = "Tolkien";'],
    example: ['Question: Which Grade 8 students scored below 85% in Unit 9.4?', 'Field:    studentName | grade | unit | score', 'Table:    studentTBL  | studentTBL | resultTBL | resultTBL', 'Criteria:             | 8     | "9.4" | <85'],
    note: 'Criteria on the same row are joined with AND; criteria on different rows are joined with OR.',
    questions: [
      ['In Access Query Design, criteria on the SAME row are joined with…', 'OR', 'AND', 'NOT', 'Nothing', 'B'],
      ['What does a parameter query do?', 'Asks the user to type the search value each time it runs', 'Deletes records', 'Sorts tables', 'Encrypts the database', 'A'],
      ['How is a parameter prompt written in the Criteria row?', 'In square brackets, e.g. [Enter title]', 'In quotation marks only', 'In round brackets', 'With a # symbol', 'A'],
      ['Which criteria finds names beginning with A?', '= A', 'Like "A*"', '> A', 'A only', 'B'],
      ['What does SQL stand for? (three words)', '', '', '', '', 'structured query language']
    ] },

  { key: 'g8-9.5-5', grade: '8', unit: U5, order: 5, title: 'Spreadsheet functions: IF, MIN, MAX and COUNT',
    bookRef: B + 'Unit 9.5, pp. 182–185',
    objectives: [
      'Use functions such as IF, MIN, MAX and COUNT to analyse data',
      'Create a spreadsheet that models a real-life system',
      'Combine functions to answer questions about data'
    ],
    explanation: [
      'A **function** is a ready-made formula that does a job.',
      '',
      '- `=MAX(B2:B31)` — highest value (e.g. hottest day)',
      '- `=MIN(B2:B31)` — lowest value',
      '- `=AVERAGE(B2:B31)` — mean',
      '- `=COUNT(B2:B31)` — how many cells contain **numbers**',
      '- `=COUNTA(B2:B31)` — how many cells are not empty',
      '- `=COUNTIF(C2:C31,"Cloudy")` — how many cells match a condition',
      '- `=IF(B2>30,"Hot","Not hot")` — chooses a result based on a condition',
      '',
      'Use `""` in an IF to show nothing: `=IF(D2="Rain","Umbrella needed","")`.',
      '',
      '### Modelling a real system',
      'A weather spreadsheet can record each day\'s temperature and conditions, then use functions to summarise the month and predict what to pack for a school trip.'
    ],
    syntax: ['=IF(condition, value_if_true, value_if_false)', '=MAX(range)   =MIN(range)   =COUNT(range)', '=COUNTIF(range, criteria)'],
    example: ['     A        B (Temp °C)  C (Weather)  D (Advice)', '2    Mon      31           Sunny        =IF(B2>30,"Hot","Not hot")', '3    Tue      27           Rain         =IF(C3="Rain","Umbrella needed","")', '...', '10   Hottest  =MAX(B2:B8)', '11   Rainy days  =COUNTIF(C2:C8,"Rain")'],
    note: 'COUNT counts only **numbers**; to count text values such as "Rain", use COUNTIF.',
    questions: [
      ['Which function finds the lowest value in a range?', 'MAX', 'MIN', 'COUNT', 'IF', 'B'],
      ['What does =COUNT(B2:B10) count?', 'Cells containing numbers', 'All cells, even empty ones', 'Only text cells', 'The number of columns', 'A'],
      ['B2 = 25. What does =IF(B2>30,"Hot","Not hot") show?', 'Hot', 'Not hot', '25', 'An error', 'B'],
      ['Which formula counts how many cells in C2:C8 contain "Rain"?', '=COUNT(C2:C8)', '=COUNTIF(C2:C8,"Rain")', '=MAX(C2:C8)', '=SUM(C2:C8)', 'B'],
      ['Which function returns the highest value in a range?', '', '', '', '', 'MAX|max|=MAX()|MAX()']
    ] },

  { key: 'g8-9.5-6', grade: '8', unit: U5, order: 6, title: 'Evaluating spreadsheet and database models',
    bookRef: B + 'Unit 9.5, pp. 186–190',
    objectives: [
      'Evaluate the use of models that represent real-life systems',
      'Evaluate the suitability of a spreadsheet for a given purpose',
      'Check a model against the user requirements'
    ],
    explanation: [
      'Developers are given **user requirements** — a list of what the solution must do. To evaluate a model, check it against **each requirement** one by one.',
      '',
      '### Questions to ask',
      '- Does it store **all** the data the user needs? Are fields atomic and correctly typed?',
      '- Are formulas and functions **correct**? Test with known values.',
      '- Is there **validation** to stop wrong data being entered?',
      '- Is it **easy to use** — clear headings, forms, sensible layout?',
      '- Can it answer the user\'s **questions** (queries, summaries, charts)?',
      '- Is the data **accurate and up to date**?',
      '',
      '### Spreadsheet or database?',
      '- **Spreadsheet:** best for calculations, what-if modelling and charts on smaller data sets.',
      '- **Database:** best for large amounts of related data, avoiding repetition, and complex searches.',
      '',
      'Every model is a **simplification** of reality, so its predictions are never perfect.'
    ],
    example: ['Requirement                              Met?   Evidence / improvement', '1. Show each student\'s average           Yes    =AVERAGE in column F', '2. Highlight students below 85%           No     Add conditional formatting rule <85 -> red', '3. Stop scores above 100 being entered    No     Add data validation 0–100'],
    note: 'A strong evaluation gives **evidence** for each judgement and suggests a **specific** improvement.',
    questions: [
      ['What should a model be evaluated against?', 'The user requirements', 'The colour scheme only', 'The number of rows', 'The file name', 'A'],
      ['Which is better for complex searches across large amounts of related data?', 'A spreadsheet', 'A relational database', 'A word processor', 'A presentation', 'B'],
      ['Which is better for what-if calculations and charts?', 'A spreadsheet', 'A flat-file database only', 'A web browser', 'An email', 'A'],
      ['Why are a model\'s predictions never perfect?', 'Every model is a simplification of reality', 'Computers cannot do maths', 'Spreadsheets are random', 'Data is always encrypted', 'A'],
      ['A list of what a solution must do is called the user ___.', '', '', '', '', 'requirements|requirement']
    ] },

  /* ======================= UNIT 9.6 ======================= */
  { key: 'g8-9.6-1', grade: '8', unit: U6, order: 1, title: 'Decomposition and sub-programs',
    bookRef: B + 'Unit 9.6, pp. 198–203',
    objectives: [
      'Decompose a problem into sub-programs',
      'Use a sub-routine in flowcharts or pseudocode',
      'Write and call sub-programs in Python'
    ],
    explanation: [
      'The unit\'s project is a times-tables adventure game for a primary school. To manage a big program, **decompose** it into sub-programs, each doing one job:',
      '- `welcome()` — greets the player and checks their username',
      '- `question()` — asks a random times-table question',
      '- `feedback()` — tells the player if they were right',
      '- `character()` — lets the player choose a character',
      '',
      '### In pseudocode',
      '`SUBROUTINE welcome()` … `ENDSUBROUTINE`, then call it with `welcome()`.',
      '',
      '### In a flowchart',
      'A sub-routine is drawn as a rectangle with **double vertical lines** at each side; it has its own small flowchart.',
      '',
      'Sub-programs can take **parameters** (values passed in) and **return** results.'
    ],
    syntax: ['def name(parameter):', '    ...', '    return result', '', 'value = name(argument)'],
    example: ['import random', '', 'def question(table):', '    number = random.randint(2, 12)', '    answer = int(input(str(number) + " x " + str(table) + " = "))', '    return answer == number * table', '', 'def feedback(correct):', '    if correct:', '        print("Well done!")', '    else:', '        print("Not quite - keep practising.")', '', 'feedback(question(7))'],
    note: 'Name sub-programs with a verb or clear noun so the main program reads like a plan: `welcome()`, `ask_question()`, `show_score()`.',
    questions: [
      ['Why decompose a game into sub-programs?', 'Each part is easier to write, test and reuse', 'It makes the program impossible to read', 'Python requires it', 'It removes all errors', 'A'],
      ['How is a sub-routine shown in a flowchart?', 'A rectangle with double vertical lines', 'A diamond', 'A parallelogram', 'An oval', 'A'],
      ['What is a parameter?', 'A value passed into a sub-program', 'An error message', 'A loop counter only', 'A type of file', 'A'],
      ['def feedback(correct): — what is correct?', 'A parameter', 'A library', 'A data type', 'A comment', 'A'],
      ['Which keyword sends a value back from a Python function?', '', '', '', '', 'return']
    ] },

  { key: 'g8-9.6-2', grade: '8', unit: U6, order: 2, title: 'Loops and validation of user input',
    bookRef: B + 'Unit 9.6, pp. 203–208',
    objectives: [
      'Use count-controlled loops in pseudocode and Python',
      'Use a loop to give a user a limited number of attempts',
      'Predict the outcome of algorithms that use iteration'
    ],
    explanation: [
      'A count-controlled loop is ideal when you know how many times something should happen: ask 10 questions, or allow **3 attempts** to enter a valid username.',
      '',
      '### Limited attempts',
      'Use a `count` variable to track attempts. If the user enters valid data, **break** out of the loop early; otherwise give feedback and try again. After the last attempt, give a final message.',
      '',
      '### Pseudocode',
      '`FOR count = 1 TO 3` … `NEXT count`',
      '',
      '### Python',
      '`for count in range(1, 4):` gives 1, 2, 3.'
    ],
    syntax: ['for count in range(1, 4):', '    if valid:', '        break'],
    example: ['for attempt in range(1, 4):', '    username = input("Choose a username (4-10 characters): ")', '    if 4 <= len(username) <= 10:', '        print("Welcome to the game,", username)', '        break', '    else:', '        print("Try again. Attempts left:", 3 - attempt)', 'else:', '    print("Too many attempts. Ask your teacher for help.")'],
    note: 'In Python, the `else` attached to a `for` loop runs only if the loop finished **without** a `break`.',
    questions: [
      ['How many times can the loop for attempt in range(1, 4): run?', '3', '4', '1', '2', 'A'],
      ['What does break do inside a loop?', 'Exits the loop immediately', 'Restarts the loop', 'Deletes the loop', 'Pauses for 1 second', 'A'],
      ['Why use a count-controlled loop for login attempts?', 'The number of attempts is fixed and known', 'It never ends', 'It hides the username', 'It encrypts passwords', 'A'],
      ['username = "Jo". Is 4 <= len(username) <= 10 True or False?', 'True', 'False', 'Error', 'None', 'B'],
      ['attempt = 2 in a 3-attempt loop. How many attempts are left? Type the number.', '', '', '', '', '1|one']
    ] },

  { key: 'g8-9.6-3', grade: '8', unit: U6, order: 3, title: 'String methods for cleaner input',
    bookRef: B + 'Unit 9.6, pp. 207–210',
    objectives: [
      'Use string manipulation including length, uppercase and lowercase',
      'Make programs accept answers typed in different ways',
      'Check the length of user input'
    ],
    explanation: [
      'Users type answers in many ways: "b", "B", " B ". String methods tidy input before checking it:',
      '',
      '- `.upper()` — "b" → "B"',
      '- `.lower()` — "YES" → "yes"',
      '- `.strip()` — removes spaces at the start and end',
      '- `len()` — counts characters, e.g. to check a username is 4–10 characters',
      '- `.isdigit()` — True if the text contains only digits',
      '',
      'Chaining methods: `answer = input("A, B, C or D? ").strip().upper()`',
      '',
      '### Data types reminder',
      'integer · real (float) · character · string · Boolean — input always starts as a **string**.'
    ],
    syntax: ['text.upper()   text.lower()   text.strip()', 'len(text)      text.isdigit()'],
    example: ['answer = input("Enter your answer (A, B, C or D): ").strip().upper()', 'if answer == "B":', '    print("Correct!")', 'elif answer in ["A", "C", "D"]:', '    print("Not quite.")', 'else:', '    print("Please type A, B, C or D.")', '', 'name = input("Enter your name: ")', 'print("Your name has", len(name), "letters")'],
    note: '`" b ".strip().upper()` becomes `"B"` — that one line handles spaces and capitals.',
    questions: [
      ['What does "yes".upper() return?', 'yes', 'YES', 'Yes', 'yES', 'B'],
      ['What does "  hi  ".strip() return?', '"  hi"', '"hi"', '"hi  "', '"HI"', 'B'],
      ['What does "123".isdigit() return?', 'True', 'False', '123', 'Error', 'A'],
      ['Why convert an answer with .upper() before checking it?', 'So "b" and "B" are both accepted', 'To make it longer', 'To delete it', 'To change its data type to integer', 'A'],
      ['What does len("Python") return?', '', '', '', '', '6|six']
    ] },

  { key: 'g8-9.6-4', grade: '8', unit: U6, order: 4, title: 'Using trace tables to debug Python',
    bookRef: B + 'Unit 9.6, pp. 211–215',
    objectives: [
      'Use a trace table to debug a Python program',
      'Predict the output of a program that uses loops and selection',
      'Compare a trace table with the real program output'
    ],
    explanation: [
      'A trace table works for Python just as for pseudocode. Make a column for the **line number**, each **variable**, each **condition** and the **output**, then step through the code.',
      '',
      'Loops make trace tables especially useful: each iteration gets new rows, so you can see the counter and totals change.',
      '',
      '### Debugging with a trace table',
      '1. Complete the table by hand and predict the output.',
      '2. Run the program.',
      '3. If the real output differs from your prediction, the row where they first differ shows where the error is.'
    ],
    syntax: ['Line | counter | total | counter > 2 | OUTPUT'],
    example: ['total = 0', 'for counter in range(1, 4):', '    total = total + counter * 4', 'print(total)', '', '# counter | total', '#    1    |   4', '#    2    |  12', '#    3    |  24', '# OUTPUT: 24'],
    note: 'Keep the trace table neat — one row per change. Messy tables hide the mistake you are looking for.',
    questions: [
      ['What does a trace table record?', 'The value of each variable at each step', 'The program\'s file size', 'The names of the programmers', 'The CPU temperature', 'A'],
      ['total = 0; for c in range(1, 3): total = total + c. What is total at the end?', '2', '3', '6', '1', 'B'],
      ['Your prediction and the real output differ. What does this suggest?', 'There is an error (or a mistake in your trace)', 'The computer is broken', 'Nothing important', 'The program is perfect', 'A'],
      ['In a loop, what happens to the trace table on each iteration?', 'New rows are added with the updated values', 'It is deleted', 'It stays empty', 'Only the output changes', 'A'],
      ['total = 0; for c in range(1, 4): total = total + 2. What is total at the end?', '', '', '', '', '6|six']
    ] },

  { key: 'g8-9.6-5', grade: '8', unit: U6, order: 5, title: 'Working with lists: create, access and change',
    bookRef: B + 'Unit 9.6, pp. 216–219, 229–230',
    objectives: [
      'Identify and explain the purpose of a one-dimensional array (list)',
      'Access list items by index',
      'Change a list with append(), insert(), remove() and by index'
    ],
    explanation: [
      'A **list** stores many items in order under one name, written in square brackets and separated by commas:',
      '`characters = ["wizard", "knight", "explorer"]`',
      '',
      '### Accessing items',
      '`characters[0]` → "wizard" (indexes start at 0). `characters[-1]` → the last item.',
      '',
      '### Changing a list',
      '- `characters.append("pirate")` — add to the end',
      '- `characters.insert(1, "robot")` — add at position 1',
      '- `characters.remove("knight")` — remove the first matching item',
      '- `characters[0] = "dragon"` — replace an item',
      '- `len(characters)` — how many items',
      '',
      'Lists are **mutable** — they can be changed after they are created.'
    ],
    syntax: ['my_list = [item0, item1, item2]', 'my_list[index]', 'my_list.append(item)', 'my_list.insert(position, item)', 'my_list.remove(item)'],
    example: ['characters = ["wizard", "knight", "explorer"]', 'print("Choose:", characters)', 'characters.append("pirate")', 'characters.remove("knight")', 'print(characters)        # [\'wizard\', \'explorer\', \'pirate\']', 'choice = int(input("Pick a number 0-2: "))', 'print("You are the", characters[choice])'],
    note: '`remove()` gives a **ValueError** if the item is not in the list. Check with `if item in my_list:` first.',
    questions: [
      ['fruit = ["apple", "banana", "mango"]. What is fruit[2]?', 'apple', 'banana', 'mango', 'Error', 'C'],
      ['Which method adds an item to the END of a list?', 'insert()', 'append()', 'remove()', 'add()', 'B'],
      ['After nums = [1, 2, 3] and nums.remove(2), what is nums?', '[1, 3]', '[1, 2]', '[2, 3]', '[3]', 'A'],
      ['What does fruit[-1] return?', 'The first item', 'The last item', 'An error always', 'The length', 'B'],
      ['colours = ["red", "blue"]. After colours.append("green"), what is len(colours)?', '', '', '', '', '3|three']
    ] },

  { key: 'g8-9.6-6', grade: '8', unit: U6, order: 6, title: 'Iterating through lists: totals, averages and searching',
    bookRef: B + 'Unit 9.6, pp. 220–226',
    objectives: [
      'Use iteration to process every item in a list',
      'Calculate a total and an average from a list',
      'Compare linear and binary search'
    ],
    explanation: [
      '### Processing every item',
      '`for score in scores:` visits each item in turn. Inside the loop you can add to a total, count items or find the highest.',
      '',
      '### Total and average',
      'Start `total = 0`, add each item, then `average = total / len(scores)`.',
      '',
      '### Searching',
      '- **Linear search:** check each item from the start until found. Works on any list, but slow for long lists.',
      '- **Binary search:** only works on a **sorted** list. Check the **middle** item; if it is too big, discard it and everything to its right; if too small, discard it and everything to its left. Repeat on the remaining half. Much faster for long lists because half the data is discarded each step.',
      '',
      'With an even number of items there is no exact middle, so take the item just left of the mid-point.'
    ],
    syntax: ['total = 0', 'for item in my_list:', '    total = total + item', 'average = total / len(my_list)'],
    example: ['scores = [8, 6, 10, 7]', 'total = 0', 'for score in scores:', '    total = total + score', 'average = total / len(scores)', 'print("Total:", total)      # 31', 'print("Average:", average)  # 7.75', 'print("Highest:", max(scores))'],
    note: 'Binary search on [2, 6, 9, 12, 16, 18, 20, 23, 45, 99] for 9: check 16 → too big; check 6 → too small; check 9 → found in 3 steps.',
    questions: [
      ['scores = [5, 10, 15]. What is the average?', '10', '15', '30', '5', 'A'],
      ['What must be true before a binary search can be used?', 'The list must be sorted', 'The list must be empty', 'The list must contain text', 'The list must have 10 items', 'A'],
      ['In a binary search, which item is checked first?', 'The first item', 'The last item', 'The middle item', 'A random item', 'C'],
      ['Why is binary search faster than linear search on long lists?', 'It discards half of the remaining items each step', 'It checks every item twice', 'It sorts the list', 'It uses more memory', 'A'],
      ['nums = [4, 6, 10]. What is the total? Type the number.', '', '', '', '', '20|twenty']
    ] },

  { key: 'g8-9.6-7', grade: '8', unit: U6, order: 7, title: 'Identifying errors and debugging',
    bookRef: B + 'Unit 9.6, pp. 225–231',
    objectives: [
      'Identify and describe syntax, logic and runtime errors',
      'Use error messages and trace tables to fix errors',
      'Develop and apply a test plan with normal, extreme and invalid data'
    ],
    explanation: [
      '### Syntax errors (found before the program runs)',
      'Missing colons, unclosed brackets or quotation marks, wrong indentation, misspelt keywords (`pritn`).',
      '',
      '### Runtime errors (crash while running)',
      '- **NameError** — using a variable before it exists, or misspelling its name (`myage` vs `myAge`)',
      '- **TypeError** — mixing types, e.g. `"Age: " + 14`',
      '- **ValueError** — `int("fourteen")`',
      '- **ZeroDivisionError** — dividing by 0',
      '- **IndexError** — `my_list[10]` when the list is shorter',
      '',
      '### Logic errors (wrong output)',
      'e.g. `average = total / 3` when there are 4 scores — use `len(scores)` instead.',
      '',
      '### Test plan',
      'Test with **normal**, **extreme** (boundary) and **invalid** data, record expected vs actual results, fix, and test again.'
    ],
    syntax: ['NameError | TypeError | ValueError | ZeroDivisionError | IndexError'],
    example: ['myAge = 14', '# print("Age: " + myAge)   -> TypeError: can only concatenate str (not "int") to str', 'print("Age: " + str(myAge))', '', 'scores = [8, 6, 10, 7]', '# average = sum(scores) / 3     -> logic error', 'average = sum(scores) / len(scores)', 'print(average)'],
    note: 'When you fix one bug, run **all** your tests again — fixes sometimes break something else.',
    questions: [
      ['print("Age: " + 14) causes which error?', 'NameError', 'TypeError', 'IndexError', 'SyntaxError', 'B'],
      ['Using a variable name that was never created causes which error?', 'NameError', 'ValueError', 'ZeroDivisionError', 'TypeError', 'A'],
      ['A program runs but uses / 3 when there are 4 scores. What type of error is this?', 'Syntax error', 'Runtime error', 'Logic error', 'No error', 'C'],
      ['int("fourteen") causes which error?', 'ValueError', 'IndexError', 'NameError', 'KeyError', 'A'],
      ['Dividing a number by 0 causes which error? Type its full Python name.', '', '', '', '', 'ZeroDivisionError|zerodivisionerror|zero division error']
    ] }

  );
})();
