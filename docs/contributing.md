# Contributing Guide

Thank you for your interest in contributing to Scrapers-UI! This guide will help you get started and ensure a smooth contribution process.

## Table of Contents

- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Pull Request Process](#pull-request-process)
- [Review Guidelines](#review-guidelines)
- [Community Guidelines](#community-guidelines)

## Getting Started

### Prerequisites

Before you begin:
- Ensure you have a GitHub account
- Familiarize yourself with Git basics
- Read the [Architecture Documentation](architecture.md)
- Review the [Component Guidelines](components-guidelines.md)

### Setting Up Your Environment

1. **Fork the Repository**
   ```bash
   # Fork via GitHub UI, then clone your fork
   git clone https://github.com/YOUR_USERNAME/Scrapers-UI.git
   cd Scrapers-UI
   ```

2. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/peviitor-ro/Scrapers-UI.git
   ```

3. **Set Up Local Server**
   ```bash
   # Option 1: Python
   python -m http.server 8000
   
   # Option 2: Node.js
   npx http-server
   
   # Option 3: PHP
   php -S localhost:8000
   ```

4. **Verify Setup**
   - Open `http://localhost:8000` in your browser
   - Ensure the main page loads correctly
   - Check that scraper pages are accessible

## How to Contribute

### Types of Contributions

We welcome various types of contributions:

1. **Bug Fixes** 🐛
   - Fix broken functionality
   - Resolve console errors
   - Fix layout issues

2. **New Scrapers** 🆕
   - Add new company scrapers
   - Follow the scraper page template
   - Ensure proper configuration

3. **Feature Enhancements** ✨
   - Improve existing features
   - Add new functionality
   - Enhance user experience

4. **Documentation** 📚
   - Improve existing docs
   - Add examples
   - Fix typos

5. **Code Refactoring** 🔧
   - Improve code quality
   - Optimize performance
   - Update dependencies

6. **Testing** 🧪
   - Add test coverage
   - Improve test infrastructure

### Finding Issues to Work On

1. Check the [Issues page](https://github.com/peviitor-ro/Scrapers-UI/issues)
2. Look for labels:
   - `good first issue` - Great for newcomers
   - `help wanted` - Community help needed
   - `bug` - Something isn't working
   - `enhancement` - New feature or request
   - `documentation` - Documentation improvements

3. Comment on the issue to indicate you're working on it

## Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

**Branch Naming Conventions:**
- `feature/add-new-scraper` - New features
- `fix/button-not-working` - Bug fixes
- `docs/update-readme` - Documentation
- `refactor/improve-validation` - Code improvements

### 2. Make Your Changes

Follow these guidelines:

- **Keep changes focused**: One pull request per feature/fix
- **Follow code standards**: See [Component Guidelines](components-guidelines.md)
- **Test your changes**: Verify everything works
- **Write clear commits**: Use descriptive commit messages

### 3. Test Your Changes

Before committing:

1. **Manual Testing**
   ```bash
   # Start local server
   python -m http.server 8000
   
   # Test in browser
   # - Check main page loads
   # - Test scraper execution
   # - Verify console for errors
   # - Test on mobile viewport
   ```

2. **Cross-Browser Testing**
   - Chrome/Edge (Chromium)
   - Firefox
   - Safari (if available)

3. **Responsive Testing**
   - Mobile (< 768px)
   - Tablet (768px - 1024px)
   - Desktop (> 1024px)

### 4. Commit Your Changes

Write clear, descriptive commit messages:

```bash
# Good commit messages
git commit -m "Add scraper page for Microsoft"
git commit -m "Fix button click handler in scraper.js"
git commit -m "Update documentation for API endpoints"

# Bad commit messages
git commit -m "Fixed stuff"
git commit -m "Update"
git commit -m "WIP"
```

**Commit Message Format:**
```
<type>: <subject>

<body (optional)>

<footer (optional)>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```bash
git commit -m "feat: Add Amazon scraper page"
git commit -m "fix: Resolve chart rendering issue on mobile"
git commit -m "docs: Update API documentation with new endpoints"
```

### 5. Push Your Changes

```bash
git push origin feature/your-feature-name
```

## Pull Request Process

### Creating a Pull Request

1. **Navigate to GitHub**
   - Go to your fork on GitHub
   - Click "Pull requests" → "New pull request"
   - Select your branch

2. **Fill Out the Template**
   ```markdown
   ## Description
   Brief description of the changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Code refactoring
   
   ## Changes Made
   - List specific changes
   - Include any configuration updates
   - Note any breaking changes
   
   ## Testing
   - [ ] Tested locally
   - [ ] Tested on multiple browsers
   - [ ] Tested responsive design
   
   ## Screenshots (if applicable)
   Add screenshots of UI changes
   
   ## Related Issues
   Closes #123
   ```

3. **Request Review**
   - Assign appropriate reviewers
   - Add relevant labels
   - Link related issues

### Pull Request Checklist

Before submitting, ensure:

- [ ] Code follows project standards
- [ ] Changes are tested locally
- [ ] No console errors
- [ ] Documentation is updated (if needed)
- [ ] Commit messages are clear
- [ ] Branch is up to date with main
- [ ] PR description is complete

### What Happens Next

1. **Automated Checks** (if configured)
   - CI/CD pipeline runs
   - Linting checks pass
   - Build succeeds

2. **Code Review**
   - Maintainers review your code
   - May request changes
   - Discussion in comments

3. **Revisions** (if needed)
   ```bash
   # Make requested changes
   git add .
   git commit -m "Address review comments"
   git push origin feature/your-feature-name
   ```

4. **Approval & Merge**
   - Once approved, PR is merged
   - Your changes go live!
   - Branch can be deleted

## Review Guidelines

### For Contributors

When receiving feedback:
- **Be receptive**: Feedback helps improve code quality
- **Ask questions**: If something is unclear, ask
- **Be patient**: Reviews take time
- **Learn**: Use feedback to improve future contributions

### For Reviewers

When reviewing:
- **Be constructive**: Focus on helping, not criticizing
- **Be specific**: Point out exact issues and suggest solutions
- **Be timely**: Review within a reasonable timeframe
- **Be thorough**: Check code, tests, and documentation

**What to Review:**
1. **Code Quality**
   - Follows style guidelines
   - Proper naming conventions
   - No code duplication
   - Efficient algorithms

2. **Functionality**
   - Works as described
   - No breaking changes
   - Edge cases handled
   - Error handling present

3. **Testing**
   - Changes are tested
   - Tests are comprehensive
   - No new bugs introduced

4. **Documentation**
   - Code is documented
   - README updated (if needed)
   - API docs updated (if needed)

## Code Standards

### JavaScript Standards

```javascript
// ✅ Good
const fetchScraperData = async (apiObj) => {
  try {
    const response = await fetch(apiObj.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiObj),
    });
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

// ❌ Bad
function getData(obj) {
  fetch(obj.url).then(r => r.json());
}
```

### HTML Standards

```html
<!-- ✅ Good -->
<div class="company-card">
  <h2>Company Name</h2>
  <button aria-label="Run scraper">Run</button>
</div>

<!-- ❌ Bad -->
<div class="card">
  <div class="title">Company Name</div>
  <div onclick="run()">Run</div>
</div>
```

### CSS Standards

```css
/* ✅ Good */
.company-card {
  display: flex;
  padding: 1rem;
  margin-bottom: 1rem;
}

/* ❌ Bad */
.card {
  display: flex; padding: 15px; margin-bottom: 15px;
}
```

## Adding a New Scraper

To add a new company scraper:

1. **Create Scraper Directory**
   ```bash
   mkdir src/company-name
   ```

2. **Create index.html**
   - Copy template from `docs/components-guidelines.md`
   - Update company-specific information
   - Configure `apiObj` with correct endpoints

3. **Update scrapers.js**
   ```javascript
   {
     name: "company-name",
     file: "company_scraper.py",
     url: "https://api.endpoint/",
     dataSetUrl: "https://dataset.endpoint/",
     contributors: ["your-github-username"],
     testers: []
   }
   ```

4. **Test Thoroughly**
   - Verify page loads
   - Test scraper execution
   - Check data display
   - Validate responsive design

5. **Submit Pull Request**
   - Include screenshots
   - Document any special configuration
   - Test all functionality

## Community Guidelines

### Code of Conduct

- **Be respectful**: Treat everyone with respect
- **Be inclusive**: Welcome all contributors
- **Be professional**: Keep discussions constructive
- **Be patient**: Remember everyone is learning

### Getting Help

If you need help:

1. **Check Documentation**
   - [README](../README.md)
   - [Architecture](architecture.md)
   - [Components Guidelines](components-guidelines.md)

2. **Search Issues**
   - Look for similar problems
   - Check closed issues

3. **Ask Questions**
   - Open a new issue
   - Use clear, descriptive titles
   - Provide context and examples

4. **Join Discussions**
   - Participate in issue discussions
   - Share your knowledge
   - Help other contributors

### Recognition

Contributors are recognized through:
- Contributor list in individual scrapers
- GitHub contributor graph
- Special mentions in release notes

## License

By contributing to Scrapers-UI, you agree that your contributions will be licensed under the same license as the project.

## Questions?

If you have questions about contributing:
- Open an issue with the `question` label
- Check existing documentation
- Reach out to maintainers

Thank you for contributing to Scrapers-UI! 🎉

---

**Happy Coding!** 💻
