# Architecture Documentation

This document describes the architecture, structure, and data flow of the Scrapers-UI project.

## Table of Contents

- [System Overview](#system-overview)
- [Architecture Diagram](#architecture-diagram)
- [Project Structure](#project-structure)
- [Data Flow](#data-flow)
- [Key Components](#key-components)
- [Technology Stack](#technology-stack)

## System Overview

Scrapers-UI is a static web application that provides a user interface for managing job scrapers. The system consists of:

1. **Frontend Layer**: HTML, CSS, and JavaScript files
2. **Scraper Layer**: Individual scraper pages for each company
3. **Backend API Layer**: External scraper execution services
4. **Data Layer**: JSON data and API responses

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    User Browser                          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  Frontend Layer                          │
│  ┌───────────┐  ┌────────────┐  ┌──────────────────┐  │
│  │ index.html│  │  doc.html  │  │ Scraper Pages    │  │
│  │ (Main UI) │  │   (Docs)   │  │ (src/*/index.html)│  │
│  └───────────┘  └────────────┘  └──────────────────┘  │
│         │              │                  │             │
│         ▼              ▼                  ▼             │
│  ┌──────────────────────────────────────────────────┐  │
│  │        JavaScript Modules (js/)                   │  │
│  │  - scraper.js    - chart.js    - scrapers.js    │  │
│  │  - countries.js  - counties.js - script.js       │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Backend API Layer                           │
│  - Scraper execution endpoints                          │
│  - Dataset retrieval endpoints                          │
│  - GitHub API (for contributors/metadata)               │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│                 Python Scrapers                          │
│  - Job scraping scripts                                 │
│  - Data validation                                      │
│  - Data transformation                                  │
└─────────────────────────────────────────────────────────┘
```

## Project Structure

### Directory Layout

```
Scrapers-UI/
│
├── index.html              # Main landing page with scraper grid
├── doc.html               # Existing documentation (Romanian)
│
├── css/                   # Stylesheets
│   ├── style.css         # Main page styles
│   ├── styleDoc.css      # Documentation page styles
│   ├── scraper.css       # Individual scraper page styles
│   └── diagram.css       # Diagram page styles
│
├── js/                    # JavaScript modules
│   ├── script.js         # Main page logic
│   ├── scraper.js        # Scraper page logic
│   ├── scrapers.js       # Scraper data and rendering
│   ├── chart.js          # Chart visualization
│   ├── countries.js      # Country data
│   ├── counties.js       # Romanian county data
│   ├── doc.js            # Documentation page logic
│   └── diagram.js        # Diagram page logic
│
├── src/                   # Individual scraper pages
│   ├── amazon/
│   │   └── index.html    # Amazon scraper page
│   ├── microsoft/
│   │   └── index.html    # Microsoft scraper page
│   └── [800+ companies]/ # Each company has its own folder
│
├── images/                # Image assets
│   ├── svg/              # SVG logos
│   └── *.png             # Other images
│
├── diagram/               # Architecture diagrams
│   ├── diagram.html      # Diagram viewer page
│   └── images/           # Diagram images
│
├── docs/                  # Project documentation
│   ├── README.md         # Documentation overview
│   ├── architecture.md   # This file
│   ├── components-guidelines.md
│   ├── contributing.md
│   └── api.md
│
├── main.py               # Scraper management script
├── scrapy.py             # Additional scraper utilities
└── README.md             # Project README
```

### Scraper Page Structure

Each scraper page follows this standard structure:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Meta tags and CSS -->
  </head>
  <body>
    <!-- Header with navigation -->
    <div class="header">...</div>
    
    <!-- Alert popup -->
    <div class="alertPopUp">...</div>
    
    <!-- Company section -->
    <section class="company">
      <!-- Company info card -->
      <div class="company-card">...</div>
      
      <!-- Functionality section -->
      <div class="functionality">
        <button>Run Scraper</button>
      </div>
    </section>
    
    <!-- Jobs display section -->
    <div class="jobs">...</div>
    
    <!-- Console output -->
    <div class="console">...</div>
    
    <!-- Scripts -->
    <script>
      const apiObj = {
        file: "company_scraper.py",
        url: "https://api.endpoint/",
        dataSetUrl: "https://dataset.endpoint/"
      };
    </script>
    <script src="../../js/scraper.js"></script>
  </body>
</html>
```

## Data Flow

### 1. Main Page Data Flow

```
User Visits index.html
    ↓
scrapers.js loads scraper metadata
    ↓
script.js renders scraper grid
    ↓
User searches/filters scrapers
    ↓
Grid updates dynamically
```

### 2. Scraper Execution Flow

```
User clicks "Run Scraper" button
    ↓
scraper.js captures button click
    ↓
Sends POST request to backend API
    {
      file: "company_scraper.py",
      url: "https://api.endpoint/"
    }
    ↓
Backend executes Python scraper
    ↓
Real-time logs streamed to console
    ↓
Jobs data returned as JSON
    ↓
Jobs rendered on page
    ↓
Chart.js visualizes data
```

### 3. Dataset Retrieval Flow

```
User requests dataset
    ↓
GET request to dataSetUrl
    ↓
Returns JSON array of jobs
    [
      {
        job_title: "...",
        job_link: "...",
        company: "...",
        country: "...",
        city: "...",
        remote: "..."
      }
    ]
    ↓
Data validated and displayed
```

## Key Components

### JavaScript Modules

#### 1. scraper.js
**Purpose**: Core logic for individual scraper pages

**Key Functions**:
- `fetchApi(apiObj)` - Executes scraper via API
- `validate_data(data, keyword)` - Validates job data fields
- `displayJobs(jobs)` - Renders job listings
- `displayChart(data)` - Creates data visualizations

**Dependencies**: chart.js, countries.js, counties.js

#### 2. scrapers.js
**Purpose**: Metadata and configuration for all scrapers

**Structure**:
```javascript
const scrapers = [
  {
    name: "company-name",
    file: "scraper_file.py",
    url: "api_endpoint",
    dataSetUrl: "dataset_endpoint",
    contributors: ["username"],
    testers: ["username"]
  }
];
```

#### 3. script.js
**Purpose**: Main page functionality

**Key Functions**:
- Search and filter scrapers
- Render scraper grid
- Handle navigation

#### 4. chart.js
**Purpose**: Data visualization using Chart.js library

**Features**:
- Bar charts for job distribution
- Pie charts for location analysis
- Interactive legends

#### 5. countries.js & counties.js
**Purpose**: Geographic data for validation and display

**Usage**:
- Validate job locations
- Display readable location names
- Filter by location

### Python Scripts

#### main.py
**Purpose**: Scraper management and generation

**Key Functions**:
- Fetch scraper metadata from APIs
- Generate scraper JSON configuration
- Manage scraper URLs

**API Endpoints Used**:
- `https://dev.laurentiumarian.ro/scraper/*` - Multiple scraper repositories

#### scrapy.py
**Purpose**: Additional scraper utilities

## Technology Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Custom styles, responsive design
- **Vanilla JavaScript**: No framework dependencies
- **Chart.js**: Data visualization library

### Backend APIs
- **Python**: Scraper execution
- **REST APIs**: Communication layer
- Various scraper frameworks (Scrapy, Selenium, etc.)

### External Services
- **GitHub API**: Contributor information
- **Custom Scraper APIs**: Job data retrieval
- **Targetare.ro**: Company information

## Design Patterns

### 1. Configuration Pattern
Each scraper page defines an `apiObj` configuration:
```javascript
const apiObj = {
  file: "scraper_file.py",
  url: "execution_endpoint",
  dataSetUrl: "data_endpoint"
};
```

### 2. Module Pattern
JavaScript functionality is organized into separate modules:
- Separation of concerns
- Reusable components
- Easy maintenance

### 3. Template Pattern
HTML structure is consistent across scraper pages:
- Standardized layout
- Predictable behavior
- Easier debugging

## Performance Considerations

1. **Static Assets**: All frontend files are static (HTML, CSS, JS)
2. **CDN Usage**: Chart.js loaded from CDN
3. **Lazy Loading**: Jobs and data loaded on demand
4. **Minimal Dependencies**: No heavy frameworks

## Security Considerations

1. **Data Validation**: All job data validated before display
2. **CORS**: API endpoints must allow cross-origin requests
3. **Input Sanitization**: User input sanitized in search
4. **External Links**: Company links open in new tabs

## Scalability

The current architecture supports:
- **800+ scrapers** with individual pages
- **Modular addition** of new scrapers
- **Independent scraper updates** without affecting others
- **Distributed backend** across multiple API endpoints

## Future Architecture Improvements

Potential enhancements:
1. **Build System**: Add bundling and minification
2. **Framework Migration**: Consider React/Vue for better component reusability
3. **State Management**: Centralized state for complex interactions
4. **Service Workers**: Offline support and caching
5. **Testing Framework**: Automated testing infrastructure
6. **CI/CD Pipeline**: Automated deployment and validation

## Additional Resources

- [Existing Diagram](../diagram/diagram.html) - Visual architecture representation
- [API Documentation](api.md) - Detailed API specifications
- [Component Guidelines](components-guidelines.md) - Code patterns and standards
