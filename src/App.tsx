import { ThemeProvider } from 'styled-components';
import './App.css';
import { theme } from './styles/theme';
import GlobalStyle from './styles/global-styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from 'pages/Main';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import Register from 'pages/Register';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
