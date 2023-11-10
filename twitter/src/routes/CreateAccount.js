import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0;
`;
const Title = styled.h1`
  font-size: 42px;
`;
const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 15px;
  &[type='submit'] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

const CreateAccount = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'email') {
      setEmail(value);
    }
  };

  const onSubmit = async (e) => {
    if (isLoading || name === '' || email === '' || password === '') {
      return;
    }
    e.preventDefault();
    try {
      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(credentials.user, { displayName: name });
      await updateProfile;
      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e.code, e.message);
      }
    } finally {
      setIsLoading(false);
    }
    console.log(name, email, password);
  };

  return (
    <Wrapper>
      <Title>Join ℵ</Title>
      <Form onSubmit={onSubmit}>
        <Input
          name="name"
          onChange={onChange}
          placeholder="name"
          value={name}
          type="text"
          required
        />
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
        <Input type="submit" value="Create Account" />
      </Form>
      {error !== '' ? <Error>{error}</Error> : null}
    </Wrapper>
  );
};

export default CreateAccount;
