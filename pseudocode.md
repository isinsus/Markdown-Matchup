
MODEL / STATES

- Start button
- 16 Cards:
    - heading 1  : # Markdown Matchup      |   (web view of the markdown)
    - heading 2  : ## Markdown Matchup     |   (web view of the markdown)
    - Bold       : **Markdown Matchup**    |   (web view of the markdown)
    - italics    : _Markdown Matchup_      |   (web view of the markdown)
    - bullets    : * Markdown * Matchup    |   (web view of the markdown)
    - numbers    : 1. Markdown 2. Matchup  |   (web view of the markdown)
    - link       : [Markdown Matchup]()    |   (web view of the markdown)
    - Code phrase: `Markdown Matchup`      |   (web view of the markdown)
- (optional) Time tracker to test your best time


VIEW
- Start button
- Card backs
- Card fronts
- Table background
- Text when done
- Congrats test
- (Optional) timer

PSEUDOCODE

EXAMPLE OF DATA STRUCTURE
Key object: {
'0' : 'back-of-card.img';
'1' : 'image1a.img'
'-1': 'image1b.img'
'2':
'-2' : 'image2b.img'
...}  to reference for the images

Card array = [2, -1, 1, -2,... ] to randomly sort the cards

Board array = [0,0,1,0,0,0,...]


1) Define required constants
    1.1) Define cards object = [ 0: back of card, 1: card1a.img, -1: card1b ...] with each pair being a
    positive and negative intigers keys.
    1.2) Cards array

2) Define required variables used to track the state of the game
    2.1) complete - all matches identified or not
    2.2) board array = [16 nulls] that will correspond to figure IDs
    2.3) turns (1 = don't do anything, -1 = compare cards)
    2.4) first card = card selected at turn 1
    2.5) second card = card selected at turn -1

3) Store elements on the page that will be accessed in code more than once
in variables to make code more concise, readable and performant.
    3.1) all the card figure elements
    3.2) the footer messages

4) Event listeners
    4.1) Clicking on a figure, run turn()

5) Upon loading the app should:
    5.1) Initialize the state variables
        5.1.1) Randomly sort properties in cards array.
                Turn board array to all 0
        5.1.2) Turn = 1
        5.1.3) Winner is null
        5.1.4) Render()

6) boardRender()
    6.1) Display cards on the table based on the board array and cards object image
        correlation.

- render and initialize are the same. Render is the visual start.
- Do by purpose

7) HandleTurn()
    7.1) If player is clicking on first card (which is turn 1), then
        7.1.1) change board number to the card key
        7.1.2) render()
        7.1.3) first card = card object key
        7.1.4) turn *= -1
    7.2) If player is clicking on second card (which is turn -1), then
        7.2.1) change board number to the card key
        7.2.2) second card = card
        7.2.3) render()
        7.2.4) compare cards()

8) Compare cards()
    8.1) If absolute number of key of first and second card match, then
        8.1.1) don't change board index number
        8.1.2) if board array has no 0, then complete()

    8.2) Else,
        8.2.1) Display "They don't match" message on footer
        8.2.2) wait 3 seconds so the user can see the don't match
        8.2.3) change board index numbers of first and second card to 0
        8.2.4) render()

9) Complete()
    9.1) Display "congrats you won. Click anywhere to restart" message.
    9.2) event listener for whole page to reset -> if clicked then initialize()



/*----- constants -----*/

/*----- app's state (variables) -----*/

/*----- cached element references -----*/

/*----- event listeners -----*/

/*----- functions -----*/