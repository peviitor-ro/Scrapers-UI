# Scrapers-UI

A web-based interface for managing and executing web scrapers for job postings across multiple companies in Romania.

## 📚 Documentation

Comprehensive project documentation is available in the [`docs/`](docs/) directory:

- **[Getting Started](docs/README.md)** - Setup, installation, and quick start guide
- **[Architecture](docs/architecture.md)** - System design, structure, and data flow
- **[Component Guidelines](docs/components-guidelines.md)** - Code standards and patterns
- **[Contributing](docs/contributing.md)** - How to contribute to the project
- **[API Documentation](docs/api.md)** - Backend endpoints and data contracts

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/peviitor-ro/Scrapers-UI.git
cd Scrapers-UI
```

2. Start a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using npm (after npm install)
npm start
```

3. Open your browser to `http://localhost:8000`

## 📖 Interactive Documentation

View component documentation with Storybook:

```bash
npm install
npm run storybook
```

This will start Storybook on `http://localhost:6006` with interactive component documentation.

## 🎯 Features

- **800+ Company Scrapers** - Individual scraper pages for major companies
- **Real-time Execution** - Run scrapers and view results instantly
- **Data Visualization** - Charts and analytics for job data
- **Search & Filter** - Find scrapers quickly
- **Console Output** - Live scraper execution logs

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](docs/contributing.md) for details on:

- Setting up your development environment
- Code standards and guidelines
- Pull request process
- Testing requirements

## 📝 License

See [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Project Website**: [PeViitor](https://peviitor.ro)
- **Company Database**: [Firme PeViitor](https://firme.peviitor.ro/)
- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/peviitor-ro/Scrapers-UI/issues)

## 💻 npm Scripts

```bash
npm start              # Start development server on port 8000
npm run serve          # Start server without opening browser
npm run docs:serve     # Serve documentation on port 8001
npm run docs:validate  # Validate documentation structure
npm run storybook      # Start Storybook documentation server
npm run build-storybook # Build static Storybook documentation
```

## 📁 Project Structure

```
Scrapers-UI/
├── docs/              # 📚 Project documentation
├── src/               # 🏢 Individual company scraper pages
├── js/                # 💻 JavaScript modules
├── css/               # 🎨 Stylesheets
├── stories/           # 📖 Storybook component stories
├── images/            # 🖼️ Image assets
└── index.html         # 🏠 Main landing page
```

For detailed project structure, see [Architecture Documentation](docs/architecture.md).

---

**Made with ❤️ by the PeViitor Team**