
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import DiscoveryFeed from './pages/DiscoveryFeed';
import EventDetail from './pages/EventDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AuthCallback from './pages/AuthCallback';
import OrganizerDashboard from './pages/OrganizerDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Profile from './pages/Profile';
import SubmitEvent from './pages/SubmitEvent';
import CreateEvent from './pages/CreateEvent';
import CreateEventPage from './pages/CreateEventPage';
import AdminPanel from './pages/AdminPanel';
import InterestedEvents from './pages/InterestedEvents';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import About from './pages/About';
import Leaderboard from './pages/Leaderboard';
import NotFound from './pages/NotFound';

// Component to handle legacy event route redirects
function EventRedirect() {
  const { id } = useParams();
  return <Navigate to={`/events/${id}`} replace />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/discovery" element={<DiscoveryFeed />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/about" element={<About />} />
          <Route path="/leaderboard" element={<Leaderboard />} />

          {/* Protected Routes for all authenticated users */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/interested-events" element={
            <ProtectedRoute>
              <InterestedEvents />
            </ProtectedRoute>
          } />
          <Route path="/notifications" element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />

          {/* Routes for organizers */}
          <Route path="/organizer-dashboard" element={
            <ProtectedRoute requiredRole="organizer">
              <OrganizerDashboard />
            </ProtectedRoute>
          } />
          <Route path="/create-event" element={
            <ProtectedRoute requiredRole="organizer">
              <CreateEventPage />
            </ProtectedRoute>
          } />
          <Route path="/create-event-legacy" element={
            <ProtectedRoute requiredRole="organizer">
              <CreateEvent />
            </ProtectedRoute>
          } />
          <Route path="/submit-event" element={
            <ProtectedRoute requiredRole="organizer">
              <SubmitEvent />
            </ProtectedRoute>
          } />

          {/* Routes for students */}
          <Route path="/student-dashboard" element={
            <ProtectedRoute requiredRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin-panel" element={
            <ProtectedRoute requiredRole="admin">
              <AdminPanel />
            </ProtectedRoute>
          } />

          {/* Redirects for legacy routes */}
          <Route path="/event/:id" element={<EventRedirect />} />

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
