#!/bin/bash

# Seren Capture Mobile App Startup Script
# This ensures we're always in the correct directory

echo "🚀 Seren Capture Mobile App Startup"
echo "=================================="

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Change to the mobile app directory
cd "$SCRIPT_DIR"

echo "📱 Current directory: $(pwd)"
echo "📁 Project: $(basename $(pwd))"

# Verify we're in the right place
if [ ! -f "app.json" ]; then
    echo "❌ Error: Not in a valid Expo project directory!"
    echo "   Expected to find app.json file"
    exit 1
fi

if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in a valid Node.js project directory!"
    echo "   Expected to find package.json file"
    exit 1
fi

# Check if expo is installed
if ! command -v npx &> /dev/null; then
    echo "❌ Error: npx not found. Please install Node.js"
    exit 1
fi

echo "✅ All checks passed!"
echo "🔄 Starting Expo development server..."
echo ""

# Start Expo with clear cache
npx expo start --clear
