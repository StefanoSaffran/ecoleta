import styled from 'styled-components';

import backgroundImg from '../../assets/home-background.svg';

export const Container = styled.div`
  height: 100vh;
  background: url(${backgroundImg}) no-repeat 780px bottom;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 30px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  > header {
    margin: 48px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

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

  @media (max-width: 900px) {
    align-items: center;
    text-align: center;

    header {
      margin: 48px auto 0;
    }
  }
`;

export const Main = styled.main`
  flex: 1;
  max-width: 560px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  > h1 {
    font-size: 54px;
    color: var(--title-color);
  }

  > p {
    font-size: 24px;
    margin-top: 24px;
    line-height: 38px;
  }

  > a {
    width: 100%;
    max-width: 360px;
    height: 72px;
    background: var(--primary-color);
    border-radius: 8px;
    text-decoration: none;

    display: flex;
    align-items: center;
    overflow: hidden;

    margin-top: 40px;

    &:hover {
      background: #2fb86e;
    }

    span {
      display: block;
      background: rgba(0, 0, 0, 0.08);
      width: 72px;
      height: 72px;

      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;

      svg {
        color: #fff;
        width: 20px;
        height: 20px;
      }
    }

    strong {
      flex: 1;
      text-align: center;
      color: #fff;
    }
  }

  @media (max-width: 900px) {
    align-items: center;

    h1 {
      font-size: 42px;
    }

    p {
      font-size: 24px;
    }
  }
`;
