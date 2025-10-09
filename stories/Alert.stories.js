import '../css/scraper.css';

export default {
  title: 'Components/Alert',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['success', 'error', 'info'],
      description: 'Type of alert',
    },
    message: {
      control: 'text',
      description: 'Alert message text',
    },
    duration: {
      control: { type: 'number', min: 1000, max: 10000, step: 1000 },
      description: 'Duration in milliseconds before auto-dismiss',
    },
  },
};

// Helper function to create alert HTML
const createAlert = (type, message) => {
  const imageSrc = type === 'success' 
    ? '../../images/check.png' 
    : '../../images/error.png';

  return `
    <div class="alertPopUp active">
      <div class="alertPopUp-content">
        <img alt="${type}" class="alert-img" id="image-alert" src="${imageSrc}" />
        <div class="message">
          <span class="alert-text-1">${message}</span>
          <span class="alert-text-2"></span>
        </div>
      </div>
      <p class="close">X</p>
      <div class="progress active"></div>
    </div>
  `;
};

// Template
const Template = ({ type, message, duration }) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = createAlert(type, message);
  
  // Add close handler
  const closeBtn = wrapper.querySelector('.close');
  const alert = wrapper.querySelector('.alertPopUp');
  
  closeBtn.addEventListener('click', () => {
    alert.classList.remove('active');
  });
  
  // Auto-dismiss after duration
  setTimeout(() => {
    alert.classList.remove('active');
  }, duration);
  
  return wrapper;
};

// Stories
export const Success = Template.bind({});
Success.args = {
  type: 'success',
  message: 'Scraper executed successfully!',
  duration: 3000,
};

export const Error = Template.bind({});
Error.args = {
  type: 'error',
  message: 'Failed to execute scraper. Please try again.',
  duration: 3000,
};

export const Info = Template.bind({});
Info.args = {
  type: 'info',
  message: 'Processing your request...',
  duration: 3000,
};

export const LongMessage = Template.bind({});
LongMessage.args = {
  type: 'success',
  message: 'Your scraper has been executed successfully and found 150 job postings across multiple locations.',
  duration: 5000,
};
