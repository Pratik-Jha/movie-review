<template>
  <h2 class="text-center ma-5">Movie details</h2>
  <!-- <div>{{ singleMovie }}</div> -->
  <v-sheet
    border="lg opacity-12"
    class="text-body-2 mx-auto"
    :height="auto"
    max-width="550"
  >
    <v-container v-if="isLoading" style="height: 400px">
      <v-row class="fill-height" align-content="center" justify="center">
        <v-col class="text-subtitle-1 text-center" cols="12">
          Getting data
        </v-col>
        <v-col cols="6">
          <v-progress-linear
            color="deep-purple-accent-4"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else fluid>
      <v-row>
        <v-col cols="5">
          <v-img :src="singleMovie.Poster" height="350px" cover></v-img>
        </v-col>

        <v-col cols="7">
          <ul class="ps-4 mt-6">
            <li>Year : {{ singleMovie.Year }}</li>
            <li>Rated : {{ singleMovie.Rated }}</li>
            <li>Released : {{ singleMovie.Released }}</li>
            <li>Genre : {{ singleMovie.Genre }}</li>
            <li>Director : {{ singleMovie.Director }}</li>
            <li>Actors : {{ singleMovie.Actors }}</li>
            <li>Language : {{ singleMovie.Language }}</li>
            <li>Awards : {{ singleMovie.Awards }}</li>
          </ul>
        </v-col>
      </v-row>
      <v-divider class="mt-4 mb-4"></v-divider>
      <p class="mb-4 text-medium-emphasis text-body-1">
        {{ singleMovie.Title }}
      </p>
      <p class="mb-4 text-medium-emphasis text-body-2">
        {{ singleMovie.Plot }}
      </p>
      <p class="text-medium-emphasis text-paragraph-2">
        Watch Time : {{ singleMovie.Runtime }} <br />
        IMDB Rating : {{ singleMovie.imdbRating }}
      </p>
    </v-container>
  </v-sheet>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useMoviesStore } from "../store/movies";
const store = useMoviesStore();

const props = defineProps({
  id: {
    typeof: String,
    required: true,
  },
});
const isLoading = ref(true);
const singleMovie = ref("");

onMounted(async () => {
  const responseMovieData = await store.getMovieByID(props.id);
  isLoading.value = responseMovieData.isLoading;
  singleMovie.value = responseMovieData.movies;
});
</script>
