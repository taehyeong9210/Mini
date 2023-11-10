import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import {
  Switcher,
  Wrapper,
  Title,
  Form,
  Input,
  Error,
} from '../components/AuthComponents';

const errors = {
  'auth/email-already-in-use': 'that E-mail already exists',
};

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
    } else if (name === 'email') {
      setEmail(value);
    }
  };

  const onSubmit = async (e) => {
    if (isLoading || email === '' || password === '') {
      return;
    }
    e.preventDefault();
    setError('');
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
    console.log(email, password);
  };

  return (
    <Wrapper>
      <Title>Login ℵ</Title>
      <Form onSubmit={onSubmit}>
        <Input
          name="email"
          onChange={onChange}
          placeholder="E-mail"
          value={email}
          type="email"
          required
        />
        <Input
          name="password"
          onChange={onChange}
          value={password}
          placeholder="PASSWORD"
          type="password"
          required
        />
        <Input type="submit" value="Login" />
      </Form>
      {error !== '' ? <Error>{error}</Error> : null}
      <Switcher>
        Don`t have an account?{'  '}
        <Link to="/createaccount">Create one</Link>
      </Switcher>
    </Wrapper>
  );
};

export default Login;
