import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

// 위에서 받은 `normalize`로 기본 css가 초기화 합니다.
const GlobalStyle = createGlobalStyle`
  ${normalize}

  html,
  body {
    position: relative;
    max-width: 400px;
    height: 100vh;
    margin-left: auto;
    margin-right: auto;
    background-color: #f2f2f2;
    overflow: hidden;
    font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
