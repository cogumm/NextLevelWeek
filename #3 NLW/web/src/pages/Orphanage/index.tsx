import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom';

import api from "../../services/api";

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
    OpenDetails,
    OpeningHoursContainer,
    OpenWeekends
} from './styles';

interface IOpharnage {
    name: string;
    latitude: number;
    longitude: number;
    about: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: boolean;
    images: Array<{
        id: string;
        url: string;
    }>;
}

interface IOrphanageParams {
    id: string;
}

const Orphanage: React.FC = () => {
    const params = useParams<IOrphanageParams>();
    const [orphanage, setOrphanage] = useState<IOpharnage>();
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        api.get(`/orphanages/${params.id}`).then(res => {
            // console.log(res.data);
            setOrphanage(res.data);
        });
    }, [params.id]);

    if (!orphanage) {
        return <p>Carregando..</p>;
        // Fazer em Shimmer
    }

    return (
        <Container>
            <Sidebar />
            <Content>
                <DetailsContainer>
                    <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />

                    <ImagesContainer>
                        {orphanage.images.map((image, index) => {
                            return (
                                <ButtonImage
                                    key={image.id}
                                    type="button"
                                    active={activeImageIndex === index}
                                    onClick={() => {
                                        setActiveImageIndex(index);
                                    }}
                                >
                                    <img src={image.url} alt={orphanage.name} />
                                </ButtonImage>
                            );
                        })}
                    </ImagesContainer>

                    <OrphanageDetails>
                        <h1>{orphanage.name}</h1>
                        <p>{orphanage.about}</p>

                        <MapContainer>
                            <Map
                                center={[orphanage.latitude, orphanage.longitude]}
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
                                <Marker interactive={false} icon={happyMapIcon} position={[orphanage.latitude, orphanage.longitude]} />
                            </Map>

                            <footer>
                                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
                            </footer>
                        </MapContainer>

                        <hr />

                        <h2>Instruções para visita</h2>
                        <p>{orphanage.instructions}</p>

                        <OpenDetails>
                            <OpeningHoursContainer>
                                <FiClock size={32} color="#15B6D6" />
                                Segunda à Sexta <br />
                                {orphanage.opening_hours}
                            </OpeningHoursContainer>

                            {orphanage.open_on_weekends ? (
                                <OpenWeekends open={orphanage.open_on_weekends}>
                                    <FiInfo size={32} />
                                    Atendemos <br />
                                    fim de semanada
                                </OpenWeekends>
                            ) : (
                                    <OpenWeekends open={orphanage.open_on_weekends}>
                                        <FiInfo size={32} />
                                        Não atendemos <br />
                                        no fim de semanada
                                    </OpenWeekends>
                                )
                            }

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
