import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from "@expo/vector-icons";

import { Container, Title } from './styles';
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
            <BorderlessButton onPress={navigation.goBack}>
                <Feather name="arrow-left" size={24} color="#15B6D6" />
            </BorderlessButton>
            <Title>
                {title}
            </Title>

            { showCancel ?
                (
                    <BorderlessButton onPress={handleGoHomePage}>
                        <Feather name="x" size={24} color="#FF669D" />
                    </BorderlessButton>
                ) : (
                    <View />
                )
            }
        </Container>
    );
}

export default HeaderComponent;
