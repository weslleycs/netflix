# Cronograma Completo - Netflix Clone

Esse documento tem **tudo** que voce precisa construir pra ter um clone da Netflix funcionando.
Use como checklist: va marcando os `[ ]` conforme for fazendo.

> Nao tem resposta pronta aqui. Pesquise na documentacao, leia o codigo que ja existe e tente resolver sozinho.
> Se travar, pesquisa no Google/docs oficial antes de pedir ajuda.

---

## O que ja esta pronto (use como referencia!)

Voce tem **dois fluxos funcionando** que servem de modelo:

| Fluxo | Tipo | Caminho no codigo |
|-------|------|-------------------|
| Listar filmes | GET | `entities/movie/api/` → `pages/movies-home/` |
| Cadastrar filme | POST | `features/movies/api/` → `features/movies/register/` → `pages/movies-register/` |

**Observe a diferenca:**
- **GET** (consulta generica) → fica em `entities/`
- **POST** (acao especifica) → fica em `features/`

---

## Estrutura FSD (Feature Sliced Design)

```
src/
├── app/        → Configuracao do app (rotas, providers, interceptors)
├── pages/      → Paginas (cada URL = uma page). NAO tem logica, so monta os blocos
├── features/   → Acoes do usuario (POST, PUT, DELETE) + formularios, hooks, validacoes
├── entities/   → Modelos de dados + consultas genericas (GET)
├── widgets/    → Componentes grandes reutilizaveis (navbar, sidebar, footer)
└── shared/     → Componentes de UI e utilitarios sem logica de negocio
```

**Regra de ouro**: camada de cima importa de baixo, **nunca** o contrario.
```
app → pages → features → entities → shared
```

---

## MAPA COMPLETO DAS PAGINAS

| # | Pagina | URL | O que faz |
|---|--------|-----|-----------|
| 1 | Landing | `/` | Pagina inicial publica. Botao "Get Started" → register |
| 2 | Login | `/login` | Formulario de email + senha |
| 3 | Register | `/register` | Formulario de nome + email + senha |
| 4 | Home | `/movies` | Carroseis de filmes separados por genero |
| 5 | Browse | `/movies/list` | Grid de filmes com busca por titulo e filtro por genero |
| 6 | Detalhes | `/movies/details?movieId=X` | Info do filme + nota media + comentarios + dar nota + comentar |
| 7 | Cadastro filme | `/movies/register` | Formulario de cadastrar filme (JA EXISTE) |
| 8 | Edicao filme | `/movies/edit?movieId=X` | Formulario preenchido pra editar filme |
| 9 | Series Home | `/series` | Carroseis de series |
| 10 | Series Browse | `/series/list` | Grid de series com busca |
| 11 | Series Detalhes | `/series/details?serieId=X` | Info da serie + nota + comentarios |
| 12 | Cadastro serie | `/series/register` | Formulario de cadastrar serie |
| 13 | Perfil | `/profile` | Dados do usuario + logout |

---

## MAPA DAS ROTAS DO BACKEND

Todas as rotas que o backend aceita. Voce vai consumir todas elas.

| Rota | Metodo | O que faz | Onde vai no FSD |
|------|--------|-----------|-----------------|
| `/auth/login` | POST | Login | `features/auth/api/` |
| `/auth/register` | POST | Cadastro | `features/auth/api/` |
| `/movie/list` | GET | Listar filmes | `entities/movie/api/` |
| `/movie/title` | GET | Buscar por titulo | `entities/movie/api/` |
| `/movie/genre` | GET | Filtrar por genero | `entities/genre/api/` |
| `/movie/details` | GET | Detalhes do filme | `entities/movie/api/` |
| `/movie/comments` | GET | Comentarios do filme | `entities/movie/api/` |
| `/movie/comments-rate` | GET | Comentarios + nota media | `entities/movie/api/` |
| `/movie/register` | POST | Cadastrar filme | `features/movies/api/` |
| `/movie/updater/:id` | PUT | Editar filme | `features/movies/api/` |
| `/comment/movie` | POST | Comentar filme | `features/comments/api/` |
| `/comment/serie` | POST | Comentar serie | `features/comments/api/` |
| `/comment/:id` | PATCH | Editar comentario | `features/comments/api/` |
| `/comment/:id` | DELETE | Deletar comentario | `features/comments/api/` |
| `/rate/movie` | POST | Avaliar filme | `features/rates/api/` |
| `/rate/serie` | POST | Avaliar serie | `features/rates/api/` |
| `/genre/list` | GET | Listar generos | `entities/genre/api/` |
| `/genre/register` | POST | Cadastrar genero | `features/genres/api/` |
| `/genreMovie/register` | POST | Associar genero a filme | `features/genres/api/` |
| `/serie/list` | GET | Listar series | `entities/serie/api/` |
| `/serie/title` | GET | Buscar serie por titulo | `entities/serie/api/` |
| `/serie/register` | POST | Cadastrar serie | `features/series/api/` |
| `/serie/comments-rate` | GET | Comentarios + nota da serie | `entities/serie/api/` |

---

# PARTE 1 — AUTENTICACAO

---

## 1.1 — Entidade `user` (tipo)

- [ ] Criar `src/entities/user/model/user.ts`

```ts
// O que voce precisa criar:
// - Um type User com: id (number), email (string), name (string)
// Olhe o que o backend retorna no login pra conferir os campos
```

> **Obs:** Entidade e so tipo + consulta. User nao tem API GET por enquanto, entao so cria o tipo.

---

## 1.2 — Entidade `session` (store Zustand)

- [ ] Criar `src/entities/session/model/auth.store.ts`

```ts
// O que voce precisa criar:
// - Uma store Zustand com persist (pra manter login no localStorage)
// - Estado: token (string | null), user (User | null)
// - Acoes: setAuth({ token, user }), logout()
//
// Pesquise: "zustand persist middleware" na doc do Zustand
// O persist salva o estado no localStorage automaticamente
// Assim quando o usuario recarrega a pagina, ele continua logado
```

> **Obs:** Fica em `entities/` porque qualquer camada pode precisar saber se o usuario ta logado (navbar, layout, pages...).

---

## 1.3 — Feature auth: API

- [ ] Criar `src/features/auth/api/auth.ts`

```ts
// O que voce precisa criar:
// - Tipo LoginDTO: { email: string, password: string }
// - Tipo RegisterDTO: { name: string, email: string, password: string }
// - Tipo LoginResponse: { token: string, id: number, name: string, email: string }
// - Funcao loginUser(dto: LoginDTO) → POST /auth/login → retorna LoginResponse
// - Funcao registerUser(dto: RegisterDTO) → POST /auth/register
//
// Olhe como features/movies/api/movie.ts faz o POST — siga o mesmo padrao
```

> **Obs:** Login e register sao **acoes** (POST), entao ficam em `features/`, nao em `entities/`.

---

## 1.4 — Feature auth: schema do login

- [ ] Criar `src/features/auth/login/schemas/loginSchema.ts`

```ts
// O que voce precisa criar:
// - Um schema Zod validando: email (string, formato email), password (string, min 6)
// - Exportar o schema e o type LoginFormValues
//
// Olhe como features/movies/register/schema/registerSchema.ts faz
// Pesquise: "zod email validation" → z.string().email()
```

---

## 1.5 — Feature auth: hook do login

- [ ] Criar `src/features/auth/login/hooks/useLoginForm.ts`

```ts
// Copie a estrutura de features/movies/register/hooks/movieRegisterForm.ts e adapte:
//
// export function useLoginForm() {
//   const navigate = useNavigate()
//   const setAuth = useAuthStore((s) => s.setAuth)
//
//   const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//   })
//
//   const onSubmit = handleSubmit(async (values) => {
//     try {
//       const data = await loginUser(values)  // retorna { token, id, name, email }
//       setAuth({ token: data.token, user: { id: data.id, name: data.name, email: data.email } })
//       navigate('/movies')
//     } catch (err: any) {
//       if (err?.response?.status === 401) {
//         setError('root', { message: 'Email ou senha incorretos' })
//       } else {
//         setError('root', { message: 'Something went wrong. Please try again.' })
//       }
//     }
//   })
//
//   return { register, errors, isSubmitting, onSubmit }
// }
```

---

## 1.6 — Feature auth: componente do login

- [ ] Criar `src/features/auth/login/components/loginForm.tsx`

