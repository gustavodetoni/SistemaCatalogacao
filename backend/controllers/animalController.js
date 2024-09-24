const pool = require('../db');

const getAllAnimais = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM animais');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar animais' });
    }
};

const getAnimalById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM animais WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Animal não encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar animal' });
    }
};

const createAnimal = async (req, res) => {
    const { nome, idade, peso, status_de_saude, habitat, comportamento, dieta, observacao } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO animais (nome, idade, peso, status_de_saude, habitat, comportamento, dieta, observacao) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [nome, idade, peso, status_de_saude, habitat, comportamento, dieta, observacao]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar animal' });
    }
};

const updateAnimal = async (req, res) => {
    const { id } = req.params;
    const { nome, idade, peso, status_de_saude, habitat, comportamento, dieta, observacao } = req.body;
    try {
        const result = await pool.query(
            'UPDATE animais SET nome = $1, idade = $2, peso = $3, status_de_saude = $4, habitat = $5, comportamento = $6, dieta = $7, observacao = $8 WHERE id = $9 RETURNING *',
            [nome, idade, peso, status_de_saude, habitat, comportamento, dieta, observacao, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Animal não encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar animal' });
    }
};

const deleteAnimal = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM animais WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Animal não encontrado' });
        }
        res.json({ message: 'Animal deletado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar animal' });
    }
};

module.exports = {
    getAllAnimais,
    getAnimalById,
    createAnimal,
    updateAnimal,
    deleteAnimal,
};