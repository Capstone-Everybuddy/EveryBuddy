import styled from 'styled-components';

const Main = {
  Wrapper: styled.div`
    overflow-y: auto;
    height: 100vh;
    background-color: ${(props) => props.theme.colors.yellow};
  `,
};

export default Main;
