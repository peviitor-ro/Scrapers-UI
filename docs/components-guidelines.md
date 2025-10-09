# Component Guidelines

This document outlines the standards, patterns, and best practices for developing and maintaining components in the Scrapers-UI project.

## Table of Contents

- [Overview](#overview)
- [JavaScript Component Standards](#javascript-component-standards)
- [HTML Structure Standards](#html-structure-standards)
- [CSS Styling Standards](#css-styling-standards)
- [Code Patterns](#code-patterns)
- [Best Practices](#best-practices)
- [Common Components](#common-components)

## Overview

The Scrapers-UI project follows a component-based architecture where functionality is organized into reusable modules. This guide helps maintain consistency across the codebase.

## JavaScript Component Standards

### Module Organization

Each JavaScript module should have a clear, single purpose:

```javascript
// Good: Single responsibility
// scraper.js - handles scraper execution
// chart.js - handles data visualization
// script.js - handles main page logic

// Bad: Mixed responsibilities
// utils.js - handles everything
```

### Naming Conventions

#### Variables
```javascript
// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = "https://api.example.com";
const MAX_RETRIES = 3;

// Variables: camelCase
let companyName = "Amazon";
let jobListings = [];

// Configuration objects: camelCase
const apiObj = {
  file: "scraper.py",
  url: "https://...",
  dataSetUrl: "https://..."
};
```

#### Functions
```javascript
// Functions: camelCase, descriptive verbs
function fetchScraperData() { }
function validateJobData() { }
function displayResults() { }

// Good: Clear purpose
const fetchApi = async (apiObj) => { ... }
const validate_data = (data, keyword) => { ... }

// Bad: Unclear purpose
const doStuff = () => { ... }
const process = () => { ... }
```

### Function Standards

#### Async Functions
Always use async/await for asynchronous operations:

```javascript
// Good: Using async/await
const fetchApi = async (apiObj) => {
  try {
    const response = await fetch(apiObj.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiObj),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Bad: Using promises without async/await
function fetchApi(apiObj) {
  return fetch(apiObj.url)
    .then(response => response.json())
    .then(data => data);
}
```

#### Validation Functions
Create reusable validation helpers:

```javascript
// Standard validation pattern
const validate_data = (data, keyword) => {
  let isValidate = false;
  if (
    data[keyword] !== undefined &&
    data[keyword] !== null &&
    data[keyword] !== ""
  ) {
    isValidate = true;
  }
  return isValidate;
};

// Usage
if (validate_data(jobData, "job_title")) {
  // Process job title
}
```

### DOM Manipulation Standards

#### Selecting Elements
```javascript
// Good: Cache DOM queries
const htmlTitle = document.querySelector("title");
const company = document.querySelector("#company");
const jobsContainer = document.querySelector(".jobs");

// Bad: Repeated queries
document.querySelector("#company").innerHTML = name;
document.querySelector("#company").classList.add("active");
```

#### Creating Elements
```javascript
// Good: Template pattern
const createJobCard = (job) => {
  const card = document.createElement("div");
  card.className = "job-card";
  card.innerHTML = `
    <h3>${job.job_title}</h3>
    <p>${job.company}</p>
    <a href="${job.job_link}" target="_blank">View Job</a>
  `;
  return card;
};

// Usage
const jobCard = createJobCard(jobData);
jobsContainer.appendChild(jobCard);
```

### Event Handling

```javascript
// Good: Event delegation
document.querySelector(".jobs").addEventListener("click", (e) => {
  if (e.target.classList.contains("job-card")) {
    handleJobClick(e.target);
  }
});

// Good: Named event handlers
const handleScraperRun = () => {
  // Run scraper logic
};
button.addEventListener("click", handleScraperRun);

// Bad: Inline event handlers in HTML
// <button onclick="runScraper()">Run</button>
```

### Error Handling

```javascript
// Good: Comprehensive error handling
const runScraper = async (apiObj) => {
  try {
    showLoadingState();
    const data = await fetchApi(apiObj);
    
    if (!data || data.error) {
      throw new Error(data.error || "Failed to fetch data");
    }
    
    displayResults(data);
  } catch (error) {
    console.error("Scraper Error:", error);
    showErrorAlert(error.message);
  } finally {
    hideLoadingState();
  }
};
```

## HTML Structure Standards

### Scraper Page Template

Every scraper page should follow this structure:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../../css/scraper.css" />
    <title></title>
  </head>
  <body>
    <!-- Header -->
    <div class="header">
      <a href="/">
        <div class="logo">
          <h3><i>Scraper-UI.</i></h3>
          <img
            alt="logo"
            height="30"
            src="../../images/svg/peviitor.svg"
            width="100"
          />
        </div>
      </a>
      <div class="nav-links">
        <a href="https://firme.peviitor.ro/" target="_blank">Firme PeViitor</a>
        <a href="../../doc.html">Documentation</a>
      </div>
    </div>

    <!-- Alert Popup -->
    <div class="alertPopUp active">
      <div class="alertPopUp-content">
        <img alt="Check" class="alert-img" id="image-alert" src="" />
        <div class="message">
          <span class="alert-text-1"></span>
          <span class="alert-text-2"></span>
        </div>
      </div>
      <p class="close">X</p>
      <div class="progress active"></div>
    </div>

    <!-- Company Section -->
    <section class="company">
      <div class="company-container">
        <!-- Company Card -->
        <div class="flip-card-container">
          <div class="flip-card">
            <div class="box">
              <img alt="company-logo" src="company-logo.png" />
            </div>
            <div class="box2">
              <a href="https://careers.company.com" target="_blank">Careers</a>
            </div>
          </div>
        </div>

        <!-- Company Info -->
        <div class="company-card">
          <div class="details">
            <h5>Company Name</h5>
            <p id="company">Company</p>
          </div>
          <!-- Additional details -->
        </div>

        <!-- Functionality Buttons -->
        <div class="functionality">
          <button>
            <div>Run Scraper</div>
            <!-- SVG icon -->
          </button>
        </div>
      </div>
    </section>

    <!-- Jobs Display -->
    <div class="jobs"></div>

    <!-- Console Output -->
    <div class="console hidden">
      <button class="close-console" onclick="closeConsole()">x</button>
      <div class="console-content"></div>
    </div>

    <!-- Scripts -->
    <script>
      const apiObj = {
        file: "company_scraper.py",
        url: "https://api.endpoint/",
        dataSetUrl: "https://dataset.endpoint/",
      };
    </script>
    <script src="../../js/countries.js"></script>
    <script src="../../js/counties.js"></script>
    <script src="../../js/scraper.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    <script src="../../js/chart.js"></script>
  </body>
</html>
```

### Semantic HTML

```html
<!-- Good: Semantic elements -->
<section class="company">
  <div class="company-container">
    <article class="company-card">
      <header>
        <h2>Company Name</h2>
      </header>
      <main>
        <!-- Content -->
      </main>
    </article>
  </div>
</section>

<!-- Bad: Non-semantic divs everywhere -->
<div class="section">
  <div class="container">
    <div class="card">
      <div class="title">Company Name</div>
    </div>
  </div>
</div>
```

### Accessibility

```html
<!-- Good: Accessible -->
<button aria-label="Run scraper for Amazon">
  <div>Run Scraper</div>
</button>
<img alt="Amazon logo" src="amazon.png" />
<a href="careers.html" target="_blank" rel="noopener noreferrer">
  Careers
</a>

<!-- Bad: Not accessible -->
<button>
  <div>Run</div>
</button>
<img src="logo.png" />
<a href="careers.html" target="_blank">Careers</a>
```

## CSS Styling Standards

### Class Naming

Use BEM-like conventions:

```css
/* Component-based naming */
.company-card { }
.company-card__header { }
.company-card__title { }
.company-card--featured { }

/* Utility classes */
.hidden { display: none; }
.active { opacity: 1; }
.error { color: red; }
```

### Responsive Design

```css
/* Mobile-first approach */
.company-card {
  width: 100%;
  padding: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .company-card {
    width: 48%;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .company-card {
    width: 32%;
  }
}
```

### CSS Variables

```css
/* Define variables */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --error-color: #dc3545;
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Use variables */
.button-primary {
  background-color: var(--primary-color);
  font-family: var(--font-family);
}
```

## Code Patterns

### 1. API Configuration Pattern

Every scraper page must define:

```javascript
const apiObj = {
  file: "company_scraper.py",           // Scraper filename
  url: "https://api.endpoint/",         // Execution endpoint
  dataSetUrl: "https://dataset.endpoint/" // Data retrieval endpoint
};
```

### 2. Data Validation Pattern

Always validate data before use:

```javascript
const jobData = {
  job_title: "Software Engineer",
  job_link: "https://...",
  company: "Amazon",
  country: "Romania",
  city: "Bucharest"
};

// Validate required fields
if (!validate_data(jobData, "job_title")) {
  console.error("Missing job title");
  return;
}

if (!validate_link(jobData, "job_link")) {
  console.error("Invalid job link");
  return;
}
```

### 3. Location Normalization Pattern

```javascript
// Normalize city names for Romania
const cityInRomania = (city) => {
  const cities = {
    bucharest: "Bucuresti",
    brasov: "Brașov",
    cluj: "Cluj-Napoca"
  };

  if (cities[city.toLowerCase()]) {
    return cities[city.toLowerCase()];
  }
  return city;
};
```

### 4. Dynamic Content Rendering Pattern

```javascript
// Clear previous content
jobsContainer.innerHTML = "";

// Render new content
jobs.forEach(job => {
  const jobElement = createJobCard(job);
  jobsContainer.appendChild(jobElement);
});
```

## Best Practices

### 1. Code Organization

```javascript
// ✅ Good: Organized sections
// ===================
// Constants
// ===================
const API_URL = "https://...";

// ===================
// Helper Functions
// ===================
const validateData = () => { };

// ===================
// Main Functions
// ===================
const fetchJobs = async () => { };

// ===================
// Event Listeners
// ===================
button.addEventListener("click", handleClick);
```

### 2. Comments

```javascript
// Good: Explain why, not what
// Retry logic needed due to API rate limiting
const MAX_RETRIES = 3;

// Transform location to match Romanian naming conventions
const normalizedCity = cityInRomania(city);

// Bad: State the obvious
// Set the company name
const companyName = "Amazon";
```

### 3. DRY (Don't Repeat Yourself)

```javascript
// Good: Reusable function
const createLink = (url, text, target = "_blank") => {
  return `<a href="${url}" target="${target}">${text}</a>`;
};

// Bad: Repeated code
const link1 = `<a href="${url1}" target="_blank">${text1}</a>`;
const link2 = `<a href="${url2}" target="_blank">${text2}</a>`;
```

### 4. Performance

```javascript
// Good: Batch DOM updates
const fragment = document.createDocumentFragment();
jobs.forEach(job => {
  fragment.appendChild(createJobCard(job));
});
jobsContainer.appendChild(fragment);

// Bad: Multiple reflows
jobs.forEach(job => {
  jobsContainer.appendChild(createJobCard(job));
});
```

## Common Components

### Alert Component

```javascript
const showAlert = (type, message) => {
  const alert = document.querySelector(".alertPopUp");
  const alertText = alert.querySelector(".alert-text-1");
  const alertImg = alert.querySelector("#image-alert");
  
  alertText.textContent = message;
  alertImg.src = type === "success" 
    ? "../../images/check.png" 
    : "../../images/error.png";
  
  alert.classList.add("active");
  
  setTimeout(() => {
    alert.classList.remove("active");
  }, 3000);
};
```

### Loading State Component

```javascript
const showLoadingState = () => {
  const button = document.querySelector(".functionality button");
  button.disabled = true;
  button.innerHTML = `
    <div>Loading...</div>
    <div class="spinner"></div>
  `;
};

const hideLoadingState = () => {
  const button = document.querySelector(".functionality button");
  button.disabled = false;
  button.innerHTML = `<div>Run Scraper</div>`;
};
```

### Console Output Component

```javascript
const showConsole = () => {
  const console = document.querySelector(".console");
  console.classList.remove("hidden");
};

const appendConsoleLog = (message) => {
  const consoleContent = document.querySelector(".console-content");
  const logEntry = document.createElement("div");
  logEntry.className = "console-log";
  logEntry.textContent = message;
  consoleContent.appendChild(logEntry);
  
  // Auto-scroll to bottom
  consoleContent.scrollTop = consoleContent.scrollHeight;
};
```

## Testing Components

While formal tests are not currently implemented, follow these manual testing guidelines:

1. **Browser Testing**: Test in Chrome, Firefox, Safari, and Edge
2. **Responsive Testing**: Test on mobile, tablet, and desktop sizes
3. **Error Scenarios**: Test with network errors, invalid data, etc.
4. **User Flows**: Test complete user journeys (search → select → run)
5. **Console Errors**: Check for JavaScript errors in browser console

## Checklist for New Components

Before adding a new component:

- [ ] Follow naming conventions
- [ ] Add proper error handling
- [ ] Validate all data inputs
- [ ] Include accessibility attributes
- [ ] Test in multiple browsers
- [ ] Document configuration requirements
- [ ] Check for performance issues
- [ ] Ensure mobile responsiveness
- [ ] Add inline comments where needed
- [ ] Follow existing patterns

## Resources

- [MDN Web Docs](https://developer.mozilla.org/) - JavaScript and Web API reference
- [Chart.js Documentation](https://www.chartjs.org/) - For chart components
- [CSS Guidelines](https://cssguidelin.es/) - CSS best practices

---

For questions or suggestions about these guidelines, please open an issue on GitHub.
