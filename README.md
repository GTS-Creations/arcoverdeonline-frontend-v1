# Documentação Front-End Arcoverde Online Frontend

Este é a documentação do frontend do projeto Arcoverde Online.

## Estrutura do Projeto

A estrutura do projeto é a seguinte:
```
├── .next/
├── node_modules/
├── src/
│   ├── app/
│   ├── assets/
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   └── middleware.ts
├── .env.example
├── .env.local
├── .gitignore
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
├── yarn.lock
```

## Instalação

1. Clone o repositório:
```sh
   git clone https://github.com/seu-usuario/arcoverdeonline-frontend-v1.git
   cd arcoverdeonline-frontend-v1
```

2. Instale as dependências:
```sh
   npm install
```

3. Crie um arquivo `.env.local` baseado no `.env.example` e configure as variáveis de ambiente necessárias.

## Scripts Disponíveis

No diretório do projeto, você pode executar:

```sh
npm run dev
```
Executa a aplicação em modo de desenvolvimento. Abra `http://localhost:3000` para ver no navegador.

```sh
npm run build
```
Compila a aplicação para produção na pasta `.next`.

```sh
npm run start
```
Inicia o servidor em produção.

## Estrutura de Pastas

- `src/app`: Contém as páginas da aplicação.
- `src/assets`: Contém os arquivos estáticos, como imagens.
- `src/components`: Contém os componentes reutilizáveis da aplicação.
- `src/contexts`: Contém os contextos do React para gerenciamento de estado global.
- `src/hooks`: Contém hooks personalizados.
- `src/services`: Contém as funções para chamadas de API.
- `src/utils`: Contém funções utilitárias.

## Componentes Principais

- **Navbar**: Componente de navegação principal. Arquivo: `Navbar.tsx`
- **Footer**: Componente de rodapé. Arquivo: `Footer.tsx`
- **Sidebar**: Componente de barra lateral. Arquivo: `Sidebar.tsx`

## Formulários

- **FormCategory**: Criar/editar categorias. Arquivo: `FormCategory.tsx`
- **FormSubCategory**: Criar/editar subcategorias. Arquivo: `FormSubCategory.tsx`
- **FormPost**: Criar/editar publicações. Arquivo: `FormPost.tsx`
- **FormSponsor**: Criar/editar patrocinadores. Arquivo: `FormSponsor.tsx`

## Hooks Personalizados

- **useAuthStatus**: Verifica o status de autenticação do usuário. Arquivo: `src/hooks/useAuthStatus.ts`
- **useGetCategory**: Hook para buscar categorias. Arquivo: `src/hooks/useGetCategory.ts`
- **useGetSubCategory**: Hook para buscar subcategorias. Arquivo: `src/hooks/useGetSubCategory.ts`

## Serviços

- **category.ts**: Gerenciamento de categorias. Arquivo: `category.ts`
- **subCategory.ts**: Gerenciamento de subcategorias. Arquivo: `subCategory.ts`
- **post.ts**: Gerenciamento de publicações. Arquivo: `post.ts`
- **sponsor.ts**: Gerenciamento de patrocinadores. Arquivo: `sponsor.ts`
- **user.ts**: Gerenciamento de usuários. Arquivo: `user.ts`
- **auth.ts**: Gerenciamento da autenticação. Arquivo: `auth.ts`
- **home.ts**: Gerenciamento da rota de pesquisa. Arquivo: `home.ts`

## Contexto

- **AuthContext**: Função de login e autenticação global. Arquivo: `AuthContext.tsx`

## Configurações

- **Tailwind CSS**: Configuração do Tailwind CSS. Arquivo: `tailwind.config.ts`
- **PostCSS**: Configuração do PostCSS. Arquivo: `postcss.config.mjs`
- **Next.js**: Configuração do Next.js. Arquivo: `next.config.mjs`

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

