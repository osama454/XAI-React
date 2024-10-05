import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils";

function App() {
  const [habits, setHabits] = useState([]);
  const [challenge, setChallenge] = useState({ active: false, progress: 0 });
  const [newHabit, setNewHabit] = useState("");
  const canAddHabit = habits.length < 3 && challenge.active;

  const startChallenge = () => {
    setChallenge({ active: true, progress: 0 });
  };

  const addHabit = () => {
    if (newHabit && canAddHabit) {
      setHabits([...habits, { name: newHabit, status: 'In Progress' }]);
      setNewHabit("");
    }
  };

  const completeHabit = () => {
    if (challenge.progress < 3 && habits.some(h => h.status === 'In Progress')) {
      setHabits(habits.map(h => 
        h.status === 'In Progress' ? { ...h, status: 'Completed' } : h
      ));
      setChallenge({...challenge, progress: challenge.progress + 1});
      if (challenge.progress + 1 === 3) {
        setTimeout(() => {
          alert("Congratulations! You have completed the challenge!");
        }, 100);
      }
    }
  };

  const reset = () => {
    setHabits([]);
    setChallenge({ active: false, progress: 0 });
  };

  return (
    <div className="bg-blue-100 min-h-screen flex flex-col items-center p-4 sm:p-8">
      <Card className="w-full max-w-lg p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Advanced Habit Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Your Habits:</p>
          {habits.map((habit, index) => (
            <div key={index} className={cn("mb-2", habit.status === 'Completed' ? 'text-green-600' : '')}>
              {habit.name} ({habit.status})
            </div>
          ))}
          <p className="mt-4">
            Current Habit:<br />
            <strong>Motivation Challenge</strong><br />
            Current Challenge: {challenge.active ? `Complete a habit every day for 3 days (Progress: ${challenge.progress}/3)` : 'None'}
          </p>
          <Button 
            onClick={startChallenge} 
            disabled={challenge.active}
            className="mt-4 bg-yellow-400 hover:bg-yellow-500"
          >
            Start a Motivation Challenge
          </Button>
          <div className="mt-4">
            <label className="block mb-2">Add a New Habit:</label>
            <Input 
              placeholder="Enter habit name" 
              value={newHabit} 
              onChange={(e) => setNewHabit(e.target.value)}
              disabled={!challenge.active}
            />
            <Button 
              onClick={addHabit} 
              disabled={!canAddHabit}
              className="mt-2 bg-green-500 hover:bg-green-600"
            >
              Add Habit
            </Button>
          </div>
          <div className="flex justify-between mt-4">
            <Button 
              onClick={completeHabit} 
              disabled={challenge.progress >= 3 || habits.every(h => h.status === 'Completed')}
              className="bg-purple-700 hover:bg-purple-800"
            >
              Complete Habit
            </Button>
            <Button 
              onClick={reset} 
              className="bg-red-500 hover:bg-red-600"
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;