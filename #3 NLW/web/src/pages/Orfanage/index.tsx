import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { Link } from 'react-router-dom';

import Sidebar from "../../components/Sidebar/";
import happyMapIcon from "../../utils/happyMapIcon";

import {
    Container,
    Content,
    DetailsContainer,
    ImagesContainer,
    ButtonImage,
    OrphanageDetails,
    MapContainer,
    OpenDetails
} from './styles';

const Orphanage: React.FC = () => {
    return (
        <Container>
            <Sidebar />
            <Content>
                <DetailsContainer>
                    <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />

                    <ImagesContainer>
                        <ButtonImage active type="button">
                            <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
                        </ButtonImage>
                        <ButtonImage type="button">
                            <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
                        </ButtonImage>
                        <ButtonImage type="button">
                            <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
                        </ButtonImage>
                        <ButtonImage type="button">
                            <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
                        </ButtonImage>
                        <ButtonImage type="button">
                            <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
                        </ButtonImage>
                        <ButtonImage type="button">
                            <img src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg" alt="Lar das meninas" />
                        </ButtonImage>
                    </ImagesContainer>

                    <OrphanageDetails>
                        <h1>Lar das meninas</h1>
                        <p>Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco e/ou vulnerabilidade social.</p>

                        <MapContainer>
                            <Map
                                center={[-27.2092052, -49.6401092]}
                                zoom={16}
                                style={{ width: '100%', height: 280 }}
                                dragging={false}
                                touchZoom={false}
                                zoomControl={false}
                                scrollWheelZoom={false}
                                doubleClickZoom={false}
                            >
                                <TileLayer
                                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                                />
                                <Marker interactive={false} icon={happyMapIcon} position={[-27.2092052, -49.6401092]} />
                            </Map>

                            <footer>
                                <Link to="/">Ver rotas no Google Maps</Link>
                            </footer>
                        </MapContainer>

                        <hr />

                        <h2>Instruções para visita</h2>
                        <p>Venha como se sentir mais à vontade e traga muito amor para dar.</p>

                        <OpenDetails>
                            <div>
                                <FiClock size={32} color="#15B6D6" />
                                Segunda à Sexta <br />
                                8h às 18h
                            </div>
                            <div>
                                <FiInfo size={32} color="#39CC83" />
                                Atendemos <br />
                                fim de semana
                            </div>
                            <button type="button">
                                <FaWhatsapp size={20} color="#FFF" />
                                Entrar em contato
                            </button>
                        </OpenDetails>
                    </OrphanageDetails>
                </DetailsContainer>
            </Content>
        </Container>
    );
}

export default Orphanage;
