import styled from 'styled-components';

export const PointsContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 0;
  margin-top: -140px;
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 894px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 32px;
  }

  @media (min-width: 1399px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
