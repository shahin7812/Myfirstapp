import React, { useState } from 'react';

function WorkoutLog({ workouts, addWorkout }) {
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activity && duration) {
      addWorkout({ activity, duration, date: new Date().toLocaleDateString() });
      setActivity('');
      setDuration('');
    }
  };

  return (
    <section>
      <h2>Workout Log</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Activity"
          value={activity}
          onChange={e => setActivity(e.target.value)}
        />
        <input
          type="number"
          placeholder="Duration (min)"
          value={duration}
          onChange={e => setDuration(e.target.value)}
        />
        <button type="submit">Add Workout</button>
      </form>
      <ul>
        {workouts.map((w, i) => (
          <li key={i}>{w.date}: {w.activity} - {w.duration} min</li>
        ))}
      </ul>
    </section>
  );
}

function StepTracker({ steps, setSteps }) {
  const [inputSteps, setInputSteps] = useState('');

  const handleAddSteps = () => {
    if (inputSteps) {
      setSteps(prev => prev + Number(inputSteps));
      setInputSteps('');
    }
  };

  return (
    <section>
      <h2>Step Tracker</h2>
      <input
        type="number"
        placeholder="Add steps"
        value={inputSteps}
        onChange={e => setInputSteps(e.target.value)}
      />
      <button onClick={handleAddSteps}>Add</button>
      <p>Total steps today: {steps}</p>
    </section>
  );
}

function Calories({ calories, setCalories }) {
  const [inputCalories, setInputCalories] = useState('');

  const handleAddCalories = () => {
    if (inputCalories) {
      setCalories(prev => prev + Number(inputCalories));
      setInputCalories('');
    }
  };

  return (
    <section>
      <h2>Calories</h2>
      <input
        type="number"
        placeholder="Add calories burned"
        value={inputCalories}
        onChange={e => setInputCalories(e.target.value)}
      />
      <button onClick={handleAddCalories}>Add</button>
      <p>Total calories burned today: {calories}</p>
    </section>
  );
}

function Progress({ workouts, steps, calories }) {
  return (
    <section>
      <h2>Progress</h2>
      <p>Workouts logged: {workouts.length}</p>
      <p>Steps today: {steps}</p>
      <p>Calories burned today: {calories}</p>
    </section>
  );
}

export { WorkoutLog, StepTracker, Calories, Progress };
