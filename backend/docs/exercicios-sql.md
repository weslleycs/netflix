# Exercicios de SQL - WFlix

Banco de dados com: 15 usuarios, 15 generos, 42 filmes, 40 series, seasons, avaliacoes e comentarios.

> Execute `seed.sql` antes de comecar.

---

## Nivel 1 - Basico+

### 1.1 - Listar todos os filmes ordenados por titulo
```sql
-- Retorne id, titulo e descricao de todos os filmes em ordem alfabetica
select m.id, m.title, m.description  from wflix.movies m
order by title asc
```

### 1.2 - Contar quantos usuarios existem
```sql
-- Retorne a quantidade total de usuarios cadastrados
select count(*)
from users
```

### 1.3 - Listar series que contem a palavra "the" no titulo
```sql
-- Use LIKE para filtrar
select s.title  from wflix.series s 
where s.title like "%the%"
```

### 1.4 - Buscar filmes cadastrados por um usuario especifico
```sql
-- Liste os filmes do usuario com id = 1 (nome e titulo do filme)
select * from movies m 
WHERE m.userId = 1
```

### 1.5 - Listar generos em ordem alfabetica com seus IDs
```sql
-- Retorne id e nome de todos os generos ordenados por nome
select g.id, g.name  from genres g 
order by g.name asc

```

### 1.6 - Contar quantos filmes cada usuario cadastrou
```sql
-- Retorne o nome do usuario e a quantidade de filmes. Use GROUP BY
select count(*), m.userId  
from movies m 
group by  m.userId
```

### 1.7 - Listar todas as series que tem mais de 3 temporadas
```sql
-- Use a tabela seasons, agrupe por serie e filtre com HAVING
select count(*), s.seriesId 
from seasons s 
group by s.seriesId 
HAVING COUNT(*) > 3
```

### 1.8 - Buscar todos os usuarios com email do dominio "@email.com"
```sql
-- Use LIKE para filtrar pelo email
```

### 1.9 - Listar os 10 filmes mais recentes (por data de cadastro)
```sql
-- Use ORDER BY createdAt DESC e LIMIT
SELECT * 
from movies m
order by m.createdAt desc
limit 10
```

### 1.10 - Contar quantas series cada usuario cadastrou
```sql
-- Retorne nome do usuario e total de series. Use GROUP BY
select count(*) as "Temporadas",s.userId
from series s
group by s.userId
```

### 1.11 - Listar todos os comentarios de filmes (sem JOIN, so a tabela coments)
```sql
-- Filtre onde movieId nao e NULL
-- Ordene por createdAt DESC
select c.movieId,c.coment 
from coments c 
where c.movieId is not null
order by c.createdAt DESC 

```

### 1.12 - Buscar filmes que tem descricao contendo a palavra "guerra"
```sql
-- Use LIKE na coluna description
select m.description 
from movies m 
where m.description like "%guerra%"
```

### 1.13 - Listar as avaliacoes com nota maxima (10)
```sql
-- Filtre rate = 10 e retorne todas as colunas
select *
from rates r 
where r.rate =10
```

### 1.14 - Contar quantos generos existem no sistema
```sql
-- Use COUNT(*)
select count(*)
from genres 
```

### 1.15 - Listar series ordenadas por titulo de Z a A
```sql
-- Use ORDER BY ... DESC
select *
from series s
order by s.title desc
```

---

## Nivel 2 - Intermediario

### 2.1 - Listar filmes com seus generos
```sql
-- Faca JOIN entre movies, movies_genres e genres
-- Retorne titulo do filme e nome do genero
select m.title,mg.genreId,g.name 
from movies m 
inner join movies_genres mg 
inner join genres g 
```


### 2.2 - Qual a media de avaliacao de cada filme?
```sql
-- Use AVG() e GROUP BY. Retorne titulo e media, ordenado pela maior media
select avg(r.rate) as "Avaliaçao"
from rates r
```

### 2.3 - Quais filmes tem avaliacao media acima de 9?
```sql
-- Use HAVING com AVG()
select r.movieId, avg( r.rate )
from rates r 
group by r.movieId 
HAVING avg(r.rate) > 9
```

### 2.4 - Top 5 filmes mais comentados
```sql
-- Use COUNT() nos comentarios, GROUP BY no filme, ORDER BY DESC e LIMIT 5
select count(c.coment ) AS total_comments, c.movieId
from coments c 
group by c.movieId 
order by total_comments
limit 5
```

### 2.5 - Listar series com a quantidade de temporadas e total de episodios
```sql
-- Use COUNT() para temporadas e SUM() para episodios
-- JOIN entre series e seasons
SELECT S.title, COUNT(S2.id) AS total_temporadas,SUM(S2.episodes) AS total_episodios
FROM seasons S2
INNER JOIN series S ON S.id = S2.seriesId
GROUP BY S.title;
```

### 2.6 - Usuarios que nunca fizeram um comentario
```sql
-- Use LEFT JOIN entre users e coments, filtre onde coment e NULL
SELECT c.coment 
from users u 
left join coments c on u.id = c.userId 
```

