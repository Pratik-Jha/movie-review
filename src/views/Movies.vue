<template>
  <v-container v-if="loading">
    <div class="text-xs-center">
      <v-progress-circular indeterminate :size="150" :width="8" color="blue">
      </v-progress-circular>
    </div>
  </v-container>
  <v-container v-else class="pa-4 text-center">
    <v-row class="fill-height" align="center" justify="center">
      <template v-for="(item, i) in moviesList" :key="i">
        <v-col cols="12" md="4">
          <v-hover v-slot="{ props }">
            <v-card v-bind="props">
              <v-img :src="item.Poster" height="225px" cover>
                <v-card-title class="text-h6 text-white d-flex flex-column">
                  <p class="mt-4">
                    {{ item.Title }}
                  </p>

                  <div>
                    <p class="ma-0 text-body-1 font-weight-bold">
                      {{ item.Type }}
                    </p>
                    <!-- <p class="text-caption font-weight-medium">
                      {{ item.imdbID }}
                    </p> -->
                  </div>
                </v-card-title>
                <div class="align-self-center">
                  <v-btn round color="green" @click="singleMovie(item.imdbID)">
                    View
                  </v-btn>
                </div>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
    <v-pagination
      @click="pageChange(page)"
      v-model="page"
      :total-visible="7"
      class="my-4"
      :length="totalLength"
    ></v-pagination>
  </v-container>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMoviesStore } from "../store/movies";
const store = useMoviesStore();

const moviesList = ref([]);
const page = ref(1);
const totalLength = ref(0);
const loading = ref(true);
const router = useRouter();

onMounted(async () => {
  const responseMovieData = await store.getAllMovies();
  loading.value = responseMovieData.isLoading;
  moviesList.value = responseMovieData.movies;
  totalLength.value = responseMovieData.totalResults / 10;
});

function singleMovie(id) {
  router.push("/movie/" + id);
}
async function pageChange(page) {
  console.log(page);
  const responseMovieData = await store.getAllMovies(null, page);
  loading.value = responseMovieData.isLoading;
  moviesList.value = responseMovieData.movies;
}
</script>
<style lang="css" scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
