import { GetCommentsMovieById, GetMovieDetails, RateMovie } from "@/entities/movie/api/movie";
import CardContainerComment from "@/features/movies/home/components/cardContainerComment";
import CardMovieDetails from "@/features/movies/home/components/cardMovieDetails";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export default function MoviesDetailPage() {
  const [params] = useSearchParams();
  const movieId = Number(params.get("movieId"));
  const [selectedRate, setSelectedRate] = useState(0);
  const queryClient = useQueryClient();

  const {
    data: comments = [],
    isLoading: isLoadingComment,
    isError: isErrorComment,
  } = useQuery({
    queryKey: ["commentsMovie", movieId],
    queryFn: async () => {
      return await GetCommentsMovieById(movieId);
    },
    enabled: !!movieId,
  });

  const {
    data: movieDetails = {
      id: movieId,
      title: "",
      description: "",
      imageUrl: "",
      genre: [],
      rate: 0,
    },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["detailsMovie", movieId],
    queryFn: async () => {
      return await GetMovieDetails(movieId);
    },
    enabled: !!movieId,
  });

  const rateMutation = useMutation({
    mutationFn: async (rate: number) => {
      return await RateMovie({
        movieId,
        rate,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["detailsMovie", movieId] });
    },
  });

  return (
    <div className="min-h-screen text-white bg-black">
      <main className="max-w-6xl px-4 pt-24 pb-10 mx-auto">
        {isLoading || isLoadingComment ? (
          <p className="text-zinc-400">Loading...</p>
        ) : isError || isErrorComment ? (
          <p className="text-zinc-400">Not Found...</p>
        ) : (
          <>
            <CardMovieDetails movieDetails={movieDetails} />

            <div className="p-4 mt-4 border rounded-xl border-zinc-800 bg-zinc-900">
              <p className="mb-3 text-sm text-zinc-300">Dar nota</p>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5 ,6 , 7,8,9,10].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setSelectedRate(star)}
                    className={`px-3 py-2 rounded-lg border ${
                      selectedRate >= star
                        ? "bg-yellow-500 text-black border-yellow-500"
                        : "bg-zinc-800 text-white border-zinc-700"
                    }`}
                  >
                    {star}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => rateMutation.mutate(selectedRate)}
                disabled={selectedRate === 0 || rateMutation.isPending}
                className="px-4 py-2 mt-4 font-semibold text-black bg-white rounded-lg disabled:opacity-50"
              >
                {rateMutation.isPending ? "Enviando..." : "Salvar nota"}
              </button>

              {rateMutation.isError && (
                <p className="mt-2 text-sm text-red-400">Erro ao enviar nota.</p>
              )}

              {rateMutation.isSuccess && (
                <p className="mt-2 text-sm text-green-400">Nota enviada com sucesso.</p>
              )}
            </div>

            <CardContainerComment comments={comments} />
          </>
        )}
      </main>
    </div>
  );
}