```tsx
// ESTRUTURA DO COMPONENTE:
// - Recebe por props: register, errors, isSubmitting, onSubmit (igual ao registerForm de movies)
// - Usa <FormField> pra email e password
// - Usa <Button> pra submit
// - Mostra errors.root se tiver erro do servidor
//
// IMPORTANTE: O campo de password precisa ter type="password" pra esconder a senha
//
// CSS DO LAYOUT (use na page, nao no componente):
// <div className="min-h-[70vh] flex items-center justify-center">
//   <Card> ... form aqui ... </Card>
// </div>
```

---

## 1.7 — Feature auth: registro (repetir o padrao)

- [ ] Criar schema em `src/features/auth/register/schemas/registerSchema.ts`
  - Campos: name (string, min 2), email (string, formato email), password (string, min 6)
- [ ] Criar hook em `src/features/auth/register/hooks/useRegisterForm.ts`
  - Chamar `registerUser`, redirecionar pra `/login` no sucesso
  - Tratar erro 409 (email ja existe): mostrar erro no campo email
- [ ] Criar componente em `src/features/auth/register/components/registerForm.tsx`
  - Mesma estrutura do login, com campo `name` a mais
  - Link "Already have an account? Login" que vai pra `/login`

> **Obs:** Se voce fez o login certo, o registro e copiar e adaptar. Muda a API, adiciona um campo, muda o redirect.

---

## 1.8 — Pages de login e registro

- [ ] Criar `src/pages/login/index.tsx`
- [ ] Criar `src/pages/register/index.tsx`

```ts
// A page e simples. Ela so:
// 1. Chama o hook (useLoginForm)
// 2. Renderiza o componente (LoginForm) passando as props
// 3. Envolve com <Card>
//
// Olhe pages/movies-register/index.tsx — e exatamente esse padrao
```

---

## 1.9 — Landing page

- [ ] Criar `src/pages/landing/index.tsx`

CSS pronto:

```tsx
// IMPORTANTE: use <NavLink to="/register"> em vez de <a href="/register">
// O <a> recarrega a pagina toda. NavLink faz navegacao SPA (mais rapida)
//
// <section className="py-16 md:py-24">
//   <div className="max-w-3xl">
//     <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
//       Unlimited movies, series and more.
//       <span className="text-red-600"> Netflix vibe.</span>
//     </h1>
//     <p className="mt-4 text-lg text-white/70">Watch anywhere. Cancel anytime.</p>
//     <div className="mt-8">
//       <NavLink to="/register"
//          className="inline-flex items-center justify-center px-6 py-3 font-semibold transition bg-red-600 rounded hover:bg-red-700">
//         Get Started
//       </NavLink>
//     </div>
//   </div>
// </section>
```

---

## 1.10 — Layouts publico e privado

- [ ] Criar `src/app/layout/publicLayout.tsx`

```tsx
// Copie o privateLayout.tsx e mude duas coisas:
// 1. Use <PublicNavbar /> no lugar de <Navbar />
// 2. NAO coloque verificacao de token (essa rota e publica)
```

- [ ] Editar `src/app/layout/privateLayout.tsx`
  - Importar `useAuthStore` de `@/entities/session/model/auth.store`
  - No topo do componente: `const token = useAuthStore((s) => s.token)`
  - Se nao tiver token → `if (!token) return <Navigate to="/login" replace />`
  - Importar `Navigate` de `react-router-dom`

---

## 1.11 — Navbar publica

- [ ] Criar `src/widgets/navbar/publicNavbar.tsx`

CSS pronto:

```tsx
// <header className="w-full">
//   <div className="flex items-center justify-between max-w-6xl px-6 py-6 mx-auto">
//     <NavLink to="/" className="text-2xl font-extrabold tracking-wide text-red-600">
//       WESLLEYFLIX
//     </NavLink>
//     <div className="flex gap-3">
//       <NavLink to="/login"
//         className="px-4 py-2 text-sm font-semibold transition bg-red-600 rounded hover:bg-red-700">
//         Login
//       </NavLink>
//       <NavLink to="/register"
//         className="px-4 py-2 text-sm font-semibold transition border rounded border-white/20 bg-white/5 hover:bg-white/10">
//         Register
//       </NavLink>
//     </div>
//   </div>
// </header>
```

---

## 1.12 — Interceptor HTTP (token automatico)

- [ ] Editar `src/app/api/http.ts`

```ts
// O que voce precisa fazer:
// 1. Importar http de @/shared/api/http
// 2. Importar useAuthStore de @/entities/session/model/auth.store
//
// 3. Adicionar interceptor de REQUEST:
//    http.interceptors.request.use((config) => {
//      const token = useAuthStore.getState().token
//      if (token) {
//        config.headers = config.headers ?? {}
//        config.headers.Authorization = `Bearer ${token}`
//      }
//      return config
//    })
//
// 4. Adicionar interceptor de RESPONSE:
//    http.interceptors.response.use(
//      (res) => res,
//      (err) => {
//        if (err?.response?.status === 401) {
//          useAuthStore.getState().logout()
//          window.location.href = '/login'
//        }
//        return Promise.reject(err)
//      }
//    )
//
// IMPORTANTE: dentro do interceptor voce NAO pode usar hooks do React
// Por isso usa useAuthStore.getState() (acesso direto) em vez de useAuthStore()
// O .getState() pega o valor atual da store sem precisar de um componente React
//
// NOTA: o window.location.href no interceptor de erro e uma EXCECAO a regra de usar useNavigate.
// Interceptors rodam FORA do React, entao useNavigate nao funciona aqui.
// Esse e o unico lugar do app onde window.location.href e aceito.
```

> **CUIDADO:** Esse arquivo precisa ser importado em algum lugar pra rodar!
> O import precisa estar no `src/main.tsx` ou no `src/app/providers/appProviders.tsx`.
> Adicione no topo: `import '@/app/api/http'`
> Se nao fizer isso, os interceptors nunca vao ser registrados e o token nao vai ser enviado.

---

## 1.13 — Registrar rotas

- [ ] Editar `src/app/router/router.tsx`

```ts
// Adicionar bloco publico + manter bloco privado:
//
// [
//   {
//     path: '/',
//     element: <PublicLayout />,
//     children: [
//       { index: true, element: <LandingPage /> },
//       { path: 'login', element: <LoginPage /> },
//       { path: 'register', element: <RegisterPage /> },
//       { path: '*', element: <Navigate to="/" replace /> },
//     ],
//   },
//   {
//     path: '/movies',
//     element: <PrivateLayout />,
//     children: [
//       { index: true, element: <MoviesHomePage /> },
//       { path: 'register', element: <MoviesRegisterPage /> },
//     ],
//   },
// ]
```

---

### CRITERIO DE SUCESSO — PARTE 1

Teste tudo isso antes de seguir pra Parte 2:

- [ ] Acessar `/` mostra a landing page com botao "Get Started"
- [ ] Clicar "Get Started" vai pra `/register` SEM recarregar a pagina
- [ ] Preencher o formulario de registro e submeter cria o usuario (sem erro no console)
- [ ] Apos registro, redireciona pra `/login`
- [ ] Fazer login com email/senha corretos redireciona pra `/movies`
- [ ] Fazer login com senha errada mostra "Email ou senha incorretos"
- [ ] Acessar `/movies` sem estar logado redireciona pra `/login`
- [ ] Apos login, recarregar a pagina (F5) **mantem** o usuario logado (Zustand persist)
- [ ] Apos login, a lista de filmes aparece normalmente (token sendo enviado no header)
- [ ] No DevTools > Network, toda requisicao pra API tem o header `Authorization: Bearer <token>`
- [ ] `npx tsc --noEmit` roda sem erros

> **GOTCHA DO TOKEN:** O JWT do backend expira em **1 minuto**. Se voce ficar muito tempo
> sem usar o app e fizer uma acao, vai receber 401 e ser deslogado. Isso e normal por
> enquanto — no futuro da pra aumentar o tempo no backend (arquivo de config do JWT).
> Se durante o desenvolvimento voce ficar tomando 401 do nada, e isso. Faz login de novo.

---

# PARTE 2 — ENTIDADE GENRE + SELECT NO FORM

---

## 2.1 — Entidade `genre`

- [ ] Criar `src/entities/genre/model/genres.ts`

```ts
// Tipo Genres: { id: number, name: string, description: string | null }
```

- [ ] Criar `src/entities/genre/api/genres.ts`

```ts
// Funcoes (todas GET, entao ficam em entities):
// - getAllGenres() → GET /genre/list → retorna Genres[]
// - getMoviesByGenre(genre: string) → GET /movie/genre?genre=... → retorna Movie[]
//
// Siga o padrao de entities/movie/api/movie.ts
```

---

## 2.2 — Usar select de generos no form de cadastro de filme

- [ ] Editar `src/features/movies/register/components/registerForm.tsx`

