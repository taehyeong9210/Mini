import React from 'react';
import { auth } from '../firebase';
import PostForm from '../components/PostForm';
import styled from 'styled-components';

const Wrapper = styled.div``;

const Home = () => {
  const logOut = () => {
    auth.signOut();
  };
  return (
    <Wrapper>
      <PostForm></PostForm>
    </Wrapper>
  );
};

export default Home;
