<template>


  <v-container>
    <v-img
    v-for="(item,i) in pics"
    :key="i"
    :src="item.src"></v-img>

    <!-- <h1 class="display-2 text-xs-center font-weight-medium mt-2" style="color: #231F20">Latest News</h1> -->
    <h1  class="header">Latest News</h1>
  


   <!-- vuetify select list. options going to bottom right???? -->
    
    <!-- <v-flex>
        <v-form align-center>
          <v-container fluid grid-list-xl>
            <v-layout wrap align-center>
              <v-select
                style="margin-right: 1000px"
                label="Select A Category"
                :items='categories'
                v-model="selected"
                v-on:change="getNews"
                item-text="category"
                item-value='category'
                solo
              ></v-select>
            </v-layout>
          </v-container>
        </v-form>
      </v-flex> -->

    <v-container text-xs-center>
      <form v-on:change.prevent="getNews">      
        <select v-model="selected" class="dropdown">
          <option value="" disabled selected>Select A Category<span><v-icon>mdi-watch</v-icon></span></option>
          <option v-for="item in categories" :key='item.category' placeholder="asdf">{{ item.category }}</option>
         </select>
       </form>
    </v-container>


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
          </v-card>
        </li>
      </ul>
    </v-flex>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Main',
  data() {
    return {
      news: [],
      selected: '',
      pics: [
        {src: require('@/assets/The_New_York_Times_logo.png')}
      ],
      items: [
        'Foo', 'Bar', 'Fizz', 'Buzz'
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

  },
  methods: {
    getNews: function(e){
      // let categorySelection = e;
      let categorySelection = e.target.options[e.target.options.selectedIndex].value;

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
      }

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
  .header{
    margin-top: 5px;
    margin-bottom: -8px;
    font-size: 50px;
    color: #231F20;
    text-align: center;
  }
 
  a:hover{
    filter: brightness(55%);
     /* border-bottom: 1px solid red; */
    padding-left: 8px;
  }

  form {
    font-size: 25px;
    
  }

  /* select {
    font-size: 10px;
    text-align-last:center; 
    height: 40px;
    background-color: white;

  } */

  .dropdown {
  width: 30%; 
  text-align-last:center; 
  border-bottom: 1px solid black;
  border-color: #666666;
  padding: 9px;
  font-size: 20px;
  font-weight: medium;
  text-transform: capitalize;
  color: #666666;

  /* appearance: none; */
  /* background: url('yoururl/dropdown.png') no-repeat 97% 50% #ffffff; */
  /* background-size: 11px 7px; */
  }

  .dropdown:focus {
    outline: none !important;
    border:1px solid #231F20;
    box-shadow: 0 0 8px #231F20;
}

  .dropdown:hover{
  outline: none !important;
    border:1px solid #231F20;
    box-shadow: 0 0 8px #231F20;
}


  option {
    font-size: 10px;
    background-color: white;
    /* text-align: center; */

  }

  @media (max-width: 940px) {
    .dropdown {
    width: 50%;
  }
}

  @media (max-width: 600px) {
    .dropdown {
      width: 80%;
    } 
    .header {
      font-size: 30px;
    }

}

  div.v-input__slot {
    /* display: flex;
    margin-right: 25px; */
    /* top: 0;
    left: 0; */
    /* margin-right: 1000px; */
  }

  .v-menu__content {
    position: absolute;
    top: -100px;

    /* display: grid;
    margin-top: 10px;
    margin-left: -420px; */

  }

  .v-select-list {
    /* margin-right: 100px; */
  }
</style>


