#!/bin/bash
set -e

# Repository: https://github.com/Sinusoidal-Meow/Amazon-style-rozgarapp-web.git
REPO_URL="github.com/Sinusoidal-Meow/Amazon-style-rozgarapp-web.git"

TOKEN="${1:-$GITHUB_TOKEN}"

if [ -z "$TOKEN" ]; then
  echo "================================================================="
  echo " GitHub Authentication Required"
  echo "================================================================="
  echo "Usage:"
  echo "  ./push_to_github.sh <YOUR_GITHUB_PERSONAL_ACCESS_TOKEN>"
  echo "  OR"
  echo "  GITHUB_TOKEN=<YOUR_GITHUB_PERSONAL_ACCESS_TOKEN> ./push_to_github.sh"
  echo ""
  echo "To generate a GitHub token:"
  echo "  1. Go to https://github.com/settings/tokens"
  echo "  2. Generate a token (Classic or Fine-Grained) with 'repo' scope."
  echo "  3. Run this script with your token."
  echo "================================================================="
  exit 1
fi

echo "Setting temporary authenticated remote..."
git remote set-url origin "https://${TOKEN}@${REPO_URL}"

cleanup() {
  echo "Resetting remote URL to public HTTPS..."
  git remote set-url origin "https://${REPO_URL}"
}
trap cleanup EXIT

TOTAL_COMMITS=$(git rev-list origin/main..HEAD | wc -l)
echo "Total commits to push one by one: $TOTAL_COMMITS"

COUNT=1
for commit in $(git rev-list --reverse origin/main..HEAD); do
  MSG=$(git log -1 --pretty=format:"%s" "$commit")
  echo "[$COUNT/$TOTAL_COMMITS] Pushing commit $commit: $MSG"
  git push origin "$commit":refs/heads/main
  COUNT=$((COUNT + 1))
done

echo ""
echo "================================================================="
echo " Successfully pushed all $TOTAL_COMMITS commits one by one to GitHub!"
echo " Repository: https://github.com/Sinusoidal-Meow/Amazon-style-rozgarapp-web"
echo "================================================================="
