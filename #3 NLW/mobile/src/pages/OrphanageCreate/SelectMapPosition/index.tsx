import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MapEvent, Marker } from 'react-native-maps';

import mapMarkerImg from '../../../images/map-marker.png';

import {
    Container,
    Map,
    NextButton,
    NextButtonText
} from './styles';

const SelectMapPosition: React.FC = () => {
    const navigation = useNavigation();
    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

    function handleNextStep() {
        navigation.navigate('OrphanageData', { position });
    }

    function handleSelectMapPosition(e: MapEvent) {
        setPosition(e.nativeEvent.coordinate);
    }

    return (
        <Container>
            <Map
                initialRegion={{
                    latitude: -5.8045832,
                    longitude: -35.1972851,
                    latitudeDelta: 0.060,
                    longitudeDelta: 0.060,
                }}
                onPress={handleSelectMapPosition}
            >
                {position.longitude !== 0 && (
                    <Marker
                        icon={mapMarkerImg}
                        coordinate={{ latitude: position.latitude, longitude: position.longitude }}
                    />
                )}
            </Map>
            {position.longitude !== 0 && (
                <NextButton onPress={handleNextStep}>
                    <NextButtonText>Próximo</NextButtonText>
                </NextButton>
            )}
        </Container>
    );
}

export default SelectMapPosition;
