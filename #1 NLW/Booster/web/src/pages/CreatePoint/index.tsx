import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FiArrowLeft } from "react-icons/fi";

import { Map, TileLayer, Marker } from "react-leaflet";

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

const CreatePoint = () => {
    /**
     * Evitar que toda vez que o componente mude, chame a API.
     */
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        api.get("/items").then((res) => {
            // console.log(res);
            setItems(res.data);
        });
    }, []);

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>

            <form>
                <h1>
                    Cadastro do <br /> ponto de coleta
                </h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input type="text" name="name" id="name" />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">e-mail</label>
                            <input type="text" name="email" id="email" />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">WhatsApp</label>
                            <input type="text" name="whatsapp" id="whatsapp" />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa.</span>
                    </legend>

                    <Map center={[-5.8127497, -35.2258358]} zoom={15}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={[-5.8127497, -35.2258358]} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado</label>
                            <select name="uf" id="uf">
                                <option value="0">Selecione uma UF</option>
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city">
                                <option value="0">Selecione uma cidade</option>
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
                            <li key={item.id}>
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
