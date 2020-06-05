import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiArchive } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import logo from '../../assets/logo.svg';
import logoDark from '../../assets/logo-dark.svg';

import { Container, Content, Main } from './styles';

const Home: React.FC = () => {
  const { title } = useContext(ThemeContext);

  return (
    <Container>
      <Content>
        <header>
          {title === 'light' ? (
            <img src={logo} alt="Ecoleta" />
          ) : (
            <img src={logoDark} alt="Ecoleta" />
          )}
          <Link to="/create-point">
            <FiLogIn />
            Cadastre um ponto de coleta
          </Link>
        </header>

        <Main>
          <h1>Seu marketplace de coleta de resíduos.</h1>

          <p>
            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
          </p>

          <Link to="/list-points">
            <span>
              <FiArchive />
            </span>
            <strong>Listar Pontos de coleta</strong>
          </Link>
        </Main>
      </Content>
    </Container>
  );
};

export default Home;
