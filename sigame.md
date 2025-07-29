1 - npm install
2 - mude ou verificque usuário e senha do banco de dados do arquivo .env.local
3 - crie a tabela users no postgres "CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  cargo VARCHAR(100),
  setor VARCHAR(100),
  regional VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);"