```ts
// O que mudar:
// 1. Importar getAllGenres de @/entities/genre/api/genres
// 2. Importar useQuery de @tanstack/react-query
// 3. Importar o tipo Genres de @/entities/genre/model/genres
// 4. Dentro do componente, buscar generos:
//    const { data: genres = [] } = useQuery<Genres[]>({
//      queryKey: ['genres'],
//      queryFn: getAllGenres,
//    })
// 5. Trocar o FormField de genre pra:
//    <FormField
//      label="Genre"
//      as="select"
//      options={genres.map((g) => ({ label: g.name, value: g.name }))}
//      {...register('genre')}
//      error={errors.genre?.message}
//    />
//
// IMPORTANTE: O value do select e o NOME do genero (string), nao o ID (number)
// porque o backend espera o nome no campo genre do filme.
// O schema registerSchema.ts valida genre como z.string() — isso continua correto.
```

---

### CRITERIO DE SUCESSO — PARTE 2

- [ ] Na pagina de cadastro de filme, o campo "Genre" e um select (dropdown)
- [ ] O select mostra os generos que existem no banco de dados
- [ ] Cadastrar um filme com genero selecionado funciona sem erro
- [ ] Se o backend estiver fora do ar, o select fica vazio (nao quebra a pagina)
- [ ] `npx tsc --noEmit` roda sem erros

> **GOTCHA:** Se nao tiver nenhum genero cadastrado no banco, o select vai estar vazio.
> Use o Insomnia/Postman pra chamar `POST /genre/register` e criar alguns generos antes de testar
> (ex: { "name": "Action", "description": "Action movies" }).
> Depois, voce vai criar a tela de cadastro de genero na Parte 9.

---

# PARTE 3 — NAVBAR COMPLETA

---

## 3.1 — Navbar com busca e generos

- [ ] Editar `src/widgets/navbar/navbar.tsx`

CSS pronto pra navbar completa:

```tsx
// <header className="w-full">
//   <div className="flex items-center justify-between max-w-6xl px-6 py-6 mx-auto">
//
//     {/* LOGO */}
//     <NavLink to="/movies" className="text-2xl font-extrabold tracking-wide text-red-600">
//       WESLLEYFLIX
//     </NavLink>
//
//     <div className="flex gap-3">
//
//       {/* SELECT DE GENEROS */}
//       <select
//         onChange={handleGenreChange}
//         className="px-4 py-2 text-white border rounded-md bg-zinc-900 border-white/20 focus:outline-none focus:ring-2 focus:ring-red-600">
//         <option value="">Movies</option>
//         <option value="listAll">All movies</option>
//         {/* mapear generos aqui com genres.map() */}
//       </select>
//
//       {/* CAMPO DE BUSCA */}
//       <input type="text" placeholder="Search..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="w-48 px-4 py-2 text-sm text-white border rounded-md bg-zinc-900 border-white/20 focus:outline-none focus:ring-2 focus:ring-red-600 placeholder:text-white/50"
//       />
//
//       {/* ICONE DE USUARIO — leva pro perfil */}
//       <NavLink to="/profile"
//         className="flex items-center text-[2rem] text-white/60 hover:text-white">
//         {/* Usar <FaUserCircle /> do react-icons/fa */}
//       </NavLink>
//     </div>
//   </div>
// </header>
```

Logica que voce precisa adicionar:

```ts
// IMPORTS NECESSARIOS:
// - useState, useEffect de 'react'
// - useNavigate, NavLink de 'react-router-dom'
// - useQuery de '@tanstack/react-query'
// - useDebounce de '@/shared/hooks/useDebounce'
// - getAllGenres de '@/entities/genre/api/genres'
// - Genres de '@/entities/genre/model/genres'
// - FaUserCircle de 'react-icons/fa'
//
// ESTADOS:
// const navigate = useNavigate()
// const [search, setSearch] = useState('')
// const debouncedSearch = useDebounce(search, 400)
//
// BUSCAR GENEROS:
// const { data: genres = [] } = useQuery<Genres[]>({ queryKey: ['genres'], queryFn: getAllGenres })
//
// HANDLER DO SELECT (navegacao direta no evento, NAO em useEffect):
// function handleGenreChange(e: React.ChangeEvent<HTMLSelectElement>) {
//   const value = e.target.value
//   setSearch('')  // limpa busca ao selecionar genero
//   if (value === 'listAll') navigate('/movies/list')
//   else if (value) navigate(`/movies/list?genre=${value}`)
// }
//
// POR QUE nao usar useEffect pro select?
// useEffect roda DEPOIS do render — causa um render extra desnecessario.
// Como a navegacao e uma RESPOSTA DIRETA ao clique, deve ficar no handler do evento.
// Regra: se a acao e causada por um evento do usuario → handler. Se depende de um valor
// derivado (como debounce) → useEffect.
//
// EFEITO DA BUSCA (com debounce — aqui sim useEffect e correto):
// useEffect(() => {
//   if (debouncedSearch.trim()) {
//     navigate(`/movies/list?title=${debouncedSearch}`)
//   }
// }, [debouncedSearch, navigate])
//
// POR QUE useEffect aqui e certo?
// O debouncedSearch e um valor DERIVADO — ele muda sozinho apos 400ms sem digitar.
// Nao tem um evento unico que dispara a navegacao. Entao useEffect e o jeito certo.
//
// POR QUE DEBOUNCE?
// Sem debounce: digitar "batman" dispara 6 navegacoes (b, ba, bat, batm, batma, batman)
// Com debounce de 400ms: espera o usuario parar de digitar e dispara 1 navegacao so
```

No CSS da navbar, use o handler no select:

```tsx
// <select onChange={handleGenreChange} ...>
//   (NAO precisa mais de value={selectValue} nem de useState pro select)
```

---

### CRITERIO DE SUCESSO — PARTE 3

- [ ] Logo "WESLLEYFLIX" leva pra `/movies`
- [ ] Select mostra os generos do banco
- [ ] Selecionar "All movies" navega pra `/movies/list`
- [ ] Selecionar um genero navega pra `/movies/list?genre=<nome>`
- [ ] Digitar no campo de busca navega pra `/movies/list?title=<texto>` APOS parar de digitar (~400ms)
- [ ] NAO navega a cada letra digitada (debounce funcionando)
- [ ] Icone de usuario leva pra `/profile`
- [ ] `npx tsc --noEmit` roda sem erros

> **Obs:** As rotas `/movies/list` e `/profile` ainda nao existem. Vai dar tela branca ou 404.
> Isso e esperado — voce vai criar essas paginas nas proximas partes.

---

# PARTE 4 — BUSCA E LISTAGEM (BROWSE)

---

## 4.1 — Adicionar consultas na entidade movie

- [ ] Editar `src/entities/movie/api/movie.ts`

```ts
// Adicionar essas funcoes (todas GET):
//
// export async function getMoviesByTitle(title: string): Promise<Movie[]> {
//   const { data } = await http.get('/movie/title', { params: { title } })
//   return data
// }
//
// Siga o padrao do getMovies() que ja existe
```

---

## 4.2 — Componente CardContainerMovies (grid)

- [ ] Criar `src/features/movies/home/components/cardContainerMovies.tsx`

CSS pronto (voce adiciona as props e o map):

```tsx
// Props: { movies: Movie[], title?: string }
//
// <section className="p-6 border rounded-2xl border-zinc-800 bg-zinc-950/60">
//   {title && <h2 className="mb-4 text-xl font-semibold">{title}</h2>}
//   {movies.length === 0 ? (
//     <p className="text-zinc-400">No movies found.</p>
//   ) : (
//     <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
//       {/* mapear movies usando <CardMovie key={movie.id} movie={movie} /> */}
//     </div>
//   )}
// </section>
//
// Diferenca pro Carousel:
// - Carousel = rola horizontal (flex + overflow-x-auto)
// - Grid = mostra tudo em colunas (grid grid-cols-X)
```

> **PROBLEMA:** O CardMovie atual tem classes `w-56` (largura fixa) e `shrink-0` que sao feitas
> pro carousel. No grid, o card precisa preencher a coluna inteira.
>
> **SOLUCAO:** Faca o CardMovie aceitar uma prop `className` opcional.
> - No CardMovie: troque o `<li>` por `<div>` e adicione `className` nas props:
>   `export default function CardMovie({ movie, className = '' }: Props)`
>   `<div className={`relative overflow-hidden ... ${className}`}>`
> - No carousel: use `<CardMovie className="w-56 shrink-0" />`
> - No grid: use `<CardMovie />` sem className (ele vai preencher a coluna do grid)
>
> Assim o mesmo componente funciona nos dois contextos.

