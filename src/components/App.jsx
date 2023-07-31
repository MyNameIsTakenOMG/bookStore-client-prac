import Layout from './layouts/Layout';
import BookContainer from './book/BookContainer';
import { Navigate, Route, Routes } from 'react-router-dom';

import { SnackbarProvider } from 'notistack';
import { useSelector } from 'react-redux';
import { userTokenSelector } from '../redux-store/userSlice';
import Register from './user/Register';
import UserLogin from './user/UserLogin';

function App() {
  const userToken = useSelector(userTokenSelector);

  return (
    // <BrowserRouter>
    <SnackbarProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<Register />} />
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
