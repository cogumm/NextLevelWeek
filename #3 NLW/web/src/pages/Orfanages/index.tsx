import React from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer } from 'react-leaflet';
import { FiPlus } from 'react-icons/fi';

import 'leaflet/dist/leaflet.css';
import './leaflet.css';

import { Container, SideBar } from './styles';

import mapMarkerImg from '../../images/map-marker.svg';

const OrfanagesMap: React.FC = () => {
    return (
        <Container>
            <SideBar>
                <header>
                    <img src={mapMarkerImg} alt="" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita 😃</p>
                </header>

                <footer>
                    <strong>Natal</strong>
                    <span>Rio Grande do Norte</span>
                </footer>
            </SideBar>


            <Map
                center={[-5.8127497, -35.2258358]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
            </Map>

            <Link to="">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </Container>
    );
}

export default OrfanagesMap;
