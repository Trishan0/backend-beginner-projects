# number-guessing-game


This is a command-line-based Number Guessing Game written in Python. Players try to guess a randomly generated number between 1 and 100 with different difficulty levels and time constraints.

## Features

- Three difficulty levels (Easy, Medium, Hard)
- Limited attempts based on difficulty
- Time tracking for each game
- Multiple games in one session
- Exit option available at any time

## Example Gameplay

```bash
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
```

## Getting Started

### Prerequisites

Make sure you have Python installed on your system. You can download it from [python.org](https://www.python.org/).

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Trishan0/number-guessing-game.git
    cd number-guessing-game
    ```

2. Create a virtual environment:
    ```sh
    python -m venv venv
    ```

3. Activate the virtual environment:
    - On Windows:
        ```sh
        venv\Scripts\activate
        ```
    - On macOS/Linux:
        ```sh
        source venv/bin/activate
        ```

### Usage

Run the Number Guessing Game:
```sh
python main.py
```

### Game Controls

- Enter a number (1-100) to make a guess
- Choose difficulty level (1-3)
- Type 'exit' or 'q' at any time to quit
- Press Enter to play again after each game

### Difficulty Levels

```sh
Easy:
- 10 attempts

Medium:
- 5 attempts

Hard:
- 3 attempts
```
Original Project Link: [Number Guessing Game](https://roadmap.sh/projects/number-guessing-game)

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
