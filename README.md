## This is a personal project I am putting my hands on

### Phase 1:

- Setup Django Backend with PostgreSQL
- User auth system with JWT
- React Frontend with login/logout
- Implement JOB Crud (track application, status, company)

  I will be documenting whole process with exact commands I used to setup/run the application
### Step 1:Setup Django Backend with PostgreSQL
- virtual env : python -m venv venv
- SET-ExecutionPolicy -ExecutionPolicy RemoteSigned -scope CurrentUser #(if you are not able to enable venv in PS)
- venv\Scripts\activate
- pip install django djangorestframework djangorestframework-simplejwt
- python -m django --version
- python -m django startproject config .
- mkdir apps
- cd apps
- python -m django startapp users
- python -m django startapp jobs
- cd ..

Commit the changes to the github. At this point Django application most basic setup is done with two application registered as users and jobs. Next we will be setting up PostgreSQL with django.
