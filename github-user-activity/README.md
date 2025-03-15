# GitHub User Activity CLI

A command-line interface tool that fetches and displays GitHub user activity statistics. This tool provides a comprehensive overview of a user's GitHub activities including repository creation, stars, issues, pull requests, and commit history.

## Features

- View repository creation and starring activity
- Track issue interactions (opened, closed, commented)
- Monitor pull request activity (opened, closed, merged, reviewed)
- See commit statistics per repository
- Colorized and formatted output for better readability
- Command-line argument support

## Example Output

```bash
github-activity Trishan0

GitHub Activity Summary for Trishan0

┌─── Repository Activity ────────────────┐
│ Created Repositories    3              │
│ Starred Repositories    5              │
└────────────────────────────────────────┘

┌─── Issues Activity ───────────────────┐
│ Action     Count                      │
│ Opened     4                          │
│ Closed     2                          │
│ Commented  7                          │
└───────────────────────────────────────┘

┌─── Pull Requests Activity ────────────┐
│ Action           Count                │
│ Opened           3                    │
│ Closed           2                    │
│ Merged           1                    │
│ Reviewed         4                    │
│ Review Comments  6                    │
└───────────────────────────────────────┘

┌─── Commit Activity ──────────────────┐
│ Repository                   Commits │
│ user/repo-1                  5       │
│ user/repo-2                  3       │
│ user/repo-3                  8       │
└──────────────────────────────────────┘
```

## Getting Started

### Prerequisites

- Python 3.7 or higher
- pip (Python package installer)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Trishan0/backend-beginner-projects.git
    cd backend-beginner-projects/github-user-activity
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

4. Install dependencies:
    ```sh
    pip install -r requirements.txt
    ```

5. Install the package in development mode:
    ```sh
    pip install -e .
    ```

## Usage

The GitHub User Activity CLI supports the following command:

```sh
# View activity for a specific user
github-activity username
```

For example:
```sh
github-activity Trishan0
```

## API Response Format

The tool processes JSON responses from the GitHub API in the following format:

```json
{
  "type": "PushEvent",
  "repo": {
    "name": "user/repo",
    "url": "https://api.github.com/repos/user/repo"
  },
  "payload": {
    "commits": [
      {
        "sha": "abc123",
        "message": "Update README"
      }
    ]
  },
  "created_at": "2024-03-15T10:30:00Z"
}
```

Original Project Link: [GitHub User Activity CLI](https://roadmap.sh/projects/github-user-activity)

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
