# Usa uma imagem oficial do Node.js como base
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos essenciais para instalar as dependências
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia todos os arquivos do projeto para o container
COPY . .

# Compila a aplicação para produção
RUN npm run build

# Expõe a porta da aplicação
EXPOSE 3000

# Define o comando padrão do container
CMD ["npm", "start"]