---

## 4.3 — Pagina movies-list (browse)

- [ ] Criar `src/pages/movies-list/index.tsx`

```ts
// O que essa pagina faz:
// 1. Ler parametros da URL com useSearchParams():
//    const [params] = useSearchParams()
//    const title = params.get('title')
//    const genre = params.get('genre')
//
// 2. Usar useQuery pra buscar filmes:
//    const { data: movies = [], isLoading } = useQuery<Movie[]>({
//      queryKey: ['movies', { title, genre }],
//      queryFn: async () => {
//        if (title) return await getMoviesByTitle(title)
//        if (genre) return await getMoviesByGenre(genre)
//        return await getMovies()
//      },
//    })
//
// 3. Montar o titulo da pagina:
//    - Se tiver title: "Results for: batman"
//    - Se tiver genre: "Genre: Action"
//    - Senao: "All movies"
//
// 4. Renderizar:
//    if (isLoading) return <Loading />
//    return <CardContainerMovies title={pageTitle} movies={movies} />
//
// Pesquise: "useSearchParams react router" pra entender como ler parametros da URL
//
// POR QUE a queryKey inclui { title, genre }?
// O React Query usa a queryKey como identificador do cache.
// Se a key muda, ele faz um novo fetch automaticamente.
// Entao quando o usuario busca "batman", a key muda de ['movies', {}] pra ['movies', { title: 'batman' }]
// e o React Query busca os novos dados. Sem isso, ficaria mostrando os dados antigos.
```

---

## 4.4 — Registrar rota

- [ ] Adicionar no router dentro do bloco `/movies`: `{ path: 'list', element: <MoviesListPage /> }`

---

### CRITERIO DE SUCESSO — PARTE 4

- [ ] Acessar `/movies/list` mostra todos os filmes em grid
- [ ] Acessar `/movies/list?title=batman` mostra so filmes com "batman" no titulo
- [ ] Acessar `/movies/list?genre=Action` mostra so filmes do genero "Action"
- [ ] Se nao encontrar nenhum filme, mostra "No movies found."
- [ ] Buscar pela navbar funciona (digita, espera, e a pagina mostra os resultados)
- [ ] Selecionar genero pela navbar funciona
- [ ] Loading aparece enquanto busca
- [ ] `npx tsc --noEmit` roda sem erros

---

# PARTE 5 — DETALHES DO FILME

---

## 5.1 — Tipos e consultas de detalhes

- [ ] Criar `src/entities/movie/model/movieDetails.ts`

```ts
// Tipo MovieDetails: {
//   id: number
//   title: string
//   description: string
//   imageUrl: string
//   genre: string[]    // array de nomes de genero
//   rate: number       // nota media (pode ser 0 se ninguem avaliou)
// }
```

- [ ] Criar `src/entities/movie/model/movieComment.ts`

```ts
// Tipo MovieComment: {
//   id: number
//   comment: string
//   userName: string   // nome do usuario que comentou
// }
```

- [ ] Editar `src/entities/movie/api/movie.ts`

```ts
// Adicionar (importar os tipos novos):
//
// export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
//   const { data } = await http.get('/movie/details', { params: { movieId } })
//   return data
// }
//
// export async function getCommentsMovieById(movieId: number): Promise<MovieComment[]> {
//   const { data } = await http.get('/movie/comments', { params: { movieId } })
//   return data
// }
```

---

## 5.2 — Feature de comentarios (POST)

- [ ] Criar `src/features/comments/api/comment.ts`

```ts
// Tipo CommentMovieBody: { userId: number, movieId: number, comment: string }
//
// Funcoes:
// - commentMovie(data: CommentMovieBody) → POST /comment/movie
// - editComment(id: number, data: { comment: string }) → PATCH /comment/${id}
// - deleteComment(id: number, data: { userId: number }) → DELETE /comment/${id}
//
// ATENCAO no deleteComment:
// O backend espera o userId no BODY do DELETE (nao no params)
// Axios envia body no DELETE assim:
//   await http.delete(`/comment/${id}`, { data: { userId } })
// Pesquise: "axios delete with body"
```

- [ ] Criar schema em `src/features/comments/schemas/commentSchema.ts`

```ts
// Validar: comment → z.string().min(1, 'Comment is required').max(500, 'Too long')
```

- [ ] Criar hook em `src/features/comments/hooks/useCommentForm.ts`

```ts
// IMPORTANTE: esse hook precisa receber movieId como parametro
//
// export function useCommentForm(movieId: number) {
//   const user = useAuthStore((s) => s.user)  // <-- pega o userId daqui!
//   const queryClient = useQueryClient()       // <-- pra invalidar o cache
//
//   const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting } } = useForm({
//     resolver: zodResolver(commentSchema),
//   })
//
//   const onSubmit = handleSubmit(async (values) => {
//     if (!user) return  // nao deixa comentar sem estar logado
//     try {
//       await commentMovie({ userId: user.id, movieId, comment: values.comment })
//       // Invalida cache pra lista atualizar:
//       queryClient.invalidateQueries({ queryKey: ['commentsMovie', movieId] })
//       reset()  // limpa o campo de texto apos enviar
//     } catch {
//       setError('comment', { message: 'Failed to send comment' })
//     }
//   })
//
//   return { register, errors, isSubmitting, onSubmit }
// }
//
// POR QUE handleSubmit + try/catch e NAO useMutation aqui?
// Porque esse hook usa useForm. O useForm ja tem:
// - isSubmitting (loading automatico enquanto o async roda)
// - setError (pra mostrar erro no campo)
// Entao nao precisa de useMutation — seria redundante.
// useMutation so e necessario quando NAO tem useForm (ex: clicar numa estrela, dar like, etc)
//
// Pesquise: "useQueryClient react query" pra entender o invalidateQueries
// O invalidateQueries faz o useQuery buscar os dados de novo
// Assim o comentario novo aparece na lista sem precisar recarregar a pagina
```

- [ ] Criar componente em `src/features/comments/components/commentForm.tsx`

CSS pronto:

```tsx
// Props: { register, errors, isSubmitting, onSubmit }  (mesmo padrao das outras features)
//
// <form onSubmit={onSubmit} className="flex gap-3 mt-6">
//   <input type="text" placeholder="Write a comment..."
//     {...register('comment')}
//     className="flex-1 px-4 py-2 text-sm text-white border rounded-lg bg-zinc-900 border-white/20 focus:outline-none focus:ring-2 focus:ring-red-600 placeholder:text-white/50"
//   />
//   <button type="submit" disabled={isSubmitting}
//     className="px-6 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition disabled:opacity-60">
//     {isSubmitting ? '...' : 'Send'}
//   </button>
// </form>
// {errors.comment && <p className="mt-1 text-sm text-red-500">{errors.comment.message}</p>}
```

---

## 5.3 — Feature de avaliacao (POST)

- [ ] Criar `src/features/rates/api/rate.ts`

```ts
// Tipo RateMovieBody: { userId: number, movieId: number, rate: number }
// Funcao rateMovie(data: RateMovieBody) → POST /rate/movie
```

- [ ] Criar hook em `src/features/rates/hooks/useRateMovie.ts`

```ts
// import { useMutation, useQueryClient } from '@tanstack/react-query'
//
// export function useRateMovie(movieId: number) {
//   const user = useAuthStore((s) => s.user)
//   const queryClient = useQueryClient()
//
//   const mutation = useMutation({
//     mutationFn: (rate: number) => {
//       if (!user) throw new Error('Not logged in')
//       return rateMovie({ userId: user.id, movieId, rate })
//     },
//     onSuccess: () => {
//       // Invalida a query de detalhes pra nota media atualizar automaticamente:
//       queryClient.invalidateQueries({ queryKey: ['detailsMovie', movieId] })
//     },
//   })
//
//   return {
//     handleRate: mutation.mutate,    // funcao pra chamar: handleRate(7)
//     isRating: mutation.isPending,   // true enquanto envia a nota
//     rateError: mutation.isError,    // true se deu erro
//   }
// }
//
// POR QUE useMutation aqui?
// Diferente dos hooks de formulario (login, register, etc), o rate NAO tem useForm.
// Sem useForm, voce nao tem isSubmitting nem setError. O useMutation resolve isso:
// - isPending: sabe quando ta carregando (pode desabilitar as estrelas)
// - isError: sabe quando deu erro (pode mostrar mensagem)
// - onSuccess: lugar certo pra invalidar o cache
//
// Pesquise: "useMutation react query" na documentacao
// https://tanstack.com/query/latest/docs/framework/react/guides/mutations
```