### 2.7 - Listar filmes que pertencem ao genero "Acao"
```sql
-- JOIN triplo: movies -> movies_genres -> genres
-- Filtre pelo nome do genero
select m.title,g.name 
from movies m 
inner join movies_genres mg on m.id = mg.movieId
inner join genres g  on mg.genreId = g.id
where g.name = "acao"
```

### 2.8 - Quantos filmes existem por genero?
```sql
-- Retorne nome do genero e quantidade de filmes, ordenado do maior pro menor
```

### 2.9 - Listar os comentarios de um filme especifico com o nome de quem comentou
```sql
-- JOIN entre coments, users e movies
-- Filtre por movieId = 1
```

### 2.10 - Qual usuario deu mais avaliacoes (filmes + series somados)?
```sql
-- Use COUNT() e GROUP BY userId na tabela rates
-- Retorne nome do usuario e total de avaliacoes
```

### 2.11 - Listar series com seus generos
```sql
-- JOIN entre series, series_genres e genres
-- Retorne titulo da serie e nome do genero
-- Ordene por titulo da serie
```

### 2.12 - Qual a menor e a maior nota dada para cada serie?
```sql
-- Use MIN() e MAX() com GROUP BY
-- Retorne titulo, menor nota e maior nota
```

### 2.13 - Listar filmes que NAO tem nenhuma avaliacao
```sql
-- Use LEFT JOIN entre movies e rates
-- Filtre onde rate e NULL
```

### 2.14 - Top 3 usuarios que mais comentaram
```sql
-- Use COUNT() na tabela coments, GROUP BY userId
-- JOIN com users para pegar o nome
-- LIMIT 3
```

### 2.15 - Listar todas as temporadas de uma serie especifica
```sql
-- JOIN entre seasons e series
-- Filtre por seriesId = 1 (Breaking Bad)
-- Retorne nome da serie, numero da temporada e quantidade de episodios
```

### 2.16 - Quantas series existem por genero?
```sql
-- Mesmo conceito do 2.8 mas para series
-- Retorne nome do genero e quantidade de series
```

### 2.17 - Listar filmes com a quantidade de avaliacoes que receberam
```sql
-- Use COUNT() com LEFT JOIN entre movies e rates
-- Ordene do mais avaliado para o menos
```

### 2.18 - Buscar todos os comentarios de series com nome do usuario e titulo da serie
```sql
-- JOIN triplo: coments -> users -> series
-- Filtre onde serieId nao e NULL
-- Ordene por titulo da serie
```

### 2.19 - Qual e a nota media geral de todos os filmes? E de todas as series?
```sql
-- Duas queries separadas usando AVG()
-- Uma filtrando movieId IS NOT NULL
-- Outra filtrando serieId IS NOT NULL
```

### 2.20 - Listar series que tem exatamente 1 temporada
```sql
-- Use COUNT() em seasons agrupado por serie
-- Filtre com HAVING COUNT() = 1
```

### 2.21 - Filmes cadastrados por usuarios cujo nome comeca com a letra "J"
```sql
-- JOIN entre movies e users
-- Use LIKE 'J%' no nome do usuario
```

### 2.22 - Qual genero tem mais series associadas?
```sql
-- JOIN entre genres e series_genres
-- GROUP BY genero, ORDER BY COUNT DESC, LIMIT 1
```

### 2.23 - Listar avaliacoes de filmes com nota entre 7 e 8
```sql
-- JOIN entre rates, movies e users
-- Use BETWEEN ou >= AND <=
-- Retorne nome do usuario, titulo do filme e nota
```

### 2.24 - Total de episodios por serie (ordenado do maior para o menor)
```sql
-- Use SUM(episodes) agrupado por serie
-- JOIN entre series e seasons
-- Retorne titulo e total de episodios
```

### 2.25 - Listar usuarios que cadastraram tanto filmes quanto series
```sql
-- Um usuario que aparece na tabela movies (como userId)
-- E tambem aparece na tabela series (como userId)
-- Retorne o nome do usuario
```

### 2.26 - Qual filme recebeu a maior nota? E qual recebeu a menor?
```sql
-- Duas queries: uma com MAX(rate) e outra com MIN(rate)
-- JOIN com movies para mostrar o titulo
```

### 2.27 - Contar quantos comentarios cada serie recebeu
```sql
-- LEFT JOIN entre series e coments
-- GROUP BY serie, ordene DESC
-- Inclua series com 0 comentarios
```

### 2.28 - Listar filmes do genero "Animacao" com suas notas medias
```sql
-- JOIN entre movies, movies_genres, genres e rates
-- Filtre por genero = 'Animacao'
-- Retorne titulo e media
```

### 2.29 - Qual usuario cadastrou mais conteudo (filmes + series somados)?
```sql
-- Conte filmes e series de cada usuario
-- Some os dois totais
-- Dica: pode usar subqueries ou UNION
```

### 2.30 - Series com media de avaliacao abaixo de 8
```sql
-- JOIN entre series e rates
-- Use AVG() e HAVING
-- Retorne titulo e media
```

---

## Nivel 3 - Intermediario Avancado

### 3.1 - Filmes que aparecem em mais de 2 generos, listando quais generos
```sql
-- Use GROUP_CONCAT() para listar os generos em uma unica linha
-- Filtre com HAVING COUNT() > 2
```

