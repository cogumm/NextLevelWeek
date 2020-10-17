import React, { useState } from 'react';
import { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import api from '../../services/api';
import mapMarker from '../../images/map-marker.png';

import {
    MapContainer,
    Map,
    CalloutContainer,
    CalloutText,
    Footer,
    FooterText,
    CreateOtphanageButton
} from './styles';

interface IOrphanage {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

const OrphanagesMap: React.FC = () => {
    const navigation = useNavigation();

    const [orphanages, setOrphanages] = useState<IOrphanage[]>([]);

    // Sempre que o usuário sair e voltar para a tela o useFocusEffect é disparado
    useFocusEffect(() => {
        api.get('/orphanages').then(res => {
            setOrphanages(res.data);
        });
    });

    function handleNavigateToOrphanage(id: number) {
        navigation.navigate('Orphanage', { id });
    }

    function handleNavigateToCreateOrphanage() {
        navigation.navigate('SelectMapPosition');
    }

    return (
        <MapContainer>
            <Map
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: -5.8026889,
                    longitude: -35.2224104,
                    latitudeDelta: 0.060,
                    longitudeDelta: 0.060,
                }}
            >
                {orphanages.map(orphanage => {
                    return (
                        <Marker
                            key={orphanage.id}
                            icon={mapMarker}
                            calloutAnchor={{
                                x: 2.7,
                                y: 0.8,
                            }}
                            coordinate={{
                                latitude: orphanage.latitude,
                                longitude: orphanage.longitude,
                            }}
                        >
                            <Callout tooltip onPress={() => handleNavigateToOrphanage(orphanage.id)}>
                                <CalloutContainer>
                                    <CalloutText>{orphanage.name}</CalloutText>
                                </CalloutContainer>
                            </Callout>
                        </Marker>
                    );
                })}
            </Map>

            <Footer>
                <FooterText>{orphanages.length} orfanatos encontrados</FooterText>

                <CreateOtphanageButton onPress={handleNavigateToCreateOrphanage}>
                    <Feather name="plus-circle" size={20} color="#FFF" />
                </CreateOtphanageButton>
            </Footer>
        </MapContainer>
    );
}

export default OrphanagesMap;
