import type { Movie } from "../../schema/movie";


type Props = {
  movie: Movie;
};

export default function CardMovie({ movie }: Props) {
  return (
    <li className="relative w-56 overflow-hidden transition-transform duration-300 cursor-pointer shrink-0 rounded-2xl bg-zinc-900 group hover:scale-105">
      <img
        src={
          movie.imageUrl ??
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEUAAAD////c3Nxzc3P4+Pjy8vLCwsLv7+/V1dXKysqhoaGtra21tbVBQUHGxsbl5eVISEhoaGipqamUlJS8vLwkJCSKiopgYGARERFRUVEsLCyEhITb29tZWVmamprQ0NCQkJA0NDQlJSV7e3sdHR0XFxd/etHOAAADp0lEQVR4nO3c3VqyQBQFYKcUUUhKjczM/Om7/1v81ExhGEBg0d7yrPeYg70EmZ892usRERERERERERERERERERERERERERERUTVP8aN0CW1a+8aYiXQVrdl65qSrCRcTc+ZJl9KO2FzMpWtphX8NaKbSxbTgu58IaDr4Lt2ZFOlyWpC6g2YoXQ5elL6FgXQ9cEE6oFlKF4T2bAV8kC4IznpGzYt0QWh7K2AkXRDc0Er4JF0Q2psVsHsv0kk6YAfHQusWfkvXA2c9pM/S9eBNUwHfpctpgZfI1+/cZOYosSwcSdfSjsHlBnZuKnN2Tjj8kC6kNatDPH/auXlM0kK6AKTneDwezz4LrljsA8+PIt8LZnd3W/fz607FMHxzXfIZpifh/vqvi6xvOze2YJu+5DXoZ64x5sv5UaizGzlqPyzlE6/P/YPzkoPoDuZx07zijZmfNkZfwvwrDkLpACWW9gK3usGrdIgi9vq2HsUT8g9IQGOKRhhRcXntN1I6Or7AApq+dBanJ1xAY1bSaVxcQ3hdDxr3b7LzmPrG0mFc7G5EEzo7pnY3ogGdk1Pge1TnHezlTqUrU/kdRI4UWruJxcuFKrTucsACzqST5PhEBdQ5W+tlzx7UFksnyQN7k0oHyYUKqPYIH2ysUDrYA1e+0kFyFWyvVaK3qY9aOOk9KzwpL/4mek+eoAYLpZPuXvaYU116WzOD8uKZ8KT7T6nepgxqj0bvaOFuGFY3kA6Syysv/jbSQXLB9jDUzrzHqIRqV0+otqHex3QLS6j2MBgsodq3KWrI13sTgZ016Sg51riEX9JZ3JAN7o10GDdgQqXtQ9TM9ETlaZoZMqHKydsCmlDllhSwjX8U6fspBmzy/UvdbfyHTqiv04Y7qvBLWzsYdy7xl3SiDHRAfX/pgjuO8UPf1GZXXnQVGleKX9CEG+k4Du/QhNJpnFbAgDpbGMibKJ0lB+6bqLXP9ooKqPbwF+z0l8YF4hnmvL7WM6ZHmN89afwpwgVi53QjHaJY8+dU8zN61Px3F1rPQV803f/eSwco12zypve0QkKTr6LGRVNWky6G6t8AX9UfFVVu6LvY/8l2qzv6R5eciP1JGIyn4STnm3pHAZ0P6ijRwV5sHPurd/OI/limOxn9zKJ9aW3OrdSP9Bnx9Vn03cuhzfVTiO7qCb14DFeD4SgsOF+xiENvNJmvd39XFBERERERERERERERERERERERERERERERERERERGRev8B+58pATubpswAAAAASUVORK5CYII="
        }
        alt={movie.title}
        className="object-cover w-full h-80"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

      <div className="absolute px-2 py-1 text-xs font-semibold rounded top-3 left-3 bg-sky-500">
        DUB
      </div>

      <div className="absolute text-white bottom-4 left-4 right-4">
        <h3 className="text-lg font-semibold">{movie.title}</h3>
        <div className="flex justify-between mt-1 text-sm text-zinc-300">
          <span>{2026}</span>
        </div>
      </div>
    </li>
  );
}