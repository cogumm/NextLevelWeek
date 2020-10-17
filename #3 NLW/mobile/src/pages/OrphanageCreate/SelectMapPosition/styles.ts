import styled from 'styled-components/native';

import MapView from 'react-native-maps';
import { Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

const full_width = Dimensions.get('window').width;
const full_height = Dimensions.get('window').height;

export const Container = styled.View`
    flex: 1;
    position: relative;
`

export const Map = styled(MapView)`
    width: ${full_width};
    height: ${full_height};
`

export const NextButton = styled(RectButton)`
    background-color: #15C3D6;
    border-radius: 20px;

    justify-content: center;
    align-items: center;

    height: 56px;

    position: absolute;
    left: 24px;
    right: 24px;
    bottom: 40px;
`

export const NextButtonText = styled.Text`
    font-family: Nunito_800ExtraBold;
    font-size: 16px;
    color: #FFF;
`
