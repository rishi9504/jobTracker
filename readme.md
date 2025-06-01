#  Job Tracker – Full Stack App

A full-stack Job Tracking application built with:

-  **Backend:** Django + Django REST Framework + JWT (with token blacklisting)
-  **Frontend:** React.js with Context API for auth
-  **Celery** & **Kafka** (planned for later phases)

---

##  High-Level Design

###  User Auth
- Custom user model with email-based login
- Token-based authentication using **Simple JWT**
- Login, logout (with token blacklisting), and registration endpoints
- Role-based view access (planned)

### 📝 Job Tracker
- Users can track jobs they've applied for
- CRUD support for job entries
- Dashboard shows jobs for the logged-in user only
- Jobs are linked to users with a foreign key (`Job.user`)

### 🔐 Auth Flow
- JWT access/refresh tokens stored in localStorage
- Token blacklisting on logout via `/api/auth/logout/`
- Protected routes using `PrivateRoute` in React

---

## 🗂 Folder Structure

```
backend/
├── apps/
│   ├── users/
│   │   └── models.py, views.py, serializers.py
│   ├── jobs/
│   │   └── models.py, views.py, serializers.py
├── project/
│   └── settings.py, urls.py
└── manage.py

frontend/
├── src/
│   ├── auth/
│   │   └── AuthContext.js, Login.js, Register.js, PrivateRoute.js
│   ├── pages/
│   │   └── Dashboard.js
│   └── App.js
```

---

## 🛠️ Local Setup

### 🔧 Backend (Django)

#### 1. Clone & Create Virtual Environment
```bash
git clone https://github.com/yourname/job-tracker.git
cd job-tracker/backend
python -m venv venv
venv\Scripts\activate  # Windows
```

#### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

Required dependencies:
```
django
djangorestframework
djangorestframework-simplejwt
django-cors-headers
```

#### 3. Run Migrations & Create Superuser
```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

#### 4. Run Development Server
```bash
python manage.py runserver
```

### 💻 Frontend (React)

#### 1. Set Up Frontend
```bash
cd ../frontend
npm install
```

#### 2. Start React App
```bash
npm start
```
This will run on http://localhost:3000.

## 🔐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register/` | Register a new user |
| POST | `/api/auth/login/` | Log in and get JWT tokens |
| POST | `/api/auth/logout/` | Logout and blacklist token |
| GET | `/api/jobs/` | Get current user's jobs |
| POST | `/api/jobs/` | Create new job |
| PUT | `/api/jobs/:id/` | Update a job |
| DELETE | `/api/jobs/:id/` | Delete a job |

## 🚧 Upcoming Features

- ✅ Celery integration for background syncing with job boards (LinkedIn, Naukri)
- ✅ Kafka integration for event tracking
- 📨 Email notifications
- 📊 Analytics dashboard

## 🤝 Contributing

To contribute:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Push to your fork and open a Pull Request

## 📬 Contact

Created by [Hrishikesh]