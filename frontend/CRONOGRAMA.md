# Cronograma do Frontend - Netflix

Esse documento mostra **o que precisa melhorar** e **o que falta criar** no frontend.
Use como checklist: va marcando os `[ ]` conforme for fazendo.

> Nao tem resposta pronta aqui. Pesquise na documentacao, leia o codigo que ja existe e tente resolver sozinho.
> Se travar, pesquisa no Google/docs oficial antes de pedir ajuda.

---

## Estrutura FSD (Feature Sliced Design)

```
src/
├── app/        -> Configuracao do app (rotas, providers, interceptors)
├── pages/      -> Paginas (cada URL = uma page)
├── features/   -> Logica de negocio (formularios, hooks, validacoes)
├── entities/   -> Modelos de dados, stores, chamadas de API
├── widgets/    -> Componentes grandes reutilizaveis (navbar, sidebar)
└── shared/     -> Componentes de UI e utilitarios sem logica de negocio
```

**Regra de ouro do FSD**: Uma camada so pode importar da camada ABAIXO dela.
```
app -> pages -> features -> entities -> shared
```
Nunca importe de cima pra baixo (ex: shared nunca importa de features).

---

## PARTE 0 - BUGS QUE IMPEDEM O APP DE FUNCIONAR

Esses problemas precisam ser resolvidos PRIMEIRO, senao nada funciona.

### 0.1 - Rota de login NAO EXISTE no backend

O frontend chama `POST /auth/login` (em `src/features/auth/api/auth.ts`),
mas no backend so existe `POST /auth/register`. Nao tem rota de login!

- [ ] **Criar no backend** a rota `POST /auth/login`
  - Precisa: rota, factory, controller, use case
  - O use case deve buscar o usuario pelo email, comparar a senha com bcrypt, e retornar um token JWT
  - Siga o mesmo padrao da rota de register que ja existe

### 0.2 - URL de listar filmes esta ERRADA no frontend

O frontend chama `GET /movie` (em `src/entities/movie/api/movie.ts` linha 16),
mas o backend espera `GET /movie/list`.

- [ ] **Corrigir** o path em `src/entities/movie/api/movie.ts`
  - Trocar `'/movie'` por `'/movie/list'`

---

## PARTE 1 - O QUE PRECISA MELHORAR (codigo que ja existe)

---

### 1.1 - Usar React Query nas paginas

As paginas `movies-home` e `movies-list` fazem fetch manual com `useEffect + useState`.
O React Query ja esta instalado e configurado, mas nao esta sendo usado nessas paginas.

- [ ] **Melhorar**: `src/pages/movies-home/index.tsx`
  - Trocar o fetch manual por `useQuery` do React Query
  - Pesquise: "useQuery TanStack React Query" na documentacao oficial

- [ ] **Melhorar**: `src/pages/movies-list/index.tsx`
  - Mesma coisa. Lembre que a queryKey precisa mudar quando os filtros mudam
  - Pesquise: como a queryKey funciona no React Query   VVVVVVVVVVV

> **Por que?** O React Query cuida de loading, erro, cache e refetch. Voce vai escrever menos codigo e ele vai funcionar melhor.

---

### 1.2 - Navbar: problemas de navegacao e performance

- [ ] **Melhorar**: `src/widgets/navbar/navbar.tsx`
  - Tem um problema de caminho relativo no `navigate()`. Descubra qual e e corrija
  - O campo de busca dispara navegacao a CADA LETRA digitada. Pesquise sobre **debounce** e aplique
  - Pesquise: "debounce react hook" - tente criar um hook reutilizavel em `shared/hooks/` VVVVVVVVV

---

### 1.3 - Tratar erros nas paginas

- [ ] **Melhorar**: `src/pages/movies-home/index.tsx`
- [ ] **Melhorar**: `src/pages/movies-list/index.tsx`
  - Se a API estiver fora do ar, o que acontece? Teste desligando o backend e veja
  - Adicione tratamento de erro. Mostre uma mensagem pro usuario quando falhar. Ok

---

### 1.4 - Imagem fallback no CardMovie

