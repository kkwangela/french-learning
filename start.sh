#!/usr/bin/env bash
# Quick launcher for French Learning Web App

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

echo "========================================================"
echo "  🇫🇷 Bienvenue à 我要去巴黎 - French Learning App"
echo "========================================================"

# Check if Xcode python3 or standard python3 is available
PYTHON_CMD=""
if [ -x "/Applications/Xcode.app/Contents/Developer/usr/bin/python3" ]; then
    PYTHON_CMD="/Applications/Xcode.app/Contents/Developer/usr/bin/python3"
elif command -v python3 &>/dev/null; then
    PYTHON_CMD="python3"
fi

if [ -n "$PYTHON_CMD" ]; then
    echo "Starting local server using $PYTHON_CMD..."
    "$PYTHON_CMD" server.py
else
    echo "No python runtime found, opening index.html directly in your default browser..."
    open "$PROJECT_DIR/index.html"
fi