### 3.2 - Series com melhor avaliacao media (top 10)
```sql
-- JOIN entre series e rates
-- Use AVG(), agrupe por serie, ordene DESC, LIMIT 10
-- Mostre tambem quantas avaliacoes cada serie recebeu
```

### 3.3 - Usuarios que comentaram tanto em filmes quanto em series
```sql
-- Um usuario que tem pelo menos 1 comentario com movieId NOT NULL
-- E pelo menos 1 comentario com serieId NOT NULL
-- Dica: pode usar subqueries ou HAVING com COUNT condicional
```

### 3.4 - Ranking de usuarios por media de notas que deram
```sql
-- Quem e o usuario mais "generoso" (da notas altas) e quem e mais "critico"?
-- Retorne nome, media das notas e quantidade de avaliacoes
-- Ordene pela media DESC
```

### 3.5 - Filmes que nao receberam nenhum comentario
```sql
-- Use LEFT JOIN e filtre por NULL
```

### 3.6 - Generos mais populares (que aparecem em mais filmes + series somados)
```sql
-- Combine contagem de movies_genres e series_genres
-- Dica: pode usar UNION ALL com subqueries ou somar dois LEFT JOINs
```

### 3.7 - Para cada genero, qual e o filme com a melhor avaliacao media?
```sql
-- Precisa cruzar genres, movies_genres, movies e rates
-- Agrupe por genero e filme, calcule a media
-- Desafio: retorne apenas o melhor de cada genero
```

### 3.8 - Series que tem todas as temporadas com mais de 6 episodios
```sql
-- Use MIN(episodes) agrupado por serie
-- Filtre com HAVING MIN(episodes) > 6
```

### 3.9 - Listar usuarios com a quantidade de comentarios em filmes e em series separadamente
```sql
-- Use COUNT condicional com CASE WHEN ou SUM(IF(...))
-- Retorne: nome, qtd_comentarios_filmes, qtd_comentarios_series
```

### 3.10 - Meses com mais cadastros de filmes
```sql
-- Use MONTH() e YEAR() no createdAt
-- GROUP BY mes/ano, ordene por quantidade DESC
```

---

## Nivel 4 - Avancado

### 4.1 - Usuarios que avaliaram e comentaram o mesmo filme
```sql
-- Encontre usuarios que existem tanto em rates quanto em coments
-- para o mesmo movieId
-- Retorne nome do usuario, titulo do filme, nota e comentario
```

### 4.2 - Filmes recomendados: quem gostou de X tambem gostou de Y
```sql
-- Usuarios que deram nota >= 9 para o filme "Matrix" (id=4)
-- tambem deram nota >= 9 para quais outros filmes?
-- Retorne titulo e quantidade de usuarios em comum
```

### 4.3 - Generos favoritos de cada usuario (baseado nas avaliacoes)
```sql
-- Para cada usuario, qual genero ele mais avaliou?
-- Considere tanto filmes quanto series
-- Retorne nome do usuario, nome do genero e quantidade de avaliacoes naquele genero
```

### 4.4 - Series com nota media superior a media geral de todas as series
```sql
-- Primeiro calcule a media geral de rates para series
-- Depois filtre series com media acima desse valor
-- Use subquery
```

### 4.5 - Diferenca entre a maior e menor nota de cada filme
```sql
-- Retorne titulo, nota maxima, nota minima e a diferenca
-- Ordene pela maior diferenca (filmes mais "polemicos")
-- Inclua apenas filmes com 3+ avaliacoes
```

### 4.6 - Usuarios inativos: cadastrados mas sem nenhuma atividade
```sql
-- Usuarios que NAO tem: filmes cadastrados, series cadastradas,
-- avaliacoes ou comentarios
-- Use LEFT JOINs ou NOT EXISTS
```

### 4.7 - Ranking de filmes com posicao usando variavel ou window function
```sql
-- Crie um ranking dos filmes por avaliacao media
-- Retorne: posicao, titulo, media, total de avaliacoes
-- Use ROW_NUMBER() ou RANK()
```

### 4.8 - Percentual de avaliacoes por nota (distribuicao)
```sql
-- Quantos % das avaliacoes sao nota 10? Nota 9? Nota 8? etc.
-- Retorne: nota, quantidade, percentual do total
-- Use COUNT() com subquery ou window function para o total
```

### 4.9 - Top 3 filmes de cada genero por avaliacao media
```sql
-- Para cada genero, retorne os 3 filmes com melhor media
-- Use ROW_NUMBER() OVER (PARTITION BY genero ORDER BY media DESC)
-- Filtre onde posicao <= 3
```

### 4.10 - Criar uma view consolidada de catalogo
```sql
-- Crie uma VIEW que retorne para cada filme:
-- titulo, lista de generos (separados por virgula), media de avaliacao,
-- total de comentarios, nome de quem cadastrou
-- Faca o mesmo para series incluindo total de temporadas e episodios
```

---

## Desafios Extras

### D1 - Qual o par de usuarios com gostos mais parecidos?
```sql
-- Encontre dois usuarios que avaliaram os mesmos filmes
-- e tiveram a menor diferenca media entre suas notas
-- Dica: SELF JOIN na tabela rates
```

