import argparse
from activity_fetcher import get_user_activity

def main():
    parser = argparse.ArgumentParser(description="Fetch and display GitHub user activity")
    parser.add_argument("username", type=str, help="GitHub username")
    args = parser.parse_args()

    get_user_activity(args.username)

