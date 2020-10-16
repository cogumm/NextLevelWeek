import styled from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    padding: 24px;
    padding-top: 44px;

    background-color: #F9FAFC;
    border-bottom-width: 1px;
    border-color: #DDE3F0;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
export const Title = styled.Text`
    font-family: Nunito_600SemiBold;
    color: #8FA7B3;
    font-size: 16px;
`

export const BackButton = styled(BorderlessButton)``

export const CloseButton = styled(BorderlessButton)``
