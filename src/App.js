import axios from 'axios';
import './App.css';
import baseURL from './config';

function App() {
  axios(`${baseURL}/api/v1/books`).then((response) => {
    console.log(response.data);
  });

  return <div className="App">my first component updated</div>;
}

export default App;
