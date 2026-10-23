/**
 * GRADE 7 BOOSTER LESSONS · based on Cambridge Lower Secondary Computing 8 (Hodder Education)
 * Original summaries for this booster course; page numbers point to the Student's Book.
 * Question format: [question, A, B, C, D, answer] — leave A–D empty for short answer ("ans1|ans2").
 */
var BOOK_LESSONS = (typeof BOOK_LESSONS !== 'undefined') ? BOOK_LESSONS : [];
(function () {
  var B = 'Cambridge Lower Secondary Computing 8, ';
  var U1 = '8.1 Building networks: Network structure and security';
  var U2 = '8.2 It\'s all in the planning: Pseudocode and algorithms';
  var U3 = '8.3 Let\'s talk technology: What\'s going on inside';
  var U4 = '8.4 Testing conditions: Developing games';
  var U5 = '8.5 Data input: Data collection and validation';
  var U6 = '8.6 Iterating through a solution: Software design and development';
  var MB = 'https://python.microbit.org/v/3';

  BOOK_LESSONS.push(

  /* ======================= UNIT 8.1 ======================= */
  { key: 'g7-8.1-1', grade: '7', unit: U1, order: 1, title: 'Types of network: PAN, LAN and WAN',
    bookRef: B + 'Unit 8.1, pp. 8–13',
    objectives: [
      'Identify different types of network: PAN, LAN and WAN',
      'Choose the type of network that suits a scenario',
      'Describe the jobs of different servers on a network'
    ],
    explanation: [
      'A **network** is two or more devices connected so they can share data and resources.',
      '',
      '- **PAN (Personal Area Network):** devices around one person, within a few metres — a phone connected to earbuds and a smartwatch.',
      '- **LAN (Local Area Network):** devices in one building or site — a school or office. The organisation owns the equipment.',
      '- **WAN (Wide Area Network):** connects LANs across cities or countries, often using leased telecom lines. **The internet is the largest WAN.**',
      '',
      '### Servers',
      'Many networks have **servers** — computers that provide a service to other devices (**clients**):',
      '- **File server:** stores shared files',
      '- **Mail server:** stores and sends email',
      '- **Web server:** stores and delivers web pages',
      '- **Print server:** manages a queue of print jobs'
    ],
    example: ['Scenario                                -> Network', 'Phone + smartwatch while jogging        -> PAN', 'Computers in the school ICT room        -> LAN', 'Bank branches in Hanoi and Ho Chi Minh  -> WAN'],
    note: 'Ask: how far apart are the devices? A few metres = PAN, one site = LAN, different towns or countries = WAN.',
    questions: [
      ['Which network covers a single school building?', 'PAN', 'LAN', 'WAN', 'None', 'B'],
      ['A phone connected to wireless earbuds forms which type of network?', 'PAN', 'LAN', 'WAN', 'MAN', 'A'],
      ['What is the largest WAN in the world?', 'A school network', 'The internet', 'Bluetooth', 'A home Wi-Fi network', 'B'],
      ['Which server stores and delivers web pages?', 'Mail server', 'File server', 'Web server', 'Print server', 'C'],
      ['What does the letter W stand for in WAN?', '', '', '', '', 'wide']
    ] },

  { key: 'g7-8.1-2', grade: '7', unit: U1, order: 2, title: 'Network hardware, cables and wireless networks',
    bookRef: B + 'Unit 8.1, pp. 14–17',
    objectives: [
      'Describe the uses and characteristics of copper and fibre-optic cables',
      'Describe the advantages and disadvantages of wired and wireless networks',
      'Name the hardware needed to build a network'
    ],
    explanation: [
      '### Network hardware',
      '- **NIC (network interface card):** lets a device connect to a network',
      '- **Switch:** connects devices in a LAN and sends data only to the device it is meant for',
      '- **Router:** connects different networks together, e.g. your LAN to the internet',
      '- **Wireless access point (WAP):** lets wireless devices join a wired network',
      '',
      '### Cables',
      '- **Copper cable** (e.g. Ethernet twisted pair) sends data as electrical signals. Cheap and easy to install, but affected by interference and limited to about 100 m.',
      '- **Fibre-optic cable** sends data as pulses of **light**. Much faster, works over long distances, not affected by electrical interference — but more expensive and fragile.',
      '',
      '### Wired vs wireless',
      'Wired: faster, more reliable, more secure, but less flexible. Wireless (Wi-Fi, Bluetooth): easy to add devices and move around, but slower, affected by walls and distance, and easier to intercept.'
    ],
    example: ['Connecting two cities under the sea   -> fibre-optic (long distance, fast)', 'Connecting a PC to a switch 10 m away  -> copper Ethernet (cheap)', 'Tablets moving around a classroom       -> Wi-Fi'],
    note: 'Wireless networks are grouped as WPAN (personal), WLAN (local) and WWAN (wide, e.g. 4G/5G).',
    questions: [
      ['How does fibre-optic cable carry data?', 'As electrical signals', 'As pulses of light', 'As radio waves', 'As sound waves', 'B'],
      ['Which is an advantage of copper cable over fibre-optic?', 'It is cheaper', 'It is faster', 'It works over longer distances', 'It is not affected by interference', 'A'],
      ['Which device connects a school LAN to the internet?', 'Router', 'Monitor', 'Keyboard', 'Printer', 'A'],
      ['Which is a disadvantage of wireless networks?', 'Devices can move around freely', 'Signals can be intercepted more easily', 'No cables are needed', 'It is easy to add devices', 'B'],
      ['Which network device sends data only to the device it is meant for inside a LAN?', '', '', '', '', 'switch|a switch|network switch']
    ] },

  { key: 'g7-8.1-3', grade: '7', unit: U1, order: 3, title: 'Transmitting data and echo checks',
    bookRef: B + 'Unit 8.1, pp. 18–20',
    objectives: [
      'Explain how errors can happen when binary data is transmitted',
      'Describe how echo checks are used to detect errors',
      'Follow a flowchart that uses conditions to show an error check'
    ],
    explanation: [
      'Networked devices send **binary** data. It can be sent:',
      '- **Serially:** one bit at a time along one wire',
      '- **In parallel:** several bits (e.g. 8) at the same time along several wires',
      '',
      '### Why errors happen',
      'Interference, damaged cables or power surges can cause a **bit flip** (a 0 becomes 1 or a 1 becomes 0).',
      '',
      '### Echo check',
      '1. The sender transmits the data.',
      '2. The receiver sends an exact copy back to the sender.',
      '3. The sender compares the returned copy with the original.',
      '4. **If** they match → the data arrived correctly. **Else** → the data is sent again.',
      '',
      'An echo check shows **that** an error happened, but not **where** it happened, and it doubles the amount of data sent.'
    ],
    syntax: ['IF returned_data == original_data THEN', '    OUTPUT "Transmission OK"', 'ELSE', '    resend data', 'ENDIF'],
    example: ['original = "01001000"', 'returned = "01001010"   # one bit flipped on the way back', 'if returned == original:', '    print("Transmission OK")', 'else:', '    print("Error detected - resending")'],
    note: 'If the error happens on the way **back**, the original data may have been fine — the echo check still asks for it to be resent.',
    questions: [
      ['In an echo check, what does the receiver do?', 'Sends a copy of the data back to the sender', 'Deletes the data', 'Encrypts the data', 'Prints the data', 'A'],
      ['What happens if the returned copy does not match the original?', 'The data is sent again', 'The network shuts down', 'The receiver keeps the wrong data', 'Nothing', 'A'],
      ['What is a bit flip?', 'A 0 changing to 1 (or 1 to 0) during transmission', 'Turning a device upside down', 'A type of cable', 'A compression method', 'A'],
      ['Sending data one bit at a time along a single wire is called…', 'Parallel transmission', 'Serial transmission', 'Wireless transmission', 'Echo transmission', 'B'],
      ['Which check sends the received data back to the sender to compare? (two words)', '', '', '', '', 'echo check|echo-check|echo checking']
    ] },

  { key: 'g7-8.1-4', grade: '7', unit: U1, order: 4, title: 'Security threats and protection: firewalls, antivirus and anti-spyware',
    bookRef: B + 'Unit 8.1, pp. 21–29',
    objectives: [
      'Describe threats to data on a network such as hacking, viruses and spyware',
      'Explain how firewalls protect a network and why they are important',
      'Explain how antivirus and anti-spyware software keep data secure'
    ],
    explanation: [
      '### Threats',
      '- **Hacking:** gaining **unauthorised** access to a computer or network',
      '- **Virus:** malicious code that copies itself and spreads, damaging files',
      '- **Spyware:** secretly records what the user does, e.g. a **keylogger** captures keystrokes to steal passwords',
      '- **Trojan / adware:** harmful software disguised as something useful',
      '',
      '### Protection',
      '- **Firewall:** checks data entering and leaving a network against a set of **rules** and blocks anything suspicious. It can be hardware (inside a router) or software.',
      '- **Antivirus:** scans files, compares them with a database of known virus **signatures**, then **quarantines** or deletes infected files. It must be updated regularly.',
      '- **Anti-spyware:** finds and removes spyware, adware and trojans, and warns the user.',
      '- Also: strong passwords, user access levels, encryption, regular updates and backups.'
    ],
    example: ['Firewall rule examples:', '  ALLOW  web traffic (port 443) to the internet', '  BLOCK  incoming connections from unknown addresses', '  BLOCK  file-sharing apps on student devices'],
    note: 'Antivirus can only recognise viruses in its database, which is why automatic updates matter.',
    questions: [
      ['What does a firewall do?', 'Checks network traffic against rules and blocks suspicious data', 'Speeds up the internet', 'Stores backups', 'Prints documents', 'A'],
      ['What does spyware do?', 'Secretly records a user\'s activity, such as keystrokes', 'Cleans the hard drive', 'Protects passwords', 'Compresses files', 'A'],
      ['Why must antivirus software be updated regularly?', 'So it can recognise newly discovered viruses', 'To change its colour', 'To make it free', 'To delete user files', 'A'],
      ['What does "quarantine" mean in antivirus software?', 'Isolating an infected file so it cannot cause harm', 'Sending the file to a friend', 'Printing the file', 'Renaming the file', 'A'],
      ['Gaining access to a computer system without permission is called…', '', '', '', '', 'hacking']
    ] },

  { key: 'g7-8.1-5', grade: '7', unit: U1, order: 5, title: 'Network operating systems and network security features',
    bookRef: B + 'Unit 8.1, pp. 24–29',
    objectives: [
      'Explain what a network operating system (NOS) is',
      'Explain why a NOS can be described as utilities software',
      'Explain the security features used by different types of networks'
    ],
    explanation: [
      'A **network operating system (NOS)** runs on a server and manages the whole network. Network administrators use it to:',
      '- create **user accounts** and passwords',
      '- set **access rights** (who can open, change or delete which files)',
      '- manage shared printers and storage',
      '- monitor network traffic and run backups',
      '',
      'Because it carries out maintenance and management jobs rather than user tasks, a NOS is often described as **utilities software**.',
      '',
      '### Security features by network type',
      '- **PAN (Bluetooth):** pairing codes, devices must be close together',
      '- **LAN:** user names and passwords, access levels, firewall on the router',
      '- **Wireless LAN:** WPA2/WPA3 encryption and a strong Wi-Fi password',
      '- **WAN / internet:** encryption (HTTPS, VPNs), firewalls, two-factor authentication'
    ],
    example: ['NOS access rights for a school:', '  Students  -> read and write their own folder only', '  Teachers  -> read student folders, write class resources', '  Admin     -> full control'],
    note: 'Different user interfaces exist too: graphical (GUI), command line, menu-driven and natural language (speech, e.g. smart speakers).',
    questions: [
      ['What is a network operating system used for?', 'Managing users, access rights and resources across a network', 'Playing games', 'Writing essays', 'Drawing pictures', 'A'],
      ['Why is a NOS sometimes called utilities software?', 'It performs management and maintenance tasks', 'It is used to play music', 'It is a word processor', 'It is a type of hardware', 'A'],
      ['Which security feature protects a home Wi-Fi network?', 'WPA2/WPA3 encryption with a strong password', 'A bigger screen', 'A faster printer', 'Turning off the monitor', 'A'],
      ['What are access rights?', 'Permissions that control what each user can open, change or delete', 'The speed of the network', 'The number of cables', 'Website addresses', 'A'],
      ['Who uses a NOS to create user accounts? Type the job title (two words).', '', '', '', '', 'network administrator|network administrators|administrator|system administrator']
    ] },

  /* ======================= UNIT 8.2 ======================= */
  { key: 'g7-8.2-1', grade: '7', unit: U2, order: 1, title: 'Pseudocode: planning algorithms in text',
    bookRef: B + 'Unit 8.2, pp. 32–39',
    objectives: [
      'Identify the key characteristics of pseudocode',
      'Follow and understand an algorithm presented as pseudocode',
      'Predict the outcome of a pseudocode algorithm'
    ],
    explanation: [
      '**Pseudocode** is a way of writing an algorithm using short English-like statements. It is not a real programming language, so it does not need perfect syntax, but it is structured like code so it is easy to convert into Python.',
      '',
      '### Key characteristics',
      '- Keywords in CAPITALS: `START`, `STOP`, `INPUT`, `OUTPUT`, `IF … THEN … ELSE … ENDIF`',
      '- One instruction per line, in sequence',
      '- Variables are given meaningful names',
      '- Indentation shows which lines belong inside a condition',
      '- No need for brackets, colons or exact punctuation',
      '',
      'Pseudocode and flowcharts show the same algorithm in two different ways.'
    ],
    syntax: ['START', 'INPUT variable', 'variable ← expression', 'OUTPUT value', 'STOP'],
    example: ['# Pseudocode:', '#   START', '#   INPUT side', '#   area = side * side', '#   OUTPUT area', '#   STOP', '', '# Python:', 'side = float(input("Side length: "))', 'area = side * side', 'print("Area:", area)'],
    note: 'To predict an algorithm\'s output, trace it line by line and write down each variable\'s value as it changes (a **trace table**).',
    questions: [
      ['What is pseudocode?', 'A text-based way of planning an algorithm using English-like statements', 'A programming language that runs on computers', 'A type of flowchart symbol', 'A virus', 'A'],
      ['Which is a characteristic of pseudocode?', 'Keywords such as INPUT and OUTPUT are often in capitals', 'It must have perfect Python syntax', 'It can only be drawn', 'It cannot use variables', 'A'],
      ['A salary is 1000. Pseudocode: new = salary * 1.1, OUTPUT new. What is output?', '1000', '1100', '1010', '110', 'B'],
      ['Why do programmers write pseudocode before coding?', 'To plan the logic without worrying about exact syntax', 'Because computers run pseudocode', 'To make the program slower', 'To avoid testing', 'A'],
      ['Which pseudocode keyword displays a value to the user?', '', '', '', '', 'OUTPUT|output|PRINT']
    ] },

  { key: 'g7-8.2-2', grade: '7', unit: U2, order: 2, title: 'Selection and Boolean logic in pseudocode',
    bookRef: B + 'Unit 8.2, pp. 38–41',
    objectives: [
      'Follow flowcharts and pseudocode that use conditional statements',
      'Explain and use AND, OR and NOT to create logic within an algorithm',
      'Predict the outcome of algorithms with conditions'
    ],
    explanation: [
      'A **conditional statement** lets an algorithm choose what to do:',
      '`IF condition THEN … ELSE … ENDIF`',
      '',
      '### Combining conditions',
      '- **AND:** both must be true — `IF coins = 10 AND time > 0 THEN OUTPUT "Next level"`',
      '- **OR:** at least one must be true — `IF answer = "yes" OR answer = "y" THEN …`',
      '- **NOT:** reverses a condition — `IF NOT password = "letmein" THEN OUTPUT "Access denied"`',
      '',
      'To predict an outcome, substitute the values into the condition and decide if the whole condition is true or false.'
    ],
    syntax: ['IF condition1 AND condition2 THEN', '    OUTPUT ...', 'ELSE', '    OUTPUT ...', 'ENDIF'],
    example: ['coins = int(input("Coins collected: "))', 'lives = int(input("Lives left: "))', 'if coins >= 10 and lives > 0:', '    print("Level complete!")', 'elif lives == 0:', '    print("Game over")', 'else:', '    print("Keep collecting coins")'],
    note: 'Pseudocode often uses `=` for comparison; Python needs `==`.',
    questions: [
      ['coins = 12, lives = 0. Is "coins >= 10 AND lives > 0" true or false?', 'True', 'False', 'Both', 'Neither', 'B'],
      ['answer = "y". Is "answer = yes OR answer = y" true?', 'True', 'False', 'It causes an error', 'Only if both match', 'A'],
      ['What does NOT do to a condition?', 'Reverses it', 'Doubles it', 'Deletes it', 'Repeats it', 'A'],
      ['Which keyword ends an IF block in pseudocode?', 'STOP', 'ENDIF', 'END', 'DONE', 'B'],
      ['age = 15. What does this output? IF age >= 13 THEN OUTPUT "Teen" ELSE OUTPUT "Child"', '', '', '', '', 'Teen|teen']
    ] },

  { key: 'g7-8.2-3', grade: '7', unit: U2, order: 3, title: 'Linear search',
    bookRef: B + 'Unit 8.2, pp. 41–42',
    objectives: [
      'Describe how a linear search works',
      'Use a linear search to find a data item',
      'Write a linear search as pseudocode or Python'
    ],
    explanation: [
      'A **linear search** looks for an item by checking each item in a list **one at a time, from the start**, until it finds the item or reaches the end.',
      '',
      '### Steps',
      '1. Start at the first item.',
      '2. Compare it with the item you are searching for.',
      '3. If they match → "Item found", stop.',
      '4. Otherwise move to the next item and repeat.',
      '5. If you reach the end with no match → "Item not found".',
      '',
      '### Pros and cons',
      'It works on **unsorted** lists and is simple to write, but it can be slow for long lists because in the worst case every item is checked.'
    ],
    syntax: ['FOR each item IN list', '    IF item = target THEN', '        OUTPUT "Item found"', '        STOP', '    ENDIF', 'NEXT item', 'OUTPUT "Item not found"'],
    example: ['fruits = ["apple", "mango", "banana", "lychee"]', 'target = input("Search for: ")', 'found = False', 'for fruit in fruits:', '    if fruit == target:', '        found = True', '        break', 'if found:', '    print("Item found")', 'else:', '    print("Item not found")'],
    note: 'Searching for "banana" in the list above takes 3 comparisons: apple, mango, then banana.',
    questions: [
      ['How does a linear search work?', 'Checks each item in order until it finds a match or reaches the end', 'Jumps to the middle of the list', 'Sorts the list first', 'Checks only the last item', 'A'],
      ['Does a linear search need the list to be sorted?', 'Yes, always', 'No', 'Only for numbers', 'Only for text', 'B'],
      ['List: [4, 9, 2, 7]. How many comparisons to find 2?', '1', '2', '3', '4', 'C'],
      ['What is a disadvantage of a linear search?', 'It can be slow for long lists', 'It only works on sorted lists', 'It cannot find numbers', 'It deletes items', 'A'],
      ['If the item is not in the list, what should the search output? (three words)', '', '', '', '', 'item not found|not found']
    ] },

  { key: 'g7-8.2-4', grade: '7', unit: U2, order: 4, title: 'Selection and data types with the micro:bit',
    bookRef: B + 'Unit 8.2, pp. 43–51',
    tryIt: MB,
    objectives: [
      'Develop a MicroPython program that uses conditional statements and Boolean operators',
      'Identify and describe the data types in a MicroPython program',
      'Convert pseudocode into MicroPython'
    ],
    explanation: [
      'Pseudocode converts neatly into MicroPython:',
      '',
      '- `IF light level > 50 THEN OUTPUT heart` → `if display.read_light_level() > 50: display.show(Image.HEART)`',
      '',
      '### Data types in micro:bit programs',
      '- **Integer:** light level, temperature, a counter',
      '- **String:** a message to scroll, e.g. `"Hello"`',
      '- **Boolean:** `button_a.is_pressed()` returns `True` or `False`',
      '- **Real (float):** a calculated average, e.g. `21.5`',
      '',
      '### Boolean operators',
      'Use `and`, `or` and `not` to combine inputs. `not button_a.is_pressed()` is True when the button is **not** being pressed.'
    ],
    syntax: ['if condition1 and condition2:', '    ...', 'elif condition:', '    ...', 'else:', '    ...'],
    example: ['from microbit import *', '', 'while True:', '    light = display.read_light_level()   # integer', '    pressed = button_a.is_pressed()        # Boolean', '    if light > 50 and not pressed:', '        display.show(Image.HEART)', '    elif pressed:', '        display.scroll("Hi")              # string', '    else:', '        display.clear()'],
    note: 'Pseudocode uses `ELSE IF`; Python shortens it to `elif`.',
    questions: [
      ['What data type does button_a.is_pressed() return?', 'String', 'Integer', 'Boolean', 'Real', 'C'],
      ['What data type is the value returned by display.read_light_level()?', 'Integer', 'String', 'Boolean', 'List', 'A'],
      ['How is ELSE IF written in Python?', 'elseif', 'else if', 'elif', 'ifelse', 'C'],
      ['When is "not button_a.is_pressed()" True?', 'When button A is being pressed', 'When button A is not being pressed', 'Always', 'Never', 'B'],
      ['What data type is the value "Hello"?', '', '', '', '', 'string|str']
    ] },

  { key: 'g7-8.2-5', grade: '7', unit: U2, order: 5, title: 'Sending images and text between micro:bits (radio)',
    bookRef: B + 'Unit 8.2, pp. 50–56',
    tryIt: MB,
    objectives: [
      'Develop a MicroPython program that sends an image or text from one micro:bit to another',
      'Use radio groups so only the right micro:bits receive a message',
      'Explain how text is sent as binary codes'
    ],
    explanation: [
      'micro:bits can talk to each other wirelessly using the **radio** library.',
      '',
      '### Steps',
      '1. `import radio`',
      '2. Choose a **group** (0–255) with `radio.config(group=…)`. Only micro:bits in the same group receive the message.',
      '3. Switch the radio on with `radio.on()`.',
      '4. **Send** with `radio.send("text")`.',
      '5. **Receive** with `message = radio.receive()` — it returns the text, or `None` if nothing has arrived.',
      '',
      'To "send an image", send a code word (e.g. `"happy"`) and let the receiving micro:bit show the matching image.',
      '',
      'Each character is sent as its **binary code** (e.g. `h` = 01101000), one after another.'
    ],
    syntax: ['import radio', 'radio.config(group=7)', 'radio.on()', 'radio.send("message")', 'message = radio.receive()'],
    example: ['from microbit import *', 'import radio', '', 'radio.config(group=7)', 'radio.on()', '', 'while True:', '    if button_a.was_pressed():', '        radio.send("happy")', '    message = radio.receive()', '    if message == "happy":', '        display.show(Image.HAPPY)', '        sleep(1000)', '        display.clear()'],
    note: 'Flash the same program to both micro:bits — then either one can send and receive.',
    questions: [
      ['Which library lets micro:bits send messages to each other?', 'random', 'radio', 'turtle', 'time', 'B'],
      ['What does radio.config(group=7) do?', 'Sets the channel group so only micro:bits in group 7 receive messages', 'Sends the number 7', 'Turns off the radio', 'Shows 7 on the display', 'A'],
      ['What does radio.receive() return if no message has arrived?', '0', '"empty"', 'None', 'An error', 'C'],
      ['How can one micro:bit make another show a picture?', 'Send a code word that the receiver uses to show the matching image', 'Send the LED lights by cable', 'Shake both at once', 'It is impossible', 'A'],
      ['Which radio function transmits a message? Type it as radio.____', '', '', '', '', 'send|radio.send|radio.send()|send()']
    ] },

  { key: 'g7-8.2-6', grade: '7', unit: U2, order: 6, title: 'Test plans and test data',
    bookRef: B + 'Unit 8.2, pp. 48, 57–60',
    objectives: [
      'Develop and apply a test plan when testing and debugging a program',
      'Choose normal, extreme (boundary) and erroneous test data',
      'Explain why a range of test data is important'
    ],
    explanation: [
      'A **test plan** shows how you will prove a program works. For each test it lists: the purpose, the **test data**, the **expected outcome**, the actual outcome and pass/fail.',
      '',
      '### Types of test data',
      'Imagine a program that accepts a test score from 0 to 100:',
      '- **Normal** data: sensible values inside the range — `55`, `82`',
      '- **Extreme (boundary)** data: values at the very edges of the range — `0`, `100`',
      '- **Erroneous** data: values that should be rejected — `-5`, `150`, `"ten"`',
      '',
      'Testing only normal data might miss bugs at the boundaries (e.g. using `<` instead of `<=`). A **range** of test data proves the program handles every situation.'
    ],
    syntax: ['Test | Purpose | Test data | Type | Expected outcome | Actual | Pass/Fail'],
    example: ['score = int(input("Score (0-100): "))', 'if score >= 0 and score <= 100:', '    print("Accepted")', 'else:', '    print("Invalid score")', '', '# Tests: 55 (normal) -> Accepted, 100 (extreme) -> Accepted, 101 (erroneous) -> Invalid score'],
    note: 'An **iterative process** means: write a small part → test → fix → improve → repeat.',
    questions: [
      ['A program accepts ages 11 to 14. Which is extreme (boundary) data?', '12', '14', '20', '"twelve"', 'B'],
      ['A program accepts ages 11 to 14. Which is erroneous data?', '11', '13', '25', '14', 'C'],
      ['Why should a test plan use a range of test data?', 'To check the program handles normal, boundary and invalid input correctly', 'To make testing take longer', 'Because one test is never allowed', 'To change the program', 'A'],
      ['Which part of a test plan states what should happen?', 'Actual outcome', 'Expected outcome', 'Test number', 'Pass/Fail', 'B'],
      ['Test data that should be rejected by the program is called ___ data.', '', '', '', '', 'erroneous|invalid']
    ] },

  /* ======================= UNIT 8.3 ======================= */
  { key: 'g7-8.3-1', grade: '7', unit: U3, order: 1, title: 'Operating systems and utility programs',
    bookRef: B + 'Unit 8.3, pp. 64–67',
    objectives: [
      'Explain the purpose of an operating system and its main tasks',
      'Describe the purpose of utility programs',
      'Give examples of utility programs and the tasks they complete'
    ],
    explanation: [
      'The **operating system (OS)** is the systems software that manages the computer and lets users and applications use the hardware.',
      '',
      '### Main tasks of an OS',
      '- Provides a **user interface** (GUI, command line, touch, voice)',
      '- Manages **memory** — decides which programs use RAM',
      '- Manages **processes** — shares the CPU between running programs (multitasking)',
      '- Manages **files and folders**',
      '- Controls **peripherals** using device drivers (printers, keyboards)',
      '- Handles **security** — user accounts, passwords, permissions',
      '',
      '### Utility programs',
      'Small programs that maintain and protect the computer:',
      '- **Antivirus** — finds and removes malware',
      '- **Backup** — copies files in case of loss',
      '- **Disk defragmenter** — reorganises files on a hard disk so they load faster',
      '- **Compression** — makes files smaller',
      '- **Firewall** — controls network traffic'
    ],
    example: ['Task                                   -> Who does it?', 'Deciding which program uses the CPU    -> Operating system', 'Making a copy of your files each night  -> Backup utility', 'Zipping a folder to email it            -> Compression utility'],
    note: 'Examples of operating systems: Windows, macOS, Linux, Android, iOS, ChromeOS.',
    questions: [
      ['Which is a task of the operating system?', 'Managing memory and running programs', 'Writing an essay', 'Editing photos', 'Playing music only', 'A'],
      ['What is a utility program?', 'A program that helps maintain or protect the computer', 'A game', 'A web page', 'A type of cable', 'A'],
      ['Which utility makes files smaller?', 'Backup', 'Compression', 'Defragmenter', 'Antivirus', 'B'],
      ['What does a device driver do?', 'Lets the OS communicate with a hardware device', 'Drives a car', 'Removes viruses', 'Creates passwords', 'A'],
      ['Which utility makes a copy of files in case the originals are lost?', '', '', '', '', 'backup|backup utility|back up']
    ] },

  { key: 'g7-8.3-2', grade: '7', unit: U3, order: 2, title: 'How characters are stored: ASCII',
    bookRef: B + 'Unit 8.3, pp. 67–68',
    objectives: [
      'Explain how characters entered into a computer are stored in ASCII format',
      'Convert characters to ASCII codes and binary',
      'Explain why ASCII codes are stored using 8 bits'
    ],
    explanation: [
      'When you press a key, the computer stores a **number code** for that character. **ASCII** (American Standard Code for Information Interchange) is a code that gives every keyboard character a number.',
      '',
      '- ASCII is a **7-bit** code (128 characters), but each code is stored in **8 bits (1 byte)** — the extra bit was originally used for error checking.',
      '- `A` = 65 = `01000001`',
      '- `a` = 97 = `01100001`',
      '- `0` (the digit) = 48 = `00110000`',
      '- space = 32 = `00100000`',
      '',
      'Capital letters run in order from 65 to 90; lowercase letters from 97 to 122. So the word `Hi` is stored as `01001000 01101001`.',
      '',
      '**Unicode** extends ASCII to store characters from every language, including Vietnamese letters such as ă, ơ and ư.'
    ],
    syntax: ['ord("A")   # character -> code: 65', 'chr(66)    # code -> character: "B"'],
    example: ['word = "Hi"', 'for letter in word:', '    code = ord(letter)', '    print(letter, code, format(code, "08b"))', '# H 72 01001000', '# i 105 01101001'],
    note: 'The number 7 and the character "7" are stored differently: the character uses ASCII code 55.',
    questions: [
      ['What does ASCII do?', 'Gives each keyboard character a number code', 'Compresses images', 'Encrypts passwords', 'Connects networks', 'A'],
      ['How many bits are used to STORE each ASCII character?', '4', '7', '8', '16', 'C'],
      ['The ASCII code for A is 65. What is the code for C?', '66', '67', '68', '99', 'B'],
      ['Which code system can store characters from all languages, including Vietnamese?', 'ASCII only', 'Unicode', 'Binary only', 'RLE', 'B'],
      ['The ASCII code for a is 97. What is the ASCII code for b?', '', '', '', '', '98']
    ] },

  { key: 'g7-8.3-3', grade: '7', unit: U3, order: 3, title: 'Converting between binary and denary',
    bookRef: B + 'Unit 8.3, pp. 69–76',
    objectives: [
      'Explain what denary (base 10) and binary (base 2) mean',
      'Convert an 8-bit binary number to denary',
      'Convert a denary number (0–255) to 8-bit binary'
    ],
    explanation: [
      '- **Denary** (base 10) uses ten digits 0–9; each place is worth 10 times the one to its right.',
      '- **Binary** (base 2) uses two digits 0 and 1; each place is worth **2 times** the one to its right.',
      '',
      '### 8-bit place values',
      '`128 | 64 | 32 | 16 | 8 | 4 | 2 | 1`',
      '',
      '### Binary → denary',
      'Add the place values that have a 1. `10010110` = 128 + 16 + 4 + 2 = **150**.',
      '',
      '### Denary → binary (subtraction method)',
      'Start at 128. If the place value fits into what is left, write 1 and subtract it; otherwise write 0. Move right.',
      '`77`: 128 no (0) · 64 yes (1, left 13) · 32 no (0) · 16 no (0) · 8 yes (1, left 5) · 4 yes (1, left 1) · 2 no (0) · 1 yes (1) → `01001101`.',
      '',
      'With 8 bits the smallest number is 0 and the largest is 255.'
    ],
    syntax: ['place values: 128 64 32 16 8 4 2 1', 'int("binary", 2)   # binary -> denary', 'format(n, "08b")   # denary -> 8-bit binary'],
    example: ['print(int("10010110", 2))   # 150', 'print(format(77, "08b"))      # 01001101', '', 'n = int(input("Denary number (0-255): "))', 'print(n, "in binary is", format(n, "08b"))'],
    note: 'Check your answer by converting it back the other way.',
    questions: [
      ['What is binary 00001111 in denary?', '15', '16', '8', '1111', 'A'],
      ['What is denary 10 in 8-bit binary?', '00001010', '00000110', '00010000', '00001100', 'A'],
      ['What is the largest number that can be stored in 8 bits?', '128', '256', '255', '100', 'C'],
      ['What is binary 10000001 in denary?', '129', '128', '65', '2', 'A'],
      ['Convert denary 77 into 8-bit binary.', '', '', '', '', '01001101|1001101']
    ] },

  { key: 'g7-8.3-4', grade: '7', unit: U3, order: 4, title: 'Truth tables for AND, OR and NOT gates',
    bookRef: B + 'Unit 8.3, pp. 76–77',
    objectives: [
      'Create truth tables for AND, OR and NOT gates',
      'Use a truth table to predict the output of a gate',
      'Relate logic gates to real-life decisions'
    ],
    explanation: [
      'A **truth table** lists every possible combination of inputs to a logic gate and the output for each one. With two inputs there are **4** combinations (00, 01, 10, 11).',
      '',
      '- **AND:** output 1 only when A **and** B are 1.',
      '- **OR:** output 1 when A **or** B (or both) is 1.',
      '- **NOT:** one input; output is the opposite.',
      '',
      'Real-life example: a car alarm sounds if (door opened **OR** window broken) **AND** the alarm is switched on.'
    ],
    example: ['A B | A AND B | A OR B', '0 0 |    0    |   0', '0 1 |    0    |   1', '1 0 |    0    |   1', '1 1 |    1    |   1', '', 'A | NOT A', '0 |   1', '1 |   0'],
    note: 'Python can check truth tables: `print(True and False)` shows False; `print(True or False)` shows True.',
    questions: [
      ['How many rows of inputs does a two-input truth table have?', '2', '3', '4', '8', 'C'],
      ['A = 1, B = 1. What is A AND B?', '0', '1', '2', '11', 'B'],
      ['A = 0, B = 0. What is A OR B?', '0', '1', '2', '00', 'A'],
      ['A = 0. What is NOT A?', '0', '1', '2', 'None', 'B'],
      ['Which gate gives an output of 1 when at least one input is 1?', '', '', '', '', 'OR|or|or gate']
    ] },

  { key: 'g7-8.3-5', grade: '7', unit: U3, order: 5, title: 'Primary memory: RAM and ROM',
    bookRef: B + 'Unit 8.3, pp. 78–79',
    objectives: [
      'Describe how primary memory such as RAM and ROM is used in a digital device',
      'Explain the difference between volatile and non-volatile memory',
      'Compare primary memory with secondary storage'
    ],
    explanation: [
      '**Primary memory** is directly accessed by the CPU.',
      '',
      '### RAM (Random Access Memory)',
      '- Holds the programs and data **currently in use**',
      '- Can be read and written',
      '- **Volatile** — everything is lost when the power is switched off',
      '- More RAM lets you run more programs at once',
      '',
      '### ROM (Read Only Memory)',
      '- Holds the instructions needed to **start up** the computer (the BIOS / boot program)',
      '- Can only be read, not changed by the user',
      '- **Non-volatile** — keeps its contents without power',
      '',
      '### Secondary storage',
      'Hard disks, SSDs and USB drives keep your files permanently (non-volatile), but are slower than RAM.'
    ],
    example: ['Opening a game:', '  1. The game is copied from the SSD (secondary storage) into RAM', '  2. The CPU runs it from RAM', '  3. Turn off without saving -> progress in RAM is lost'],
    note: '**Volatile** = needs power to keep data. A quick way to remember: RAM = "Really Annoying when Mains goes off".',
    questions: [
      ['Which memory loses its contents when the power is turned off?', 'ROM', 'RAM', 'SSD', 'USB drive', 'B'],
      ['What does ROM usually store?', 'The start-up (boot) instructions', 'Your homework files', 'Web pages you are viewing', 'Music downloads', 'A'],
      ['What does "non-volatile" mean?', 'Data is kept when the power is off', 'Data is lost when the power is off', 'Memory is very fast', 'Memory can explode', 'A'],
      ['Where are programs held while they are running?', 'ROM', 'RAM', 'The monitor', 'The keyboard', 'B'],
      ['What does the R-O-M in ROM stand for? (three words)', '', '', '', '', 'read only memory|read-only memory']
    ] },

  { key: 'g7-8.3-6', grade: '7', unit: U3, order: 6, title: 'Compression and run-length encoding',
    bookRef: B + 'Unit 8.3, pp. 80–82, 86–88',
    objectives: [
      'Explain the term compression and why it is used',
      'Describe lossy and lossless compression',
      'Use run-length encoding (RLE) to compress a simple image'
    ],
    explanation: [
      '**Compression** reduces the number of bits needed to store a file.',
      '',
      '### Why compress?',
      '- Files take up less storage space',
      '- Files transfer faster and use less bandwidth (cheaper mobile data, smoother video calls)',
      '',
      '### Two types',
      '- **Lossless:** the original file can be rebuilt exactly. Needed for text and program files (ZIP, PNG).',
      '- **Lossy:** some detail is permanently removed to make files much smaller. Used for photos, music and video (JPEG, MP3, MP4).',
      '',
      '### Run-length encoding (RLE)',
      'RLE is a lossless method that replaces a run of repeated values with a **count** and the **value**.',
      'A row of pixels `W W W W B B B W W` becomes `4W 3B 2W` — 9 values stored as 3 pairs.',
      '',
      'Disadvantage: compressed files must be **decompressed** before use, and lossy compression lowers quality.'
    ],
    example: ['row = "WWWWBBBWW"', 'encoded = ""', 'count = 1', 'for i in range(1, len(row) + 1):', '    if i < len(row) and row[i] == row[i - 1]:', '        count += 1', '    else:', '        encoded += str(count) + row[i - 1] + " "', '        count = 1', 'print(encoded)   # 4W 3B 2W'],
    note: 'RLE works best on images with large areas of the same colour. A photo with many different colours may not shrink at all.',
    questions: [
      ['What is compression?', 'Reducing the number of bits needed to store a file', 'Making a file larger', 'Encrypting a file', 'Printing a file', 'A'],
      ['Which compression type allows the original file to be rebuilt exactly?', 'Lossy', 'Lossless', 'Both', 'Neither', 'B'],
      ['Which file type usually uses lossy compression?', 'A text document', 'A JPEG photo', 'A program file', 'A spreadsheet', 'B'],
      ['Using RLE, how is BBBBBWW encoded?', '5B2W', '2B5W', 'B5W2', '7BW', 'A'],
      ['Encode this row using RLE (no spaces): WWWBBW', '', '', '', '', '3W2B1W|3w2b1w']
    ] },

  { key: 'g7-8.3-7', grade: '7', unit: U3, order: 7, title: 'Machine learning, robotics and augmented reality',
    bookRef: B + 'Unit 8.3, pp. 83–85',
    objectives: [
      'Explain the term machine learning',
      'Describe how autonomous programming and AI support robotics in industry',
      'Identify how augmented reality (AR) is used in education, gaming and robotics'
    ],
    explanation: [
      '### Machine learning',
      '**Machine learning** is when an AI system uses data to make decisions or predictions **without a human writing every rule**. It improves as it sees more data. Examples: map apps estimating shop opening times from visitor patterns, recommendation systems, spam filters.',
      '',
      '### Robotics and autonomous programming',
      'An **autonomous** robot uses sensors and AI to make its own decisions. Examples: warehouse robots that pick items, self-driving vehicles, robot vacuum cleaners, farming robots that spot weeds.',
      '',
      '### Augmented reality (AR)',
      'AR **adds digital images on top of the real world**, seen through a phone camera or AR glasses. (Virtual reality, VR, replaces the real world completely.)',
      '- **Education:** 3D models of the human body or planets on your desk',
      '- **Gaming:** characters appearing in your street (e.g. Pokémon GO)',
      '- **Robotics/industry:** showing engineers repair instructions over a real machine; controlling robots remotely'
    ],
    example: ['Traditional program: IF email contains "win money" THEN spam   (human writes the rule)', 'Machine learning:   learns from 100,000 labelled emails which patterns mean spam'],
    note: 'AR = real world + digital layer. VR = fully digital world.',
    questions: [
      ['What is machine learning?', 'An AI system learning from data to make decisions without every rule being programmed', 'Repairing machines', 'Typing code faster', 'A type of cable', 'A'],
      ['What does augmented reality do?', 'Adds digital images on top of the real world', 'Replaces the real world completely', 'Prints 3D objects', 'Turns off the camera', 'A'],
      ['What makes a robot autonomous?', 'It uses sensors and AI to make its own decisions', 'It is remote-controlled by a person at all times', 'It has no power', 'It cannot move', 'A'],
      ['Which is an example of AR in education?', 'A 3D model of the heart appearing on a desk through a tablet', 'A paper textbook', 'A calculator', 'A whiteboard pen', 'A'],
      ['Which technology replaces the real world with a fully digital one? (two-letter abbreviation)', '', '', '', '', 'VR|vr|virtual reality']
    ] },

  /* ======================= UNIT 8.4 ======================= */
  { key: 'g7-8.4-1', grade: '7', unit: U4, order: 1, title: 'Decomposition and iterative development',
    bookRef: B + 'Unit 8.4, pp. 96–100',
    objectives: [
      'Decompose a problem into smaller sub-problems to make it easier to solve',
      'Describe an iterative development process',
      'Follow and understand an algorithm presented as pseudocode'
    ],
    explanation: [
      '**Decomposition** means breaking a big problem into smaller sub-problems. Each part is easier to understand, code and test.',
      '',
      'A football game could be decomposed into: player movement · ball physics · scoring · timer · sound effects · menus.',
      '',
      '### Iterative development',
      'Instead of writing the whole program at once, you build it in **cycles (iterations)**:',
      '1. **Plan** a small part',
      '2. **Code** it',
      '3. **Test** it',
      '4. **Evaluate** and improve',
      '5. Repeat, adding the next part (version 1 → version 2 → …)',
      '',
      'Saving each version (`QuizGameV1.py`, `QuizGameV2.py`) means you can go back if something breaks.'
    ],
    example: ['Quiz game decomposed:', '  1. Welcome screen and player name', '  2. Choose a room (pathway)', '  3. Ask questions in that room', '  4. Keep score', '  5. Show final score / high score'],
    note: 'Decomposition is one of the four computational thinking skills: decomposition, pattern recognition, abstraction and algorithm design.',
    questions: [
      ['What is decomposition?', 'Breaking a problem into smaller sub-problems', 'Removing all errors', 'Combining programs', 'Encrypting data', 'A'],
      ['What happens in iterative development?', 'The program is built and improved in repeated cycles', 'The program is written once and never tested', 'Only the design is made', 'Testing is skipped', 'A'],
      ['Why save versions such as QuizGameV1 and QuizGameV2?', 'You can go back to an earlier working version', 'To use more storage', 'Python requires it', 'To hide the code', 'A'],
      ['Which is a sensible sub-problem for a platform game?', 'Making the character jump', 'Buying a computer', 'Choosing a school', 'Turning on the lights', 'A'],
      ['Each repeated cycle of plan, code, test and improve is called an…', '', '', '', '', 'iteration']
    ] },

  { key: 'g7-8.4-2', grade: '7', unit: U4, order: 2, title: 'Conditional statements in Python: if, elif and else',
    bookRef: B + 'Unit 8.4, pp. 100–106',
    objectives: [
      'Create a Python program that uses the conditional statement IF-ELSE',
      'Use elif to test several conditions in order',
      'Use comparison operators correctly'
    ],
    explanation: [
      'Conditional statements let a program follow different paths.',
      '',
      '- `if` tests the first condition',
      '- `elif` ("else if") tests another condition only if the earlier ones were False',
      '- `else` runs when none of the conditions were True',
      '',
      'Python checks the conditions **from top to bottom** and runs only the **first** block whose condition is True.',
      '',
      '### Comparison operators',
      '`==` equal · `!=` not equal · `<` · `>` · `<=` · `>=`',
      '',
      '### Rules to remember',
      '- A colon `:` ends every `if`, `elif` and `else` line',
      '- The code inside each block is indented by 4 spaces'
    ],
    syntax: ['if condition:', '    ...', 'elif other_condition:', '    ...', 'else:', '    ...'],
    example: ['height = int(input("Your height in cm: "))', 'if height >= 140:', '    print("You can ride the roller coaster!")', 'elif height >= 120:', '    print("You can ride with an adult.")', 'else:', '    print("Sorry, you are not tall enough yet.")'],
    note: 'Order matters: if you test `>= 120` before `>= 140`, someone 150 cm tall would get the wrong message.',
    questions: [
      ['What does elif mean?', 'else if — test another condition', 'end if', 'exit loop', 'error if', 'A'],
      ['What punctuation must end an if line in Python?', ';', ':', '.', ',', 'B'],
      ['height = 130. Using the example, what is printed?', 'You can ride the roller coaster!', 'You can ride with an adult.', 'Sorry, you are not tall enough yet.', 'Nothing', 'B'],
      ['Which operator means "not equal to"?', '<>', '=!', '!=', '!==', 'C'],
      ['temp = 8. What does this print? if temp < 10: print("Coat") else: print("No coat")', '', '', '', '', 'Coat|coat']
    ] },

  { key: 'g7-8.4-3', grade: '7', unit: U4, order: 3, title: 'Data types, casting and constants in Python',
    bookRef: B + 'Unit 8.4, pp. 103–108',
    objectives: [
      'Identify and describe the data types in a Python program',
      'Create a program that uses a range of different data types',
      'Use a constant for a value that does not change'
    ],
    explanation: [
      '### Data types',
      '- `int` — whole numbers: `15`',
      '- `float` — decimal numbers: `36.6`',
      '- `str` — text: `"Lan"`',
      '- `bool` — `True` or `False`',
      '',
      '`input()` returns a **string**, so cast it: `int(input(…))` or `float(input(…))`.',
      '',
      '### Constants',
      'A **constant** is a named value that does **not change** while the program runs. In Python we show a constant by writing its name in **UPPER CASE**, e.g. `MINIMUM_AGE = 8`.',
      '',
      'If the rule changes, you update the constant in one place instead of hunting through the whole program.',
      '',
      '`exit()` stops a program immediately — useful if, for example, a player is too young to continue.'
    ],
    syntax: ['CONSTANT_NAME = value', 'variable = int(input("…"))'],
    example: ['MINIMUM_AGE = 8          # constant', '', 'name = input("Name: ")                    # str', 'age = int(input("Age: "))                 # int', 'if age < MINIMUM_AGE:', '    print("Sorry", name, "- you are too young.")', '    exit()', 'ready = True                              # bool', 'print("Welcome,", name)'],
    note: 'Python does not stop you changing an UPPER_CASE variable — the capital letters are a convention that tells other programmers "do not change this".',
    questions: [
      ['Which data type stores True or False?', 'int', 'str', 'bool', 'float', 'C'],
      ['What data type is 36.6?', 'int', 'float', 'str', 'bool', 'B'],
      ['What is a constant?', 'A named value that does not change while the program runs', 'A value that changes every second', 'A type of loop', 'A syntax error', 'A'],
      ['How are constants usually named in Python?', 'in lowercase', 'In UPPER CASE', 'With numbers only', 'With spaces', 'B'],
      ['Which function stops a Python program immediately? Type it with brackets.', '', '', '', '', 'exit()|exit|quit()|sys.exit()']
    ] },

  { key: 'g7-8.4-4', grade: '7', unit: U4, order: 4, title: 'Combining conditions with AND, OR and NOT in Python',
    bookRef: B + 'Unit 8.4, pp. 113–117',
    objectives: [
      'Explain and use the rules AND, OR and NOT to create logic within an algorithm',
      'Develop a Python program that uses and, or and not',
      'Predict the result of a combined condition'
    ],
    explanation: [
      'Real decisions often depend on more than one thing.',
      '',
      '- `and` — **both** conditions must be True',
      '- `or` — **at least one** condition must be True',
      '- `not` — reverses True and False',
      '',
      '### Examples',
      '- Pass the level if `score >= 50 and time_left > 0`',
      '- Accept the answer if `answer == "Paris" or answer == "paris"`',
      '- Keep playing while `not game_over`',
      '',
      'Write each comparison in full: `if x > 5 and x < 10` ✓ — **not** `if x > 5 and < 10` ✗.'
    ],
    syntax: ['if condition1 and condition2:', 'if condition1 or condition2:', 'if not condition:'],
    example: ['answer = input("What is the capital of Vietnam? ")', 'if answer == "Hanoi" or answer == "Ha Noi":', '    print("Correct!")', 'else:', '    print("The answer is Hanoi.")', '', 'age = int(input("Age: "))', 'if age >= 11 and age <= 14:', '    print("You are in the Lower Secondary age range.")'],
    note: '`.lower()` changes text to lowercase, so `answer.lower() == "hanoi"` accepts "Hanoi", "HANOI" and "hanoi".',
    questions: [
      ['score = 60, time_left = 0. Is "score >= 50 and time_left > 0" True?', 'True', 'False', 'Error', 'Sometimes', 'B'],
      ['answer = "Ha Noi". Is answer == "Hanoi" or answer == "Ha Noi" True?', 'True', 'False', 'Error', 'Only if both match', 'A'],
      ['game_over = False. What is not game_over?', 'True', 'False', 'None', 'Error', 'A'],
      ['Which line correctly checks if x is between 5 and 10?', 'if x > 5 and < 10:', 'if x > 5 and x < 10:', 'if 5 < x or x < 10:', 'if x > 5 not x < 10:', 'B'],
      ['Which keyword requires BOTH conditions to be True?', '', '', '', '', 'and']
    ] },

  { key: 'g7-8.4-5', grade: '7', unit: U4, order: 5, title: 'Sub-programs: building a quiz game',
    bookRef: B + 'Unit 8.4, pp. 108–117',
    objectives: [
      'Decompose a game into sub-programs',
      'Define and call a sub-program that returns a value',
      'Develop a Python program using an iterative process'
    ],
    explanation: [
      'A **sub-program** (function) is a named block of code that does one job. In the quiz game, each "room" can be its own sub-program.',
      '',
      '- `def room_name():` defines it',
      '- `room_name()` calls it',
      '- `return value` sends a result back to the main program',
      '',
      'The main program can store the returned value: `score = anagram_room()`.',
      '',
      '### Why use sub-programs?',
      '- Each room can be written and tested separately',
      '- The main program stays short and easy to read',
      '- Code can be reused'
    ],
    syntax: ['def name():', '    ...', '    return value', '', 'result = name()'],
    example: ['def anagram_room():', '    score = 0', '    answer = input("Unscramble: TOHPYN ")', '    if answer.upper() == "PYTHON":', '        score = score + 1', '    return score', '', 'def world_room():', '    score = 0', '    answer = input("Largest ocean? ")', '    if answer.lower() == "pacific":', '        score = score + 1', '    return score', '', 'room = int(input("Choose room 1 or 2: "))', 'if room == 1:', '    score = anagram_room()', 'elif room == 2:', '    score = world_room()', 'print("Your score:", score)'],
    note: 'A variable created inside a sub-program only exists inside it. Use `return` to pass the value out.',
    questions: [
      ['Which keyword defines a sub-program in Python?', 'sub', 'def', 'function', 'make', 'B'],
      ['What does return do?', 'Sends a value back to where the sub-program was called', 'Restarts the program', 'Deletes a variable', 'Prints an error', 'A'],
      ['How do you call a sub-program named world_room?', 'call world_room', 'world_room()', 'def world_room', 'run(world_room)', 'B'],
      ['Why split a game into sub-programs?', 'Each part can be written and tested separately', 'It makes the program impossible to read', 'Python requires exactly two', 'To avoid using variables', 'A'],
      ['A named block of code that performs one task is called a sub-___. Type the missing word.', '', '', '', '', 'program|routine|programme']
    ] },

  { key: 'g7-8.4-6', grade: '7', unit: U4, order: 6, title: 'Program libraries: random and turtle',
    bookRef: B + 'Unit 8.4, pp. 117–125',
    objectives: [
      'Explain why programming languages use libraries',
      'Identify and use library functions in Python programs',
      'Use random.randint() and turtle commands'
    ],
    explanation: [
      'A **library** is a collection of ready-made code that other programmers have written and tested. You **import** it and use its functions instead of writing them yourself — saving time and avoiding errors.',
      '',
      '### random',
      '- `random.randint(1, 6)` → a random whole number from 1 to 6 (both included)',
      '- `random.choice(list)` → a random item from a list',
      '',
      '### turtle',
      'Draws shapes by moving a "turtle" around the screen:',
      '- `forward(100)`, `backward(50)`, `right(90)`, `left(120)`, `penup()`, `pendown()`, `color("red")`',
      '',
      'A triangle needs 3 sides and turns of **120°** (360 ÷ 3).'
    ],
    syntax: ['import random', 'number = random.randint(low, high)', '', 'import turtle', 't = turtle.Turtle()', 't.forward(distance)', 't.right(angle)'],
    example: ['import random', '', 'secret = random.randint(1, 10)', 'guess = int(input("Guess my number (1-10): "))', 'if guess == secret:', '    print("Correct!")', 'else:', '    print("No, it was", secret)'],
    note: 'Turtle opens a drawing window, so it works in IDLE or Thonny but not in every online editor.',
    questions: [
      ['What is a program library?', 'A collection of pre-written code you can import and use', 'A room full of books', 'A list of variables', 'An error log', 'A'],
      ['What can random.randint(1, 6) return?', 'Any whole number from 1 to 6', 'Only 1 or 6', 'A decimal between 1 and 6', 'Always 3', 'A'],
      ['Which line is needed before using randint?', 'include random', 'import random', 'using random', 'get random', 'B'],
      ['To draw a triangle with turtle, how many degrees should it turn at each corner?', '60', '90', '120', '180', 'C'],
      ['Which Python library draws shapes by moving a pen around the screen?', '', '', '', '', 'turtle']
    ] },

  /* ======================= UNIT 8.5 ======================= */
  { key: 'g7-8.5-1', grade: '7', unit: U5, order: 1, title: 'Data models and simulations',
    bookRef: B + 'Unit 8.5, pp. 127–130',
    objectives: [
      'Explain the difference between a data model and a simulation',
      'Understand the key features of both',
      'Identify the data needed for a model of a real-life scenario'
    ],
    explanation: [
      '- A **data model** is a digital representation of a real-life scenario. It stores the **data items** (attributes) and the **relationships/formulas** between them. Example: a spreadsheet of a school trip budget.',
      '- A **simulation** uses a model to **imitate how a system behaves over time** or under different conditions, often visually. Example: a flight simulator, a traffic-light simulation, a weather simulation.',
      '',
      '### Key features',
      '- Models: data, rules/formulas, can answer what-if questions',
      '- Simulations: run the model, show changes over time, let users interact safely',
      '',
      '### Identifying the data',
      'Ask: what does the user need to know? For a school library model you might need: book ID, title, author, borrower, date borrowed, due date.'
    ],
    example: ['Data model: spreadsheet calculating trip cost = bus + tickets + food', 'Simulation: game showing how many students leave the canteen each minute at lunchtime'],
    note: 'Every simulation is built on a model, but not every model is a simulation.',
    questions: [
      ['What is a data model?', 'A digital representation of a real-life scenario using data and rules', 'A photograph', 'A computer virus', 'A network cable', 'A'],
      ['What does a simulation do?', 'Uses a model to imitate how a system behaves over time or under different conditions', 'Stores passwords', 'Prints reports', 'Deletes data', 'A'],
      ['Which is an example of a simulation?', 'A flight simulator for training pilots', 'A list of names', 'A printed timetable', 'A USB stick', 'A'],
      ['Which data is needed for a library loans model?', 'Book ID, borrower and due date', 'Favourite colour', 'Weather forecast', 'Shoe size', 'A'],
      ['True or false: every simulation is built on a model.', '', '', '', '', 'true|t']
    ] },

  { key: 'g7-8.5-2', grade: '7', unit: U5, order: 2, title: 'Designing a good database structure',
    bookRef: B + 'Unit 8.5, pp. 131–138',
    objectives: [
      'Identify the data needed for a database application',
      'Use atomic fields, suitable data types and field sizes',
      'Evaluate the design of an existing database structure'
    ],
    explanation: [
      'A well-designed database matches the real-world problem and meets the user\'s needs.',
      '',
      '### Atomic data',
      'Break data into the **smallest useful parts**. Store `FirstName` and `LastName` separately (not one `Name` field), and split an address into street, city and postcode. Atomic fields make it easy to sort and search.',
      '',
      '### Data types and field sizes',
      '- Short text (with a sensible field size, e.g. 30 characters for a name)',
      '- Number, Currency, Date/Time, Yes/No',
      '- Phone numbers are stored as **text** (they can start with 0 and you never do maths with them).',
      '',
      '### Lookup lists',
      'A **lookup list** (drop-down) lets users pick from fixed values, e.g. Instrument: Piano / Guitar / Violin — keeping data consistent.',
      '',
      '### Primary key',
      'A unique field for each record, e.g. `StudentID`.'
    ],
    example: ['Poor design:  Name = "Nguyen Van An", Phone = 912345678 (number)', 'Good design:  FirstName = "An", LastName = "Nguyen", Phone = "0912345678" (text)'],
    note: 'A **data dictionary** documents each field: name, data type, field size, validation and description.',
    questions: [
      ['What does atomic data mean?', 'Data broken down into the smallest useful parts', 'Data about atoms', 'Encrypted data', 'Compressed data', 'A'],
      ['Which data type is best for a phone number like 0912345678?', 'Number', 'Text', 'Currency', 'Yes/No', 'B'],
      ['Why use a lookup list?', 'Users choose from fixed values, so data is consistent', 'To make the table longer', 'To delete records', 'To hide fields', 'A'],
      ['Which design is better?', 'One field: FullName', 'Two fields: FirstName and LastName', 'No name field', 'Name stored as a number', 'B'],
      ['A document that describes every field in a database is called a data ___. Type the missing word.', '', '', '', '', 'dictionary']
    ] },

  { key: 'g7-8.5-3', grade: '7', unit: U5, order: 3, title: 'Validation checks',
    bookRef: B + 'Unit 8.5, pp. 139–144',
    objectives: [
      'Explain the purpose of data validation',
      'Apply presence, range, length, type, format and lookup checks',
      'Test validation rules with suitable data'
    ],
    explanation: [
      '**Validation** is an automatic check that data entered is **sensible and reasonable** before it is accepted. Invalid data is rejected with an **error message**.',
      '',
      '- **Presence check:** the field cannot be left empty (e.g. Surname)',
      '- **Range check:** the value must be between limits (e.g. Grade 1–8, score 0–100)',
      '- **Length check:** a set number of characters (e.g. password at least 8)',
      '- **Type check:** the right data type (e.g. age must be a number)',
      '- **Format check:** a set pattern (e.g. date DD/MM/YYYY, ID like ST001)',
      '- **Lookup check:** the value must be in a list (e.g. Mon–Fri)',
      '',
      'Validation **cannot** prove data is correct — 15 is a valid age, but the student might really be 14. Checking data is *correct* is called **verification** (e.g. double entry or proofreading).'
    ],
    syntax: ['Validation rule (Access):  Between 0 And 100', 'Validation text:          "Please enter a score from 0 to 100"'],
    example: ['score = input("Score (0-100): ")', 'if score == "":', '    print("Presence check failed")', 'elif not score.isdigit():', '    print("Type check failed")', 'elif int(score) < 0 or int(score) > 100:', '    print("Range check failed")', 'else:', '    print("Accepted")'],
    note: 'In Access, a validation rule like `>=Date()` stops someone booking a session in the past.',
    questions: [
      ['Which check makes sure a field is not left empty?', 'Range check', 'Presence check', 'Length check', 'Format check', 'B'],
      ['A score must be between 0 and 100. Which check is this?', 'Format check', 'Range check', 'Presence check', 'Lookup check', 'B'],
      ['A password must be at least 8 characters. Which check is this?', 'Length check', 'Type check', 'Range check', 'Presence check', 'A'],
      ['Can validation prove that data is correct?', 'Yes, always', 'No, it only checks data is sensible and reasonable', 'Only for numbers', 'Only for dates', 'B'],
      ['Which check makes sure a date matches the pattern DD/MM/YYYY? (two words)', '', '', '', '', 'format check|format']
    ] },

  { key: 'g7-8.5-4', grade: '7', unit: U5, order: 4, title: 'Input masks and data-capture forms',
    bookRef: B + 'Unit 8.5, pp. 145–148, 155–158',
    objectives: [
      'Add input masks to a database structure',
      'Design a data-capture form to collect data for a model',
      'Evaluate the suitability of data collected in a database'
    ],
    explanation: [
      '### Input masks',
      'An **input mask** controls exactly what can be typed into a field, character by character. It carries out **format** and **length** checks together.',
      '',
      'In Microsoft Access:',
      '- `0` = a digit is required · `9` = a digit is optional',
      '- `L` = a letter is required · `?` = a letter is optional',
      '- `>` = convert to UPPER CASE',
      '',
      'Example: `>LL000` accepts `ST123` but rejects `S1234`.',
      '',
      '### Data-capture forms',
      'A good form has: a clear title and instructions, atomic field labels, hints/examples, drop-down lists and tick boxes, validation, and a logical order. It shows **one record** at a time, so data entry is quicker and has fewer mistakes than typing into a table.'
    ],
    syntax: ['0  digit required      9  digit optional', 'L  letter required     ?  letter optional', '>  convert to uppercase', 'Example mask for a student ID: >LL000'],
    example: ['Field          Input mask      Accepts       Rejects', 'StudentID      >LL000          ST123         S1234', 'Phone          0000 000 000    0912 345 678  091 23', 'DateOfBirth    00/00/0000      02/03/2013    2/3/13'],
    note: 'Input masks stop the wrong format being typed at all; validation rules reject wrong values after they are typed.',
    questions: [
      ['What does an input mask do?', 'Controls the pattern of characters that can be entered', 'Hides the data', 'Encrypts the field', 'Deletes the record', 'A'],
      ['In Access, what does 0 mean in an input mask?', 'A digit is required', 'A letter is required', 'Nothing', 'Convert to uppercase', 'A'],
      ['Which value matches the input mask LL000?', 'AB123', '12ABC', 'A1234', 'ABCDE', 'A'],
      ['Which is a feature of a good data-capture form?', 'Clear labels, hints and drop-down lists', 'No title', 'All fields squashed together', 'Tiny unreadable text', 'A'],
      ['In an Access input mask, which character means a letter is required?', '', '', '', '', 'L|l']
    ] },

  { key: 'g7-8.5-5', grade: '7', unit: U5, order: 5, title: 'Spreadsheet models, formulas and what-if analysis',
    bookRef: B + 'Unit 8.5, pp. 149–156',
    objectives: [
      'Create formulas that make meaningful links between data items',
      'Apply data validation in a spreadsheet',
      'Use what-if questions and scenarios to make predictions'
    ],
    explanation: [
      'A spreadsheet model links data items with **formulas**, so changing one value updates everything that depends on it.',
      '',
      '### Useful formulas',
      '- `=SUM(B2:B30)`, `=AVERAGE(C2:C30)`, `=MAX()`, `=MIN()`',
      '- `=COUNTIF(D2:D30,">=85")` counts students at or above 85%',
      '- `=IF(E2>=85,"Target met","Support")` shows a message based on a condition',
      '- `=B2*$H$1` uses an **absolute reference** (`$`) so the cell stays fixed when the formula is copied',
      '',
      '### Validation in a spreadsheet',
      'Data › Data validation can restrict a cell to a list or a number range.',
      '',
      '### What-if analysis',
      'Change input values to see what would happen: "What if the pass mark rose to 90?" **Scenarios** (Scenario Manager in Excel) save several sets of input values so you can compare them side by side.'
    ],
    syntax: ['=IF(condition, value_if_true, value_if_false)', '=COUNTIF(range, criteria)', '$A$1  -> absolute reference'],
    example: ['     A        B (Test 1)  C (Test 2)  D (Average)           E (Result)', '1    Pass mark: 85', '2    An       80          92          =AVERAGE(B2:C2)       =IF(D2>=$B$1,"Pass","Retry")', '3    Binh     70          75          =AVERAGE(B3:C3)       =IF(D3>=$B$1,"Pass","Retry")', '', 'What-if: change B1 from 85 to 75 and every Result updates.'],
    note: 'Putting the pass mark in its own cell (instead of typing 85 into every formula) is what makes what-if questions quick.',
    questions: [
      ['What does =IF(D2>=85,"Pass","Retry") show when D2 is 90?', 'Retry', 'Pass', '90', 'An error', 'B'],
      ['What does the $ in $B$1 do?', 'Keeps the reference fixed when the formula is copied', 'Converts to dollars', 'Deletes the cell', 'Makes the text bold', 'A'],
      ['What is what-if analysis?', 'Changing input values to see how the results change', 'Printing the spreadsheet', 'Deleting old data', 'Adding colours', 'A'],
      ['Which formula counts how many cells in D2:D30 are 85 or more?', '=SUM(D2:D30)', '=COUNTIF(D2:D30,">=85")', '=AVERAGE(D2:D30)', '=MAX(D2:D30)', 'B'],
      ['Which spreadsheet function returns the highest value in a range?', '', '', '', '', 'MAX|max|=MAX()|MAX()']
    ] },

  /* ======================= UNIT 8.6 ======================= */
  { key: 'g7-8.6-1', grade: '7', unit: U6, order: 1, title: 'Waterfall and iterative development',
    bookRef: B + 'Unit 8.6, pp. 163–168',
    objectives: [
      'Describe the stages of software development',
      'Compare the waterfall and iterative approaches',
      'Work with a client using an iterative process'
    ],
    explanation: [
      'Software projects move through stages: **analysis** (requirements) → **design** → **development** (coding) → **testing** → **evaluation**.',
      '',
      '### Waterfall model',
      'Like water falling, each stage is completed **once, in order**, before the next begins. Simple to manage, but if the client\'s needs change late on, going back is difficult and expensive.',
      '',
      '### Iterative model',
      'The stages are repeated in **cycles**. After each cycle the client sees a working version, gives feedback and the product improves. *Iteration means repetition.*',
      '',
      '- Pros: problems found early, client stays involved, easy to change',
      '- Cons: harder to predict the final cost and finish date'
    ],
    example: ['Waterfall:  Analyse -> Design -> Code -> Test -> Release   (one pass)', 'Iterative:  [Design -> Code -> Test -> Review] -> repeat until the client is happy'],
    note: 'In an exam, always link the advantage to the situation: iterative suits projects where the client is not sure exactly what they want.',
    questions: [
      ['In the waterfall model, stages are completed…', 'In repeated cycles', 'Once, one after another, in order', 'All at the same time', 'In random order', 'B'],
      ['What does iteration mean?', 'Repetition', 'Deletion', 'Encryption', 'Compression', 'A'],
      ['Which is an advantage of iterative development?', 'The client can give feedback after each version', 'It never needs testing', 'It is always cheaper', 'It has only one stage', 'A'],
      ['Which is a disadvantage of the waterfall model?', 'Late changes are difficult and expensive', 'It has too many cycles', 'The client sees too many versions', 'It cannot be planned', 'A'],
      ['Which development model is named after water flowing downwards?', '', '', '', '', 'waterfall|waterfall model']
    ] },

  { key: 'g7-8.6-2', grade: '7', unit: U6, order: 2, title: 'Designing a solution: requirements, layouts and structure diagrams',
    bookRef: B + 'Unit 8.6, pp. 169–175',
    objectives: [
      'Write a list of requirements for a program',
      'Design a user interface layout',
      'Create a structure diagram to decompose a problem'
    ],
    explanation: [
      '### Requirements',
      'A **requirement** is something the finished program must do. Good requirements are specific and testable: *"The quiz must ask 5 questions and show the final score out of 5."*',
      '',
      '### Interface layout',
      'Sketch each screen: where the title, questions, buttons and score will appear. Show the sketch to the client and improve it (iteration again!).',
      '',
      '### Structure diagrams',
      'A **structure diagram** breaks a program into smaller parts, drawn as a tree. The whole program is at the top; each level below splits it into smaller tasks.',
      '',
      '`Eco quiz` → `Choose difficulty` · `Ask questions` · `Show score`',
      '`Ask questions` → `Easy questions` · `Hard questions`'
    ],
    example: ['                 Eco Quiz', '        /           |            \\', ' Choose level   Ask questions   Show score', '                 /        \\', '             Easy Qs     Hard Qs'],
    note: 'Each box in a structure diagram can become a sub-program in the final code.',
    questions: [
      ['What is a requirement?', 'Something the finished program must do', 'A type of error', 'A data type', 'A Python library', 'A'],
      ['Which requirement is most testable?', 'The quiz should be nice', 'The quiz must ask 5 questions and show a score out of 5', 'The quiz should be fun', 'Make it good', 'B'],
      ['What does a structure diagram show?', 'How a program is broken down into smaller parts', 'The speed of the CPU', 'A network layout', 'A truth table', 'A'],
      ['Why sketch the interface before coding?', 'So the client can give feedback early', 'Because coding is not allowed', 'To make the program run faster', 'To avoid testing', 'A'],
      ['A diagram that breaks a program into smaller tasks in a tree shape is a ___ diagram.', '', '', '', '', 'structure']
    ] },

  { key: 'g7-8.6-3', grade: '7', unit: U6, order: 3, title: 'Writing a quiz algorithm in pseudocode',
    bookRef: B + 'Unit 8.6, pp. 174–179',
    objectives: [
      'Identify and explain the key characteristics of pseudocode',
      'Follow flowcharts and pseudocode that use conditional statements',
      'Use a Boolean operator to accept more than one correct answer'
    ],
    explanation: [
      'Before coding the eco quiz, plan it in pseudocode. Pseudocode does not need commas, colons or brackets — just clear steps.',
      '',
      '### One question, step by step',
      '1. Set the score to 0',
      '2. Ask the question and INPUT the answer into a variable',
      '3. IF the answer is correct THEN add 1 to the score and OUTPUT "Correct" ELSE OUTPUT the right answer',
      '4. Repeat for each question, then OUTPUT the score',
      '',
      '### Accepting alternative answers',
      'Use **OR** so either form of the answer is accepted: `IF answer = "450" OR answer = "450 years" THEN`.'
    ],
    syntax: ['score = 0', 'OUTPUT "Question"', 'INPUT answer', 'IF answer = "x" OR answer = "y" THEN', '    score = score + 1', '    OUTPUT "Correct"', 'ELSE', '    OUTPUT "The answer is x"', 'ENDIF', 'OUTPUT score'],
    example: ['score = 0', 'answer = input("Q1: How many years for a plastic bottle to decompose? ")', 'if answer == "450" or answer == "450 years":', '    score = score + 1', '    print("Correct")', 'else:', '    print("It takes about 450 years")', 'print("Score:", score)'],
    note: '`score = score + 1` can be shortened to `score += 1` in Python.',
    questions: [
      ['What should the score be set to at the start of a quiz?', '1', '0', '10', 'It does not matter', 'B'],
      ['Which pseudocode accepts both "450" and "450 years"?', 'IF answer = "450" AND answer = "450 years"', 'IF answer = "450" OR answer = "450 years"', 'IF NOT answer = "450"', 'IF answer = "450 years" ELSE', 'B'],
      ['Which line increases the score by 1?', 'score = 1', 'score = score + 1', 'score + 1 = score', 'score == score + 1', 'B'],
      ['Does pseudocode need exact punctuation such as colons and brackets?', 'Yes, always', 'No', 'Only colons', 'Only brackets', 'B'],
      ['score = 3. After score = score + 1, what is score?', '', '', '', '', '4|four']
    ] },

  { key: 'g7-8.6-4', grade: '7', unit: U6, order: 4, title: 'Variables, data types and rounding',
    bookRef: B + 'Unit 8.6, pp. 180–183, 189–192',
    objectives: [
      'Choose meaningful variable names',
      'Identify integer, float, string and Boolean data in a program',
      'Use round() and library functions to work with numbers'
    ],
    explanation: [
      'A **variable** is a temporary storage location in memory. Choose names that describe the data: `question1_answer`, `total_score`.',
      '',
      '### Data types in the quiz',
      '- `score` → **integer**',
      '- `percentage` → **float** (floating-point / real number)',
      '- `answer` → **string**',
      '- `correct` → **Boolean** (`True`/`False`)',
      '',
      '### Rounding',
      '`round(number, places)` rounds a float: `round(66.666, 1)` → `66.7`. `round(2.5)` with no places gives a whole number.',
      '',
      '### Useful libraries',
      '- `random.random()` → a random float between 0 and 1',
      '- `time.sleep(1)` → pause for 1 second (e.g. a "3, 2, 1, Go" countdown)'
    ],
    syntax: ['round(number, decimal_places)', 'import time', 'time.sleep(seconds)'],
    example: ['import time', '', 'for n in ["3", "2", "1"]:', '    print(n)', '    time.sleep(1)', 'print("Go!")', '', 'score = 2', 'total = 3', 'percentage = round(score / total * 100, 1)', 'print("You scored", percentage, "%")   # 66.7 %'],
    note: '`score / total` always gives a float in Python, even when both are integers.',
    questions: [
      ['What is round(7.456, 1)?', '7.4', '7.5', '7.46', '7', 'B'],
      ['Which data type should store a percentage like 66.7?', 'Integer', 'Float', 'Boolean', 'String', 'B'],
      ['Which is the most meaningful variable name for a player\'s total score?', 'x', 'ts1', 'total_score', 'a', 'C'],
      ['What does time.sleep(1) do?', 'Pauses the program for 1 second', 'Ends the program', 'Shows the time', 'Restarts the computer', 'A'],
      ['What is round(3.14159, 2)? Type the number.', '', '', '', '', '3.14']
    ] },

  { key: 'g7-8.6-5', grade: '7', unit: U6, order: 5, title: 'Testing, reviewing and evaluating a program',
    bookRef: B + 'Unit 8.6, pp. 184–188',
    objectives: [
      'Develop and apply a test plan to ensure a program works correctly',
      'Review a program against its requirements',
      'Evaluate a program and suggest improvements'
    ],
    explanation: [
      '### Testing during development',
      'Test each section **as soon as it is written** (iterative testing), then test the whole program at the end (final testing).',
      '',
      '### Test plan',
      'Include normal, alternative and wrong answers. For the eco quiz: "450" → Correct; "450 years" → Correct; "100" → shows the correct answer; blank → handled sensibly.',
      '',
      '### Review and evaluate',
      'Go back to the **requirements**: is each one met? Then evaluate:',
      '- What works well?',
      '- What does not work, or is hard to use?',
      '- What would you improve in the next iteration? (e.g. accept answers in any capital letters using `.lower()`)',
      '',
      'Ask a classmate or the client to test it too — other people find problems you miss.'
    ],
    syntax: ['Test | Requirement tested | Input | Expected | Actual | Pass/Fail | Action'],
    example: ['Test 1 | Accepts correct answer | "450"       | Correct            | Correct | Pass', 'Test 2 | Accepts alternative   | "450 years" | Correct            | Correct | Pass', 'Test 3 | Capital letters       | "450 YEARS" | Correct            | Wrong   | Fail -> use .lower()'],
    note: 'A failed test is useful: it tells you exactly what to fix in the next iteration.',
    questions: [
      ['When should each section of a program be tested in iterative development?', 'Only at the very end', 'As soon as it is written', 'Never', 'Only by the client', 'B'],
      ['What should an evaluation compare the program against?', 'The original requirements', 'Another student\'s favourite colour', 'The number of lines of code', 'The computer\'s speed', 'A'],
      ['A test fails because "450 YEARS" is marked wrong. What is a good fix?', 'Convert the answer to lowercase with .lower() before comparing', 'Delete the question', 'Remove testing', 'Make all answers wrong', 'A'],
      ['Why ask someone else to test your program?', 'They may find problems you missed', 'It is against the rules to test your own work', 'To make it slower', 'It is not useful', 'A'],
      ['Which Python string method converts text to lowercase? Type it with the dot and brackets.', '', '', '', '', '.lower()|lower()|lower|.lower']
    ] }

  );
})();
