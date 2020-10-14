import React from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import Leaflet from 'leaflet';

import 'leaflet/dist/leaflet.css';
import '../../styles/leaflet.css';

import { Container, SideBar } from './styles';

import mapMarkerImg from '../../images/map-marker.svg';

// Pin personalizado
const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [58, 68],
    iconAnchor: [29, 68],

    popupAnchor: [170, 2]
});

const OrfanagesMap: React.FC = () => {
    return (
        <Container>
            <SideBar>
                <header>
                    <img src={mapMarkerImg} alt="" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita <span role="img" aria-label="happy">😃</span></p>
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

                <Marker
                    position={[-5.8127497, -35.2258358]}
                    icon={mapIcon}
                >
                    <Popup closeButton={false} minWidth={240} maxHeight={240} className="map-popup">
                        Lar dos devs.
                        <Link to="/orphanages/4097fc44-766a-4a53-aee3-e17e9d73695d">
                            <FiArrowRight size={20} color="#fff" />
                        </Link>
                    </Popup>
                </Marker>
            </Map>

            <Link to="/orphanages/create">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </Container>
    );
}

export default OrfanagesMap;
