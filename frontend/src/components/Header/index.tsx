import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Toggle from 'react-toggle';
import { ThemeContext } from 'styled-components';
import { FiPlusSquare } from 'react-icons/fi';
import { FaMoon, FaSun } from 'react-icons/fa';

import { useTheme } from '../../hooks/theme';
import logo from '../../assets/logo.svg';
import logoDark from '../../assets/logo-dark.svg';

import { Container } from './styles';

const Header: React.FC = () => {
  const { title } = useContext(ThemeContext);

  const { toggleTheme } = useTheme();
  return (
    <Container>
      <header>
        {title === 'light' ? (
          <img src={logo} alt="Ecoleta" />
        ) : (
          <img src={logoDark} alt="Ecoleta" />
        )}
        <Toggle
          checked={title === 'dark'}
          onChange={toggleTheme}
          className="toggle"
          icons={{
            checked: <FaMoon color="yellow" size={12} />,
            unchecked: <FaSun color="yellow" size={12} />,
          }}
        />
        <nav>
          <div>
            <Link to="/create-point">
              <strong className="text">Cadastrar novo ponto</strong>
              <div className="icon">
                <FiPlusSquare size={24} />
              </div>
            </Link>
          </div>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
