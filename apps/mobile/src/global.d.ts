import { z } from "zod";
import { TrendingResponse } from "./lib/validations";

declare global {
  export type GlobalState = {
    theme: "dark" | "light";
  };

  export type TrendingMovieResponse=z.infer<typeof TrendingResponse>
}

export type { };

