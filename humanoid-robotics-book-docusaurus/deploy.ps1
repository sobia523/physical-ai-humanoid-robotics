# Deployment Script for Windows (PowerShell)
# This script prepares and builds the project for deployment

Write-Host "🚀 Starting deployment process..." -ForegroundColor Cyan

# Clean previous builds
Write-Host "🧹 Cleaning previous builds..." -ForegroundColor Yellow
npm run clear
if (Test-Path "build") {
    Remove-Item -Recurse -Force "build"
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Build the project
Write-Host "🔨 Building production bundle..." -ForegroundColor Yellow
npm run build

# Check if build was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    Write-Host "📦 Build output in: ./build" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Ready for deployment!" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "To deploy to Vercel:" -ForegroundColor White
    Write-Host "  1. Install Vercel CLI: npm i -g vercel" -ForegroundColor Gray
    Write-Host "  2. Run: vercel --prod" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Or push to GitHub and import to Vercel dashboard." -ForegroundColor Gray
} else {
    Write-Host "❌ Build failed! Please fix errors and try again." -ForegroundColor Red
    exit 1
}
