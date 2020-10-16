import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from "@expo/vector-icons";

import { Container, Title, BackButton, CloseButton } from './styles';
import { View } from 'react-native';

interface IHeaderProps {
    title: string;
    showCancel?: boolean;
}

const HeaderComponent: React.FC<IHeaderProps> = ({ title, showCancel = true }: IHeaderProps) => {
    const navigation = useNavigation();

    function handleGoHomePage() {
        navigation.navigate('OrphanagesMap');
    }

    return (
        <Container>
            <BackButton onPress={navigation.goBack}>
                <Feather name="arrow-left" size={24} color="#15B6D6" />
            </BackButton>
            <Title>
                {title}
            </Title>

            { showCancel ?
                (
                    <CloseButton onPress={handleGoHomePage}>
                        <Feather name="x" size={24} color="#FF669D" />
                    </CloseButton>
                ) : (
                    <View />
                )
            }
        </Container>
    );
}

export default HeaderComponent;
