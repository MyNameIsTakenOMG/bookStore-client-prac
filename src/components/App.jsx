import Layout from './layouts/Layout';
import BookContainer from './book/BookContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './user/Login';
import { SnackbarProvider } from 'notistack';
import Auth from './auth';

function App() {
  return (
    <SnackbarProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <Auth>
                  <BookContainer />
                </Auth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
