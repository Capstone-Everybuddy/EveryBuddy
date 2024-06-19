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
    ::-webkit-scrollbar {
      width: 3px; /* 스크롤바의 너비를 조절합니다. */
    }
    /* 스크롤바의 track(스크롤바의 배경)을 스타일링합니다. */
    ::-webkit-scrollbar-track {
      background-color: white; /* 스크롤바의 배경색을 설정합니다. */
    }
    /* 스크롤바의 thumb(스크롤바의 손잡이)을 스타일링합니다. */
    ::-webkit-scrollbar-thumb {
      background-color: #D0D0D0; /* 스크롤바의 색상을 설정합니다. */
      border-radius: 4px; /* 스크롤바의 모서리를 둥글게 만듭니다. */
}
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
