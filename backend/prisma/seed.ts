import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const DEMO_USER = {
  name: 'Demo',
  email: 'demo@wflix.test',
  password: 'demo1234',
};

const GENRES: { name: string; description: string }[] = [
  { name: 'Action', description: 'High-energy stories driven by physical conflict.' },
  { name: 'Drama', description: 'Character-led plots with emotional weight.' },
  { name: 'Sci-Fi', description: 'Speculative futures, technology and the unknown.' },
  { name: 'Comedy', description: 'Built to make you laugh.' },
  { name: 'Thriller', description: 'Tension, suspense and high stakes.' },
  { name: 'Horror', description: 'Designed to unsettle.' },
  { name: 'Romance', description: 'Love stories at the centre.' },
  { name: 'Documentary', description: 'Real people, real events.' },
  { name: 'Fantasy', description: 'Magic, myth and impossible worlds.' },
  { name: 'Animation', description: 'Hand-drawn or rendered, told frame by frame.' },
];

type Entry = {
  title: string;
  description: string;
  genres: string[];
  rate: number;
  poster: string;
};

type SerieEntry = Entry & {
  seasons: number[];
};

const TMDB = (path: string): string => `https://image.tmdb.org/t/p/w500/${path}`;

const MOVIES: Entry[] = [
  { title: 'Inception', description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.', genres: ['Action', 'Sci-Fi', 'Thriller'], rate: 9, poster: TMDB('9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg') },
  { title: 'The Godfather', description: 'The aging patriarch of an organised crime dynasty transfers control of his clandestine empire to his reluctant son.', genres: ['Drama'], rate: 10, poster: TMDB('3bhkrj58Vtu7enYsRolD1fZdja1.jpg') },
  { title: 'Pulp Fiction', description: 'The lives of two mob hitmen, a boxer and a pair of diner bandits intertwine in four tales of violence and redemption.', genres: ['Drama', 'Thriller'], rate: 9, poster: TMDB('d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg') },
  { title: 'The Dark Knight', description: 'Batman faces a chaos agent who threatens to dismantle Gotham from the inside out.', genres: ['Action', 'Drama', 'Thriller'], rate: 10, poster: TMDB('qJ2tW6WMUDux911r6m7haRef0WH.jpg') },
  { title: 'Spirited Away', description: 'A young girl wanders into a world of spirits and must work in a bathhouse to free her parents.', genres: ['Animation', 'Fantasy'], rate: 9, poster: TMDB('39wmItIWsg5sZMyRUHLkWBcuVCM.jpg') },
  { title: 'Parasite', description: 'A poor family schemes to become employed by a wealthy household by posing as unrelated, qualified individuals.', genres: ['Drama', 'Thriller'], rate: 9, poster: TMDB('7IiTTgloJzvGI1TAYymCfbfl3vT.jpg') },
  { title: 'Interstellar', description: 'A team of explorers travels through a wormhole in space in an attempt to ensure humanity survives.', genres: ['Sci-Fi', 'Drama'], rate: 9, poster: TMDB('gEU2QniE6E77NI6lCU6MxlNBvIx.jpg') },
  { title: 'Get Out', description: 'A young Black man visits his white girlfriend’s family and uncovers something deeply wrong.', genres: ['Horror', 'Thriller'], rate: 8, poster: TMDB('tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg') },
  { title: 'La La Land', description: 'A jazz pianist falls for an aspiring actress in Los Angeles.', genres: ['Romance', 'Drama'], rate: 8, poster: TMDB('uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg') },
  { title: 'Mad Max: Fury Road', description: 'In a post-apocalyptic wasteland, a woman rebels against a tyrant in search of her homeland.', genres: ['Action'], rate: 8, poster: TMDB('8tZYtuWezp8JbcsvHYO0O46tFbo.jpg') },
  { title: 'Whiplash', description: 'A young drummer enrols at a cut-throat music conservatory and meets an instructor who will stop at nothing.', genres: ['Drama'], rate: 9, poster: 'https://upload.wikimedia.org/wikipedia/en/0/01/Whiplash_poster.jpg' },
  { title: 'Knives Out', description: 'A detective investigates the death of a patriarch of an eccentric, combative family.', genres: ['Comedy', 'Thriller'], rate: 8, poster: TMDB('pThyQovXQrw2m0s9x82twj48Jq4.jpg') },
];

const SERIES: SerieEntry[] = [
  { title: 'Stranger Things', description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments and supernatural forces.', genres: ['Sci-Fi', 'Horror', 'Drama'], rate: 9, poster: TMDB('49WJfeN0moxb9IPfGn8AIqMGskD.jpg'), seasons: [8, 9, 8, 9] },
  { title: 'Breaking Bad', description: 'A high school chemistry teacher diagnosed with terminal cancer turns to manufacturing methamphetamine.', genres: ['Drama', 'Thriller'], rate: 10, poster: TMDB('ggFHVNu6YYI5L9pCfOacjizRGt.jpg'), seasons: [7, 13, 13, 13, 16] },
  { title: 'The Office', description: 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes and inappropriate behaviour.', genres: ['Comedy'], rate: 9, poster: TMDB('qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg'), seasons: [6, 22, 25, 19, 28, 26, 26, 24, 25] },
  { title: 'Black Mirror', description: 'An anthology series exploring a twisted, high-tech multiverse where humanity’s greatest innovations collide with its darkest instincts.', genres: ['Sci-Fi', 'Drama'], rate: 8, poster: TMDB('5UaYsGZOFhjFDwQh6GuLjjA1WlF.jpg'), seasons: [3, 3, 6, 3, 3, 5] },
  { title: 'Arcane', description: 'The origins of two iconic League of Legends champions, set in the utopian Piltover and the oppressed underground of Zaun.', genres: ['Animation', 'Action', 'Drama'], rate: 9, poster: TMDB('fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg'), seasons: [9, 9] },
  { title: 'The Crown', description: 'Follows the political rivalries and romance of Queen Elizabeth II’s reign and the events that shaped the second half of the twentieth century.', genres: ['Drama'], rate: 8, poster: TMDB('1M876KPjulVwppEpldhdc8V4o68.jpg'), seasons: [10, 10, 10, 10, 10, 10] },
  { title: 'Chernobyl', description: 'In April 1986, an explosion at the Chernobyl nuclear power plant becomes one of the world’s worst man-made catastrophes.', genres: ['Drama', 'Thriller', 'Documentary'], rate: 10, poster: TMDB('hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg'), seasons: [5] },
  { title: 'The Mandalorian', description: 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.', genres: ['Sci-Fi', 'Action'], rate: 8, poster: TMDB('sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg'), seasons: [8, 8, 8] },
  { title: 'Fleabag', description: 'A young woman tries to cope with life in London while coming to terms with a recent tragedy.', genres: ['Comedy', 'Drama'], rate: 9, poster: TMDB('2KGxQFV9Wp1MshPBf8BuqWUgVAz.jpg'), seasons: [6, 6] },
  { title: 'The Last of Us', description: 'After a global pandemic destroys civilization, a hardened survivor takes charge of a teenager who may hold the key to a cure.', genres: ['Drama', 'Horror'], rate: 9, poster: TMDB('uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg'), seasons: [9, 7] },
];

const SAMPLE_COMMENTS = [
  'One of my all-time favourites.',
  'Holds up on a rewatch.',
  'The pacing is excellent.',
  'Soundtrack carried it for me.',
  'Better than I expected.',
];

async function main(): Promise<void> {
  const password = await bcrypt.hash(DEMO_USER.password, 10);
  const demo = await prisma.users.upsert({
    where: { email: DEMO_USER.email },
    update: {},
    create: { name: DEMO_USER.name, email: DEMO_USER.email, password },
  });

  const genreIds = new Map<string, number>();
  for (const g of GENRES) {
    const row = await prisma.genres.upsert({
      where: { name: g.name },
      update: { description: g.description },
      create: g,
    });
    genreIds.set(g.name, row.id);
  }

  await prisma.comments.deleteMany({ where: { userId: demo.id } });
  await prisma.rates.deleteMany({ where: { userId: demo.id } });
  await prisma.movies_genres.deleteMany({ where: { movie: { userId: demo.id } } });
  await prisma.series_genres.deleteMany({ where: { serie: { userId: demo.id } } });
  await prisma.seasons.deleteMany({ where: { series: { userId: demo.id } } });
  await prisma.movies.deleteMany({ where: { userId: demo.id } });
  await prisma.series.deleteMany({ where: { userId: demo.id } });

  for (const m of MOVIES) {
    const movie = await prisma.movies.create({
      data: {
        title: m.title,
        description: m.description,
        imageUrl: m.poster,
        userId: demo.id,
        moviesGenres: {
          create: m.genres.map((name) => ({ genreId: requireGenre(genreIds, name) })),
        },
      },
    });
    await prisma.rates.create({
      data: { rate: m.rate, userId: demo.id, movieId: movie.id },
    });
    await prisma.comments.create({
      data: {
        comment: pickComment(m.title),
        userId: demo.id,
        movieId: movie.id,
      },
    });
  }

  for (const s of SERIES) {
    const serie = await prisma.series.create({
      data: {
        title: s.title,
        description: s.description,
        imageUrl: s.poster,
        userId: demo.id,
        seriesGenres: {
          create: s.genres.map((name) => ({ genreId: requireGenre(genreIds, name) })),
        },
        seasons: {
          create: s.seasons.map((episodes, idx) => ({
            seasons: idx + 1,
            episodes,
          })),
        },
      },
    });
    await prisma.rates.create({
      data: { rate: s.rate, userId: demo.id, serieId: serie.id },
    });
    await prisma.comments.create({
      data: {
        comment: pickComment(s.title),
        userId: demo.id,
        serieId: serie.id,
      },
    });
  }

  console.log(
    `Seeded ${GENRES.length} genres, ${MOVIES.length} movies, ${SERIES.length} series.`,
  );
  console.log(`Demo login: ${DEMO_USER.email} / ${DEMO_USER.password}`);
}

function requireGenre(map: Map<string, number>, name: string): number {
  const id = map.get(name);
  if (id === undefined) throw new Error(`Unknown genre: ${name}`);
  return id;
}

function pickComment(title: string): string {
  const idx = Math.abs(hash(title)) % SAMPLE_COMMENTS.length;
  return SAMPLE_COMMENTS[idx];
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
