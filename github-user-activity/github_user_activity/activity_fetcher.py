import requests
from formatters import print_activity_summary

def get_user_activity(username):
    url = f"https://api.github.com/users/{username}/events"
    response = requests.get(url)

    if response.status_code != 200:
        print("Error fetching data")
        return
    
    events = response.json()
    
    repo_commits = {}
    created_repos = 0
    starred_repos = 0
    issue_events = {"opened": 0, "closed": 0, "commented": 0}
    pull_requests = {"opened": 0, "closed": 0, "merged": 0, "reviewed": 0, "review_comments": 0}

    for event in events:
        event_type = event['type']
        
        # Track Created Repos
        if event_type == 'CreateEvent':
            created_repos += 1

        # Track Starred Repos
        elif event_type == 'WatchEvent':  # GitHub calls starring "watching" in the API
            starred_repos += 1

        # Track Issues
        elif event_type == 'IssuesEvent':
            action = event['payload']['action']
            if action == "opened":
                issue_events["opened"] += 1
            elif action == "closed":
                issue_events["closed"] += 1

        elif event_type == 'IssueCommentEvent':
            issue_events["commented"] += 1

        # Track Pushed Commits
        elif event_type == 'PushEvent':
            repo = event['repo']['name']
            commit_count = len(event['payload'].get('commits', []))
            repo_commits[repo] = repo_commits.get(repo, 0) + commit_count

        # Track Pull Requests
        elif event_type == 'PullRequestEvent':
            action = event['payload']['action']
            if action == "opened":
                pull_requests["opened"] += 1
            elif action == "closed":
                pull_requests["closed"] += 1
                # Check if it was merged
                if event['payload'].get('pull_request', {}).get('merged', False):
                    pull_requests["merged"] += 1

        # Track Pull Request Reviews
        elif event_type == 'PullRequestReviewEvent':
            pull_requests["reviewed"] += 1

        elif event_type == 'PullRequestReviewCommentEvent':
            pull_requests["review_comments"] += 1

    # Print the results
    print_activity_summary(
            username,
            created_repos,
            starred_repos,
            issue_events,
            pull_requests,
            repo_commits
        )

