<template>
  <div class="header">
    <h1 class="display-4 text-xs-center font-weight-light">New York Times</h1>
    <form v-on:change.prevent="getNews">
      <select v-model="selected" id="asdf">
        <option v-for="item in categories" :key='item.category'>{{ item.category }}</option>
      </select>
    </form>

    <v-container fluid grid-list-xl>
    <v-layout wrap align-center>
      <v-flex xs12 sm6 d-flex>
        <v-select v-model="selected" id="asdf">
          <option v-for="item in categories" :key='item.category'>{{ item.category }}</option>
      </v-select>
        
        <!-- <v-select
          
          :items="item in category"
          label="Select Category"
          solo
        ></v-select> -->
      </v-flex>


      <v-flex>
        <ul style="list-style-type: none; padding: 0">
          <li v-for="(data, index) in filteredArticles" :key='index.data'>
            <v-card class="elevation-20">
              <v-card-title>{{ data.title }}</v-card-title>
              <v-card-text class="pl-80">{{ data.abstract }}</v-card-text>
              <v-card-actions class="pl-8">
                <a class="pl-8" :href='data.url' target="_blank">See full article here</a>
              </v-card-actions>
            </v-card>
          </li>
        </ul>
        <!-- <v-img
          src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
          aspect-ratio="2.75"
        ></v-img> -->

    </v-flex>
    <v-footer class="pa-3 text-xs-center " fixed>
      <!-- <v-spacer></v-spacer> -->
      <div class="text-xs-center">Articles Sourced From The New York Times Top Stories API  &copy; {{ new Date().getFullYear() }}</div>
    </v-footer>

    </v-layout>
  </v-container>
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
        { category: 'home' }, 
        { category: 'opinion' }, 
        { category: 'world' }, 
        { category: 'national' }, 
        { category: 'politics' }, 
        { category: 'upshot' }, 
        { category: 'nyregion' }, 
        { category: 'business' }, 
        { category: 'technology' }, 
        { category: 'science' }, 
        { category: 'health' }, 
        { category: 'sports' }, 
        { category: 'arts' }, 
        { category: 'books' }, 
        { category: 'movies' }, 
        { category: 'theater' }, 
        { category: 'sundayreview' }, 
        { category: 'fashion' }, 
        { category: 'tmagazine' }, 
        { category: 'food' }, 
        { category: 'travel' }, 
        { category: 'magazine' }, 
        { category: 'realestate' }, 
        { category: 'automobiles' }, 
        { category: 'obituaries' }, 
        { category: 'insider' }
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


