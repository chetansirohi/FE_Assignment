import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Tasks from './pages/Tasks';
import TaskDetails from './pages/TaskDetails';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthContext.Consumer>
          {({ loading }) =>
            loading ? (
              <div>Loading...</div>
            ) : (
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<PrivateRoute />}>
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/projects/:id" element={<ProjectDetails />} />
                      <Route path="/tasks" element={<Tasks />} />
                      <Route path="/tasks/:id" element={<TaskDetails />} />
                    </Route>
                  </Routes>
                </main>
                <Footer />
              </div>
            )
          }
        </AuthContext.Consumer>
      </Router>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;