### D2 - Generos que nunca aparecem juntos no mesmo filme
```sql
-- Encontre pares de generos que nunca foram associados ao mesmo filme
-- Dica: CROSS JOIN entre generos e LEFT JOIN na combinacao
```

### D3 - Serie com maior "engajamento" (avaliacoes + comentarios por temporada)
```sql
-- Calcule (total_avaliacoes + total_comentarios) / numero_de_temporadas
-- Retorne as top 5 series mais engajadas por temporada
```

---

## Gabarito

<details>
<summary>1.1 - Listar todos os filmes ordenados por titulo</summary>

```sql
SELECT id, title, description FROM movies ORDER BY title;
```
</details>

<details>
<summary>1.2 - Contar quantos usuarios existem</summary>

```sql
SELECT COUNT(*) AS total_usuarios FROM users;
```
</details>

<details>
<summary>1.3 - Series com "the" no titulo</summary>

```sql
SELECT id, title FROM series WHERE title LIKE '%the%';
```
</details>

<details>
<summary>1.4 - Filmes do usuario 1</summary>

```sql
SELECT u.name, m.title
FROM movies m
JOIN users u ON u.id = m.userId
WHERE m.userId = 1;
```
</details>

<details>
<summary>1.5 - Generos em ordem alfabetica</summary>

```sql
SELECT id, name FROM genres ORDER BY name;
```
</details>

<details>
<summary>1.6 - Quantidade de filmes por usuario</summary>

```sql
SELECT u.name, COUNT(m.id) AS total_filmes
FROM users u
LEFT JOIN movies m ON m.userId = u.id
GROUP BY u.id, u.name
ORDER BY total_filmes DESC;
```
</details>

<details>
<summary>1.7 - Series com mais de 3 temporadas</summary>

```sql
SELECT s.title, COUNT(se.id) AS total_temporadas
FROM series s
JOIN seasons se ON se.seriesId = s.id
GROUP BY s.id, s.title
HAVING total_temporadas > 3
ORDER BY total_temporadas DESC;
```
</details>

<details>
<summary>1.8 - Usuarios com email @email.com</summary>

```sql
SELECT name, email FROM users WHERE email LIKE '%@email.com';
```
</details>

<details>
<summary>1.9 - 10 filmes mais recentes</summary>

```sql
SELECT id, title, createdAt FROM movies ORDER BY createdAt DESC LIMIT 10;
```
</details>

<details>
<summary>1.10 - Series por usuario</summary>

```sql
SELECT u.name, COUNT(s.id) AS total_series
FROM users u
LEFT JOIN series s ON s.userId = u.id
GROUP BY u.id, u.name
ORDER BY total_series DESC;
```
</details>

<details>
<summary>1.11 - Comentarios de filmes (sem JOIN)</summary>

```sql
SELECT * FROM coments WHERE movieId IS NOT NULL ORDER BY createdAt DESC;
```
</details>

<details>
<summary>1.12 - Filmes com "guerra" na descricao</summary>

```sql
SELECT id, title, description FROM movies WHERE description LIKE '%guerra%';
```
</details>

<details>
<summary>1.13 - Avaliacoes com nota 10</summary>

```sql
SELECT * FROM rates WHERE rate = 10;
```
</details>

<details>
<summary>1.14 - Total de generos</summary>

```sql
SELECT COUNT(*) AS total_generos FROM genres;
```
</details>

<details>
<summary>1.15 - Series de Z a A</summary>

```sql
SELECT id, title FROM series ORDER BY title DESC;
```
</details>

<details>
<summary>2.1 - Filmes com seus generos</summary>

```sql
SELECT m.title, g.name AS genero
FROM movies m
JOIN movies_genres mg ON mg.movieId = m.id
JOIN genres g ON g.id = mg.genreId
ORDER BY m.title, g.name;
```
</details>

<details>
<summary>2.2 - Media de avaliacao por filme</summary>

```sql
SELECT m.title, ROUND(AVG(r.rate), 2) AS media
FROM movies m
JOIN rates r ON r.movieId = m.id
GROUP BY m.id, m.title
ORDER BY media DESC;
```
</details>

<details>
<summary>2.3 - Filmes com media acima de 9</summary>

```sql
SELECT m.title, ROUND(AVG(r.rate), 2) AS media
FROM movies m
JOIN rates r ON r.movieId = m.id
GROUP BY m.id, m.title
HAVING media > 9
ORDER BY media DESC;
```
</details>

<details>
<summary>2.4 - Top 5 filmes mais comentados</summary>

```sql
SELECT m.title, COUNT(c.id) AS total_comentarios
FROM movies m
JOIN coments c ON c.movieId = m.id
GROUP BY m.id, m.title
ORDER BY total_comentarios DESC
LIMIT 5;
```
</details>

<details>
<summary>2.5 - Series com temporadas e episodios</summary>

```sql
SELECT s.title,
       COUNT(se.id) AS total_temporadas,
       SUM(se.episodes) AS total_episodios
FROM series s
JOIN seasons se ON se.seriesId = s.id
GROUP BY s.id, s.title
ORDER BY total_episodios DESC;
```
</details>

