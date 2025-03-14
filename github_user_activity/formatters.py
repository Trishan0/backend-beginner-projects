from rich.console import Console
from rich.table import Table
from rich.panel import Panel
from rich import box

def print_activity_summary(username, created_repos, starred_repos, issue_events, pull_requests, repo_commits):
    """Format and print GitHub activity summary using rich library."""
    console = Console()
    
    # Create main header
    console.print(f"\n[bold blue]GitHub Activity Summary for [green]{username}[/green][/bold blue]\n")
    
    # Repository Statistics
    repo_stats = Table(show_header=False, box=box.ROUNDED)
    repo_stats.add_column("Metric", style="cyan")
    repo_stats.add_column("Count", style="green")
    repo_stats.add_row("Created Repositories", str(created_repos))
    repo_stats.add_row("Starred Repositories", str(starred_repos))
    console.print(Panel(repo_stats, title="Repository Activity", border_style="blue"))
    
    # Issues Statistics
    issues_table = Table(show_header=True, box=box.ROUNDED)
    issues_table.add_column("Action", style="cyan")
    issues_table.add_column("Count", style="green", justify="right")
    issues_table.add_row("Opened", str(issue_events['opened']))
    issues_table.add_row("Closed", str(issue_events['closed']))
    issues_table.add_row("Commented", str(issue_events['commented']))
    console.print(Panel(issues_table, title="Issues Activity", border_style="yellow"))
    
    # Pull Requests Statistics
    pr_table = Table(show_header=True, box=box.ROUNDED)
    pr_table.add_column("Action", style="cyan")
    pr_table.add_column("Count", style="green", justify="right")
    pr_table.add_row("Opened", str(pull_requests['opened']))
    pr_table.add_row("Closed", str(pull_requests['closed']))
    pr_table.add_row("Merged", str(pull_requests['merged']))
    pr_table.add_row("Reviewed", str(pull_requests['reviewed']))
    pr_table.add_row("Review Comments", str(pull_requests['review_comments']))
    console.print(Panel(pr_table, title="Pull Requests Activity", border_style="red"))
    
    # Commit Statistics
    if repo_commits:
        commit_table = Table(show_header=True, box=box.ROUNDED)
        commit_table.add_column("Repository", style="cyan")
        commit_table.add_column("Commits", style="green", justify="right")
        for repo, commits in repo_commits.items():
            commit_table.add_row(repo, str(commits))
        console.print(Panel(commit_table, title="Commit Activity", border_style="purple"))