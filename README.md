# ProjectHub

ProjectHub is a full-stack web application for project and task management. It allows administrators to manage projects and tasks, while users can view and update their assigned tasks.

## Features

- User authentication (registration, login, logout)
- Role-based access control (admin and user roles)
- Project management (CRUD operations)
- Task management (CRUD operations)
- Task assignment to users
- Task status updates
- Search functionality for projects and tasks
- Responsive user interface

## Technologies Used

### Backend
- Django
- Django REST Framework
- PostgreSQL

### Frontend
- React
- React Router
- Axios for API requests
- Tailwind CSS for styling

## Installation

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm 6+
- PostgreSQL

### Backend Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-username/projecthub.git
   cd projecthub
   ```

2. Create a virtual environment and activate it:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install the required Python packages:
   ```
   pip install -r requirements.txt
   ```

4. Set up the PostgreSQL database and update the `DATABASES` configuration in `settings.py` accordingly.

5. Create a `.env` file in the root directory and add the following environment variables:
   ```
   SECRET_KEY=your_secret_key_here
   DEBUG=True
   DATABASE_URL=postgres://username:password@localhost:5432/projecthub
   ```

6. Run migrations:
   ```
   python manage.py migrate
   ```

7. Create a superuser:
   ```
   python manage.py createsuperuser
   ```

8. Start the Django development server:
   ```
   python manage.py runserver
   ```

The backend should now be running at `http://localhost:8000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install the required npm packages:
   ```
   npm install
   ```

3. Create a `.env` file in the frontend directory and add the following:
   ```
   REACT_APP_API_URL=http://localhost:8000/api
   ```

4. Start the React development server:
   ```
   npm start
   ```

The frontend should now be running at `http://localhost:3000`.

## Usage

1. Access the application by navigating to `http://localhost:3000` in your web browser.
2. Register a new account or log in with existing credentials.
3. Admins can create, view, update, and delete projects and tasks.
4. Users can view their assigned tasks and update task statuses.

## API Endpoints

- `/api/register/`: User registration
- `/api/login/`: User login
- `/api/projects/`: Project CRUD operations
- `/api/tasks/`: Task CRUD operations
- `/api/tasks/my_tasks/`: Get tasks assigned to the current user
- `/api/tasks/{id}/update_status/`: Update task status

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
