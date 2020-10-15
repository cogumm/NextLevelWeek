import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import api from '../../services/api';

import mapMarkerImg from '../../images/map-marker.svg';
import happyMapIcon from "../../utils/happyMapIcon";

import '../../styles/leaflet.css';

import { Container, SideBar } from './styles';

interface IOpharnage {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

const OrfanagesMap: React.FC = () => {
    const [orphanages, setOrphanages] = useState<IOpharnage[]>([]);

    useEffect(() => {
        api.get('/orphanages').then(res => {
            // console.log(res.data);
            setOrphanages(res.data);
        });
    }, []);

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
                center={[-5.8044209, -35.263095]}
                zoom={12}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                {orphanages.map(orphanage => {
                    return (
                        <Marker
                            key={orphanage.id}
                            position={[orphanage.latitude, orphanage.longitude]}
                            icon={happyMapIcon}
                        >
                            <Popup closeButton={false} minWidth={240} maxHeight={240} className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#fff" />
                                </Link>
                            </Popup>
                        </Marker>
                    );
                })}
            </Map>

            <Link to="/orphanages/create">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </Container>
    );
}

export default OrfanagesMap;

/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */
