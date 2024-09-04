import logo from './logo.svg';
import './App.css';
import ToDoList from './Components/ToDoList.jsx';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <>
      <ToDoList />
    </>
  );
}

export default App;