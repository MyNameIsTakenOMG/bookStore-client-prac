// import axios from 'axios';
import { useEffect } from 'react';
import './App.css';
import baseURL from './config';

function App() {
  // axios(`${baseURL}/api/v1/books`).then((response) => {
  //   console.log(response.data);
  // });
  useEffect(() => {
    fetch(`${baseURL}/api/v1/books`)
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        console.log(jsonResponse);
      });

    return () => {};
  }, []);

  return <div className="App">my first component updated</div>;
}

export default App;
