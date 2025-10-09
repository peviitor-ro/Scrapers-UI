import '../css/scraper.css';

export default {
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Button text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
  },
};

// Template for regular button
const Template = ({ label, disabled, loading }) => {
  const button = document.createElement('button');
  button.className = 'functionality-button';
  button.disabled = disabled;
  
  if (loading) {
    button.innerHTML = `
      <div>${label}</div>
      <div class="spinner"></div>
    `;
  } else {
    button.innerHTML = `
      <div>${label}</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16px"
        height="16px"
        viewBox="0 0 16 16"
        fill="white"
        class="bi bi-gear"
      >
        <path
          d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
        />
        <path
          d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z"
        />
      </svg>
    `;
  }
  
  button.addEventListener('click', () => {
    console.log('Button clicked:', label);
  });
  
  return button;
};

// Stories
export const RunScraper = Template.bind({});
RunScraper.args = {
  label: 'Run Scraper',
  disabled: false,
  loading: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Run Scraper',
  disabled: true,
  loading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  label: 'Loading...',
  disabled: true,
  loading: true,
};

export const ViewDataset = Template.bind({});
ViewDataset.args = {
  label: 'View Dataset',
  disabled: false,
  loading: false,
};
