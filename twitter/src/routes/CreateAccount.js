import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;
const Form = styled.form``;
const Input = styled.input``;

const CreateAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  return (
    <Wrapper>
      <Form>
        <Input
          name="name"
          placeholder="name"
          value={name}
          type="text"
          required
        />
        <Input
          name="email"
          placeholder="E-mail"
          value={email}
          type="email"
          required
        />
        <Input
          name="password"
          value={password}
          placeholder="PASSWORD"
          type="password"
          required
        />
        <Input type="submit" value="Create Account" />
      </Form>
    </Wrapper>
  );
};

export default CreateAccount;
