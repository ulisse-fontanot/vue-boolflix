var app = new Vue({
  el: "#app",
  data:{
    films: [],
    query: ""
  },
  methods:{
    searchFilm(){
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
        this.films = result.data.results;

        result.data.results.forEach(item => {
          item.vote_average = Math.round(item.vote_average / 2);
        });

        console.log(result.data);
        console.log(this.voto);
        // -----------------FUNZIONI---------------------------
      })
      .catch((error) => console.log('errore'));
    }
  }
});
