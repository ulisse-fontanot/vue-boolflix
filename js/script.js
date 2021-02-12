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

        console.log(result.data);
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
      this.media = this.films.concat(this.serie);

      result.data.results.forEach(item => {
        item.vote_average = Math.round(item.vote_average / 2);
      });
      this.query = '';

      console.log(result.data);
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
      this.genreFilms = result.data.results;
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
      this.genreSerie = result.data.results;
      })
      .catch((error) => console.log('errore'));
      //-----------GENERI SERIE TV---------------
    }
  },
  mounted(){
    this.films.forEach((item, index) => {
      for (var i = 0; i < genreFilms.length; i++) {
        if (item.genre_ids[0] = (this.genreFilms[i].id)) {
          item.genre_ids[0] = this.genreFilms[i].name;
        }
      }
    });

    this.serie.forEach((item, index) => {
      for (var i = 0; i < genreFilms.length; i++) {
        if (item.genre_ids[0] = (this.genreSerie[i].id)) {
          item.genre_ids[0] = this.genreSerie[i].name;
        }
      }
    });
  }
});
