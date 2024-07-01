import React from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import LoginPage from '../LoginPage/LoginPage';
import AddBirdForm from '../AddBirdForm/AddBirdForm';
import './App.css';
import UserBirdList from '../UserBirdList/UserBirdList';
import NearbyBirds from '../NearbyBirds/NearbyBirds';

function App() {
 
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/login */}
          <Redirect exact from="/" to="/login" />
            {/* Protected routes will show login page if no user is logged in */}

          <ProtectedRoute
            exact
            path="/list"
          >
            <UserBirdList />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/nearby"
          >
            <NearbyBirds />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/addbird"
          >
            <AddBirdForm />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            <LoginPage />
          </Route>

          <Route
            exact
            path="/registration"
          >
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
