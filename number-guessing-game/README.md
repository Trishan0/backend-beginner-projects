I'll create a comprehensive README.md file for the Number Guessing Game project.

```markdown:backend-beginner-projects/number-guessing-game/README.md
# Number Guessing Game

A simple command-line number guessing game built with Python where players try to guess a randomly generated number between 1 and 100.

## Features

- Three difficulty levels (Easy, Medium, Hard)
- Limited attempts based on difficulty
- Time tracking for each game
- Multiple games in one session
- Exit option available at any time

## Requirements

- Python 3.x

## How to Run

1. Make sure you have Python installed on your system
2. Navigate to the project directory
3. Run the game using Python:
   ```bash
   python main.py
   ```

## Gameplay Instructions

1. Choose a difficulty level:
   - Easy: 10 attempts
   - Medium: 5 attempts
   - Hard: 3 attempts

2. The game will generate a random number between 1 and 100

3. Enter your guess when prompted
   - The game will tell you if your guess is too high or too low
   - Keep guessing until you find the correct number or run out of attempts

4. After each game, you can:
   - Press Enter to play again
   - Type 'exit' or 'q' to quit

## Example Gameplay

```
Welcome to the Number Guessing Game!
If you want to exit the game, type 'exit' or 'q'

Choose a difficulty:
1. easy : 10 Chances
2. medium : 5 Chances
3. hard : 3 Chances
Type your choice: 2

Game #1
I'm thinking of a number between 1 and 100.
You have 5 chances to guess the correct number.

Attempt 1/5: Enter your guess: 50
Incorrect! The number is less than 50.
Attempt 2/5: Enter your guess: 25
Incorrect! The number is greater than 25.
Attempt 3/5: Enter your guess: 37
Incorrect! The number is greater than 37.
Attempt 4/5: Enter your guess: 45
Congratulations! You guessed the correct number in 4 attempts.
Time taken: 12.34 seconds

You've played 1 game(s). Press Enter to play again or type 'exit' or 'q' to quit:
```

## Controls

- Enter a number to make a guess
- Press Enter to play again after a game ends
- Type 'exit' or 'q' at any time to quit the game


## License

This project is open source and available under the MIT License.
```