- [ ] **Melhorar**: `src/features/movies/home/components/cardMovie.tsx`
  - Tem um base64 gigante dentro do componente. Isso nao e boa pratica
  - Pesquise uma forma melhor de organizar isso (constante separada? imagem em assets?)

---

### 1.5 - Botao de usuario nao faz nada

- [ ] **Melhorar**: `src/widgets/navbar/navbar.tsx`
  - O icone de usuario nao tem funcionalidade nenhuma. Faca ele funcionar
  - No minimo: permitir o usuario fazer logout

---

### 1.6 - Idioma misturado

- [ ] **Melhorar**: Os textos da interface estao misturados (ingles e portugues)
  - Escolha UM idioma e padronize em todos os componentes
  - Procure nos arquivos por textos como "Loading...", "No movies found", etc

---

## PARTE 2 - O QUE FALTA CRIAR

O backend ja tem essas rotas prontas. O frontend precisa consumir elas.

---

### 2.1 - Tela de detalhes do filme

O backend tem `GET /movie/comments-rate` que retorna comentarios e nota media de um filme.

- [ ] Adicionar a chamada da API na entidade de movie
- [ ] Criar a pagina de detalhes em `src/pages/movie-detail/`
  - Deve mostrar: dados do filme, nota media, lista de comentarios
  - Deve permitir: adicionar comentario e dar nota
- [ ] Criar a feature de comentarios em `src/features/comments/`
  - Seguir o mesmo padrao das features que ja existem (schema + hook + componente)
  - Rotas do backend: `POST /comment/movie`, `PATCH /comment/:id`, `DELETE /comment/:id`
- [ ] Criar a feature de avaliacoes em `src/features/rates/`
  - Rota do backend: `POST /rate/movie`
- [ ] Registrar a rota no router (`/movies/:id`)
- [ ] Fazer o card do filme ser clicavel (navegar pra pagina de detalhes)

---

### 2.2 - Modulo completo de series

O backend tem rotas de series prontas. No frontend so existe o tipo definido.

- [ ] Criar a entidade API em `src/entities/serie/api/`
  - Olhe as rotas do backend em `backend/src/main/routes/serieRoute.ts` pra saber quais endpoints usar
- [ ] Criar as paginas: home, lista e cadastro de series
- [ ] Criar a feature de series em `src/features/series/`
  - **Dica**: Olhe como a feature de movies foi feita e siga o MESMO padrao
- [ ] Descomentar e ajustar as rotas no router (ja tem um bloco comentado la)
- [ ] Atualizar a navbar pra incluir series

---

### 2.3 - Tela de edicao de filme

O backend tem `PUT /movie/updater/:id` mas nao tem tela pra isso.

- [ ] Adicionar a chamada de API na entidade de movie
- [ ] Criar a pagina e feature em `src/pages/movie-edit/` e `src/features/movies/edit/`
  - O formulario deve vir preenchido com os dados atuais do filme
- [ ] Registrar a rota no router

---

### 2.4 - Tela de perfil do usuario

- [ ] Criar pagina em `src/pages/profile/`
  - Mostra dados do usuario logado
  - Botao de logout
- [ ] Registrar a rota no router

---

## PARTE 3 - MELHORIAS DE ESTRUTURA FSD

---

### 3.1 - Criar barrel exports (index.ts)

No FSD, cada modulo deve ter um `index.ts` na raiz que exporta tudo de dentro.
Isso deixa os imports mais organizados.

- [ ] Criar `index.ts` em: `entities/movie/`, `entities/session/`, `entities/user/`, `shared/ui/`
- [ ] Atualizar os imports nos arquivos que usam esses modulos
  - Pesquise: "barrel exports typescript" pra entender o conceito

---

### 3.2 - API de auth esta no lugar errado

- [ ] O arquivo `src/features/auth/api/auth.ts` tem chamadas de API
  - No FSD, chamadas de API de uma entidade devem ficar em `entities/`, nao em `features/`
  - Mova pro lugar certo e atualize os imports

---

### 3.3 - Componentes reutilizaveis que faltam