- [ ] Criar componente em `src/features/rates/components/rateStars.tsx`

CSS pronto (voce adiciona a logica de clicar):

```tsx
// Props: { currentRate: number, onRate: (rate: number) => void }
//
// <div className="flex items-center gap-1 mt-4">
//   <span className="mr-2 text-sm text-zinc-400">Your rate:</span>
//   {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
//     <button key={star} type="button" onClick={() => onRate(star)}
//       className={`text-2xl transition ${star <= currentRate ? 'text-yellow-400' : 'text-zinc-600'} hover:text-yellow-300`}>
//       ★
//     </button>
//   ))}
// </div>
//
// O currentRate pinta as estrelas ate aquele numero de amarelo
// O onRate e chamado quando o usuario clica numa estrela
// O estado de "qual nota o usuario deu" fica no componente pai (pagina de detalhes)
// Use useState pra guardar a nota selecionada na pagina
```

---

## 5.4 — Componentes da pagina de detalhes

- [ ] Criar `src/features/movies/home/components/cardMovieDetails.tsx`

CSS pronto (voce adiciona as props):

```tsx
// Props: { movieDetails: MovieDetails }
//
// <div className="flex flex-col gap-6 md:flex-row">
//   {/* POSTER */}
//   <img src={movieDetails.imageUrl} alt={movieDetails.title}
//     className="object-cover w-full rounded-2xl md:w-72 h-96" />
//
//   {/* INFO */}
//   <div className="flex-1 space-y-4">
//     <h1 className="text-3xl font-bold">{movieDetails.title}</h1>
//
//     {/* GENEROS */}
//     <div className="flex flex-wrap gap-2">
//       {movieDetails.genre.map((g) => (
//         <span key={g} className="px-3 py-1 text-xs font-semibold rounded-full bg-red-600/20 text-red-400">
//           {g}
//         </span>
//       ))}
//     </div>
//
//     {/* NOTA MEDIA */}
//     <div className="flex items-center gap-2">
//       <span className="text-xl text-yellow-400">★</span>
//       <span className="text-lg font-semibold">{movieDetails.rate.toFixed(1)}</span>
//       <span className="text-zinc-400">/ 10</span>
//     </div>
//
//     {/* DESCRICAO */}
//     <p className="leading-relaxed text-zinc-300">{movieDetails.description}</p>
//   </div>
// </div>
```

- [ ] Criar `src/features/movies/home/components/cardCommentDetail.tsx`

CSS pronto:

```tsx
// Props: { comment: MovieComment }
//
// <div className="flex gap-3 p-4 border rounded-xl border-zinc-800 bg-zinc-900/50">
//   <div className="flex items-center justify-center w-10 h-10 font-bold rounded-full shrink-0 bg-red-600/20 text-red-400">
//     {comment.userName.charAt(0).toUpperCase()}
//   </div>
//   <div>
//     <p className="text-sm font-semibold">{comment.userName}</p>
//     <p className="mt-1 text-sm text-zinc-300">{comment.comment}</p>
//   </div>
// </div>
```

- [ ] Criar `src/features/movies/home/components/cardContainerComment.tsx`

CSS pronto:

```tsx
// Props: { comments: MovieComment[] }
//
// <section className="mt-8 space-y-4">
//   <h2 className="text-xl font-semibold">Comments ({comments.length})</h2>
//   {comments.length === 0
//     ? <p className="text-zinc-400">No comments yet. Be the first!</p>
//     : comments.map((c) => <CardCommentDetail key={c.id} comment={c} />)
//   }
// </section>
```

---

## 5.5 — Pagina de detalhes

- [ ] Criar `src/pages/movie-detail/index.tsx`

```ts
// Essa e a pagina mais complexa. Ela junta tudo:
//
// 1. LER movieId DA URL:
//    const [params] = useSearchParams()
//    const movieId = Number(params.get('movieId'))
//
// 2. BUSCAR DETALHES:
//    const { data: movieDetails, isLoading, isError } = useQuery({
//      queryKey: ['detailsMovie', movieId],
//      queryFn: () => getMovieDetails(movieId),
//      enabled: !!movieId,   // <-- so busca se movieId for valido
//    })
//
// 3. BUSCAR COMENTARIOS:
//    const { data: comments = [] } = useQuery({
//      queryKey: ['commentsMovie', movieId],
//      queryFn: () => getCommentsMovieById(movieId),
//      enabled: !!movieId,
//    })
//
// 4. HOOKS DE ACAO:
//    const { register, errors, isSubmitting, onSubmit } = useCommentForm(movieId)
//    const { handleRate, isRating } = useRateMovie(movieId)
//
// 5. ESTADO DA NOTA SELECIONADA:
//    const [selectedRate, setSelectedRate] = useState(0)
//    // Quando clica na estrela:
//    function onRate(rate: number) {
//      setSelectedRate(rate)
//      handleRate(rate)
//    }
//
//    // DICA: se quiser desabilitar as estrelas enquanto envia, passe isRating pro RateStars
//    // e use disabled={isRating} nos botoes de estrela
//
// 6. RENDERIZAR (dentro do return):
//    if (isLoading) return <Loading />
//    if (isError || !movieDetails) return <ErrorMessage message="Movie not found" />
//
//    <CardMovieDetails movieDetails={movieDetails} />
//    <RateStars currentRate={selectedRate} onRate={onRate} />
//    <CommentForm register={register} errors={errors} isSubmitting={isSubmitting} onSubmit={onSubmit} />
//    <CardContainerComment comments={comments} />
//
// DICA: Envolva tudo num <div className="space-y-6"> pra ter espaco entre as secoes
//
// IMPORTANTE: voce vai precisar dos componentes <Loading /> e <ErrorMessage /> aqui.
// Se ainda nao criou, crie agora em shared/ui/ (olhe a Parte 11.1 pra ver o codigo).
// Ou, se preferir, use <p>Loading...</p> por enquanto e troque depois na Parte 11.
```

---

## 5.6 — Fazer card do filme ser clicavel

- [ ] Editar `src/features/movies/home/components/cardMovie.tsx`

```ts
// O que mudar:
// 1. Importar useNavigate de 'react-router-dom'
// 2. Dentro do componente: const navigate = useNavigate()
// 3. Adicionar onClick no <li>: onClick={() => navigate(`/movies/details?movieId=${movie.id}`)}
// 4. Adicionar className "cursor-pointer" no <li>
//
// IMPORTANTE: use useNavigate, NAO window.location.href
// window.location recarrega a pagina toda (perde estado da store, mais lento)
// useNavigate faz navegacao SPA (instantanea, mantem estado)
```

---

## 5.7 — Registrar rota

- [ ] Adicionar no router dentro do bloco `/movies`: `{ path: 'details', element: <MoviesDetailPage /> }`

---

### CRITERIO DE SUCESSO — PARTE 5

- [ ] Clicar num card de filme na home leva pra pagina de detalhes
- [ ] Pagina de detalhes mostra: poster, titulo, generos, nota media, descricao
- [ ] Se o filme nao tiver nota ainda, mostra 0.0
- [ ] Clicar nas estrelas envia a nota e a nota media atualiza (sem recarregar)
- [ ] Digitar um comentario e clicar "Send" adiciona o comentario na lista (sem recarregar)
- [ ] O campo de comentario limpa apos enviar
- [ ] Se nao tiver comentarios, mostra "No comments yet. Be the first!"
- [ ] A letra inicial do nome do usuario aparece no avatar do comentario
- [ ] Acessar `/movies/details` sem movieId mostra mensagem de erro (nao quebra)
- [ ] `npx tsc --noEmit` roda sem erros

---

# PARTE 6 — EDICAO DE FILME

---

## 6.1 — API de edicao (feature)

- [ ] Editar `src/features/movies/api/movie.ts`

```ts
// Adicionar na mesma feature/api de movies:
//
// export type UpdateMovieDTO = {
//   title?: string
//   description?: string
//   imageUrl?: string
// }
//
// export async function updateMovie(id: number, dto: UpdateMovieDTO): Promise<void> {
//   await http.put(`/movie/updater/${id}`, dto)
// }
```

---

## 6.2 — Schema, hook e componente

- [ ] Criar `src/features/movies/edit/schema/editSchema.ts`

```ts
// Mesmos campos do registerSchema, mas com valores minimos mais brandos:
// title: z.string().min(1)
// description: z.string().min(1)
// imageUrl: z.string()
//
// NAO use .optional() — o formulario de edicao vem preenchido,
// entao todos os campos sempre terao valor
```

