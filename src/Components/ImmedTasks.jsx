import userEvent from '@testing-library/user-event';
import React, { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import AOS from 'aos';

const ImmedTasks = () => {
  const inputText = useRef(null);
  const [inputData, setInputData] = useState(() => {
    const storedData = localStorage.getItem('data');
    try {
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error('Error parsing stored data:', error);
      return [];
    }
  });
  const [taskDone, setTaskDone] = useState(() => {
    const storedTaskDone = localStorage.getItem('taskDone');
    try {
      return storedTaskDone ? JSON.parse(storedTaskDone) : [];
    } catch (error) {
      console.error('Error parsing stored task done:', error);
      return [];
    }
  });

  AOS.init({
    offset: 30, // offset (in px) from the original trigger point
    duration: 650, // animation duration (in ms)
    easing: 'ease-in-sine', // animation easing function
    delay: 80, // animation delay (in ms)
  });

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(inputData));
    localStorage.setItem('taskDone', JSON.stringify(taskDone));
  }, [inputData, taskDone]);

  useEffect(() => {
    if (inputData.length > taskDone.length) {
      setTaskDone((prevTaskDone) => [...prevTaskDone, ...new Array(inputData.length - prevTaskDone.length).fill(false)]);
    }
  }, [inputData]);

  const findKey = (e) => {
    if (e.key === 'Enter') {
      const currentValue = inputText.current.value;
      if (currentValue === '') {
        alert('Please enter a task');
      } else {
        setInputData((prevInputData) => [...prevInputData, currentValue]);
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
    if (inputText.current.value === '') {
      alert('Please enter a task');
    } else {
      setInputData([...inputData, inputText.current.value]);
      inputText.current.value = '';
    }
  };

  const handleTaskRemoveClick = (index) => {
    setInputData(inputData.filter((task, idx) => idx !== index));
    setTaskDone(taskDone.filter((done, idx) => idx !== index));
  };

  const handleCheckedTask = (index) => {
    const newTaskDone = [...taskDone];
    newTaskDone[index] = !newTaskDone[index];
    setTaskDone(newTaskDone);
  };

  return (
    <div className="">
      <div className="input m-5 d-flex justify-content-center">
        <TextField
          type="text"
          className="input-text custom-text-input"
          inputRef={inputText}
          label="Add your Task"
          variant="outlined"
        />
        <button className="add-btn btn" onClick={handleAddClick}>
          Add
        </button>
      </div>
      <div className="output p-2">
        {inputData.map((task, index) => (
          <li
            className="mb-4 d-flex justify-content-between align-items-center text-justified"
            key={index}
            style={{ width: "100%" }}
          >
            <div className="check-task me-3 pb-1 r">
              <input
                onChange={() => handleCheckedTask(index)}
                className="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck1"
                checked={taskDone[index]}
                data-aos="fade-right"
              />
            </div>
            <p
              key={index}
              className="task pt-3 task w-100 text-start"
              data-aos="fade-down"
            >
              <span
                className={`text-wrap ${taskDone[index] ? "checked" : ""}`}
              >
                {task}
              </span>
            </p>
            <button
              data-aos="fade-up"
              className="task-remove btn btn-outline-light border-0 h-25 ms-3"
              onClick={() => handleTaskRemoveClick(index)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </li>
        ))}
      </div>
    </div>
  );
};

export default ImmedTasks;