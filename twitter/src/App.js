import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from './components/Layout';
import Home from './routes/Home';
import Profile from './routes/Profile';
import Login from './routes/Login';
import CreateAccount from './routes/CreateAccount';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import LoadingScreen from './components/LoadingScreen';
import { auth } from './firebase';

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
    <>
      <GlobalStyles />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="createaccount" element={<CreateAccount />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
