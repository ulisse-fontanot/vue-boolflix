var app = new Vue({
  el: "#app",
  data:{
    media: [],
    films: [],
    serie: [],
    genreSerie: [],
    genreFilms: [],
    query: ""
  },
  methods:{
    searchFilm(){
      // -----------FILM---------------
      axios
      .get("https://api.themoviedb.org/3/search/movie", {
        params: {
          api_key: '533355437691153b9c338305b62a7ad3',
          query: this.query,
          language: 'it-IT'
        }
      })
      .then((result) => {
        this.films = result.data.results;
        // ----------------FUNZIONI----------------------------
        result.data.results.forEach(item => {
          item.vote_average = Math.round(item.vote_average / 2);
        });
        this.query = '';
        // -----------------FUNZIONI---------------------------
      })
      .catch((error) => console.log('errore'));
      //-----------FILM---------------

      //-----------SERIE TV---------------
      axios
      .get("https://api.themoviedb.org/3/search/tv", {
        params: {
          api_key: '533355437691153b9c338305b62a7ad3',
          query: this.query,
          language: 'it-IT',
        }
      })
      .then((result) => {
        this.serie = result.data.results;
        // ----------------FUNZIONI----------------------------
        result.data.results.forEach(item => {
          item.vote_average = Math.round(item.vote_average / 2);
        });
        this.media = this.films.concat(this.serie);
        this.query = '';
        // -----------------FUNZIONI---------------------------
      })
      .catch((error) => console.log('errore'));
      //-----------SERIE TV---------------

      //-----------GENERI FILM---------------
      axios
      .get("https://api.themoviedb.org/3/genre/movie/list", {
        params: {
          api_key: '533355437691153b9c338305b62a7ad3'
        }
      })
      .then((result) => {
        this.genreFilms = result.data.genres;
        this.films.forEach((film, index) => {
          film.genre_ids.forEach((id, i) => {
            if (id == this.genreFilms.id) {
              id = this.genreFilms.name;
            }
          });
          this.$forceUpdate()
        });

        console.log(this.media);
      })
      .catch((error) => console.log('errore'));
      //-----------GENERI FILM---------------

      //-----------GENERI SERIE TV---------------
      axios
      .get("https://api.themoviedb.org/3/genre/tv/list", {
        params: {
          api_key: '533355437691153b9c338305b62a7ad3'
        }
      })
      .then((result) => {
        this.genreSerie = result.data.genres;
        this.serie.forEach((tv, index) => {
          tv.genre_ids.forEach((id, i) => {
            if (id == this.genreSerie.id) {
              id = this.genreSerie.name;
            }
          });
          this.$forceUpdate()
        });

        console.log(this.media);
      })
      .catch((error) => console.log('errore'));
      //-----------GENERI SERIE TV---------------
    }
  }
});
