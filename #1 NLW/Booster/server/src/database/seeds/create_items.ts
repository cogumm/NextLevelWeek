import Knex from "knex";

export async function seed(knex: Knex) {
    await knex("items").insert([
        {
            title: "Lâmapdas",
            image: "lampadas.svg",
        },
        {
            title: "Pilhas e Baterias",
            image: "baterias.svg",
        },
        {
            title: "Papéis e Papelão",
            image: "lampadas.svg",
        },
        {
            title: "Resíduos Eletrônicos",
            image: "eletronicos.svg",
        },
        {
            title: "Resíduos Orgânicos",
            image: "organicos.svg",
        },
        {
            title: "Óleo de Cozinha",
            image: "oleo.svg",
        },
    ]);
}
