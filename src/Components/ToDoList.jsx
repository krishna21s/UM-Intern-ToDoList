import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link, NavLink } from 'react-router-dom';
import ImmedTasks from './ImmedTasks.jsx';
import WeeklyGoals from './WeeklyGoals.jsx';
import DailyRoutine from './DailyRoutine.jsx';
import AOS from 'aos';

const ToDoList = () => {
  const [showLinks, setShowLinks] = useState(false);
  AOS.init({
    offset: 30, // offset (in px) from the original trigger point
    duration: 650, // animation duration (in ms)
    easing: 'ease-in-sine', // animation easing function
    delay: 80, // animation delay (in ms)
  });
  const handleMenuClick = (e) => {
    e.preventDefault();
    setShowLinks(!showLinks);
  };

  return (
    <BrowserRouter>
      <div className="main hero">
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="sub-main">
          <div className='nav d-flex align-items-center'>
            <div className="container d-flex align-items-center justify-content-center">
              <div className="row justify-content-between align-items-center w-100">
                <div className='col-4'>
                  <NavLink className='heading-txt fs-3' to="/">Task Manager</NavLink>
                </div>
                <div className='navBar-btn col-6 d-flex justify-content-end w'>
                  {showLinks && (
                    <div className='nav-links d-flex flex-column align-items-center'>
                      <NavLink className={` btn nav-btn btn-outline-light m-3 btn-1 animate btn-hover color-2`} to="/immediateTasks">Immediate Tasks</NavLink>
                      <NavLink className={`btn nav-btn btn-outline-light m-3 btn-2 animate btn-hover color-9`} to="/daily-routine">Daily Routine</NavLink>
                      <NavLink className={`btn nav-btn btn-outline-light m-3 btn-3 animate btn-hover color-6`} to="/weekly-goals">weekly Goals</NavLink>
                    </div>
                  )}
                  <button className='menu-btn btn btn-outline-light' onClick={handleMenuClick}>
                    <i className="fa-solid fa-caret-down"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Routes>
            <Route path="*" element={
              <div className='p-2  intro d-flex flex-column justify-content-center align-items-center '>
                <h1 className='fs-2 intro-quote'>
                  "Tasks are the stepping stones to your goals — organize them,
                  prioritize them, and conquer them."
                </h1>
                <h1 className='p-4 fs-3'>Click Menu to add tasks</h1>
              </div>} />
            <Route path="/immediateTasks" element={<ImmedTasks />} />
            <Route path="/daily-routine" element={<DailyRoutine />} />
            <Route path="/weekly-goals" element={<WeeklyGoals />} />
            {/* <Route path="*" element={
              <div className='p-2  intro d-flex flex-column justify-content-center align-items-center '>
                <h1 className='fs-2 intro-quote'>
                  "Page Not Found"
                </h1>
              </div>} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default ToDoList;