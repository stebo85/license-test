// Form handling and submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');

    // Form validation
    function validateForm(formData) {
        const errors = [];
        
        if (!formData.githubUsername.trim()) {
            errors.push('GitHub username is required');
        } else if (!/^[a-zA-Z0-9]([a-zA-Z0-9]|-)*[a-zA-Z0-9]$|^[a-zA-Z0-9]$/.test(formData.githubUsername)) {
            errors.push('Invalid GitHub username format');
        }
        
        if (!formData.email.trim()) {
            errors.push('Email address is required');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.push('Invalid email format');
        }
        
        if (!formData.neurodeskUse.trim()) {
            errors.push('Please describe what you want to use Neurodesk Play for');
        } else if (formData.neurodeskUse.trim().length < 10) {
            errors.push('Please provide a more detailed description (at least 10 characters)');
        }
        
        return errors;
    }

    // Hide messages
    function hideMessages() {
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
    }

    // Show success message
    function showSuccess() {
        hideMessages();
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth' });
    }

    // Show error message
    function showError(message) {
        hideMessages();
        errorText.textContent = message;
        errorMessage.style.display = 'block';
        errorMessage.scrollIntoView({ behavior: 'smooth' });
    }

    // Create the data structure for the PR
    function createApplicationData(formData) {
        return {
            timestamp: new Date().toISOString(),
            githubUsername: formData.githubUsername.trim(),
            email: formData.email.trim(),
            neurodeskUse: formData.neurodeskUse.trim(),
            status: 'pending'
        };
    }

    // Create a pull request using GitHub's repository dispatch
    async function createPullRequest(applicationData) {
        try {
            // In a real implementation, this would use a serverless function or GitHub App
            // to trigger the repository dispatch with proper authentication
            // For now, we'll simulate the submission process
            
            // This would normally call a serverless function that has the proper GitHub token
            // The serverless function would then call:
            // POST /repos/stebo85/license-test/dispatches
            // with event_type: "user-application" and client_payload: applicationData
            
            console.log('Application data to be submitted:', applicationData);
            
            // Simulate the API call
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        success: true,
                        message: 'Application submitted successfully'
                    });
                }, 1500);
            });
            
        } catch (error) {
            console.error('Error creating PR:', error);
            throw error;
        }
    }

    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            githubUsername: document.getElementById('githubUsername').value,
            email: document.getElementById('email').value,
            neurodeskUse: document.getElementById('neurodeskUse').value
        };

        // Validate form
        const errors = validateForm(formData);
        if (errors.length > 0) {
            showError(errors.join('. '));
            return;
        }

        // Disable submit button and show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        submitBtn.textContent = 'Submitting...';

        try {
            // Create application data
            const applicationData = createApplicationData(formData);
            
            // Submit the application (create PR)
            const result = await createPullRequest(applicationData);
            
            if (result.success) {
                // Show success message
                showSuccess();
                // Reset form
                form.reset();
            } else {
                throw new Error(result.error || 'Failed to submit application');
            }
        } catch (error) {
            console.error('Submission error:', error);
            showError('Failed to submit application. Please try again later.');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Submit Application';
        }
    });

    // Real-time validation feedback
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const formData = {
                githubUsername: document.getElementById('githubUsername').value,
                email: document.getElementById('email').value,
                neurodeskUse: document.getElementById('neurodeskUse').value
            };
            
            // Only validate if field has content
            if (input.value.trim()) {
                const errors = validateForm(formData);
                // Individual field validation could be added here
            }
        });
    });

    // GitHub username formatting
    const githubInput = document.getElementById('githubUsername');
    githubInput.addEventListener('input', function() {
        // Remove @ symbol if user enters it
        this.value = this.value.replace('@', '');
    });
});