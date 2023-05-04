import axios from "axios";
import { defineStore } from "pinia";

const API_URL = "https://www.omdbapi.com/";
const API_KEY = "c81a63c8";

export const useMoviesStore = defineStore("movies", {
  state: () => {
    return {
      movies: [],
      movie: {},
      totalResults: 0,
      page: 1,
    };
  },
  actions: {
    async getAllMovies(keyword, page) {
      this.loadingMessage = "Please wait";
      if (!keyword) {
        keyword = "indiana";
      }
      if (!page) {
        page = 1;
      }

      try {
        const { data } = await axios.get(
          `${API_URL}?apikey=${API_KEY}&page=${page}&s=${keyword}&type=movie`
        );
        if (data.Response == "False") {
          throw new Error(data.Error);
        }

        const respData = {
          movies: data.Search,
          isLoading: false,
          totalResults: data.totalResults,
        };
        return respData;
      } catch (err) {
        [this.isLoading, this.loadingMessage] = [true, err.message];
      }
    },
    async getMovieByID(id) {
      try {
        const { data, status } = await axios.get(
          `${API_URL}?apikey=${API_KEY}&i=${id}`
        );
        if (status != 200) {
          throw new Error(data.Error);
        }
        const respData = {
          movies: data,
          isLoading: false,
        };
        return respData;
      } catch (err) {
        console.log(err.message);
      }
    },
  },
});