- [ ] Criar `src/features/movies/edit/hooks/useMovieEditForm.ts`

```ts
// Esse hook e diferente dos outros porque precisa PRE-PREENCHER o form:
//
// export function useMovieEditForm(movieId: number) {
//   const navigate = useNavigate()
//
//   // 1. Buscar dados atuais do filme:
//   const { data: movie } = useQuery({
//     queryKey: ['detailsMovie', movieId],
//     queryFn: () => getMovieDetails(movieId),
//     enabled: !!movieId,
//   })
//
//   // 2. useForm COM defaultValues que vem dos dados buscados:
//   const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting } } = useForm({
//     resolver: zodResolver(editSchema),
//   })
//   // IMPORTANTE: desestruturar o setError tambem! Sem ele o try/catch nao funciona
//
//   // 3. Quando os dados chegam, preencher o form:
//   useEffect(() => {
//     if (movie) {
//       reset({ title: movie.title, description: movie.description, imageUrl: movie.imageUrl })
//     }
//   }, [movie, reset])
//
//   // 4. No submit: chamar updateMovie (com try/catch igual aos outros hooks!)
//   const onSubmit = handleSubmit(async (values) => {
//     try {
//       await updateMovie(movieId, values)
//       navigate(`/movies/details?movieId=${movieId}`)
//     } catch (err: any) {
//       setError('root', {
//         type: 'server',
//         message: 'Something went wrong. Please try again.',
//       })
//     }
//   })
//
//   return { register, errors, isSubmitting, onSubmit, isLoading: !movie }
// }
//
// O reset() do useForm atualiza os defaultValues depois que os dados chegam.
// Pesquise: "react hook form reset" na documentacao
```

- [ ] Criar componente em `src/features/movies/edit/components/editForm.tsx`
  - Copie o `registerForm.tsx` de movies/register
  - Mude o botao de "Create movie" pra "Save changes"
  - Mude o botao de "Creating..." pra "Saving..."

---

## 6.3 — Pagina e rota

- [ ] Criar `src/pages/movie-edit/index.tsx`

```ts
// Mesmo padrao das outras pages:
// 1. Ler movieId da URL: Number(useSearchParams()[0].get('movieId'))
// 2. Chamar useMovieEditForm(movieId)
// 3. Se isLoading, mostrar <Loading />
// 4. Senao, renderizar <EditForm> com as props
```

- [ ] Registrar rota: `{ path: 'edit', element: <MovieEditPage /> }`

- [ ] Editar `src/pages/movie-detail/index.tsx` — adicionar botao "Edit" ao lado do titulo

```tsx
// CSS do botao de edit (adicione na pagina de detalhes, ao lado do titulo):
// <NavLink to={`/movies/edit?movieId=${movieDetails.id}`}
//   className="px-4 py-2 text-sm font-semibold transition border rounded border-white/20 bg-white/5 hover:bg-white/10">
//   Edit
// </NavLink>
```

---

### CRITERIO DE SUCESSO — PARTE 6

- [ ] Na pagina de detalhes, clicar "Edit" leva pra pagina de edicao
- [ ] O formulario ja vem preenchido com titulo, descricao e imagem do filme
- [ ] Alterar o titulo e salvar atualiza o filme (volta pra detalhes com dados novos)
- [ ] Se o movieId nao existir, mostra loading ou erro (nao quebra)
- [ ] `npx tsc --noEmit` roda sem erros

---

# PARTE 7 — HOME COM CARROSEIS POR GENERO

---

## 7.1 — Melhorar a home page

A home atual mostra todos os filmes num carousel so.
A Netflix mostra carroseis separados por genero ("Action", "Comedy", etc).

- [ ] Criar `src/features/movies/home/components/genreRow.tsx`

```ts
// POR QUE precisa de um componente separado?
// Voce NAO pode chamar useQuery dentro de um .map()
// Hooks do React so funcionam no TOPO do componente, nunca dentro de loops
//
// SOLUCAO: criar um componente que recebe o genero e faz o useQuery internamente
//
// function GenreRow({ genre }: { genre: Genres }) {
//   const { data: movies = [], isLoading } = useQuery({
//     queryKey: ['movies', genre.name],
//     queryFn: () => getMoviesByGenre(genre.name),
//   })
//   if (isLoading) return null        // nao mostra nada enquanto carrega
//   if (movies.length === 0) return null  // nao mostra generos vazios
//   return <CardContainerCarouselMovies title={genre.name} movies={movies} />
// }
```

- [ ] Editar `src/pages/movies-home/index.tsx`

```ts
// 1. Buscar todos os generos:
//    const { data: genres = [], isLoading } = useQuery({ queryKey: ['genres'], queryFn: getAllGenres })
//
// 2. Renderizar:
//    if (isLoading) return <Loading />
//    return (
//      <div className="space-y-8 py-8">
//        {genres.map((genre) => (
//          <GenreRow key={genre.id} genre={genre} />
//        ))}
//      </div>
//    )
//
// RESULTADO: cada genero que tiver filmes vai mostrar um carousel separado
// Generos sem filmes nao aparecem (o GenreRow retorna null)
```

---

### CRITERIO DE SUCESSO — PARTE 7

- [ ] Home mostra varios carroseis, um pra cada genero
- [ ] Cada carousel tem o nome do genero como titulo
- [ ] Generos sem filmes nao aparecem
- [ ] Os carroseis rolam horizontalmente com os botoes de seta
- [ ] `npx tsc --noEmit` roda sem erros

---

# PARTE 8 — MODULO COMPLETO DE SERIES

---

> **DICA IMPORTANTE:** Se voce fez movies direitinho, series e **copiar e trocar nomes**.
> Movie → Serie, movie → serie, movieId → serieId. A estrutura e identica.

## 8.1 — Entidade `serie`

- [ ] Criar `src/entities/serie/model/serie.ts`

```ts
// Tipo Serie: {
//   id: string
//   title: string
//   description: string
//   imageUrl: string
//   genre: string
//   createdAt: string
// }
// Mesmo formato de Movie — copie de entities/movie/model/movie.ts
```

- [ ] Criar `src/entities/serie/api/serie.ts`

```ts
// Funcoes GET (copie o padrao de entities/movie/api/movie.ts):
// - getSeries() → GET /serie/list → retorna Serie[]
// - getSeriesByTitle(title: string) → GET /serie/title?title=... → retorna Serie[]
// - getSerieCommentsRate(serieId: number) → GET /serie/comments-rate?serieId=...
//   → retorna { rate: number, comments: string[] }
```

---

## 8.2 — Feature de series (POST)

- [ ] Criar `src/features/series/api/serie.ts`

```ts
// Copie features/movies/api/movie.ts e troque:
// - RegisterMovieDTO → RegisterSerieDTO
// - registerMovie → registerSerie
// - /movie/register → /serie/register
```

- [ ] Criar schema em `src/features/series/register/schema/registerSchema.ts`
  - Copie de features/movies/register/schema/registerSchema.ts

- [ ] Criar hook em `src/features/series/register/hooks/serieRegisterForm.ts`
  - Copie o movieRegisterForm.ts, troque a API e o redirect pra `/series`

- [ ] Criar componente em `src/features/series/register/components/registerForm.tsx`
  - Copie o registerForm.tsx de movies, troque "Movie" por "Serie"

---

## 8.3 — Componentes de series

- [ ] Criar `src/features/series/home/components/cardSerie.tsx`
  - Copie `cardMovie.tsx`, troque Movie por Serie e o navigate pra `/series/details?serieId=...`

- [ ] Criar `src/features/series/home/components/cardContainerCarouselSeries.tsx`
  - Copie o carousel de movies, troque CardMovie por CardSerie e o tipo pra Serie

---

## 8.4 — Comentarios e notas pra series

- [ ] Editar `src/features/comments/api/comment.ts`

```ts
// Adicionar:
// export type CommentSerieBody = { userId: number, serieId: number, comment: string }
// export async function commentSerie(data: CommentSerieBody): Promise<void> {
//   await http.post('/comment/serie', data)
// }
```

- [ ] Editar `src/features/rates/api/rate.ts`

```ts
// Adicionar:
// export type RateSerieBody = { userId: number, serieId: number, rate: number }
// export async function rateSerie(data: RateSerieBody): Promise<void> {
//   await http.post('/rate/serie', data)
// }
```

- [ ] Criar `src/features/comments/hooks/useCommentSerie.ts`
  - Copie `useCommentForm.ts`, troque movieId por serieId e `commentMovie` por `commentSerie`
  - Troque a queryKey de `['commentsMovie', movieId]` pra `['commentsSerie', serieId]`
