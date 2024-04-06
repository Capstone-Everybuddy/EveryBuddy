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
import Chat from 'pages/Chat';
import Profile from 'pages/Profile';
import MatchingStart from 'pages/MatchingStart';
import Register from 'pages/Register';
import ChatRoom from 'pages/ChatRoom';

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
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/matching-start" element={<MatchingStart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat/room" element={<ChatRoom />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
