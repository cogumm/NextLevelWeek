import React from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import Leaflet from 'leaflet';

import { FiPlus } from "react-icons/fi";
import Sidebar from "../../components/Sidebar";

import mapMarkerImg from '../../images/map-marker.svg';

import {
    Container,
    Content,
    Form,
    InputContainer,
    OpenOnWeekendContainer,
    SelectButton
} from './styles';

const happyMapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,

    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [0, -60]
})

const OrphanageCreate: React.FC = () => {
    return (
        <Container>
            <Sidebar />

            <Content>
                <Form>
                    <fieldset>
                        <legend>Dados</legend>

                        <Map
                            center={[-27.2092052, -49.6401092]}
                            style={{ width: '100%', height: 280 }}
                            zoom={15}
                        >
                            <TileLayer
                                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                            />

                            <Marker interactive={false} icon={happyMapIcon} position={[-27.2092052, -49.6401092]} />
                        </Map>

                        <InputContainer>
                            <label htmlFor="name">Nome</label>
                            <input id="name" />
                        </InputContainer>

                        <InputContainer>
                            <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
                            <textarea id="name" maxLength={300} />
                        </InputContainer>

                        <InputContainer>
                            <label htmlFor="images">Fotos</label>

                            <div className="uploaded-image">

                            </div>

                            <button className="new-image">
                                <FiPlus size={24} color="#15b6d6" />
                            </button>
                        </InputContainer>
                    </fieldset>

                    <fieldset>
                        <legend>Visitação</legend>

                        <InputContainer>
                            <label htmlFor="instructions">Instruções</label>
                            <textarea id="instructions" />
                        </InputContainer>

                        <InputContainer>
                            <label htmlFor="opening_hours">Nome</label>
                            <input id="opening_hours" />
                        </InputContainer>

                        <InputContainer>
                            <label htmlFor="open_on_weekends">Atende fim de semana</label>

                            <OpenOnWeekendContainer>
                                <SelectButton type="button" active>Sim</SelectButton>
                                <SelectButton type="button">Não</SelectButton>
                            </OpenOnWeekendContainer>
                        </InputContainer>
                    </fieldset>

                    <button type="submit">Confirmar</button>
                </Form>
            </Content>
        </Container>
    );
};

export default OrphanageCreate;

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
