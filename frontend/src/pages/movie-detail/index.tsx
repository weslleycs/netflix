import { GetCommentsMovieById, GetMovieDetails } from "@/entities/movie/api/movie";
import CardContainerComment from "@/features/movies/home/components/cardContainerComment";
import CardMovieDetails from "@/features/movies/home/components/cardMovieDetails";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export default function MoviesDetailPage() {
  const [params] = useSearchParams();
  const movieId = params.get("movieId");

  const {
    data: comments = [],
    isLoading: isLoadingComment,
    isError: isErrorComment,
  } = useQuery({
    queryKey: ["commentsMovie", movieId],
    queryFn: async () => {
      return await GetCommentsMovieById(Number(movieId));
    },
  });

  const {
    data: movieDetails={
        id: Number(movieId),
        title: "Movie Title",
        description: "Movie Description",
        imageUrl: "",
        genre:[],
        rate: 0,
    },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["detailsMovie", movieId],
    queryFn: async () => {
      return await GetMovieDetails(Number(movieId));
    },   
  });

  return (
    <div className="min-h-screen text-white bg-black">
      <main className="max-w-6xl px-4 pt-24 pb-10 mx-auto">
        {isLoading && isLoadingComment ? (
          <p className="text-zinc-400">Loading...</p>
        ) : isError && isErrorComment ? (
          <p className="text-zinc-400">Not Found...</p>
        ) : (
          <>
            <CardMovieDetails movieDetails={movieDetails} />
            <CardContainerComment comments={comments} />
          </>
        )}
      </main>
    </div>
  );
}