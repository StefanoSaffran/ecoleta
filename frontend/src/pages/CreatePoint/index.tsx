/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useEffect,
  useState,
  useCallback,
  ChangeEvent,
  FormEvent,
  useContext,
} from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Toggle from 'react-toggle';
import { ThemeContext } from 'styled-components';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';

import { useTheme } from '../../hooks/theme';
import { useToast } from '../../hooks/toast';

import Dropzone from '../../components/Dropzone';
import api from '../../services/api';
import logo from '../../assets/logo.svg';
import logoDark from '../../assets/logo-dark.svg';

import { Container, Form, FieldGroup, ItemsList } from './styles';

interface IItem {
  id: string;
  title: string;
  image_url: string;
}

interface IPointItem {
  item: {
    id: string;
  };
}

interface IIBGEResponse {
  sigla: string;
}

interface IIBGECityResponse {
  nome: string;
}

const CreatePoint: React.FC = () => {
  const history = useHistory();
  const { id } = useParams();
  const { addToast } = useToast();
  const { title } = useContext(ThemeContext);
  const { toggleTheme } = useTheme();
  const [items, setItems] = useState<IItem[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [preview, setPreview] = useState('');

  const loadPoint = useCallback(async () => {
    try {
      const { data } = await api.get(`points/${id}`);
      setSelectedCity(data.point.city);
      setSelectedUf(data.point.uf);
      setSelectedPosition([data.point.latitude, data.point.longitude]);
      setFormData({
        name: data.point.name,
        email: data.point.email,
        whatsapp: data.point.whatsapp,
      });
      setSelectedItems(
        data.point.point_items.map(
          (point_item: IPointItem) => point_item.item.id,
        ),
      );
      setPreview(data.point.image_url);
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      loadPoint();
    }
  }, [id, loadPoint]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([-21.6235108, -55.1598438]);
    });
  }, []);

  useEffect(() => {
    api.get('items').then(response => setItems(response.data));
  }, []);

  useEffect(() => {
    if (selectedUf === '0') return;

    axios
      .get<IIBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`,
      )
      .then(response => {
        const cityNames = response.data.map(city => city.nome);

        setCities(cityNames);
      });
  }, [selectedUf]);

  useEffect(() => {
    axios
      .get<IIBGEResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      )
      .then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  const handleSelectUf = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedUf(event.target.value);
    },
    [],
  );

  const handleSelectCity = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedCity(event.target.value);
    },
    [],
  );

  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }, []);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      setFormData(oldData => ({
        ...oldData,
        [name]: value,
      }));
    },
    [],
  );

  const handleSelectItem = useCallback(
    (itemId: string) => {
      const alreadySelected = selectedItems.findIndex(item => item === itemId);

      alreadySelected >= 0
        ? setSelectedItems(oldItems => oldItems.filter(item => item !== itemId))
        : setSelectedItems(oldItems => [...oldItems, itemId]);
    },
    [selectedItems],
  );

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      try {
        const { name, email, whatsapp } = formData;
        const [latitude, longitude] = selectedPosition;

        const data = new FormData();

        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('uf', selectedUf);
        data.append('city', selectedCity);
        data.append('items', selectedItems.join(','));

        if (selectedFile) {
          data.append('image', selectedFile);
        }

        if (id) {
          await api.put(`points/${id}`, data);

          addToast({
            type: 'success',
            title: 'Atualizado',
            description: 'Ponto de coleta atualizado com sucesso.',
          });
        } else {
          await api.post('points', data);

          addToast({
            type: 'success',
            title: 'Cadastro realizado',
            description: 'Ponto de coleta cadastrado com sucesso.',
          });
        }

        history.push('/list-points');
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro',
          description:
            ',Ocorreu um erro de comunicação com o servidor, tente novamente.',
        });
      }
    },
    [
      formData,
      selectedCity,
      selectedItems,
      selectedPosition,
      selectedUf,
      history,
      id,
      selectedFile,
      addToast,
    ],
  );

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
        <Link to="/list-points">
          <FiArrowLeft />
          Voltar para Dashboard
        </Link>
      </header>

      <Form onSubmit={handleSubmit}>
        <h1>Cadastro do ponto de coleta</h1>

        <Dropzone preview={preview} onFileUploaded={setSelectedFile} />

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              value={formData.name}
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>

          <FieldGroup>
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                value={formData.email}
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>
          </FieldGroup>

          <FieldGroup>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                value={formData.whatsapp}
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </div>
          </FieldGroup>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={selectedPosition} />
          </Map>

          <FieldGroup>
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select
                value={selectedUf}
                name="uf"
                id="uf"
                onChange={handleSelectUf}
              >
                <option value="0">Selecione um UF</option>
                {ufs?.map(uf => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select
                value={selectedCity}
                name="city"
                id="city"
                onChange={handleSelectCity}
              >
                <option value="0">Selecione um cidade</option>
                {cities?.map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </FieldGroup>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais ítens abaixo</span>
          </legend>

          <ItemsList>
            {items?.map((item: IItem) => (
              <li key={item.id}>
                <button
                  className={selectedItems.includes(item.id) ? 'selected' : ''}
                  type="button"
                  onClick={() => handleSelectItem(item.id)}
                >
                  <img src={item.image_url} alt={item.title} />
                  <span>{item.title}</span>
                </button>
              </li>
            ))}
          </ItemsList>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </Form>
    </Container>
  );
};

export default CreatePoint;
