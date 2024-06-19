import styled from 'styled-components';

const Styled = {
  SelectBox: styled.div`
    position: relative;
    width: 200px;
    padding: 12px 15px;
    border-radius: 8px;
    background-color: #ffffff;
    border: 1px solid black;
    cursor: pointer;
    &::before {
      content: '⌵';
      position: absolute;
      right: 12px;
      top: 5px;
      color: black;
      font-size: 20px;
    }
  `,
  Label: styled.label`
    font-size: 14px;
  `,
  SelectOptions: styled.ul<{ show: boolean }>`
    position: absolute;
    list-style: none;
    top: 36px;
    left: 0;
    width: 100%;
    overflow: hidden;
    max-height: ${(props) => (props.show ? 'none' : '0')};
    padding: 0;
    border-radius: 8px;
    background-color: #ffffff;
    color: black;
    border: ${(props) => (props.show ? '1px solid black' : 'none')};
  `,
  Option: styled.li`
    font-size: 14px;
    padding: 12px 15px;
    transition: background-color 0.2s ease-in;
    &:hover {
      background-color: ${(props) => props.theme.colors.gray};
    }
  `,
};

export default Styled;