- [ ] Criar `src/features/rates/hooks/useRateSerie.ts`
  - Copie `useRateMovie.ts`, troque movieId por serieId e `rateMovie` por `rateSerie`
  - Troque a queryKey de `['detailsMovie', movieId]` pra `['detailsSerie', serieId]`

---

## 8.5 — Paginas de series

- [ ] Criar `src/pages/series-home/index.tsx`
  - **ATENCAO**: diferente de movies-home, o backend NAO tem rota pra buscar series por genero.
  - Entao nao da pra fazer carroseis por genero. Em vez disso, busque TODAS as series
  - com `getSeries()` e mostre num carousel unico (ou grid).
  - Use o mesmo padrao da movies-home ANTES da melhoria da Parte 7 (um carousel so com tudo).
- [ ] Criar `src/pages/series-list/index.tsx` — copie movies-list, troque as APIs
  - Series so tem busca por titulo (nao tem filtro por genero)
  - Remova a logica de genre do queryFn
- [ ] Criar `src/pages/series-register/index.tsx` — copie movies-register
- [ ] Criar `src/pages/serie-detail/index.tsx` — baseie-se em movie-detail, mas **CUIDADO**:
  - A rota `GET /serie/comments-rate` retorna `{ rate: number, comments: string[] }`
  - Os comments sao **strings simples** (nao objetos com id/userName como em movies)
  - Entao voce NAO pode usar o CardCommentDetail de movies direto (ele espera userName)
  - Crie um componente simples que so mostra a string do comentario
  - Ou crie um tipo diferente: `type SerieComment = string` e adapte o container

---

## 8.6 — Rotas de series

- [ ] Editar `src/app/router/router.tsx` — adicionar bloco de rotas de series:

```ts
// {
//   path: '/series',
//   element: <PrivateLayout />,
//   children: [
//     { index: true, element: <SeriesHomePage /> },
//     { path: 'list', element: <SeriesListPage /> },
//     { path: 'register', element: <SeriesRegisterPage /> },
//     { path: 'details', element: <SerieDetailPage /> },
//   ],
// }
//
// Coloque esse bloco no mesmo nivel do bloco /movies no array de rotas.
```

---

## 8.7 — Atualizar navbar

- [ ] Editar `src/widgets/navbar/navbar.tsx` — adicionar link pra series

```tsx
// Adicionar no navbar, do lado do select de generos:
// <NavLink to="/series"
//   className="px-4 py-2 text-sm font-semibold transition border rounded border-white/20 bg-white/5 hover:bg-white/10">
//   Series
// </NavLink>
```

---

### CRITERIO DE SUCESSO — PARTE 8

- [ ] Acessar `/series` mostra carroseis de series (ou mensagem se nao tiver nenhuma)
- [ ] Cadastrar serie em `/series/register` funciona
- [ ] Buscar serie por titulo funciona em `/series/list?title=...`
- [ ] Clicar numa serie leva pra pagina de detalhes
- [ ] Comentar e avaliar serie funciona (igual filme)
- [ ] Navbar tem link pra series
- [ ] Toda a estrutura de pastas segue o mesmo padrao de movies
- [ ] `npx tsc --noEmit` roda sem erros

> **Obs:** O backend NAO tem rota de editar serie (PUT). Entao nao precisa criar tela de edicao pra series.

---

# PARTE 9 — GENEROS (ADMIN)

---

## 9.1 — Feature de cadastro de genero

- [ ] Criar `src/features/genres/api/genre.ts`

```ts
// Funcoes POST:
// - registerGenre(dto: { name: string, description: string }) → POST /genre/register
// - registerGenreMovie(dto: { genreId: number[], movieId: number }) → POST /genreMovie/register
//
// O registerGenreMovie associa generos a um filme.
// Recebe um ARRAY de genreId — permite associar varios generos de uma vez.
//
// ONDE USAR registerGenreMovie:
// No formulario de cadastro de filme (features/movies/register), apos criar o filme.
// O fluxo seria: 1) cadastrar filme → pegar o ID retornado → 2) chamar registerGenreMovie
// com o ID do filme e os IDs dos generos selecionados.
// MAS: o backend atual nao retorna o ID do filme no POST /movie/register.
// Entao por enquanto, so crie a funcao. Ela pode ser usada no futuro quando o backend evoluir.
```

- [ ] Criar schema em `src/features/genres/register/schema/genreSchema.ts`

```ts
// Campos: name (string, min 2), description (string, min 2)
```

- [ ] Criar hook em `src/features/genres/register/hooks/useGenreRegisterForm.ts`
  - Mesmo padrao dos outros hooks
  - No sucesso: invalidar query `['genres']` e mostrar mensagem de sucesso

- [ ] Criar componente em `src/features/genres/register/components/genreRegisterForm.tsx`
  - Dois campos: name e description
  - Seguir o padrao visual dos outros formularios

---

## 9.2 — Pagina e rota

- [ ] Criar `src/pages/genre-register/index.tsx`
- [ ] Adicionar rota no bloco `/movies`: `{ path: 'genres', element: <GenreRegisterPage /> }`
- [ ] Adicionar link na navbar pra `/movies/genres` (pode ser um botao pequeno)

---

### CRITERIO DE SUCESSO — PARTE 9

- [ ] Acessar `/movies/genres` mostra formulario de cadastro de genero
- [ ] Cadastrar genero novo funciona
- [ ] Apos cadastrar, o genero aparece no select da navbar e no form de cadastro de filme
- [ ] `npx tsc --noEmit` roda sem erros

---

# PARTE 10 — PERFIL DO USUARIO

---

## 10.1 — Pagina de perfil

- [ ] Criar `src/pages/profile/index.tsx`

```ts
// Essa pagina nao precisa de feature, hook ou API
// Os dados vem direto da store:
//   const user = useAuthStore((s) => s.user)
//   const logout = useAuthStore((s) => s.logout)
//   const navigate = useNavigate()
//
// Na funcao de logout:
//   function handleLogout() {
//     logout()           // limpa a store
//     navigate('/login') // redireciona pro login
//   }
```

CSS pronto:

```tsx
// <div className="max-w-md mx-auto mt-16 space-y-6">
//   <div className="p-8 text-center border rounded-2xl border-zinc-800 bg-zinc-950/60">
//     <div className="flex items-center justify-center w-20 h-20 mx-auto text-3xl font-bold rounded-full bg-red-600/20 text-red-400">
//       {user?.name.charAt(0).toUpperCase()}
//     </div>
//     <h1 className="mt-4 text-2xl font-bold">{user?.name}</h1>
//     <p className="mt-1 text-zinc-400">{user?.email}</p>
//     <button onClick={handleLogout}
//       className="px-6 py-2 mt-6 text-sm font-semibold text-white transition bg-red-600 rounded-lg hover:bg-red-700">
//       Logout
//     </button>
//   </div>
// </div>
```

---

## 10.2 — Registrar rota

- [ ] Adicionar a rota no router. **ATENCAO:** `/profile` nao e filho de `/movies`.
  - Crie um novo bloco privado no router:

```ts
// {
//   path: '/profile',
//   element: <PrivateLayout />,
//   children: [
//     { index: true, element: <ProfilePage /> },
//   ],
// }
//
// Coloque esse bloco NO MESMO NIVEL que o bloco /movies e /series no array de rotas.
// Assim /profile usa o mesmo layout (navbar, fundo escuro, protecao de token).
```

---

### CRITERIO DE SUCESSO — PARTE 10

- [ ] Clicar no icone de usuario na navbar leva pra `/profile`
- [ ] Pagina mostra nome e email do usuario logado
- [ ] Letra inicial do nome aparece no avatar circular
- [ ] Clicar "Logout" limpa a sessao e redireciona pra `/login`
- [ ] Apos logout, acessar `/movies` redireciona pra `/login`
- [ ] Apos logout, a pagina de login funciona normalmente (nao fica em loop)
- [ ] `npx tsc --noEmit` roda sem erros

---

# PARTE 11 — MELHORIAS FINAIS

---

## 11.1 — Componentes reutilizaveis de loading e erro

> **Se voce seguiu a dica da Parte 5 e ja criou esses componentes, pule este passo.**
> Eles foram sugeridos la porque a pagina de detalhes precisa deles.

- [ ] Criar `src/shared/ui/loading.tsx` (se ainda nao criou)

```tsx
// export function Loading() {
//   return (
//     <div className="flex items-center justify-center py-12">
//       <div className="w-8 h-8 border-2 rounded-full border-zinc-600 border-t-red-600 animate-spin" />
//     </div>
//   )
// }
```