<details>
<summary>2.6 - Usuarios sem comentarios</summary>

```sql
SELECT u.name
FROM users u
LEFT JOIN coments c ON c.userId = u.id
WHERE c.id IS NULL;
```
</details>

<details>
<summary>2.7 - Filmes do genero Acao</summary>

```sql
SELECT m.title
FROM movies m
JOIN movies_genres mg ON mg.movieId = m.id
JOIN genres g ON g.id = mg.genreId
WHERE g.name = 'Acao'
ORDER BY m.title;
```
</details>

<details>
<summary>2.8 - Filmes por genero</summary>

```sql
SELECT g.name AS genero, COUNT(mg.id) AS total_filmes
FROM genres g
LEFT JOIN movies_genres mg ON mg.genreId = g.id
GROUP BY g.id, g.name
ORDER BY total_filmes DESC;
```
</details>

<details>
<summary>2.9 - Comentarios do filme 1 com nome do autor</summary>

```sql
SELECT u.name, c.coment, c.createdAt
FROM coments c
JOIN users u ON u.id = c.userId
WHERE c.movieId = 1
ORDER BY c.createdAt;
```
</details>

<details>
<summary>2.10 - Usuario com mais avaliacoes</summary>

```sql
SELECT u.name, COUNT(r.id) AS total_avaliacoes
FROM users u
JOIN rates r ON r.userId = u.id
GROUP BY u.id, u.name
ORDER BY total_avaliacoes DESC
LIMIT 1;
```
</details>

<details>
<summary>2.11 - Series com seus generos</summary>

```sql
SELECT s.title, g.name AS genero
FROM series s
JOIN series_genres sg ON sg.serieId = s.id
JOIN genres g ON g.id = sg.genreId
ORDER BY s.title, g.name;
```
</details>

<details>
<summary>2.12 - Menor e maior nota por serie</summary>

```sql
SELECT s.title, MIN(r.rate) AS menor_nota, MAX(r.rate) AS maior_nota
FROM series s
JOIN rates r ON r.serieId = s.id
GROUP BY s.id, s.title
ORDER BY s.title;
```
</details>

<details>
<summary>2.13 - Filmes sem avaliacao</summary>

```sql
SELECT m.title
FROM movies m
LEFT JOIN rates r ON r.movieId = m.id
WHERE r.id IS NULL
ORDER BY m.title;
```
</details>

<details>
<summary>2.14 - Top 3 usuarios que mais comentaram</summary>

```sql
SELECT u.name, COUNT(c.id) AS total_comentarios
FROM users u
JOIN coments c ON c.userId = u.id
GROUP BY u.id, u.name
ORDER BY total_comentarios DESC
LIMIT 3;
```
</details>

<details>
<summary>2.15 - Temporadas de Breaking Bad</summary>

```sql
SELECT s.title, se.seasons AS temporada, se.episodes
FROM seasons se
JOIN series s ON s.id = se.seriesId
WHERE se.seriesId = 1
ORDER BY se.seasons;
```
</details>

<details>
<summary>2.16 - Series por genero</summary>

```sql
SELECT g.name AS genero, COUNT(sg.id) AS total_series
FROM genres g
LEFT JOIN series_genres sg ON sg.genreId = g.id
GROUP BY g.id, g.name
ORDER BY total_series DESC;
```
</details>

<details>
<summary>2.17 - Filmes com quantidade de avaliacoes</summary>

```sql
SELECT m.title, COUNT(r.id) AS total_avaliacoes
FROM movies m
LEFT JOIN rates r ON r.movieId = m.id
GROUP BY m.id, m.title
ORDER BY total_avaliacoes DESC;
```
</details>

<details>
<summary>2.18 - Comentarios de series com usuario e titulo</summary>

```sql
SELECT s.title, u.name, c.coment
FROM coments c
JOIN users u ON u.id = c.userId
JOIN series s ON s.id = c.serieId
WHERE c.serieId IS NOT NULL
ORDER BY s.title;
```
</details>

<details>
<summary>2.19 - Nota media geral filmes vs series</summary>

```sql
SELECT ROUND(AVG(rate), 2) AS media_filmes FROM rates WHERE movieId IS NOT NULL;
SELECT ROUND(AVG(rate), 2) AS media_series FROM rates WHERE serieId IS NOT NULL;
```
</details>

<details>
<summary>2.20 - Series com exatamente 1 temporada</summary>

```sql
SELECT s.title, COUNT(se.id) AS temporadas
FROM series s
JOIN seasons se ON se.seriesId = s.id
GROUP BY s.id, s.title
HAVING temporadas = 1;
```
</details>

<details>
<summary>2.21 - Filmes de usuarios com nome comecando com J</summary>

```sql
SELECT u.name, m.title
FROM movies m
JOIN users u ON u.id = m.userId
WHERE u.name LIKE 'J%'
ORDER BY u.name, m.title;
```
</details>

<details>
<summary>2.22 - Genero com mais series</summary>

```sql
SELECT g.name, COUNT(sg.id) AS total
FROM genres g
JOIN series_genres sg ON sg.genreId = g.id
GROUP BY g.id, g.name
ORDER BY total DESC
LIMIT 1;
```
</details>

