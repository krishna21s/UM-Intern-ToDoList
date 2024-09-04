import userEvent from '@testing-library/user-event';
import React, { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import AOS from 'aos';

const WeeklyGoals = () => {
  const inputText = useRef(null);
  const [inputTasks, setInputTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [taskDone, setTaskDone] = useState(() => {
    const storedTaskDone = localStorage.getItem('taskDone');
    return storedTaskDone ? JSON.parse(storedTaskDone) : new Array(inputTasks.length).fill(false);
  });

  AOS.init({
    offset: 30, // offset (in px) from the original trigger point
    duration: 650, // animation duration (in ms)
    easing: 'ease-in-sine', // animation easing function
    delay: 80, // animation delay (in ms)
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(inputTasks));
    localStorage.setItem('taskDone', JSON.stringify(taskDone));
  }, [inputTasks, taskDone]);

  useEffect(() => {
    if (inputTasks.length > taskDone.length) {
      setTaskDone((prevTaskDone) => [...prevTaskDone, ...new Array(inputTasks.length - prevTaskDone.length).fill(false)]);
    }
  }, [inputTasks]);

  const findKey = (e) => {
    if (e.key == 'Enter') {
      const currentValue = inputText.current.value;
      if (currentValue == '') {
        alert('Please enter a task');
      } else {
        setInputTasks((prevInputTasks) => [...prevInputTasks, currentValue]);
        inputText.current.value = '';
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', findKey, true);
    return () => {
      document.removeEventListener('keydown', findKey, true);
    };
  }, [findKey]);

  const handleAddClick = () => {
    if (inputText.current.value == '') {
      alert('Please enter a task');
    } else {
      setInputTasks([...inputTasks, inputText.current.value]);
      inputText.current.value = '';
    }
  }

  const handleTaskRemoveClick = (index) => {
    setInputTasks(inputTasks.filter((task, idx) => idx !== index));
    setTaskDone(taskDone.filter((done, idx) => idx !== index));
  }

  const handleCheckedTask = (index) => {
    const newTaskDone = [...taskDone];
    newTaskDone[index] = !newTaskDone[index];
    setTaskDone(newTaskDone);
  }

  return (
    <div className=''>
      <div className="input m-5 d-flex justify-content-center">
        <TextField type="text" className='input-text custom-text-input' inputRef={inputText} label="Add your Task" variant="outlined" />
        <button className="add-btn btn" onClick={handleAddClick}>Add</button>
      </div>
      <div className="output p-2 ">
        {inputTasks.map((task, index) => (
          <li
            className='mb-4 d-flex justify-content-between align-items-center text-justified'
            key={index}
            style={{ width: '100%' }}
          >
            <div className='check-task me-3 pb-1 r' >
              <input
                onChange={() => handleCheckedTask(index)}
                class="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck1"
                checked={taskDone[index]}
                data-aos="fade-right"
              />
            </div>
            <p key={index} className='task pt-3 task w-100 text-start '
              data-aos="fade-down"
            >
              <span className={`text-wrap  ${taskDone[index] ? 'checked' : ''}`}>{task}</span>
            </p>
            <button
              data-aos="fade-up"
              className='btn-outline-light border-0 btn h-25 ms-3 ' onClick={() => handleTaskRemoveClick(index)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </li>
        ))}
      </div>
    </div>
  );
};

export default WeeklyGoals;