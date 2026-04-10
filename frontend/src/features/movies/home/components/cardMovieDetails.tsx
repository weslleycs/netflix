import type { MovieDetails } from "@/entities/movie/model/movieDetails"

type  Props = {
     movieDetails: MovieDetails
}

export function CardMovieDetails({  movieDetails}: Props) {
 return (  

<div className="flex flex-col gap-6 md:flex-row">
   <img src={movieDetails.imageUrl} alt={movieDetails.title}
     className="object-cover w-full rounded-2xl md:w-72 h-96" />
   <div className="flex-1 space-y-4">
     <h1 className="text-3xl font-bold">{movieDetails.title}</h1>
     <div className="flex flex-wrap gap-2">
       {movieDetails.genre.map((g) => (
         <span key={g} className="px-3 py-1 text-xs font-semibold text-red-400 rounded-full bg-red-600/20">
           {g}
         </span>
       ))}
     </div>
     <div className="flex items-center gap-2">
       <span className="text-xl text-yellow-400">★</span>
       <span className="text-lg font-semibold">{movieDetails.rate.toFixed(1)}</span>
       <span className="text-zinc-400">/ 10</span>
     </div>
     <p className="leading-relaxed text-zinc-300">{movieDetails.description}</p>
   </div>
 </div>
 )
}