<details>
<summary>2.23 - Avaliacoes entre 7 e 8</summary>

```sql
SELECT u.name, m.title, r.rate
FROM rates r
JOIN users u ON u.id = r.userId
JOIN movies m ON m.id = r.movieId
WHERE r.rate BETWEEN 7 AND 8
ORDER BY r.rate DESC, m.title;
```
</details>

<details>
<summary>2.24 - Total de episodios por serie</summary>

```sql
SELECT s.title, SUM(se.episodes) AS total_episodios
FROM series s
JOIN seasons se ON se.seriesId = s.id
GROUP BY s.id, s.title
ORDER BY total_episodios DESC;
```
</details>

<details>
<summary>2.25 - Usuarios que cadastraram filmes e series</summary>

```sql
SELECT DISTINCT u.name
FROM users u
JOIN movies m ON m.userId = u.id
JOIN series s ON s.userId = u.id;
```
</details>

<details>
<summary>2.26 - Filme com maior e menor nota</summary>

```sql
-- Maior nota
SELECT m.title, r.rate
FROM rates r
JOIN movies m ON m.id = r.movieId
ORDER BY r.rate DESC
LIMIT 1;

-- Menor nota
SELECT m.title, r.rate
FROM rates r
JOIN movies m ON m.id = r.movieId
ORDER BY r.rate ASC
LIMIT 1;
```
</details>

<details>
<summary>2.27 - Comentarios por serie</summary>

```sql
SELECT s.title, COUNT(c.id) AS total_comentarios
FROM series s
LEFT JOIN coments c ON c.serieId = s.id
GROUP BY s.id, s.title
ORDER BY total_comentarios DESC;
```
</details>

<details>
<summary>2.28 - Filmes de Animacao com nota media</summary>

```sql
SELECT m.title, ROUND(AVG(r.rate), 2) AS media
FROM movies m
JOIN movies_genres mg ON mg.movieId = m.id
JOIN genres g ON g.id = mg.genreId
JOIN rates r ON r.movieId = m.id
WHERE g.name = 'Animacao'
GROUP BY m.id, m.title
ORDER BY media DESC;
```
</details>

<details>
<summary>2.29 - Usuario que cadastrou mais conteudo</summary>

```sql
SELECT u.name,
       (SELECT COUNT(*) FROM movies m WHERE m.userId = u.id) +
       (SELECT COUNT(*) FROM series s WHERE s.userId = u.id) AS total_conteudo
FROM users u
ORDER BY total_conteudo DESC
LIMIT 1;
```
</details>

<details>
<summary>2.30 - Series com media abaixo de 8</summary>

```sql
SELECT s.title, ROUND(AVG(r.rate), 2) AS media
FROM series s
JOIN rates r ON r.serieId = s.id
GROUP BY s.id, s.title
HAVING media < 8
ORDER BY media;
```
</details>

<details>
<summary>3.1 - Filmes com mais de 2 generos</summary>

```sql
SELECT m.title,
       COUNT(mg.genreId) AS total_generos,
       GROUP_CONCAT(g.name SEPARATOR ', ') AS generos
FROM movies m
JOIN movies_genres mg ON mg.movieId = m.id
JOIN genres g ON g.id = mg.genreId
GROUP BY m.id, m.title
HAVING total_generos > 2
ORDER BY m.title;
```
</details>

<details>
<summary>3.2 - Top 10 series por avaliacao</summary>

```sql
SELECT s.title,
       ROUND(AVG(r.rate), 2) AS media,
       COUNT(r.id) AS total_avaliacoes
FROM series s
JOIN rates r ON r.serieId = s.id
GROUP BY s.id, s.title
ORDER BY media DESC, total_avaliacoes DESC
LIMIT 10;
```
</details>

<details>
<summary>3.3 - Usuarios que comentaram filmes e series</summary>

```sql
SELECT u.name
FROM users u
JOIN coments c ON c.userId = u.id
GROUP BY u.id, u.name
HAVING SUM(CASE WHEN c.movieId IS NOT NULL THEN 1 ELSE 0 END) > 0
   AND SUM(CASE WHEN c.serieId IS NOT NULL THEN 1 ELSE 0 END) > 0;
```
</details>

<details>
<summary>3.4 - Ranking de usuarios por media de notas</summary>

```sql
SELECT u.name,
       ROUND(AVG(r.rate), 2) AS media_notas,
       COUNT(r.id) AS total_avaliacoes
FROM users u
JOIN rates r ON r.userId = u.id
GROUP BY u.id, u.name
ORDER BY media_notas DESC;
```
</details>

<details>
<summary>3.5 - Filmes sem comentarios</summary>

```sql
SELECT m.title
FROM movies m
LEFT JOIN coments c ON c.movieId = m.id
WHERE c.id IS NULL
ORDER BY m.title;
```
</details>

<details>
<summary>3.6 - Generos mais populares (filmes + series)</summary>

```sql
SELECT g.name,
       (SELECT COUNT(*) FROM movies_genres mg WHERE mg.genreId = g.id) +
       (SELECT COUNT(*) FROM series_genres sg WHERE sg.genreId = g.id) AS total
FROM genres g
ORDER BY total DESC;
```
</details>

