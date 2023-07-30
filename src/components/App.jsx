import Layout from './layouts/Layout';
import BookContainer from './book/BookContainer';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './user/Login';
import { SnackbarProvider } from 'notistack';
import { useSelector } from 'react-redux';
import { userTokenSelector } from '../redux-store/userSlice';

function App() {
  const userToken = useSelector(userTokenSelector);

  return (
    // <BrowserRouter>
    <SnackbarProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              userToken ? <BookContainer /> : <Navigate to="/login" replace />
            }
          />
        </Route>
      </Routes>
    </SnackbarProvider>
    // </BrowserRouter>
  );
}

export default App;
