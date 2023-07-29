import Layout from './layouts/Layout';
import BookContainer from './book/BookContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './user/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<BookContainer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
