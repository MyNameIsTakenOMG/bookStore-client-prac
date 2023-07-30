import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userTokenSelector } from '../../redux-store/userSlice';

export default function Auth({ children }) {
  const navigate = useNavigate();
  const userToken = useSelector(userTokenSelector);

  const getView = () => {
    if (!userToken) {
      navigate('/login');
    }
    return children;
  };
  return <>{getView()}</>;
}