<details>
<summary>3.7 - Melhor filme de cada genero</summary>

```sql
SELECT sub.genero, sub.titulo, sub.media
FROM (
    SELECT g.name AS genero,
           m.title AS titulo,
           ROUND(AVG(r.rate), 2) AS media,
           ROW_NUMBER() OVER (PARTITION BY g.id ORDER BY AVG(r.rate) DESC) AS rn
    FROM genres g
    JOIN movies_genres mg ON mg.genreId = g.id
    JOIN movies m ON m.id = mg.movieId
    JOIN rates r ON r.movieId = m.id
    GROUP BY g.id, g.name, m.id, m.title
) sub
WHERE sub.rn = 1
ORDER BY sub.media DESC;
```
</details>

<details>
<summary>3.8 - Series com todas as temporadas > 6 episodios</summary>

```sql
SELECT s.title, MIN(se.episodes) AS min_episodios
FROM series s
JOIN seasons se ON se.seriesId = s.id
GROUP BY s.id, s.title
HAVING MIN(se.episodes) > 6
ORDER BY s.title;
```
</details>

<details>
<summary>3.9 - Comentarios por tipo (filme vs serie) por usuario</summary>

```sql
SELECT u.name,
       SUM(IF(c.movieId IS NOT NULL, 1, 0)) AS comentarios_filmes,
       SUM(IF(c.serieId IS NOT NULL, 1, 0)) AS comentarios_series
FROM users u
JOIN coments c ON c.userId = u.id
GROUP BY u.id, u.name
ORDER BY u.name;
```
</details>

<details>
<summary>3.10 - Meses com mais cadastros</summary>

```sql
SELECT YEAR(createdAt) AS ano,
       MONTH(createdAt) AS mes,
       COUNT(*) AS total
FROM movies
GROUP BY ano, mes
ORDER BY total DESC;
```
</details>

<details>
<summary>4.1 - Usuarios que avaliaram e comentaram o mesmo filme</summary>

```sql
SELECT u.name, m.title, r.rate, c.coment
FROM rates r
JOIN coments c ON c.userId = r.userId AND c.movieId = r.movieId
JOIN users u ON u.id = r.userId
JOIN movies m ON m.id = r.movieId
ORDER BY u.name, m.title;
```
</details>

<details>
<summary>4.2 - Quem gostou de Matrix tambem gostou de...</summary>

```sql
SELECT m.title, COUNT(r2.userId) AS usuarios_em_comum
FROM rates r1
JOIN rates r2 ON r2.userId = r1.userId AND r2.movieId != r1.movieId AND r2.rate >= 9
JOIN movies m ON m.id = r2.movieId
WHERE r1.movieId = 4 AND r1.rate >= 9
GROUP BY m.id, m.title
ORDER BY usuarios_em_comum DESC;
```
</details>

<details>
<summary>4.3 - Genero favorito de cada usuario</summary>

```sql
SELECT sub.name, sub.genero, sub.total
FROM (
    SELECT u.name, g.name AS genero, COUNT(*) AS total,
           ROW_NUMBER() OVER (PARTITION BY u.id ORDER BY COUNT(*) DESC) AS rn
    FROM users u
    JOIN rates r ON r.userId = u.id
    LEFT JOIN movies_genres mg ON mg.movieId = r.movieId
    LEFT JOIN series_genres sg ON sg.serieId = r.serieId
    JOIN genres g ON g.id = COALESCE(mg.genreId, sg.genreId)
    GROUP BY u.id, u.name, g.id, g.name
) sub
WHERE sub.rn = 1
ORDER BY sub.name;
```
</details>

<details>
<summary>4.4 - Series com media acima da media geral</summary>

```sql
SELECT s.title, ROUND(AVG(r.rate), 2) AS media
FROM series s
JOIN rates r ON r.serieId = s.id
GROUP BY s.id, s.title
HAVING media > (SELECT AVG(rate) FROM rates WHERE serieId IS NOT NULL)
ORDER BY media DESC;
```
</details>

<details>
<summary>4.5 - Filmes mais polemicos</summary>

```sql
SELECT m.title,
       MAX(r.rate) AS nota_max,
       MIN(r.rate) AS nota_min,
       MAX(r.rate) - MIN(r.rate) AS diferenca
FROM movies m
JOIN rates r ON r.movieId = m.id
GROUP BY m.id, m.title
HAVING COUNT(r.id) >= 3
ORDER BY diferenca DESC;
```
</details>

<details>
<summary>4.6 - Usuarios totalmente inativos</summary>

```sql
SELECT u.name
FROM users u
LEFT JOIN movies m ON m.userId = u.id
LEFT JOIN series s ON s.userId = u.id
LEFT JOIN rates r ON r.userId = u.id
LEFT JOIN coments c ON c.userId = u.id
WHERE m.id IS NULL
  AND s.id IS NULL
  AND r.id IS NULL
  AND c.id IS NULL;
```
</details>

<details>
<summary>4.7 - Ranking de filmes com window function</summary>

