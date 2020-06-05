import React, { useState, useEffect, useCallback } from 'react';

import { useToast } from '../../hooks/toast';

import Header from '../../components/Header';
import Point from '../../components/Point';
import { IPoint } from '../../components/Point';
import { PointsContainer } from './styles';
import api from '../../services/api';

const Dashboard: React.FC = () => {
  const [points, setPoints] = useState<IPoint[]>([]);
  const { addToast } = useToast();

  useEffect(() => {
    api.get('list-points').then(response => setPoints(response.data));
  }, []);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await api.delete(`points/${id}`);

        setPoints(oldPoints => oldPoints.filter(point => point.id !== id));
        addToast({
          type: 'info',
          title: 'Excluido',
          description: 'O ponto de coleta foi excluido com sucesso.',
        });
      } catch {
        addToast({
          type: 'error',
          title: 'Erro ao excluir',
          description:
            'Ocorreu um erro ao fazer excluir ponto, tente novamente.',
        });
      }
    },
    [addToast],
  );

  return (
    <>
      <Header />

      <PointsContainer data-testid="Points-list">
        {points &&
          points.map(point => (
            <Point key={point?.id} point={point} handleDelete={handleDelete} />
          ))}
      </PointsContainer>
    </>
  );
};

export default Dashboard;
