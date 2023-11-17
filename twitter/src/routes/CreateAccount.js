import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { Link } from 'react-router-dom';
import {
  Switcher,
  Wrapper,
  Title,
  Form,
  Input,
  Error,
} from '../components/AuthComponents';

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
    setError('');
    try {
      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(credentials.user, { displayName: name });
      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
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
      {error !== '' ? <Error>{error}</Error> : null}{' '}
      <Switcher>
        Already have an account?{'  '}
        <Link to="/login">Log in</Link>
      </Switcher>
    </Wrapper>
  );
};

export default CreateAccount;
