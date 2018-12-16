<template>
  <div class="header">
    <h1>New York Times</h1>
       <form v-on:submit.prevent="getNews">
       <input type="text" placeholder="enter a skill you have" v-model="news">
        {{ news }}
      </form>
      <ul>
        <li v-for="(data, index) in news" :key='index'></li>
      </ul>
  </div>
</template>

<script>
import axios from 'axios';
// console.log(this.jokes)
// console.log(this);

// function add(a, b) {
//   return a + b
// }

// console.log(add(2,4));
// console.log(getJokes());

export default {
  name: 'Header',
  data() {
    return {
      news: [],
    };
  },
  methods: {
    getNews: function(){
      axios.get('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=029b8764c5c04cf8ac6370a40f8a6bf0')
      .then((res) => {
        this.news = res.data.results;
      }).catch( error => { console.log(error); });
          console.log(this.news.title);

    }
  },
  computed: {

  }
}
</script>

<style>

</style>


