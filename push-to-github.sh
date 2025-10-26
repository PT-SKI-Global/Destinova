#!/bin/bash

echo "🚀 Pushing Destinova to GitHub..."
echo ""

# Configure git user
echo "⚙️  Configuring git user..."
git config user.email "inkspiredpublished@gmail.com"
git config user.name "PT. Sentra Karya Integrasi Global"

# Check if origin already exists and remove it
echo "🔗 Setting up GitHub remote..."
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/ideathings/destinova.git

echo "📦 Adding all files..."
git add .

echo "💾 Creating commit..."
git commit -m "Initial commit: Destinova AI Career & Education Platform

✨ Features:
- MBTI personality quiz (16 questions)
- AI-powered career scenario generation
- PRO Psikotes with recession-proof career recommendations
- Cost-effective skills analysis with ROI calculations
- Side hustle opportunities for additional income
- Enneagram & Jungian cognitive functions analysis
- Income optimization strategies
- Scenario comparison tool

🏗️ Tech Stack:
- Frontend: React 18 + TypeScript + Vite
- Backend: Express.js + PostgreSQL
- UI: Radix UI + shadcn/ui + Tailwind CSS
- AI: OpenAI GPT integration
- ORM: Drizzle ORM

📄 Pages:
- Home (landing page with hero section)
- Personality Quiz (MBTI test)
- Simulation (AI scenario generation)
- Results (detailed analysis with PRO features)
- Comparison (side-by-side scenario comparison)
- About Us (company profile - 4 Business Pillars)
- Privacy Policy
- Terms & Conditions

🏢 Built by PT. Sentra Karya Integrasi Global
🎯 Empowering Indonesian youth with AI-powered career decisions
🌐 Integrasi (4) bidang, (1) visi

© 2025 PT. Sentra Karya Integrasi Global. All rights reserved." || echo "⚠️  Nothing to commit or commit already exists"

echo ""
echo "🚀 Pushing to GitHub..."
echo "📍 Repository: https://github.com/ideathings/destinova"
echo ""

# Get the default branch name
DEFAULT_BRANCH=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's@^refs/remotes/origin/@@' || echo "main")

# Try to push
if git push -u origin $DEFAULT_BRANCH 2>&1; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 View your repository: https://github.com/ideathings/destinova"
else
    # If main fails, try master
    echo "⚠️  Failed to push to $DEFAULT_BRANCH, trying 'master'..."
    if git push -u origin master 2>&1; then
        echo ""
        echo "✅ Successfully pushed to GitHub!"
        echo "🌐 View your repository: https://github.com/ideathings/destinova"
    else
        echo ""
        echo "❌ Push failed. You may need to authenticate with GitHub."
        echo ""
        echo "💡 Solutions:"
        echo "1. If prompted, enter your GitHub username and Personal Access Token"
        echo "2. Create a Personal Access Token at: https://github.com/settings/tokens"
        echo "3. Make sure the token has 'repo' permissions"
        echo ""
        echo "Or use SSH instead:"
        echo "git remote set-url origin git@github.com:ideathings/destinova.git"
        echo "git push -u origin main"
    fi
fi
