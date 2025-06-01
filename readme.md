# Job Tracker Application

A full-stack application to help users track their job applications throughout the job search process.

## Features

### Authentication
- User registration with username and email
- Login with username/email and password
- JWT-based authentication with token refresh
- Secure password handling and validation
- Protected routes and API endpoints
- Automatic token management and refresh
- Logout functionality with token blacklisting
- Persistent user session handling

### Job Management
1. **View Jobs**
   - List all job applications in a card layout
   - Each card shows key information:
     - Company name
     - Position
     - Application status
     - Applied date
   - Interactive cards with hover effects
   - Empty state handling for no jobs
   - Real-time updates after modifications

2. **Add Jobs**
   - Modal-based job creation form
   - Required fields:
     - Company name
     - Position
   - Optional fields:
     - Description
     - Salary
     - Location
     - Remote work option
     - Notes
   - Form validation and error handling
   - Success/error feedback
   - Automatic UI updates after addition

3. **Edit Jobs**
   - Edit any job application details
   - All fields can be modified
   - Pre-filled form with current values
   - Real-time updates in the UI
   - Validation and error handling
   - Optimistic updates for better UX

4. **Delete Jobs**
   - Remove job applications
   - Confirmation dialog for safety
   - Real-time UI updates
   - Error handling and rollback
   - Soft delete in backend

5. **Job Details View**
   - Click on job card to view full details
   - Comprehensive information display
   - Quick access to edit functionality
   - Clean and organized layout
   - Conditional field display
   - Direct access to actions

### User Interface
- Modern, responsive design
- Clean and intuitive layout
- Interactive elements with hover states
- Modal-based forms and dialogs
- Error message display
- Loading states and spinners
- User-friendly feedback
- Consistent styling throughout
- Mobile-friendly design

## Technical Stack

### Frontend
- React.js for UI components
- React Router for navigation
- Axios for API calls
- Context API for state management
- CSS for styling
- JWT for authentication
- Custom hooks for reusable logic

### Backend
- Django 5.0
- Django REST Framework
- Simple JWT for authentication
- SQLite database
- CORS handling
- Custom user model
- Service-based architecture
- Model-level validation

## Project Structure

```
jobTracker/
├── backend/
│   ├── apps/
│   │   ├── users/         # User authentication and management
│   │   └── jobs/          # Job application management
│   ├── config/            # Project configuration
│   └── requirements.txt   # Python dependencies
└── frontend/
    └── job-tracker-frontend/
        ├── src/
        │   ├── auth/      # Authentication components
        │   ├── pages/     # Page components
        │   └── api/       # API configuration
        └── package.json   # Node.js dependencies
```

## Setup Instructions

[Add setup instructions here]

## API Endpoints

### Authentication
- POST `/api/users/register/` - Register new user
- POST `/api/users/login/` - Login user
- POST `/api/users/logout/` - Logout user

### Jobs
- GET `/api/jobs/` - List all jobs
- POST `/api/jobs/` - Create new job
- GET `/api/jobs/<id>/` - Get job details
- PUT `/api/jobs/<id>/` - Update job
- DELETE `/api/jobs/<id>/` - Delete job

## Future Enhancements

### Job Management
1. **Advanced Job Status**
   - Custom status workflows
   - Status change history
   - Status-based filtering
   - Color coding for different statuses

2. **Job Application Timeline**
   - Track application progress
   - Important dates and deadlines
   - Interview scheduling
   - Follow-up reminders

3. **Document Management**
   - Resume versions
   - Cover letters
   - Portfolio links
   - Application attachments

4. **Contact Management**
   - Track recruiters
   - Company contacts
   - Interview panel members
   - Communication history

### Analytics and Reporting
1. **Application Insights**
   - Success rate analytics
   - Application trends
   - Response time tracking
   - Salary range analysis

2. **Dashboard Improvements**
   - Custom views and filters
   - Saved searches
   - Export functionality
   - Data visualization

### User Experience
1. **Customization**
   - Custom fields
   - Personalized layouts
   - Theme options
   - Notification preferences

2. **Integration**
   - Calendar integration
   - Email integration
   - LinkedIn import
   - Job board scraping

3. **Mobile App**
   - Native mobile experience
   - Push notifications
   - Offline support
   - Quick actions