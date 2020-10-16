import React from 'react';
import { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

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

const OrphanagesMap: React.FC = () => {
    const navigation = useNavigation();

    function handleNavigateToOrphanage() {
        navigation.navigate('Orphanage');
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
                <Marker
                    icon={mapMarker}
                    calloutAnchor={{
                        x: 2.7,
                        y: 0.8,
                    }}
                    coordinate={{
                        latitude: -5.8026889,
                        longitude: -35.2224104,
                    }}
                >
                    <Callout tooltip onPress={handleNavigateToOrphanage}>
                        <CalloutContainer>
                            <CalloutText>Lar dos devs</CalloutText>
                        </CalloutContainer>
                    </Callout>
                </Marker>
            </Map>

            <Footer>
                <FooterText>2 orfanatos encontrados</FooterText>

                <CreateOtphanageButton>
                    <Feather name="plus-circle" size={20} color="#FFF" />
                </CreateOtphanageButton>
            </Footer>
        </MapContainer>
    );
}

export default OrphanagesMap;
