

import './App.css';
import React, { useState, useEffect } from 'react';

import { WorkoutLog, StepTracker, Calories, Progress } from './components';
import Auth from './Auth';

function App() {
  const [workouts, setWorkouts] = useState([]);
  const [steps, setSteps] = useState(0);
  const [calories, setCalories] = useState(0);
  const [user, setUser] = useState(null);

  // Load user data from localStorage on login
  useEffect(() => {
    if (user) {
      const data = localStorage.getItem(`fitness_${user}`);
      if (data) {
        const { workouts, steps, calories } = JSON.parse(data);
        setWorkouts(workouts || []);
        setSteps(steps || 0);
        setCalories(calories || 0);
      } else {
        setWorkouts([]);
        setSteps(0);
        setCalories(0);
      }
    }
  }, [user]);

  // Save user data to localStorage on change
  useEffect(() => {
    if (user) {
      localStorage.setItem(
        `fitness_${user}`,
        JSON.stringify({ workouts, steps, calories })
      );
    }
  }, [user, workouts, steps, calories]);

  const addWorkout = (workout) => {
    setWorkouts(prev => [...prev, workout]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fitness Tracker</h1>
        <nav>
          <ul style={{display: 'flex', gap: '1rem', listStyle: 'none', padding: 0}}>
            <li><a href="#workout">Workout Log</a></li>
            <li><a href="#steps">Step Tracker</a></li>
            <li><a href="#calories">Calories</a></li>
            <li><a href="#progress">Progress</a></li>
            <li><a href="#auth">Login/Signup</a></li>
          </ul>
        </nav>
      </header>
      <main>
        {!user ? (
          <Auth onLogin={setUser} />
        ) : (
          <>
            <p>Welcome, {user}!</p>
            <WorkoutLog workouts={workouts} addWorkout={addWorkout} />
            <StepTracker steps={steps} setSteps={setSteps} />
            <Calories calories={calories} setCalories={setCalories} />
            <Progress workouts={workouts} steps={steps} calories={calories} />
            <button onClick={() => setUser(null)}>Logout</button>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
