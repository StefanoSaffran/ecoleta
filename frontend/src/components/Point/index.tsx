import React from 'react';

import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import noImage from '../../assets/no-image.png';
import { Container, Contato } from './styles';

export interface IPoint {
  id: string;
  name: string;
  image_url: string;
  image: string;
  email: string;
  city: string;
  uf: string;
  point_items: Array<{
    item: {
      title: string;
    };
  }>;
}

interface IProps {
  point: IPoint;
  handleDelete(id: string): void;
}

const Point: React.FC<IProps> = ({ point, handleDelete }: IProps) => {
  return (
    <Container>
      <header>
        {point.image ? (
          <img src={point.image_url} alt={point.name} />
        ) : (
          <img src={noImage} alt={point.name} />
        )}
      </header>
      <section className="body">
        <h2>{point.name}</h2>
        <Contato>
          <h3>Contato</h3>
          <p>{point.email}</p>
          <div>
            <span>
              {point.city}, {point.uf}
            </span>
          </div>
        </Contato>
        <p className="items">
          <strong>
            {point.point_items.map(pi => pi.item.title).join(', ')}
          </strong>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <Link to={`update-point/${point.id}`} className="icon">
            <FiEdit3 size={20} />
          </Link>

          <button
            type="button"
            className="icon"
            onClick={() => {
              handleDelete(point.id);
            }}
          >
            <FiTrash size={20} />
          </button>
        </div>
      </section>
    </Container>
  );
};

export default Point;
