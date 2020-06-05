import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;

  margin: 0 auto;

  > header {
    margin-top: 48px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    div.react-toggle {
      margin-left: auto;
      margin-right: 15px;
    }

    > a {
      color: var(--title-color);
      font-weight: bold;
      text-decoration: none;

      display: flex;
      align-items: center;

      > svg {
        margin-right: 16px;
        color: var(--primary-color);
      }
    }
  }
`;

export const Form = styled.form`
  margin: 80px auto;
  padding: 64px;
  max-width: 730px;
  background: var(--background-color);
  border-radius: 8px;

  display: flex;
  flex-direction: column;

  > h1 {
    font-size: 36px;
  }

  fieldset {
    margin-top: 64px;
    min-inline-size: auto;
    border: 0;
  }

  legend {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;

    h2 {
      font-size: 24px;
    }

    span {
      font-size: 14px;
      font-weight: normal;
      color: var(--text-color);
    }
  }

  .field {
    flex: 1;

    display: flex;
    flex-direction: column;
    margin-bottom: 24px;

    label {
      font-size: 14px;
      margin-bottom: 8px;
    }

    input[type='text'],
    input[type='email'],
    input[type='number'] {
      flex: 1;
      background: var(--cardBackground-color);
      border-radius: 8px;
      border: 0;
      padding: 16px 24px;
      font-size: 16px;
      color: var(--text-color);
    }

    select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      flex: 1;
      background: var(--cardBackground-color);
      border-radius: 8px;
      border: 0;
      padding: 16px 24px;
      font-size: 16px;
      color: var(--text-color);
    }

    & :disabled {
      cursor: not-allowed;
    }
  }

  .field-check {
    flex-direction: row;
    align-items: center;

    input[type='checkbox'] {
      background: var(--cardBackground-color);
    }

    label {
      margin: 0 0 0 8px;
    }
  }

  .leaflet-container {
    width: 100%;
    height: 350px;
    border-radius: 8px;
    margin-bottom: 24px;
  }

  > button {
    width: 260px;
    height: 56px;
    background: var(--primary-color);
    border-radius: 8px;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    border: 0;
    align-self: flex-end;
    margin-top: 40px;
    transition: background-color 0.2s;
    cursor: pointer;

    &:hover {
      background: #2fb86e;
    }
  }
`;

export const FieldGroup = styled.div`
  flex: 1;
  display: flex;

  > div + div,
  > input + input {
    margin-left: 24px;
  }
`;

export const ItemsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  list-style: none;

  li {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    > button {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      text-align: center;

      cursor: pointer;
      background: ${({ theme }) =>
        theme.title === 'light' ? '#f5f5f5' : '#ddd'};
      border: 2px solid var(--cardBackground-color);
      width: 100%;
      height: 180px;
      border-radius: 8px;
      padding: 32px 24px 16px;

      > span {
        flex: 1;
        margin-top: 12px;

        display: flex;
        align-items: center;
        color: #322153;
      }
      &.selected {
        background: #e1faec;
        border: 2px solid #34cb79;
      }
    }
  }
`;
