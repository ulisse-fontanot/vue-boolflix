var app = new Vue({
  el: "#app",
  data:{
    films: [],
    query: []
  },
  methods:{
    searchFilm(){
      axios.get("https://api.themoviedb.org/3/search/tv"; {
        params: {
          api_key: '533355437691153b9c338305b62a7ad3',
          query: this.query,
          language: 'it-IT'
        }
      }).then(result => {
        this.films = result.data.response;
      })
      .catch(error => console.log('errore'));
    }
  }
});