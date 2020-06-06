import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Map, TileLayer, Marker } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import axios from "axios";

import Dropzone from "../../components/Dropzone";

import api from "../../services/api";

import "./style.css";

import logo from "../../assets/logo.svg";

/**
 * Sempre que se cria um state do tipo array ou object:
 * Informar manualmente o tipo da variável que será armazenado dentro.
 */
interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface IBGEUF {
    sigla: string;
}

interface IBGECity {
    nome: string;
}

const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const [initialPosition, setInitialPosition] = useState<[number, number]>([
        0,
        0,
    ]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
        0,
        0,
    ]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        whatsapp: "",
    });

    const [selectedUf, setCity] = useState("0");
    const [selectedCity, setSelectedCity] = useState("0");

    const [selectedFile, setSelectFile] = useState<File>();

    // Permite navegar de um componente para outro sem ter um botão.
    const history = useHistory();

    /**
     * UseEffect para pegar a localização atual do usuário
     */
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            // console.log(position);
            const { latitude, longitude } = position.coords;

            setInitialPosition([latitude, longitude]);
        });
    }, []);

    /**
     * Evitar que toda vez que o componente mude, chame a API local.
     */
    useEffect(() => {
        api.get("/items").then((res) => {
            // console.log(res);
            setItems(res.data);
        });
    }, []);

    /**
     * Chamanda da API do IBGE para UFs.
     */
    useEffect(() => {
        axios
            .get<IBGEUF[]>(
                "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
            )
            .then((res) => {
                // console.log(res);
                const ufInitials = res.data.map((uf) => uf.sigla);

                // console.log(ufInitials);
                setUfs(ufInitials);
            });
    }, []);

    /**
     * Chamada da API do IBGE por municípios.
     */
    useEffect(() => {
        // Carregar as cidades sempre que alterar as UF.
        // console.log("Funfou", selectedUf);

        if (selectedUf === "0") {
            return;
        }

        axios
            .get<IBGECity[]>(
                `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
            )
            .then((res) => {
                // console.log(res);
                const cityName = res.data.map((city) => city.nome);

                setCities(cityName);
            });
    }, [selectedUf]);

    /**
     * Toda vez que o usuário altera a UF chama esta função.
     */
    function handleSelectUf(e: ChangeEvent<HTMLSelectElement>) {
        // console.log(e.target.value);
        const uf = e.target.value;

        setCity(uf);
    }

    /**
     * Armazenando a cidade.
     */
    function handleSelectCity(e: ChangeEvent<HTMLSelectElement>) {
        const city = e.target.value;

        // console.log(city);

        setSelectedCity(city);
    }

    /**
     * Função para colocar o pin no mapa.
     */
    function handleMapClick(e: LeafletMouseEvent) {
        // console.log(e.latlng);
        setSelectedPosition([e.latlng.lat, e.latlng.lng]);
    }

    /**
     * Função para armazenar os inputs.
     */
    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        // console.log(e.target.name, e.target.value);
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    /**
     * Função para armazenar os itens selecionados.
     */
    function handleSelectItem(id: number) {
        // console.log("Foi", id);
        const alreadySelected = selectedItems.findIndex((item) => item === id);

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter((item) => item !== id);

            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    }

    /**
     * Função do submit.
     */
    async function handleSubmit(e: FormEvent) {
        // console.log("E aí ?");
        // Evitando que a tela seja recarregada no submit.
        e.preventDefault();

        // console.log(selectedFile);

        const { name, email, whatsapp } = formData;
        const [latitude, longitude] = selectedPosition;
        const uf = selectedUf;
        const city = selectedCity;
        const items = selectedItems;

        const data = new FormData();

        data.append("name", name);
        data.append("email", email);
        data.append("whatsapp", whatsapp);
        data.append("latitude", String(latitude));
        data.append("longitude", String(longitude));
        data.append("uf", uf);
        data.append("city", city);
        data.append("items", items.join(","));

        if (selectedFile) {
            data.append("image", selectedFile);
        }

        /* const data = {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            uf,
            city,
            items,
        }; */

        // console.log(data);
        await api.post("/points", data);

        alert("Ponto de coleta criado!");

        history.push("/");
    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>
                    Cadastro do <br /> ponto de coleta
                </h1>

                <Dropzone onFileUploaded={setSelectFile} />

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">WhatsApp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa.</span>
                    </legend>

                    <Map
                        center={initialPosition}
                        zoom={15}
                        onClick={handleMapClick}
                    >
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={selectedPosition} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado</label>
                            <select
                                name="uf"
                                id="uf"
                                value={selectedUf}
                                onChange={handleSelectUf}
                            >
                                <option value="0">Selecione um estado</option>
                                {ufs.map((uf) => (
                                    <option key={uf} value={uf}>
                                        {uf}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select
                                name="city"
                                id="city"
                                value={selectedCity}
                                onChange={handleSelectCity}
                            >
                                <option value="0">Selecione uma cidade</option>
                                {cities.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Itens de coleta</h2>
                        <span>Selecione um ou mais itens a baixo.</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map((item) => (
                            <li
                                key={item.id}
                                onClick={() => handleSelectItem(item.id)}
                                className={
                                    selectedItems.includes(item.id)
                                        ? "selected"
                                        : ""
                                }
                            >
                                <img src={item.image_url} alt={item.title} />
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <button type="submit">Cadastrar ponto de coleta</button>
            </form>
        </div>
    );
};

export default CreatePoint;
