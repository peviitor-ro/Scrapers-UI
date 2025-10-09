import '../css/scraper.css';

export default {
  title: 'Components/JobCard',
  tags: ['autodocs'],
  argTypes: {
    jobTitle: {
      control: 'text',
      description: 'Job title',
    },
    company: {
      control: 'text',
      description: 'Company name',
    },
    location: {
      control: 'text',
      description: 'Job location',
    },
    remote: {
      control: { type: 'select' },
      options: ['on-site', 'remote', 'hybrid'],
      description: 'Work mode',
    },
    jobLink: {
      control: 'text',
      description: 'Job posting URL',
    },
  },
};

// Template for job card
const Template = ({ jobTitle, company, location, remote, jobLink }) => {
  const card = document.createElement('div');
  card.className = 'job-card';
  card.innerHTML = `
    <div class="job-card-header">
      <h3 class="job-title">${jobTitle}</h3>
      <span class="job-remote ${remote}">${remote}</span>
    </div>
    <div class="job-card-body">
      <p class="job-company">
        <strong>Company:</strong> ${company}
      </p>
      <p class="job-location">
        <strong>Location:</strong> ${location}
      </p>
    </div>
    <div class="job-card-footer">
      <a href="${jobLink}" target="_blank" rel="noopener noreferrer" class="job-link">
        View Job →
      </a>
    </div>
  `;
  
  return card;
};

// Stories
export const OnSiteJob = Template.bind({});
OnSiteJob.args = {
  jobTitle: 'Senior Software Engineer',
  company: 'Amazon',
  location: 'Bucuresti, Romania',
  remote: 'on-site',
  jobLink: 'https://www.amazon.jobs/en/jobs/12345',
};

export const RemoteJob = Template.bind({});
RemoteJob.args = {
  jobTitle: 'Frontend Developer',
  company: 'Microsoft',
  location: 'Remote',
  remote: 'remote',
  jobLink: 'https://careers.microsoft.com/job/12345',
};

export const HybridJob = Template.bind({});
HybridJob.args = {
  jobTitle: 'Full Stack Developer',
  company: 'Google',
  location: 'Cluj-Napoca, Romania',
  remote: 'hybrid',
  jobLink: 'https://careers.google.com/job/12345',
};

export const LongTitle = Template.bind({});
LongTitle.args = {
  jobTitle: 'Principal Software Engineering Manager - Cloud Infrastructure and DevOps',
  company: 'IBM',
  location: 'Bucuresti, Romania',
  remote: 'hybrid',
  jobLink: 'https://www.ibm.com/careers/job/12345',
};

// Job list example
export const JobList = () => {
  const container = document.createElement('div');
  container.className = 'jobs';
  
  const jobs = [
    {
      jobTitle: 'Software Engineer',
      company: 'Amazon',
      location: 'Bucuresti',
      remote: 'on-site',
      jobLink: 'https://example.com/1'
    },
    {
      jobTitle: 'Data Scientist',
      company: 'Microsoft',
      location: 'Remote',
      remote: 'remote',
      jobLink: 'https://example.com/2'
    },
    {
      jobTitle: 'DevOps Engineer',
      company: 'Google',
      location: 'Cluj-Napoca',
      remote: 'hybrid',
      jobLink: 'https://example.com/3'
    }
  ];
  
  jobs.forEach(job => {
    const card = Template(job);
    container.appendChild(card);
  });
  
  return container;
};
