import random

welcome_text = "Welcome to the Number Guessing Game!\n"
exit_text = "If you want to exit the game, type 'exit' or 'q'\n"

# Display initial messages
def print_welcome():
    print(f"{welcome_text}{exit_text}")

# Function to exit the game
def exit_game():
    print("Thank you for playing the Number Guessing Game!")
    exit()

# Function to handle exit check
def check_exit(user_input):
    if user_input.lower() in ['exit', 'q']:
        exit_game()

# Function to display the welcome message with attempts based on difficulty
def welcome_message(attempts):
    print(f"\nI'm thinking of a number between 1 and 100.\nYou have {attempts} chances to guess the correct number.\n")

# Function to handle user input for difficulty selection
def choose_difficulty():
    levels = {"easy": 10, "medium": 5, "hard": 3}
    
    print("Choose a difficulty:")
    for i, (level, chances) in enumerate(levels.items(), 1):
        print(f"{i}. {level} : {chances} Chances")

    while True:
        try:
            difficulty = int(input("Type your choice: "))
            if 1 <= difficulty <= len(levels):
                return list(levels.keys())[difficulty - 1], levels[list(levels.keys())[difficulty - 1]]
            else:
                print(f"Invalid choice. Please select a number between 1 and {len(levels)}.")
        except ValueError:
            print(f"Invalid input. Please enter a number between 1 and {len(levels)}.")

# Function to handle the user's guesses
def get_user_guess(selected_number, attempts):
    current_attempt = 1

    while current_attempt <= attempts:
        guess = input(f"Attempt {current_attempt}/{attempts}: Enter your guess: ")
        check_exit(guess)

        try:
            guess = int(guess)
            if guess == selected_number:
                print(f"Congratulations! You guessed the correct number in {current_attempt} attempts.")
                break
            elif guess < selected_number:
                print(f"Incorrect! The number is greater than {guess}.")
            else:
                print(f"Incorrect! The number is less than {guess}.")
            
            current_attempt += 1

            if current_attempt > attempts:
                print(f"Game Over! The number was {selected_number}")
        except ValueError:
            print("Invalid input. Please enter a valid number.")

# Main game function
def start_game():
    games_played = 0
    print_welcome()

    while True:
        games_played += 1
        selected_difficulty, attempts = choose_difficulty()
        selected_number = random.randint(1, 100)
        
        print(f"\nGame #{games_played}")
        welcome_message(attempts)
        get_user_guess(selected_number, attempts)
        
        play_again = input(f"\nYou've played {games_played} game(s). Press Enter to play again or type 'exit' or 'q' to quit: ")
        check_exit(play_again)

if __name__ == "__main__":
    start_game()
