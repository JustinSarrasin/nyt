<template>
  <div class="header">
    <h1>New York Times</h1>
    <form v-on:change.prevent="getNews">
      <select v-model="selected" v-on:change="handleChange"  id="asdf">
        <option v-for="item in categories" v-bind:key=item>{{ item.category }}</option>
      </select>
    </form>

    <ul>
      <li v-for="(data, index) in filteredArticles" :key=index>
          <h3>{{ data.title }}</h3>
          <p>{{ data.abstract }}</p>
          <a :href='data.url' target="_blank">See full article here</a>
          <!-- <img src="{{ data.image_url }}" alt=""> -->
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Header',
  data() {
    return {
      news: [],
      selected: {},
      categories: [
        { category: 'sports' }, 
        { category: 'home' }, 
        { category: 'world' }, 
        { category: 'opinion' } 
      ]
    };
  },
  methods: {
    // handleChange(e) {

    //     if(e.target.options.selectedIndex > -1) {
    //         // console.log(e.target.options[e.target.options.selectedIndex])
    //     }
    //     // let answer = e.target.options[e.target.options.selectedIndex].value
    //     // if(e.target.options.selectedIndex > -1) {
    //     //     console.log(e.target.options[e.target.options.selectedIndex].dataset.foo)
    //     // }
    //     // var e = document.getElementById("ddlViewBy");
    //     // var strUser = e.options[e.selectedIndex].text;
    //     // getNews(answer)
    // },
    getNews: function(e){
      // const category = { categories }
      // console.log('cat', category);
        // console.log('e', e.target.options[e.target.options.selectedIndex].value);
      let categorySelection = e.target.options[e.target.options.selectedIndex].value;
      // console.log(categorySelection);
      // let defaultSelection = '' ? 'home' : categorySelection;


      axios.get(`https://api.nytimes.com/svc/topstories/v2/${categorySelection}.json?api-key=029b8764c5c04cf8ac6370a40f8a6bf0`)
      .then((res) => {
        this.news = res.data.results;
      })
      // .catch( error => { console.log(error); });
          // console.log(this.news.title);
    // console.log(selected);
    }
  },
  computed: {
    filteredArticles() {
      let posts = this.news;
      let postSize = 3;
      let newArray = [];

      posts.slice(0, postSize).map(i => {
        return newArray.push(i);
      })

      newArray.map(article => {
        let newObj = {};
        newObj[article.key] = article.value;
        return newObj;
      })
      return newArray;
    }
  }
};
</script>

<style>

</style>


