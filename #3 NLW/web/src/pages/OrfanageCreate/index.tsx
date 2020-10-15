import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiPlus } from "react-icons/fi";

import api from "../../services/api";

import Sidebar from "../../components/Sidebar";
import happyMapIcon from "../../utils/happyMapIcon";

import {
    Container,
    Content,
    Form,
    InputContainer,
    OpenOnWeekendContainer,
    SelectButton,
    ImagesContainer
} from './styles';

const OrphanageCreate: React.FC = () => {
    const history = useHistory();

    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
    // Função para quando clicar no mapa
    function handleMapClick(e: LeafletMouseEvent) {
        // console.log(e);
        const { lat, lng } = e.latlng;

        setPosition({
            latitude: lat,
            longitude: lng,
        });
    }

    // Campos do formulário
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [instructions, setInstructions] = useState('');
    const [opening_hours, setOpeningHours] = useState('');
    const [open_on_weekends, setOpenOnWeekends] = useState(true);

    // Função para o envio do fomulário
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        const { latitude, longitude } = position;

        const data = new FormData();

        data.append('name', name);
        data.append('about', about);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('instructions', instructions);
        data.append('opening_hours', opening_hours);
        data.append('open_on_weekends', String(open_on_weekends));

        images.forEach(image => {
            data.append('images', image);
        });

        await api.post('/orphanages', data);

        history.push('/app');
    }

    // Função quando seleciona a imagem
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    function handleSelectImages(e: ChangeEvent<HTMLInputElement>) {
        // console.log(e.target.files);
        if (!e.target.files) {
            return;
        }

        // Array de imagens
        const selectedImages = Array.from(e.target.files)

        setImages(selectedImages);

        // Preview das imagens
        const selectedImagesPreview = selectedImages.map(image => {
            return URL.createObjectURL(image);
        });

        setPreviewImages(selectedImagesPreview);
    }

    return (
        <Container>
            <Sidebar />
            <Content>
                <Form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Dados</legend>

                        <Map
                            center={[-5.8044209, -35.263095]}
                            style={{ width: '100%', height: 280 }}
                            zoom={15}
                            onclick={handleMapClick}
                        >
                            <TileLayer
                                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                            />

                            {
                                position.latitude !== 0 &&
                                <Marker
                                    interactive={false}
                                    icon={happyMapIcon}
                                    position={[position.latitude, position.longitude]}
                                />
                            }
                        </Map>

                        <InputContainer>
                            <label htmlFor="name">Nome</label>
                            <input
                                id="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </InputContainer>

                        <InputContainer>
                            <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
                            <textarea
                                id="about"
                                maxLength={300}
                                value={about}
                                onChange={e => setAbout(e.target.value)}
                            />
                        </InputContainer>

                        <InputContainer>
                            <label htmlFor="images">Fotos</label>

                            <ImagesContainer>
                                {previewImages.map(image => {
                                    return (
                                        <img
                                            key={image}
                                            src={image}
                                            alt={name}
                                        />
                                    )
                                })}

                                <label htmlFor="image[]" className="new-image">
                                    <FiPlus size={24} color="#15b6d6" />
                                </label>

                                <input
                                    type="file"
                                    id="image[]"
                                    multiple
                                    onChange={handleSelectImages}
                                />
                            </ImagesContainer>
                        </InputContainer>
                    </fieldset>

                    <fieldset>
                        <legend>Visitação</legend>

                        <InputContainer>
                            <label htmlFor="instructions">Instruções</label>
                            <textarea
                                id="instructions"
                                value={instructions}
                                onChange={e => setInstructions(e.target.value)}
                            />
                        </InputContainer>

                        <InputContainer>
                            <label htmlFor="opening_hours">Horário de funcionamento</label>
                            <input
                                id="opening_hours"
                                value={opening_hours}
                                onChange={e => setOpeningHours(e.target.value)}
                            />
                        </InputContainer>

                        <InputContainer>
                            <label htmlFor="open_on_weekends">Atende no fim de semana</label>

                            <OpenOnWeekendContainer>
                                <SelectButton
                                    type="button"
                                    active={open_on_weekends}
                                    onClick={() => setOpenOnWeekends(true)}
                                >Sim</SelectButton>
                                <SelectButton
                                    type="button"
                                    active={!open_on_weekends}
                                    onClick={() => setOpenOnWeekends(false)}
                                >Não</SelectButton>
                            </OpenOnWeekendContainer>
                        </InputContainer>
                    </fieldset>

                    <button type="submit">Confirmar</button>
                </Form>
            </Content>
        </Container>
    );
};

export default OrphanageCreate;

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
