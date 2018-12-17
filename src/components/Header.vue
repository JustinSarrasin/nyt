<template>
  <v-container class="header">

    <v-img
    v-for="(item,i) in pics"
    :key="i"
    :src="item.src"></v-img>

    <h1 class="display-3 text-xs-center font-weight-medium mt-1" style="color: #231F20">Latest News</h1>
    <form v-on:change.prevent="getNews">
      <select v-model="selected" id="asdf">
        <option v-for="item in categories" :key='item.category'>{{ item.category }}</option>
      </select>
    </form>

    <!-- <v-container fluid>
      <v-layout row wrap align-center>
        <v-flex xs6> -->
          <!-- <div style="width: 100px"> -->
            <!-- <v-container>
              <v-layout>
                <v-form @change="getNews">
                  <v-select
                    :items="choices"
                    v-model="selected"
                    menu-props="auto"
                    label="Choose A Category"
              
                  ></v-select>
                </v-form>
              </v-layout>
            </v-container> -->
          <!-- </div> -->
        <!-- </v-flex>
      </v-layout>
    </v-container> -->

 


      <v-flex>
        <ul style="list-style-type: none; padding: 0">
          <li  v-for="(data, index) in filteredArticles" :key='index.data'>
            <v-card class="elevation-10 mb-3">
              <v-container class="pa-0">
              <v-card-title  class="headline font-weight-medium white--text" style="background-color: #231F20">{{ data.title }}</v-card-title>
                <v-layout column justify-space-between="">
                  <v-flex>
                    <v-card-text class="body-1 mb-0">{{ data.byline }}</v-card-text>

                  </v-flex>
                  <v-flex>
                    <v-img
                      align-self-end
                      contain
                      v-for="(item,i) in pics"
                      :max-height="500"
                      :key="i"
                      :src="data.image_url"
                      
                      >
                    </v-img>
                    <v-card-text class="subheading">{{ data.abstract }}  <a class="pl-1 red--text " style="text-decoration:none"  :href='data.url' target="_blank">Read more</a>  </v-card-text>
                  </v-flex>
                </v-layout>

              </v-container>
             
              <!-- <v-hover> -->
                <!-- <v-card-actions class="pl-8 red--text" >
                  <a class="pl-2 red--text " style="text-decoration:none"  :href='data.url' target="_blank">See full article here</a>
                </v-card-actions> -->
              <!-- </v-hover> -->
            </v-card>
          </li>
        </ul>
      </v-flex>

    <!-- <v-divider></v-divider> -->
      <v-footer class="mt-3 text-xs-center" style="background-color: #d1d1d1" fixed>
        <!-- <v-spacer></v-spacer> -->
        <div class="text-xs-center">Articles Sourced From The New York Times Top Stories API  &copy; {{ new Date().getFullYear() }}</div>
      </v-footer>

      <!-- </v-layout>
    </v-container> -->
  </v-container>
  
</template>

<script>
import axios from 'axios';

export default {
  name: 'Header',
  data() {
    return {
      news: [],
      selected: {},
      pics: [
        {src: require('@/assets/The_New_York_Times_logo.png')}
      ],
      choices: [
        'sports','asdfas'
      ],
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
    console.log('s', selected);
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

      //    limits posts to 3
      posts.slice(0, postSize).map(i => {
        return newArray.push(i);
      })
      
      //    grabs articles with a photo
      for(let i = 0; i < posts.length; i++){
        posts.map(post => {
          if(post.multimedia[i] !== undefined){
            post.image_url = post.multimedia[i].url
          } 
        })
      };

      console.log(posts);

      newArray.map(article => {
        let newObj = {};
        newObj[article.key] = article.value;
        return newObj;
        console.log('newob', newObject);
      })
      return newArray;
    }
  }
};
</script>

<style>
  a:hover{
    filter: brightness(55%);
    /* border-bottom: 1px solid red;
    padding-left: 8px; */
  }
</style>