```sql
SELECT
    RANK() OVER (ORDER BY AVG(r.rate) DESC) AS posicao,
    m.title,
    ROUND(AVG(r.rate), 2) AS media,
    COUNT(r.id) AS total_avaliacoes
FROM movies m
JOIN rates r ON r.movieId = m.id
GROUP BY m.id, m.title
ORDER BY posicao;
```
</details>

<details>
<summary>4.8 - Distribuicao de notas</summary>

```sql
SELECT r.rate AS nota,
       COUNT(*) AS quantidade,
       ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM rates), 2) AS percentual
FROM rates r
GROUP BY r.rate
ORDER BY r.rate DESC;
```
</details>

<details>
<summary>4.9 - Top 3 filmes por genero</summary>

```sql
SELECT sub.genero, sub.titulo, sub.media
FROM (
    SELECT g.name AS genero,
           m.title AS titulo,
           ROUND(AVG(r.rate), 2) AS media,
           ROW_NUMBER() OVER (PARTITION BY g.id ORDER BY AVG(r.rate) DESC) AS rn
    FROM genres g
    JOIN movies_genres mg ON mg.genreId = g.id
    JOIN movies m ON m.id = mg.movieId
    JOIN rates r ON r.movieId = m.id
    GROUP BY g.id, g.name, m.id, m.title
) sub
WHERE sub.rn <= 3
ORDER BY sub.genero, sub.media DESC;
```
</details>

<details>
<summary>4.10 - View consolidada de catalogo</summary>

```sql
CREATE VIEW catalogo_filmes AS
SELECT m.title,
       GROUP_CONCAT(DISTINCT g.name SEPARATOR ', ') AS generos,
       ROUND(AVG(r.rate), 2) AS media_avaliacao,
       COUNT(DISTINCT c.id) AS total_comentarios,
       u.name AS cadastrado_por
FROM movies m
LEFT JOIN users u ON u.id = m.userId
LEFT JOIN movies_genres mg ON mg.movieId = m.id
LEFT JOIN genres g ON g.id = mg.genreId
LEFT JOIN rates r ON r.movieId = m.id
LEFT JOIN coments c ON c.movieId = m.id
GROUP BY m.id, m.title, u.name;

CREATE VIEW catalogo_series AS
SELECT s.title,
       GROUP_CONCAT(DISTINCT g.name SEPARATOR ', ') AS generos,
       ROUND(AVG(r.rate), 2) AS media_avaliacao,
       COUNT(DISTINCT c.id) AS total_comentarios,
       COUNT(DISTINCT se.id) AS total_temporadas,
       SUM(DISTINCT se.episodes) AS total_episodios,
       u.name AS cadastrado_por
FROM series s
LEFT JOIN users u ON u.id = s.userId
LEFT JOIN series_genres sg ON sg.serieId = s.id
LEFT JOIN genres g ON g.id = sg.genreId
LEFT JOIN rates r ON r.serieId = s.id
LEFT JOIN coments c ON c.serieId = s.id
LEFT JOIN seasons se ON se.seriesId = s.id
GROUP BY s.id, s.title, u.name;
```
</details>

<details>
<summary>D1 - Par de usuarios com gostos mais parecidos</summary>

```sql
SELECT u1.name AS usuario_1,
       u2.name AS usuario_2,
       COUNT(*) AS filmes_em_comum,
       ROUND(AVG(ABS(r1.rate - r2.rate)), 2) AS diferenca_media
FROM rates r1
JOIN rates r2 ON r2.movieId = r1.movieId AND r2.userId > r1.userId
JOIN users u1 ON u1.id = r1.userId
JOIN users u2 ON u2.id = r2.userId
WHERE r1.movieId IS NOT NULL
GROUP BY r1.userId, r2.userId, u1.name, u2.name
HAVING filmes_em_comum >= 2
ORDER BY diferenca_media ASC
LIMIT 5;
```
</details>

<details>
<summary>D2 - Generos que nunca aparecem juntos</summary>

```sql
SELECT g1.name AS genero_1, g2.name AS genero_2
FROM genres g1
CROSS JOIN genres g2
WHERE g1.id < g2.id
  AND NOT EXISTS (
      SELECT 1
      FROM movies_genres mg1
      JOIN movies_genres mg2 ON mg2.movieId = mg1.movieId
      WHERE mg1.genreId = g1.id AND mg2.genreId = g2.id
  )
ORDER BY g1.name, g2.name;
```
</details>

<details>
<summary>D3 - Series mais engajadas por temporada</summary>

```sql
SELECT s.title,
       COUNT(DISTINCT r.id) + COUNT(DISTINCT c.id) AS engajamento_total,
       COUNT(DISTINCT se.id) AS temporadas,
       ROUND((COUNT(DISTINCT r.id) + COUNT(DISTINCT c.id)) / COUNT(DISTINCT se.id), 2) AS engajamento_por_temporada
FROM series s
JOIN seasons se ON se.seriesId = s.id
LEFT JOIN rates r ON r.serieId = s.id
LEFT JOIN coments c ON c.serieId = s.id
GROUP BY s.id, s.title
ORDER BY engajamento_por_temporada DESC
LIMIT 5;
```
</details>
