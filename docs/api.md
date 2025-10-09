# API Documentation

This document describes the backend API endpoints and data contracts used in the Scrapers-UI project.

## Table of Contents

- [Overview](#overview)
- [API Endpoints](#api-endpoints)
- [Data Contracts](#data-contracts)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Examples](#examples)

## Overview

The Scrapers-UI project interacts with several backend APIs for scraper execution and data retrieval. These APIs are hosted on external services and provide job scraping functionality.

### Base URLs

Multiple API endpoints are used across different scraper repositories:

```
https://dev.laurentiumarian.ro/scraper/PeViitor_Scrapers_Melania/
https://dev.laurentiumarian.ro/scraper/Scrapers_start_with_digi/
https://dev.laurentiumarian.ro/scraper/Scrapers_Job_PeViitor/
https://dev.laurentiumarian.ro/scraper/based_scraper_py/
https://dev.laurentiumarian.ro/scraper/based_scraper_js/
https://dev.laurentiumarian.ro/scraper/JobsScrapers/
https://dev.laurentiumarian.ro/scraper/Scrapers_Cristi_Olteanu/
https://dev.laurentiumarian.ro/scraper/Scrapers_canghelet/
https://dev.laurentiumarian.ro/scraper/scrapers_david/
https://dev.laurentiumarian.ro/scraper/Scrapers_Dan_Marius/
https://dev.laurentiumarian.ro/scraper/scrapers_Larisa_M16/
https://dev.laurentiumarian.ro/scraper/Scrapers_Matei/
https://dev.laurentiumarian.ro/scraper/spider_web_scraper_jmeker/
```

## API Endpoints

### 1. Execute Scraper

Executes a specific company scraper and returns job data.

**Endpoint:** `POST {base_url}`

**Request Body:**
```json
{
  "file": "company_scraper.py",
  "url": "https://dev.laurentiumarian.ro/scraper/repository_name/",
  "dataSetUrl": "https://dev.laurentiumarian.ro/dataset/repository_name/company_scraper.py/"
}
```

**Request Headers:**
```
Content-Type: application/json
```

**Response (Success - 200):**
```json
{
  "status": "success",
  "message": "Scraper executed successfully",
  "jobs": [
    {
      "job_title": "Software Engineer",
      "job_link": "https://company.com/careers/job/12345",
      "company": "Amazon",
      "country": "Romania",
      "city": "Bucharest",
      "county": "Bucuresti",
      "remote": "on-site"
    }
  ],
  "execution_time": "45.2s",
  "jobs_count": 25
}
```

**Response (Error - 4xx/5xx):**
```json
{
  "status": "error",
  "message": "Scraper execution failed",
  "error": "Connection timeout",
  "code": 500
}
```

### 2. Get Dataset

Retrieves the existing dataset for a specific scraper without re-executing it.

**Endpoint:** `GET {dataSetUrl}`

**Example URL:**
```
https://dev.laurentiumarian.ro/dataset/PeViitor_Scrapers_Melania/amazon_scraper.py/
```

**Response (Success - 200):**
```json
[
  {
    "id": "job_12345",
    "job_title": "Senior Software Engineer",
    "job_link": "https://www.amazon.jobs/en/jobs/12345/senior-software-engineer",
    "company": "Amazon",
    "country": "Romania",
    "city": "Bucuresti",
    "county": "Bucuresti",
    "remote": "hybrid",
    "posted_date": "2024-01-15",
    "scraped_date": "2024-01-16"
  }
]
```

### 3. Get Contributors (GitHub API)

Fetches contributor information from GitHub.

**Endpoint:** `GET https://api.github.com/repos/{owner}/{repo}/contributors`

**Example:**
```
https://api.github.com/repos/peviitor-ro/Scrapers-UI/contributors
```

**Response:**
```json
[
  {
    "login": "username",
    "id": 12345,
    "avatar_url": "https://avatars.githubusercontent.com/u/12345",
    "contributions": 42
  }
]
```

## Data Contracts

### Job Object

Standard job data structure returned by all scrapers:

```typescript
interface Job {
  // Required fields
  job_title: string;        // Title of the job position
  job_link: string;         // URL to the job posting
  company: string;          // Company name
  country: string;          // Country (e.g., "Romania", "Remote")
  city: string;             // City name
  
  // Optional fields
  county?: string;          // Romanian county (județ)
  remote?: string;          // "remote", "on-site", "hybrid"
  id?: string;              // Unique job identifier
  posted_date?: string;     // Date job was posted (ISO 8601)
  scraped_date?: string;    // Date job was scraped (ISO 8601)
  description?: string;     // Job description
  requirements?: string[];  // Job requirements
  benefits?: string[];      // Job benefits
  salary?: string;          // Salary information
  job_type?: string;        // "full-time", "part-time", "contract"
  experience_level?: string; // "entry", "mid", "senior"
}
```

### Scraper Configuration

Configuration object used by each scraper page:

```typescript
interface ScraperConfig {
  file: string;           // Scraper filename (e.g., "amazon_scraper.py")
  url: string;            // API endpoint for execution
  dataSetUrl: string;     // Dataset retrieval endpoint
}
```

**Example:**
```javascript
const apiObj = {
  file: "amazon_scraper.py",
  url: "https://dev.laurentiumarian.ro/scraper/PeViitor_Scrapers_Melania/",
  dataSetUrl: "https://dev.laurentiumarian.ro/dataset/PeViitor_Scrapers_Melania/amazon_scraper.py/"
};
```

### Scraper Metadata

Metadata for all scrapers (used in scrapers.js):

```typescript
interface ScraperMetadata {
  name: string;             // Company name (kebab-case)
  file: string;             // Scraper filename
  url: string;              // Execution API URL
  dataSetUrl: string;       // Dataset URL
  contributors: string[];   // GitHub usernames
  testers: string[];        // GitHub usernames
  logo?: string;            // Company logo URL
  careers_url?: string;     // Company careers page
}
```

**Example:**
```javascript
{
  name: "amazon",
  file: "amazon_scraper.py",
  url: "https://dev.laurentiumarian.ro/scraper/PeViitor_Scrapers_Melania/",
  dataSetUrl: "https://dev.laurentiumarian.ro/dataset/PeViitor_Scrapers_Melania/amazon_scraper.py/",
  contributors: ["developer1", "developer2"],
  testers: ["tester1"],
  logo: "https://amazon.com/logo.png",
  careers_url: "https://www.amazon.jobs/"
}
```

## Authentication

Currently, the APIs do not require authentication for public scrapers. However, this may change in the future.

### Future Authentication

When authentication is implemented, it will likely use:

**Bearer Token:**
```javascript
const response = await fetch(apiObj.url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_TOKEN"
  },
  body: JSON.stringify(apiObj)
});
```

**API Key:**
```javascript
const response = await fetch(`${apiObj.url}?api_key=YOUR_API_KEY`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(apiObj)
});
```

## Error Handling

### HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request succeeded |
| 400 | Bad Request | Invalid request format |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Access denied |
| 404 | Not Found | Scraper or endpoint not found |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error occurred |
| 503 | Service Unavailable | Server temporarily unavailable |

### Error Response Format

```json
{
  "status": "error",
  "message": "Human-readable error message",
  "error": "Technical error details",
  "code": 500,
  "timestamp": "2024-01-16T10:30:00Z"
}
```

### Client-Side Error Handling

```javascript
const runScraper = async (apiObj) => {
  try {
    const response = await fetch(apiObj.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiObj),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status === "error") {
      throw new Error(data.message || "Unknown error occurred");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    
    // User-friendly error messages
    if (error.message.includes("Failed to fetch")) {
      alert("Network error. Please check your connection.");
    } else if (error.message.includes("429")) {
      alert("Rate limit exceeded. Please try again later.");
    } else {
      alert(`Error: ${error.message}`);
    }
    
    throw error;
  }
};
```

## Rate Limiting

### Current Limits

Rate limiting may be implemented on the backend. Expected limits:
- **Requests per minute:** 60
- **Requests per hour:** 1000
- **Concurrent requests:** 10

### Handling Rate Limits

```javascript
const fetchWithRetry = async (url, options, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      
      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After") || 60;
        console.log(`Rate limited. Retrying after ${retryAfter}s...`);
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
        continue;
      }
      
      return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};
```

## Examples

### Example 1: Execute Scraper

```javascript
// Configuration
const apiObj = {
  file: "microsoft_scraper.py",
  url: "https://dev.laurentiumarian.ro/scraper/PeViitor_Scrapers_Melania/",
  dataSetUrl: "https://dev.laurentiumarian.ro/dataset/PeViitor_Scrapers_Melania/microsoft_scraper.py/"
};

// Execute scraper
const executeScraper = async () => {
  try {
    const response = await fetch(apiObj.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiObj),
    });

    const data = await response.json();
    
    console.log(`Found ${data.jobs_count} jobs`);
    console.log(`Execution time: ${data.execution_time}`);
    
    // Display jobs
    data.jobs.forEach(job => {
      console.log(`${job.job_title} at ${job.city}`);
    });
    
  } catch (error) {
    console.error("Failed to execute scraper:", error);
  }
};

executeScraper();
```

### Example 2: Retrieve Dataset

```javascript
// Fetch existing dataset without running scraper
const getDataset = async (dataSetUrl) => {
  try {
    const response = await fetch(dataSetUrl);
    const jobs = await response.json();
    
    console.log(`Retrieved ${jobs.length} jobs from dataset`);
    
    // Filter by city
    const bucharestJobs = jobs.filter(job => job.city === "Bucuresti");
    console.log(`${bucharestJobs.length} jobs in Bucharest`);
    
    return jobs;
  } catch (error) {
    console.error("Failed to retrieve dataset:", error);
  }
};

getDataset(apiObj.dataSetUrl);
```

### Example 3: Validate Job Data

```javascript
// Validate job object before processing
const validateJob = (job) => {
  const requiredFields = ["job_title", "job_link", "company", "country", "city"];
  
  for (const field of requiredFields) {
    if (!job[field] || job[field].trim() === "") {
      console.error(`Missing required field: ${field}`);
      return false;
    }
  }
  
  // Validate URL format
  try {
    new URL(job.job_link);
  } catch {
    console.error(`Invalid job_link: ${job.job_link}`);
    return false;
  }
  
  return true;
};

// Usage
const job = {
  job_title: "Software Engineer",
  job_link: "https://careers.company.com/123",
  company: "Company",
  country: "Romania",
  city: "Bucuresti"
};

if (validateJob(job)) {
  console.log("Job is valid");
}
```

### Example 4: Fetch Contributors

```javascript
// Get contributor information from GitHub
const getContributors = async (repo) => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/peviitor-ro/${repo}/contributors`
    );
    const contributors = await response.json();
    
    // Display contributors
    contributors.forEach(contributor => {
      console.log(`${contributor.login}: ${contributor.contributions} contributions`);
    });
    
    return contributors;
  } catch (error) {
    console.error("Failed to fetch contributors:", error);
  }
};

