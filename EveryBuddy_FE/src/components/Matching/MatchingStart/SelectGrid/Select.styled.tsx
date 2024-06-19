import styled from 'styled-components';

const Styled = {
  SelectItem: styled.ul<{ selected: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 calc(50% - 10px);
    margin: 5px;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    padding: 15px;
    border-radius: 16px;
    color: ${(props) =>
      props.selected ? props.theme.colors.orange : props.theme.colors.gray};
    background-color: ${(props) =>
      props.selected ? props.theme.colors.background_orange : '#fff'};
    border: 1px solid
      ${(props) =>
        props.selected ? props.theme.colors.orange : props.theme.colors.gray};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  `,
  SelectGrid: styled.div`
    display: flex;
    flex-wrap: wrap;
  `,
};

export default Styled;