- [ ] Criar um componente de **loading** em `src/shared/ui/`
  - Usar em todas as paginas em vez de `<p>Loading...</p>`
- [ ] Criar um componente de **mensagem de erro** em `src/shared/ui/`
  - Usar em todas as paginas quando o fetch falhar

---

## PARTE 4 - CHECKLIST DE ROTAS

### Rotas que o BACKEND tem vs o que o FRONTEND cobre:

| Rota do Backend | Metodo | Frontend tem? | O que falta |
|----------------|--------|--------------|-------------|
| `POST /auth/register` | POST | SIM | - |
| `POST /auth/login` | POST | SIM (chama) | **BUG: Backend nao tem! Criar (0.1)** |
| `GET /movie/list` | GET | SIM | **BUG: Frontend chama /movie em vez de /movie/list (0.2)** + Usar React Query |
| `GET /movie/title` | GET | SIM | Usar React Query |
| `GET /movie/genre` | GET | SIM | Usar React Query |
| `GET /movie/comments-rate` | GET | NAO | Tela de detalhes |
| `POST /movie/register` | POST | SIM | - |
| `PUT /movie/updater/:id` | PUT | NAO | Tela de edicao |
| `POST /comment/movie` | POST | NAO | Feature de comentarios |
| `POST /comment/serie` | POST | NAO | Feature de comentarios |
| `PATCH /comment/:id` | PATCH | NAO | Edicao de comentario |
| `DELETE /comment/:id` | DELETE | NAO | Delecao de comentario |
| `POST /rate/movie` | POST | NAO | Feature de avaliacoes |
| `POST /rate/serie` | POST | NAO | Feature de avaliacoes |
| `POST /serie/register` | POST | NAO | Modulo de series |
| `GET /serie/list` | GET | NAO | Modulo de series |
| `GET /serie/title` | GET | NAO | Modulo de series |
| `GET /serie/comments-rate` | GET | NAO | Modulo de series |
| `POST /genre/register` | POST | NAO | Tela admin de generos |
| `POST /genreMovie/register` | POST | NAO | Associar genero a filme |

---

## ORDEM SUGERIDA

Faca nessa ordem, do mais facil pro mais dificil:

| # | O que fazer | Dificuldade |
|---|------------|-------------|
| 0 | **CORRIGIR BUGS (0.1 e 0.2) - sem isso nada funciona** | Medio |
| 1 | Usar React Query nas paginas (1.1) | Facil |
| 2 | Corrigir navbar (1.2, 1.5) | Facil |
| 3 | Padronizar textos (1.6) | Facil |
| 4 | Tratar erros nas paginas (1.3) | Facil |
| 5 | Criar barrel exports (3.1) | Facil |
| 6 | Mover API de auth (3.2) | Facil |
| 7 | Criar componentes de loading e erro (3.3) | Facil |
| 8 | Fazer card de filme clicavel | Facil |
| 9 | Tela de detalhes + comentarios + notas (2.1) | Medio |
| 10 | Tela de edicao de filme (2.3) | Medio |
| 11 | Modulo completo de series (2.2) | Medio |
| 12 | Tela de perfil (2.4) | Facil |

---

## DOCUMENTACOES PRA CONSULTAR

- **React Query**: https://tanstack.com/query/latest
- **React Hook Form**: https://react-hook-form.com
- **Zod**: https://zod.dev
- **Zustand**: https://zustand.docs.pmnd.rs
- **React Router**: https://reactrouter.com
- **Feature Sliced Design**: https://feature-sliced.design

---

## REGRAS

1. **Pesquise antes de perguntar**: A documentacao tem a resposta pra quase tudo
2. **Siga o padrao**: Olhe como as coisas ja foram feitas no projeto e siga igual
3. **Teste sempre**: Depois de cada mudanca, testa no navegador
4. **Um item por vez**: Nao tente fazer tudo de uma vez
5. **Git**: Faca um commit depois de cada item. Se quebrar algo, voce volta facil
6. **Leia os erros**: O TypeScript e seu amigo, leia as mensagens de erro com calma
