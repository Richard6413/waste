#!/bin/bash

# ============================================================
# JEMAK Waste Management - GitHub Setup & Push
# Repository: https://github.com/eenom200-web/jemak-waste
# ============================================================

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}============================================================${NC}"
echo -e "${BLUE}   JEMAK Waste Management - GitHub Repository Setup          ${NC}"
echo -e "${BLUE}   Repo: https://github.com/eenom200-web/jemak-waste        ${NC}"
echo -e "${BLUE}============================================================${NC}"
echo ""

REPO_URL="https://github.com/eenom200-web/jemak-waste.git"

# ============================================================
# 1. Check if Git is initialized
# ============================================================
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}📁 Initializing Git repository...${NC}"
    git init
    echo -e "${GREEN}✅ Git initialized${NC}"
    echo ""
fi

# ============================================================
# 2. Check if remote exists
# ============================================================
if git remote get-url origin &>/dev/null; then
    echo -e "${GREEN}✅ Remote 'origin' already exists${NC}"
    echo -e "   Current remote: $(git remote get-url origin)"
    echo ""
    
    # Ask if user wants to update remote
    echo -e "${YELLOW}Do you want to update the remote URL? (y/n)${NC}"
    read -r UPDATE_REMOTE
    if [[ "$UPDATE_REMOTE" == "y" || "$UPDATE_REMOTE" == "Y" ]]; then
        git remote set-url origin "$REPO_URL"
        echo -e "${GREEN}✅ Remote URL updated${NC}"
    fi
else
    echo -e "${YELLOW}🔗 Adding remote 'origin'...${NC}"
    git remote add origin "$REPO_URL"
    echo -e "${GREEN}✅ Remote added: $REPO_URL${NC}"
fi
echo ""

# ============================================================
# 3. Check current branch
# ============================================================
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null)

if [ -z "$CURRENT_BRANCH" ]; then
    echo -e "${YELLOW}📁 Creating 'main' branch...${NC}"
    git checkout -b main
    CURRENT_BRANCH="main"
    echo -e "${GREEN}✅ Created 'main' branch${NC}"
else
    echo -e "${GREEN}✅ Current branch: ${YELLOW}$CURRENT_BRANCH${NC}"
    
    # Rename to main if not already
    if [ "$CURRENT_BRANCH" != "main" ]; then
        echo -e "${YELLOW}🔄 Renaming branch to 'main'...${NC}"
        git branch -M "$CURRENT_BRANCH" main
        CURRENT_BRANCH="main"
        echo -e "${GREEN}✅ Branch renamed to 'main'${NC}"
    fi
fi
echo ""

# ============================================================
# 4. Check if there are changes to commit
# ============================================================
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}⚠️  No changes to commit.${NC}"
    
    # Check if there are any commits
    if [ -z "$(git log --oneline 2>/dev/null)" ]; then
        echo -e "${YELLOW}📝 No commits found. Creating initial commit...${NC}"
        git add .
        git commit -m "Initial commit: JEMAK Waste Management system"
        echo -e "${GREEN}✅ Initial commit created${NC}"
    else
        echo -e "${GREEN}✅ Everything is up to date${NC}"
    fi
else
    # Show what will be committed
    echo -e "${BLUE}📝 Changes to be committed:${NC}"
    git status --short
    echo ""
    
    # Get commit message
    if [ -z "$1" ]; then
        echo -e "${YELLOW}Enter commit message (or press Enter for default):${NC}"
        read -r COMMIT_MSG
        if [ -z "$COMMIT_MSG" ]; then
            COMMIT_MSG="Update JEMAK Waste Management - $(date '+%Y-%m-%d %H:%M:%S')"
        fi
    else
        COMMIT_MSG="$1"
    fi
    
    echo -e "${GREEN}📝 Commit message: ${YELLOW}$COMMIT_MSG${NC}"
    echo ""
    
    # Stage and commit
    echo -e "${BLUE}📦 Staging all changes...${NC}"
    git add .
    echo -e "${GREEN}✅ All changes staged${NC}"
    echo ""
    
    echo -e "${BLUE}💾 Committing changes...${NC}"
    git commit -m "$COMMIT_MSG"
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Commit failed.${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Commit successful${NC}"
    echo ""
fi

# ============================================================
# 5. Push to remote
# ============================================================
echo -e "${BLUE}🚀 Pushing to remote repository...${NC}"
echo -e "   Repo: ${YELLOW}https://github.com/eenom200-web/jemak-waste${NC}"
echo ""

git push -u origin main

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Push failed.${NC}"
    echo ""
    echo -e "${YELLOW}Possible issues:${NC}"
    echo -e "  1. The repository might not exist on GitHub"
    echo -e "  2. You might not have permission to push"
    echo -e "  3. The remote URL might be incorrect"
    echo -e "  4. You might need to authenticate"
    echo ""
    echo -e "${YELLOW}To fix:${NC}"
    echo -e "  - Create the repository on GitHub first"
    echo -e "  - Check your credentials"
    echo -e "  - Try using SSH instead: git remote set-url origin git@github.com:eenom200-web/jemak-waste.git"
    exit 1
fi

echo -e "${GREEN}✅ Push successful!${NC}"
echo ""

# ============================================================
# 6. Show summary
# ============================================================
echo -e "${BLUE}============================================================${NC}"
echo -e "${GREEN}✅ All done!${NC}"
echo -e "${BLUE}============================================================${NC}"
echo ""
echo -e "${GREEN}📊 Summary:${NC}"
echo -e "  🔗 Repository: ${YELLOW}https://github.com/eenom200-web/jemak-waste${NC}"
echo -e "  🌿 Branch: ${YELLOW}main${NC}"
echo -e "  📝 Commit: ${YELLOW}$COMMIT_MSG${NC}"
echo ""
echo -e "${BLUE}🔗 View your repository:${NC}"
echo -e "  ${YELLOW}https://github.com/eenom200-web/jemak-waste${NC}"
echo ""