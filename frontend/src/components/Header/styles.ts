import styled from 'styled-components';

export const Container = styled.div`
  background: var(--cardBackground-color);
  padding: 30px 0;

  header {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 0 160px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      color: #fff;
    }

    div.react-toggle {
      margin-left: auto;
      margin-right: 15px;
    }
    nav {
      div {
        a {
          width: 100%;
          max-width: 360px;
          height: 72px;
          background: var(--primary-color);
          font-weight: 600;
          border-radius: 8px;
          border: 0;
          color: #fff;

          display: flex;
          align-items: center;

          &:hover {
            background: #2fb86e;
          }

          .text {
            flex: 1;
            text-align: center;
            color: #fff;
            padding: 0 16px;
          }

          .icon {
            display: flex;
            width: 72px;
            height: 72px;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.08);
            border-radius: 0 8px 8px 0;
            margin: 0 auto;
          }
        }
      }
    }
  }
`;
