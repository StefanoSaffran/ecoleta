import styled, { keyframes } from 'styled-components';

const appearFromBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  background: var(--cardBackground-color);
  border-radius: 8px;
  margin: 0 10px;
  animation: ${appearFromBottom} 1s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & + div {
    margin-top: 25px;
  }

  @media (min-width: 894px) {
    & + div {
      margin: 0;
    }

    img {
      width: 100%;
    }
  }

  @media (min-width: 1399px) {
    img {
      width: 100%;
    }
  }

  header {
    background: var(--background-color);
    border-radius: 8px 8px 0px 0px;
    height: 192px;
    overflow: hidden;
    transition: 0.3s opacity;
    text-align: center;

    img {
      pointer-events: none;
      user-select: none;
      width: 100%;
    }
  }

  section.body {
    padding: 15px 30px;
    flex: 1;

    h3 {
      margin-top: 16px;
    }

    .items {
      font-style: normal;
      font-size: 16px;
      margin-top: 16px;
      line-height: 25px;

      strong {
        font-weight: 600;
        color: #39b100;
      }
    }
  }

  section.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    background: ${({ theme }) => theme.colors.footer};
    border-radius: 0px 0px 8px 8px;

    div.icon-container {
      display: flex;

      button,
      a {
        background: var(--background-color);
        padding: 10px;
        border-radius: 8px;
        display: flex;
        border: none;
        transition: 0.1s;

        svg {
          color: #39b100;
        }
      }

      button {
        margin-left: 6px;
      }
    }
  }
`;

export const Contato = styled.div``;
