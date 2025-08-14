// Enhanced Form Handler for Bright Light House Contact Form
class ContactFormHandler {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.submitBtn = document.getElementById('submit-btn');
    this.init();
  }

  init() {
    if (!this.form) return;
    
    this.setupValidation();
    this.setupSubmission();
  }

  setupValidation() {
    const fields = [
      {
        element: document.getElementById('name'),
        errorElement: document.getElementById('name-error'),
        validator: (value) => value.length >= 2,
        errorMessage: 'Name must be at least 2 characters long'
      },
      {
        element: document.getElementById('email'),
        errorElement: document.getElementById('email-error'),
        validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        errorMessage: 'Please enter a valid email address'
      },
      {
        element: document.getElementById('phone'),
        errorElement: document.getElementById('phone-error'),
        validator: (value) => !value || /^[\+]?[0-9\s\-\(\)]{10,}$/.test(value),
        errorMessage: 'Please enter a valid phone number'
      },
      {
        element: document.getElementById('message'),
        errorElement: document.getElementById('message-error'),
        validator: (value) => value.length >= 10,
        errorMessage: 'Message must be at least 10 characters long'
      }
    ];

    fields.forEach(field => {
      if (field.element) {
        field.element.addEventListener('blur', () => {
          this.validateField(field);
        });
      }
    });

    this.fields = fields;
  }

  validateField(field) {
    const value = field.element.value.trim();
    const isValid = field.validator(value);

    if (!isValid) {
      field.element.classList.add('border-red-500');
      field.element.classList.remove('border-green-500');
      field.errorElement.textContent = field.errorMessage;
      field.errorElement.classList.remove('hidden');
      return false;
    } else {
      field.element.classList.remove('border-red-500');
      field.element.classList.add('border-green-500');
      field.errorElement.classList.add('hidden');
      return true;
    }
  }

  validateAllFields() {
    return this.fields.every(field => this.validateField(field));
  }

  setupSubmission() {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.handleSubmission();
    });
  }

  async handleSubmission() {
    // Hide previous messages
    this.hideMessages();

    // Validate all fields
    if (!this.validateAllFields()) {
      return;
    }

    // Show loading state
    this.setLoadingState(true);

    try {
      const formData = new FormData(this.form);
      const data = Object.fromEntries(formData.entries());

      // Here you would typically send to your backend
      // For now, we'll simulate the submission
      await this.submitForm(data);

      this.showSuccessMessage();
      this.form.reset();
      this.clearValidationClasses();

    } catch (error) {
      this.showErrorMessage(error.message);
    } finally {
      this.setLoadingState(false);
    }
  }

  async submitForm(data) {
    // Simulate API call - replace with actual endpoint
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success/failure
        if (Math.random() > 0.1) { // 90% success rate for demo
          resolve({ success: true });
        } else {
          reject(new Error('Network error occurred'));
        }
      }, 2000);
    });
  }

  setLoadingState(loading) {
    const submitText = document.getElementById('submit-text');
    const submitLoading = document.getElementById('submit-loading');

    this.submitBtn.disabled = loading;
    this.submitBtn.classList.toggle('loading', loading);
    
    if (loading) {
      submitText.classList.add('hidden');
      submitLoading.classList.remove('hidden');
    } else {
      submitText.classList.remove('hidden');
      submitLoading.classList.add('hidden');
    }
  }

  hideMessages() {
    const formMessages = document.getElementById('form-messages');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    formMessages.classList.add('hidden');
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');
  }

  showSuccessMessage() {
    const formMessages = document.getElementById('form-messages');
    const successMessage = document.getElementById('success-message');

    formMessages.classList.remove('hidden');
    successMessage.classList.remove('hidden');
  }

  showErrorMessage(message) {
    const formMessages = document.getElementById('form-messages');
    const errorMessage = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');

    errorText.textContent = message || 'There was an error sending your message. Please try again.';
    formMessages.classList.remove('hidden');
    errorMessage.classList.remove('hidden');
  }

  clearValidationClasses() {
    this.fields.forEach(field => {
      if (field.element) {
        field.element.classList.remove('border-red-500', 'border-green-500');
      }
    });
  }
}

// Initialize form handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ContactFormHandler('contactForm');
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContactFormHandler;
}