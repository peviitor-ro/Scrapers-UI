---
name: New Scraper
about: Add a new company scraper
title: '[SCRAPER] Add scraper for [Company Name]'
labels: enhancement, new-scraper
assignees: ''
---

## Company Information

**Company Name:** 
**Company Website:** 
**Careers Page URL:** 
**Company Logo URL:** 

## Scraper Details

**Scraper Type:**
- [ ] Python
- [ ] JavaScript
- [ ] JMeter
- [ ] Other (specify): 

**API Endpoint:** 
**Dataset URL:** 

## Requirements

### Technical Requirements
- [ ] Scraper script is ready
- [ ] API endpoints are configured
- [ ] Test runs show valid data

### Data Fields
Confirm the scraper collects all required fields:
- [ ] job_title
- [ ] job_link
- [ ] company
- [ ] country
- [ ] city
- [ ] county (for Romanian locations)
- [ ] remote (on-site/remote/hybrid)

### Optional Fields
- [ ] posted_date
- [ ] job_type
- [ ] experience_level
- [ ] salary
- [ ] description

## Implementation Checklist

- [ ] Create `src/[company-name]/` directory
- [ ] Create `src/[company-name]/index.html` following template
- [ ] Add company logo to images (if available)
- [ ] Add scraper metadata to `js/scrapers.js`
- [ ] Configure `apiObj` with correct endpoints
- [ ] Test scraper execution
- [ ] Verify data validation
- [ ] Test responsive design
- [ ] Check console for errors

## Documentation Requirements

- [ ] Add contributor information to `js/scrapers.js`
- [ ] Add tester information (if applicable)
- [ ] Document any special configuration
- [ ] Add screenshots to PR
- [ ] Update README if needed

## Testing

**Test Results:**
- [ ] Scraper executes successfully
- [ ] Jobs are displayed correctly
- [ ] All links work properly
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] No console errors
- [ ] Data validation passes

**Sample Data:**
```json
{
  "job_title": "Example Job Title",
  "job_link": "https://...",
  "company": "Company Name",
  "country": "Romania",
  "city": "Bucuresti",
  "remote": "hybrid"
}
```

## Additional Notes
<!-- Add any special considerations or notes about this scraper -->

## Related Links
- Company website: 
- Careers page: 
- API documentation (if available): 

## Contributors
<!-- List contributors and testers -->
- **Contributor(s):** @username
- **Tester(s):** @username
