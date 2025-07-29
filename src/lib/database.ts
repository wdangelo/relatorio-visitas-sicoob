// Configuração de conexão com PostgreSQL

import { Pool } from 'pg';

// Configuração do pool de conexões PostgreSQL
const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DB || 'sicoob_visitas',
  user: process.env.POSTGRES_USER || 'username',
  password: process.env.POSTGRES_PASSWORD || 'password',
  max: 20, // Máximo de conexões no pool
  idleTimeoutMillis: 30000, // Tempo limite para conexões inativas
  connectionTimeoutMillis: 2000, // Tempo limite para estabelecer conexão
});

// Função para executar queries
export const query = async (text: string, params?: any[]) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } catch (error) {
    console.error('Erro na query do banco de dados:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Função para inicializar as tabelas do banco
export const initializeDatabase = async () => {
  try {
    // Criar tabela de usuários
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        cargo VARCHAR(255),
        setor VARCHAR(255),
        regional VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Criar tabela de relatórios de visitas (para futuro uso)
    await query(`
      CREATE TABLE IF NOT EXISTS relatorios_visitas (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id),
        data_visita DATE,
        cooperado_nome VARCHAR(255),
        cooperado_cpf_cnpj VARCHAR(20),
        objetivo_visita VARCHAR(255),
        observacoes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Tabelas do banco de dados inicializadas com sucesso!');
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error);
    throw error;
  }
};

// Função para testar a conexão
export const testConnection = async () => {
  try {
    const result = await query('SELECT NOW()');
    console.log('Conexão com PostgreSQL estabelecida:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('Erro ao conectar com PostgreSQL:', error);
    return false;
  }
};

export default pool;

