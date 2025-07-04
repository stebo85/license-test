# Neurodesk Play Signup Website

This repository hosts a signup website for Neurodesk Play that allows users to apply for access to the platform.

## Features

- **User-friendly signup form** that collects:
  - GitHub username
  - Email address
  - Description of intended use for Neurodesk Play
- **Form validation** with real-time feedback
- **Responsive design** that works on desktop and mobile
- **Pull request workflow** for reviewing applications
- **Automated user management** for adding approved users to the neurodesk-users organization

## How it Works

1. **User Submission**: Users fill out the signup form on the website
2. **PR Creation**: Form submission triggers a GitHub workflow that creates a pull request with the user's application
3. **Review Process**: Maintainers review the application through the pull request
4. **Approval**: When the PR is merged, the user is automatically invited to the neurodesk-users organization

## Website Structure

```
├── index.html          # Main signup page
├── style.css           # Styling for the website
├── script.js           # Form handling and validation
├── applications/       # Directory for storing applications
│   ├── pending/       # Applications awaiting review
│   ├── approved/      # Approved applications
│   └── README.md      # Documentation for application format
└── .github/workflows/ # GitHub Actions workflows
    ├── pages.yml      # GitHub Pages deployment
    ├── handle-submission.yml  # Handle form submissions
    └── user-application.yml   # Process applications
```

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages" in the sidebar
3. Select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Save the settings

### 2. Configure Secrets

For the full implementation to work, you'll need to set up the following repository secrets:

1. `ORG_TOKEN`: A GitHub personal access token with organization permissions
   - Go to GitHub Settings > Developer settings > Personal access tokens
   - Create a token with `admin:org` scope
   - Add it as a repository secret named `ORG_TOKEN`

### 3. Update Organization Settings

- Ensure the `neurodesk-users` organization exists
- Update the workflow files with the correct organization name if different
- Add appropriate reviewers in the workflow files

### 4. Customize the Website

- Update the links in `index.html` to point to the correct Neurodesk resources
- Modify the styling in `style.css` to match your branding
- Adjust the form fields if needed

## Current Implementation Status

✅ **Completed:**
- Responsive signup form with validation
- GitHub Pages deployment workflow
- Application data structure
- Form submission handling (demo version)
- Success/error message display

🔄 **Needs Configuration:**
- GitHub API integration for creating actual pull requests
- Organization token configuration
- Reviewer assignment setup

## Demo vs Production

The current implementation includes a demo version of the form submission that simulates the process. To make it fully functional:

1. Set up a serverless function (e.g., Netlify Functions, Vercel Functions, or GitHub Actions) to handle form submissions
2. Configure the function to use the GitHub API to create pull requests
3. Set up the organization token and permissions
4. Test the complete workflow

## Testing the Website

The website can be tested locally by running a simple HTTP server:

```bash
python3 -m http.server 8000
```

Then navigate to `http://localhost:8000` to see the signup form.

## Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## License

This project is part of the Neurodesk ecosystem. Please refer to the main Neurodesk license for terms and conditions.