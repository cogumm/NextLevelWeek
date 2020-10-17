import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Linking } from 'react-native';
import { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

import api from '../../services/api';
import mapMarkerImg from '../../images/map-marker.png';

import {
    Container,
    ImagesContainer,
    OrphanageImage,
    DetailsContainer,
    Title,
    Description,
    MapContainer,
    Map,
    RoutesButtonContainer,
    RoutesText,
    Separator,
    ScheduleContainer,
    ScheduleItemClock,
    ScheduleItemInfo,
    ScheduleItemInfoRed,
    ScheduleText,
    ContactButton,
    ContactButtonText
} from './styles';

interface IRouteParams {
    id: number;
}

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

const OrphanageDetails: React.FC = () => {
    const route = useRoute();
    // console.log(route.params);
    const [orphanage, setOrphanage] = useState<IOpharnage>();

    // Forçando o params a ter o formato da interface
    const params = route.params as IRouteParams;

    useEffect(() => {
        api.get(`/orphanages/${params.id}`).then(res => {
            setOrphanage(res.data);
        });
    }, [params.id]);

    console.log(orphanage);

    // Fazer tela de loading
    if (!orphanage) {
        return (
            <View>
                <Text>Carregando...</Text>
            </View>
        );
    }

    // Abrindo o endereço no Google Maps
    function handleOpenGoogleMapRoutes() {
        Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`);
    }

    return (
        <Container>
            <ImagesContainer>
                <ScrollView horizontal pagingEnabled>
                    {orphanage.images.map(image => {
                        return (
                            <OrphanageImage
                                key={image.id}
                                source={{ uri: image.url }}
                            />
                        );
                    })}
                </ScrollView>
            </ImagesContainer>

            <DetailsContainer>
                <Title>{orphanage.name}</Title>
                <Description>{orphanage.about}</Description>

                <MapContainer>
                    <Map
                        initialRegion={{
                            latitude: orphanage.latitude,
                            longitude: orphanage.longitude,
                            latitudeDelta: 0.008,
                            longitudeDelta: 0.008,
                        }}
                        zoomEnabled={false}
                        pitchEnabled={false}
                        scrollEnabled={false}
                        rotateEnabled={false}
                    >
                        <Marker
                            icon={mapMarkerImg}
                            coordinate={{
                                latitude: orphanage.latitude,
                                longitude: orphanage.longitude,
                            }}
                        />
                    </Map>

                    <RoutesButtonContainer onPress={handleOpenGoogleMapRoutes}>
                        <RoutesText>Ver rotas no Google Maps</RoutesText>
                    </RoutesButtonContainer>
                </MapContainer>

                <Separator />

                <Title>Instruções para visita</Title>
                <Description>{orphanage.instructions}</Description>

                <ScheduleContainer>
                    <ScheduleItemClock>
                        <Feather name="clock" size={40} color="#2AB5D1" />
                        <ScheduleText>{orphanage.opening_hours}</ScheduleText>
                    </ScheduleItemClock>

                    {
                        orphanage.open_on_weekends ? (
                            <ScheduleItemInfo>
                                <Feather name="info" size={40} color="#39cc83" />
                                <ScheduleText style={{ color: '#37c77f' }}>
                                    Atendemos fim de semana
                            </ScheduleText>
                            </ScheduleItemInfo>
                        ) : (
                                <ScheduleItemInfoRed>
                                    <Feather name="info" size={40} color="#ff669d" />
                                    <ScheduleText style={{ color: '#ff669d' }}>
                                        Não atendemos fim de semana
                                    </ScheduleText>
                                </ScheduleItemInfoRed>
                            )
                    }
                </ScheduleContainer>

                <ContactButton>
                    <FontAwesome name="whatsapp" size={24} color="#fff" />
                    <ContactButtonText>Entrar em contato</ContactButtonText>
                </ContactButton>
            </DetailsContainer>
        </Container>
    );
}

export default OrphanageDetails;