- [ ] Criar `src/shared/ui/errorMessage.tsx` (se ainda nao criou)

```tsx
// export function ErrorMessage({ message = 'Something went wrong.' }: { message?: string }) {
//   return (
//     <div className="p-4 text-sm text-red-400 border rounded-lg border-red-600/20 bg-red-600/10">
//       {message}
//     </div>
//   )
// }
```

- [ ] Substituir em **todas as paginas** os `<p>Loading...</p>` por `<Loading />`
- [ ] Substituir em **todas as paginas** os `<p>Not Found...</p>` por `<ErrorMessage />`

---

## 11.2 — Imagem fallback

- [ ] Mover o base64 gigante de `cardMovie.tsx` pra uma constante em `src/shared/constants/images.ts`

```ts
// export const PLACEHOLDER_IMAGE = '/placeholder.png'
// Ou use uma URL: 'https://placehold.co/400x600/1a1a2e/e5e5e5?text=No+Image'
//
// Depois importe e use nos cards: src={movie.imageUrl || PLACEHOLDER_IMAGE}
```

---

## 11.3 — Barrel exports (opcional, melhoria de organizacao)

- [ ] Criar `index.ts` na raiz de cada modulo de entities

```ts
// Exemplo: entities/movie/index.ts
// export * from './model/movie'
// export * from './api/movie'
//
// Assim o import fica mais limpo:
// import { Movie, getMovies } from '@/entities/movie'
// em vez de:
// import { Movie } from '@/entities/movie/model/movie'
// import { getMovies } from '@/entities/movie/api/movie'
```

---

## 11.4 — Padronizar idioma

- [ ] Escolher **um idioma** (ingles ou portugues) e padronizar todos os textos
  - Procure por: "Loading", "Not Found", "No movies", "Carregando", etc.
  - Padronize tudo pro mesmo idioma

---

### CRITERIO DE SUCESSO — PARTE 11

- [ ] Todas as paginas usam `<Loading />` e `<ErrorMessage />` em vez de texto solto
- [ ] Nenhum card de filme tem base64 gigante no codigo
- [ ] Todos os textos da interface estao no mesmo idioma
- [ ] `npx tsc --noEmit` roda sem erros

---

# CRITERIO DE SUCESSO FINAL — SITE COMPLETO

Quando tudo estiver pronto, teste esse checklist de ponta a ponta:

### Fluxo de usuario novo
- [ ] Acessar `/` mostra landing page
- [ ] Clicar "Get Started" → formulario de registro
- [ ] Registrar com nome, email e senha → redireciona pro login
- [ ] Fazer login → redireciona pra home de filmes

### Navegacao
- [ ] Home mostra carroseis de filmes por genero
- [ ] Navbar tem: logo, select de generos, campo de busca, icone de usuario
- [ ] Buscar por titulo funciona (com debounce)
- [ ] Filtrar por genero funciona
- [ ] Clicar num filme leva pra detalhes

### Detalhes do filme
- [ ] Mostra poster, titulo, generos, nota media, descricao
- [ ] Dar nota com estrelas funciona e atualiza a nota media
- [ ] Escrever e enviar comentario funciona e aparece na lista
- [ ] Botao "Edit" leva pro formulario de edicao
- [ ] Editar e salvar atualiza o filme

### Cadastro
- [ ] Cadastrar filme funciona (com select de genero)
- [ ] Cadastrar serie funciona
- [ ] Cadastrar genero funciona
- [ ] Novos generos aparecem nos selects

### Series
- [ ] Home de series mostra carroseis
- [ ] Detalhes da serie mostra info + nota + comentarios
- [ ] Comentar e avaliar serie funciona

### Perfil
- [ ] Pagina de perfil mostra nome e email
- [ ] Logout funciona e redireciona pro login
- [ ] Apos logout, rotas privadas redirecionam pro login

### Qualidade
- [ ] `npx tsc --noEmit` roda sem erros
- [ ] Nenhum `console.log` esquecido no codigo
- [ ] Nenhum `any` desnecessario no TypeScript
- [ ] Todos os textos no mesmo idioma
- [ ] Toda navegacao usa `useNavigate` ou `NavLink` (nenhum `window.location.href`)
- [ ] Todo POST usa `features/`, todo GET usa `entities/`
- [ ] Nenhuma feature importa de outra feature
- [ ] Nenhuma entity importa de feature

---

# ORDEM SUGERIDA

| # | O que | Parte | Dificuldade |
|---|-------|-------|-------------|
| 1 | Entidades user + session | 1.1 - 1.2 | Facil |
| 2 | Feature auth + pages login/register | 1.3 - 1.8 | Medio |
| 3 | Landing + layouts + navbar publica | 1.9 - 1.11 | Facil |
| 4 | Interceptor HTTP + rotas | 1.12 - 1.13 | Medio |
| 5 | Entidade genre + select no form | 2.1 - 2.2 | Facil |
| 6 | Navbar completa (busca + generos) | 3.1 | Medio |
| 7 | Busca e listagem (browse) | 4.1 - 4.4 | Medio |
| 8 | Detalhes do filme + comentarios + notas | 5.1 - 5.7 | Dificil |
| 9 | Edicao de filme | 6.1 - 6.3 | Medio |
| 10 | Home com carroseis por genero | 7.1 | Medio |
| 11 | Modulo de series completo | 8.1 - 8.7 | Medio |
| 12 | Cadastro de generos | 9.1 - 9.2 | Facil |
| 13 | Perfil do usuario | 10.1 - 10.2 | Facil |
| 14 | Melhorias finais | 11.1 - 11.4 | Facil |

---

# DICAS IMPORTANTES

1. **Olhe o codigo que ja existe**: Os dois fluxos prontos (GET listar + POST cadastrar) sao seu modelo
2. **GET → `entities/`, POST/PUT/DELETE → `features/`**: Regra mais importante do FSD nesse projeto
3. **Page NAO tem logica**: Ela so importa hooks e componentes. Quem trabalha e a feature
4. **Teste cada passo**: Roda o app e testa no navegador. Nao acumule mudancas
5. **Commit sempre**: `git add .` + `git commit -m "feat: descricao"` apos cada parte
6. **useNavigate > window.location.href**: Sempre use React Router pra navegar
7. **useMutation vs handleSubmit**: Se o POST tem formulario (useForm), use `handleSubmit + try/catch` (o useForm ja cuida do loading com `isSubmitting`). Se o POST NAO tem formulario (ex: clicar numa estrela), use `useMutation` do React Query (ele cuida do loading com `isPending`)
8. **invalidateQueries**: Apos um POST que muda dados, invalide a query pra atualizar a lista. No handleSubmit: chame `queryClient.invalidateQueries(...)` no try. No useMutation: coloque no `onSuccess`
9. **enabled: !!id**: Use em useQuery quando o parametro pode ser undefined/0/NaN
10. **Leia os erros do TypeScript**: Ele te diz exatamente o que ta faltando
11. **useAuthStore((s) => s.user)**: Pra pegar o usuario logado em qualquer componente
12. **useAuthStore.getState()**: Pra pegar o estado FORA de componente React (interceptors, etc)
13. **Token expira rapido**: O JWT do backend expira em 1 minuto. Se tomar 401, faz login de novo

---

# ERROS COMUNS E COMO RESOLVER

| Erro | Causa | Solucao |
|------|-------|---------|
| 401 Unauthorized do nada | Token JWT expirou (1 min) | Faca login de novo |
| Token nao ta sendo enviado | Interceptor nao foi importado | Adicione `import '@/app/api/http'` no main.tsx |
| Tela branca ao acessar rota | Rota nao registrada no router | Confira o router.tsx |
| useQuery nao busca dados | Falta `enabled: !!id` ou id e NaN | Confira o `enabled` e o `Number()` |
| Dados nao atualizam apos POST | Falta `invalidateQueries` | Adicione no onSuccess do hook |
| Hooks error: rendered more hooks | useQuery dentro de .map() ou if | Mova pro topo do componente ou crie um componente separado |
| Cannot read property of null | Tentando acessar user antes do login | Use optional chaining: `user?.name` |
| Login funciona mas redireciona pro login de volta | Store nao persistiu | Confira o persist do Zustand e o nome do storage |

---

# DOCUMENTACOES

- **React Query**: https://tanstack.com/query/latest
- **React Hook Form**: https://react-hook-form.com
- **Zod**: https://zod.dev
- **Zustand**: https://zustand.docs.pmnd.rs
- **React Router**: https://reactrouter.com
- **Axios**: https://axios-http.com
- **Feature Sliced Design**: https://feature-sliced.design
- **Tailwind CSS**: https://tailwindcss.com
