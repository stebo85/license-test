# User Applications

This directory contains user applications for Neurodesk Play access.

## Structure

- `pending/`: Applications awaiting review
- `approved/`: Approved applications

## Application Process

1. Users submit applications through the website
2. Applications are stored as JSON files in the `pending/` directory
3. A pull request is created for review
4. Upon approval and merge, users are added to the neurodesk-users organization
5. Approved applications are moved to the `approved/` directory

## Application Format

```json
{
  "timestamp": "2024-01-01T12:00:00.000Z",
  "githubUsername": "username",
  "email": "user@example.com",
  "neurodeskUse": "Description of intended use",
  "status": "pending"
}
```