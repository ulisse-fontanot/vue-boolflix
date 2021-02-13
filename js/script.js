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
      // ----------------FUNZIONI----------------------------
        // if (result.data.results[0].genre_ids[0] == 28) {  // COSI FUNZIONA
        //   result.data.results[0].genre_ids[0] = "action";
        //   this.$forceUpdate()
        // }

        result.data.results.forEach((film) => {  // COSI NON FUNZIONA
          film.genre_ids.forEach((id) => {
            this.genreFilms.forEach((genere) => {
              if (id == genere.id) {
                id = genere.name;
              }
            });
          });
          this.$forceUpdate()
        });

        this.films = result.data.results;

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
      // ----------------FUNZIONI----------------------------
        result.data.results.forEach((tv) => {
          tv.genre_ids.forEach((id) => {
            this.genreSerie.forEach((genere) => {
              if (id == genere.id) {
                id = genere.name;
              }
            });
          });
          this.$forceUpdate()
        });

        this.serie = result.data.results;

        result.data.results.forEach(item => {
          item.vote_average = Math.round(item.vote_average / 2);
        });

        this.media = this.films.concat(this.serie);

        console.log(this.media);

        this.query = '';
      // -----------------FUNZIONI---------------------------
      })
      .catch((error) => console.log('errore'));
      //-----------SERIE TV---------------


    }
  },
  mounted(){
    //-----------GENERI FILM---------------
    axios
    .get("https://api.themoviedb.org/3/genre/movie/list", {
      params: {
        api_key: '533355437691153b9c338305b62a7ad3'
      }
    })
    .then((result) => {
      this.genreFilms = result.data.genres;

      console.log(this.genreFilms);
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

      console.log(this.genreSerie);
    })
    .catch((error) => console.log('errore'));
    //-----------GENERI SERIE TV---------------
  }
});
