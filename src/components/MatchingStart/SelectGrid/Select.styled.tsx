import styled from 'styled-components';

const Styled = {
  SelectItem: styled.ul<{ selected: boolean }>`
    flex: 0 0 calc(50% - 10px);
    margin: 5px;
    font-size: 22px;
    font-weight: 700;
    text-align: center;
    padding: 30px 0px;
    border-radius: 16px;
    color: ${(props) =>
      props.selected ? props.theme.colors.orange : props.theme.colors.gray};
    background-color: ${(props) =>
      props.selected ? props.theme.colors.background_orange : '#fff'};
    border: 1px solid
      ${(props) =>
        props.selected ? props.theme.colors.orange : props.theme.colors.gray};
    cursor: pointer;
    &::before {
      /* content: '⌵';
      position: absolute;
      right: 12px;
      top: 5px;
      color: black;
      font-size: 20px; */
    }
  `,
  SelectGrid: styled.div`
    display: flex;
    flex-wrap: wrap;
  `,
};

export default Styled;
