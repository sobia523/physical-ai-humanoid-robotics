#!/bin/bash

# Deployment script for Vercel
# This script prepares and deploys the project to Vercel

echo "🚀 Starting deployment process..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
npm run clear
rm -rf build/

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building production bundle..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📦 Build output in: ./build"
    echo ""
    echo "🌐 Ready for deployment!"
    echo ""
    echo "To deploy to Vercel:"
    echo "  1. Install Vercel CLI: npm i -g vercel"
    echo "  2. Run: vercel --prod"
    echo ""
    echo "Or push to GitHub and import to Vercel dashboard."
else
    echo "❌ Build failed! Please fix errors and try again."
    exit 1
fi