getContributors("Scrapers-UI");
```

## Best Practices

### 1. Always Validate Data

```javascript
// Validate before using
if (validate_data(job, "job_title") && validate_link(job, "job_link")) {
  displayJob(job);
}
```

### 2. Handle Errors Gracefully

```javascript
try {
  const data = await fetchApi(apiObj);
  processData(data);
} catch (error) {
  console.error("Error:", error);
  showErrorAlert("Failed to fetch data. Please try again.");
}
```

### 3. Provide User Feedback

```javascript
// Show loading state
showLoadingIndicator();

try {
  const data = await fetchApi(apiObj);
  hideLoadingIndicator();
  showSuccessAlert("Scraper executed successfully!");
} catch (error) {
  hideLoadingIndicator();
  showErrorAlert(error.message);
}
```

### 4. Cache When Appropriate

```javascript
// Cache dataset to reduce API calls
const cachedDatasets = new Map();

const getDatasetCached = async (url) => {
  if (cachedDatasets.has(url)) {
    return cachedDatasets.get(url);
  }
  
  const data = await fetch(url).then(r => r.json());
  cachedDatasets.set(url, data);
  return data;
};
```

## Additional Resources

- [Architecture Documentation](architecture.md) - System architecture
- [Component Guidelines](components-guidelines.md) - Code patterns
- [Contributing Guide](contributing.md) - How to contribute

## Support

For API-related issues:
1. Check console for error messages
2. Verify endpoint URLs are correct
3. Ensure data format matches contracts
4. Open an issue on GitHub with details

---

**Note:** API endpoints and data structures may change. Always refer to the latest documentation.
