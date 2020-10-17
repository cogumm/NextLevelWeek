import React, { useState } from 'react';
import { Switch } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import api from '../../../services/api';

import {
    Container,
    Title,
    Label,
    Input,
    InputImageButton,
    SwitchContainer,
    NextButton,
    NextButtonText,
    UploadedImagesContainer,
    UploadedImage
} from './styles';

interface IRouteParams {
    position: {
        latitude: number;
        longitude: number;
    }
}

const OrphanageData: React.FC = () => {
    const route = useRoute();
    // console.log(route.params);
    const params = route.params as IRouteParams;

    const navigation = useNavigation();

    // Campos do formulário
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [instructions, setInstructions] = useState('');
    const [opening_hours, setOpeningHours] = useState('');
    const [open_on_weekends, setOpenOnWeekends] = useState(false);
    const [images, setImages] = useState<string[]>([]);

    async function handleCreateOrphanage() {
        const { latitude, longitude } = params.position;

        // console.log({
        //     name,
        //     latitude,
        //     longitude,
        //     about,
        //     instructions,
        //     opening_hours,
        //     open_on_weekends,
        // });

        const data = new FormData();

        data.append('name', name);
        data.append('about', about);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('instructions', instructions);
        data.append('opening_hours', opening_hours);
        data.append('open_on_weekends', String(open_on_weekends));

        images.forEach((image, index) => {
            data.append('images', {
                name: `image_${index}.jpg`,
                type: 'image/jpg',
                uri: image,
            } as any);
        });

        await api.post('/orphanages', data);

        navigation.navigate('OrphanagesMap');
    }

    // Função para pegar as imagens
    async function handleSelectImages() {
        // Pegando a permissão do usuário para acessar a galeria de fotos dele
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

        // Verificando se o usuário permitiu ou não
        if (status !== 'granted') {
            alert('Eita libera aí para acessar as suas fotos!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            // Pegando apenas imagens e não vídeos
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
        // console.log(result);

        // Caso o usuário cancele o upload da imagem
        if (result.cancelled) {
            return;
        }

        const { uri } = result;
        // Respeitar o array de imagens
        setImages([...images, uri]);
    }

    return (
        <Container contentContainerStyle={{ padding: 24 }}>
            <Title>Dados</Title>

            <Label>Nome</Label>
            <Input
                value={name}
                onChangeText={setName}
            />

            <Label>Sobre</Label>
            <Input
                style={[{ height: 110 }]}
                multiline
                value={about}
                onChangeText={setAbout}
            />

            {/* <Label>Whatsapp</Label>
            <Input /> */}

            <Label>Fotos</Label>
            <UploadedImagesContainer>
                {images.map(image => {
                    return (
                        <UploadedImage
                            key={image}
                            source={{ uri: image }}
                        />
                    );
                })}
            </UploadedImagesContainer>
            <InputImageButton onPress={handleSelectImages}>
                <Feather name="plus" size={24} color="#15B6D6" />
            </InputImageButton>

            <Title>Visitação</Title>

            <Label>Instruções</Label>
            <Input
                style={[{ height: 110 }]}
                multiline
                value={instructions}
                onChangeText={setInstructions}
            />

            <Label>Horario de visitas</Label>
            <Input
                value={opening_hours}
                onChangeText={setOpeningHours}
            />

            <SwitchContainer>
                <Label>Atende final de semana?</Label>
                <Switch
                    thumbColor="#fff"
                    trackColor={{ false: '#ccc', true: '#39CC83' }}
                    value={open_on_weekends}
                    onValueChange={setOpenOnWeekends}
                />
            </SwitchContainer>

            <NextButton onPress={handleCreateOrphanage}>
                <NextButtonText>Cadastrar</NextButtonText>
            </NextButton>
        </Container>
    );
}

export default OrphanageData;
