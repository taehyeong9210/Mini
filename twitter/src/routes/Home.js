import React from 'react';
import { auth } from '../firebase';

const Home = () => {
  const logOut = () => {
    auth.signOut();
  };
  return <div></div>;
};

export default Home;
