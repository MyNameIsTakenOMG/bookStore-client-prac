// import axios from 'axios';
import { useEffect } from 'react';
import baseURL from '../config';
import Layout from './layout/layout';
import BookContainer from './book/BookContainer';

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

  return (
    <Layout>
      <BookContainer />
    </Layout>
  );
}

export default App;
