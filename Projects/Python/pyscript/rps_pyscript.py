from pyscript import document
from pyodide.ffi import create_proxy
from random import randint

display = document.getElementById('display')
inputField = document.getElementById('uinput')
inputBtn = document.getElementById('input-btn')

quit_greet = ['See you Soon!', 'Rate Us!', 'Leave Feedback!']
player_score = 0
bot_score = 0
total_rounds = 1
tied_rounds = 0
playing = True

def cout(text):
    parag = document.createElement("p")
    parag.textContent = f"{text}"
    display.appendChild(parag)

def disp_move(move, ptype):
    if move == "1":
        cout(f"{ptype}: 🪨")
    elif move == "2":
        cout(f"{ptype}: 📃")
    elif move == "3":
        cout(f"{ptype}: ✂️")

def showInput(event=None):
    userInput = inputField.value
    if userInput.lower() == "quit":
        cout("Closing Game, Thanks for Playing! :)")
        cout(quit_greet[randint(0, 2)])
        reset_game()
        return
    elif userInput.lower() == "reset":
        reset_game()
        return

    if userInput in ["1", "2", "3"]:
        player_move = userInput
        disp_move(userInput, "Player")

        bot_move = str(randint(1, 3))
        disp_move(bot_move, "Bot")

        determine_winner(player_move, bot_move)
        display_score()
    else:
        cout("Invalid input!  \nPlease enter [1] for Rock, [2] for Paper, or [3] for Scissors.")
    inputField.value = ""
    display.scrollTop = display.scrollHeight

def determine_winner(player_move, bot_move):
    global player_score, bot_score, tied_rounds

    if player_move == bot_move:
        cout("It's a Tie!")
        tied_rounds += 1
    elif (player_move == "1" and bot_move == "3") or (player_move == "2" and bot_move == "1") or (player_move == "3" and bot_move == "2"):
        cout("Player Wins!")
        player_score += 1
    else:
        cout("Bot Wins!")
        bot_score += 1

def display_score():
    global total_rounds
    win_rate = (player_score / total_rounds) * 100 if total_rounds > 0 else 0
    cout(f"[Round #{total_rounds} Scores]: Player - {player_score} | Bot - {bot_score} | Ties: {tied_rounds} | Win Rate: {win_rate:.2f}%")
    total_rounds += 1

def reset_game():
    global player_score, bot_score, tied_rounds, total_rounds
    player_score = 0
    bot_score = 0
    tied_rounds = 0
    total_rounds = 0
    cout("---===NEW GAME===---")
    display_score()
    inputField.value = ""
    display.scrollTop = display.scrollHeight

inputBtn.addEventListener("click", create_proxy(showInput))
def submitKey(event):
    if event.key == "Enter":
        showInput()
inputField.addEventListener("keydown", create_proxy(submitKey))

# Welcome Message
cout("Welcome to Rock Paper Scissors game!")
cout("Type in reset to Reset game stats.")
cout("Please enter [1] for Rock, [2] for Paper, or [3] for Scissors.")