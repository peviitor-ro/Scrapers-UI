# Scrapers-UI Documentation

Welcome to the Scrapers-UI project documentation. This directory contains comprehensive guides and references to help you understand, use, and contribute to the project.

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Documentation Structure](#documentation-structure)
- [Getting Help](#getting-help)

## Overview

Scrapers-UI is a web-based interface for managing and executing web scrapers for job postings across multiple companies. The project provides:

- **UI Interface**: A visual interface to view, run, and monitor scrapers
- **Scraper Management**: Individual scraper pages for hundreds of companies
- **Data Visualization**: Charts and analytics for scraped job data
- **API Integration**: Backend integration for scraper execution and data retrieval

## Quick Start

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Python 3.x (for backend scrapers)
- Basic understanding of HTML, CSS, and JavaScript

### Installation

1. Clone the repository:
```bash
git clone https://github.com/peviitor-ro/Scrapers-UI.git
cd Scrapers-UI
```

2. Open `index.html` in your browser to view the main scraper list

3. For development, use a local server:
```bash
python -m http.server 8000
# or
npx http-server
```

4. Access the application at `http://localhost:8000`

### Project Structure

```
Scrapers-UI/
├── index.html          # Main landing page
├── doc.html           # Existing documentation page
├── css/               # Stylesheets
├── js/                # JavaScript modules
├── src/               # Individual scraper pages
│   ├── amazon/
│   ├── microsoft/
│   └── ...           # (800+ company scrapers)
├── images/            # Image assets
├── diagram/           # Architecture diagrams
├── docs/              # Project documentation (this folder)
└── main.py           # Main scraper management script
```

## Documentation Structure

- **[README.md](README.md)** (this file) - General project overview and setup
- **[architecture.md](architecture.md)** - Project structure, data flow, and technical architecture
- **[components-guidelines.md](components-guidelines.md)** - JavaScript component standards and patterns
- **[contributing.md](contributing.md)** - Contribution guidelines and review process
- **[api.md](api.md)** - Backend API endpoints and data contracts

## Getting Help

- **Issues**: Report bugs or request features on [GitHub Issues](https://github.com/peviitor-ro/Scrapers-UI/issues)
- **Documentation**: Browse the docs in this folder
- **Existing Docs**: Check the [doc.html](../doc.html) page for Romanian language documentation

## Key Features

### Scraper Pages
Each company has a dedicated scraper page (`src/<company>/index.html`) that provides:
- Company information and links
- Scraper execution controls
- Real-time console output
- Job listings display
- Data analytics charts

### Main Dashboard
The main `index.html` provides:
- Search functionality for finding scrapers
- Grid view of all available company scrapers
- Quick navigation to individual scraper pages

### Documentation Page
The existing `doc.html` includes:
- Useful links
- Meeting schedules
- Web scraping guides
- Architecture diagrams

## Development Workflow

1. **Browse Documentation**: Start with [architecture.md](architecture.md) to understand the system
2. **Review Guidelines**: Check [components-guidelines.md](components-guidelines.md) for coding standards
3. **Make Changes**: Follow the patterns established in existing code
4. **Test Locally**: Run scrapers and verify functionality
5. **Submit PR**: See [contributing.md](contributing.md) for pull request guidelines

## Next Steps

- Read the [Architecture Guide](architecture.md) to understand the system design
- Check [Components Guidelines](components-guidelines.md) to learn about code patterns
- Review [Contributing Guide](contributing.md) before making changes
- Explore the [API Documentation](api.md) for backend integration details

---

For more information, visit the [main repository](https://github.com/peviitor-ro/Scrapers-UI).
