import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from './components/Layout';
import Home from './routes/Home';
import Profile from './routes/Profile';
import Login from './routes/Login';
import CreateAccount from './routes/CreateAccount';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import LoadingScreen from './components/LoadingScreen';
import { auth } from './firebase';
import ProtectedRoute from './components/ProtectedRoute';

const GlobalStyles = createGlobalStyle`
${reset};
* {
  box-sizing: border-box;
}
body {
background-color : black;
color : white;
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

`;
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <ProtectedRoute>
                <Route path="/" element={<Home />} />
                <Route path="profile" element={<Profile />} />
              </ProtectedRoute>
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="createaccount" element={<CreateAccount />} />
          </Routes>
        </Router>
      )}
    </Wrapper>
  );
}

export default App;
