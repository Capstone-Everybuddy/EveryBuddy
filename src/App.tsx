import { ThemeProvider } from 'styled-components';
import './App.css';
import { theme } from './styles/theme';
import GlobalStyle from './styles/global-styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from 'pages/Main';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import BottomNav from 'components/BottomNav';
import Matching from 'pages/Matching';
import Chatting from 'pages/Chatting';
import Profile from 'pages/Profile';
import MatchingStart from 'pages/MatchingStart';
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
          <Route element={<BottomNav />}>
            <Route path="/matching" element={<Matching />} />
            <Route path="/chatting" element={<Chatting />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/matching-start" element={<MatchingStart />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
