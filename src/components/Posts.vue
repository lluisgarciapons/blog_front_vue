<template>
  <!-- <v-container>
    <v-layout
      row
      wrap
    >
      <v-flex
        xs12
        sm6
        offset-sm3
        v-for="post in posts"
        :key="post.id"
        mb-2
      >
        <v-card>
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
            aspect-ratio="2.75"
          ></v-img>
          <v-card-text>
            <v-card-title primary-title>
              <h3 class="headline mb-0">{{post.title}}</h3>
            </v-card-title>
            <v-card-text>{{post.body}}</v-card-text>
            <v-card-footer class="card-footer">
              <v-card-text>by: <span>{{post.creator.username}}</span></v-card-text>
              <v-card-text>{{getDate(post.creationDate)}}</v-card-text>
            </v-card-footer>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container> -->
  <v-container id="app">
    <v-layout
      row
      wrap
      justify-space-around
      class="card-row"
    >
      <v-flex
        md8
        sm10
        xs12
        class="card"
        v-for="(post, index) in posts"
        :key="index"
        :ref="`card_${index}`"
        @mouseover="hoverCard(index)"
        @mouseout="hoverCard(-1)"
      >

        <img
          class="card-image"
          :class="{'selected': isSelected(index)}"
          :src="post.image"
        >

        <div
          class="card-footer"
          :class="{'selected': isSelected(index)}"
        >
          <p
            class="card-text"
            :class="{'selected': isSelected(index)}"
          >RECIPE</p>
          <h3 class="card-title">{{post.title}}</h3>
          <p
            v-show="isSelected(index)"
            class="text-body"
          >
            {{post.body}}
          </p>
          <div class="bottom-part">
            <p class="card-text">by
              <span
                class="card-author"
                :class="{'selected': isSelected(index)}"
              >
                {{post.creator.username}}
              </span>
            </p>
            <v-btn
              v-show="isSelected(index)"
              depressed
              small
              outline
              class="post-button"
            >Go to post</v-btn>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  export default {
    data() {
      return {
        posts: [],
        cards: [
          {
            title: "Gooey PBJ Brownies",
            author: "John Walibur",
            image: "https://placeimg.com/640/480/nature"
          },
          {
            title: "Crisp Spanish Tortilla Matzo Brei",
            author: "Colman Andrews",
            image: "https://placeimg.com/640/480/animals"
          },
          {
            title: "Grilled Shrimp with Lemon and Garlic",
            author: "Celeste Mills",
            image: "https://placeimg.com/640/480/arch"
          }
        ],
        selectedCard: -1
      };
    },
    methods: {
      getDate(date) {
        return new Date(date).toLocaleDateString();
      },
      hoverCard(selectedIndex) {
        this.selectedCard = selectedIndex;
      },
      isSelected(cardIndex) {
        return this.selectedCard === cardIndex;
      }
    },
    created() {
      this.posts = this.$store.getters.posts;
    }
  };
</script>
<style lang="scss" scoped>
  .card-row {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    min-width: 350px;
    width: 100%;
  }

  .card {
    position: relative;
    background-color: #ffffff;
    // height: 370px;
    // width: 240px;
    margin: 10px;
    overflow: hidden;
    height: 410px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
    transition: height 1s, box-shadow 0.3s;
  }
  .card:hover {
    // height: 570px;
    box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.5);
  }

  .card-image {
    /* center horizontally overflown image */
    position: absolute;
    left: -9999px;
    right: -9999px;
    margin: auto;
    height: 540px;
    min-width: 100%;
    opacity: 0.9;
    transition: height 1.5s, opacity 0.8s;
  }
  .card-image.selected {
    height: 760px;
    opacity: 0.5;
  }
  .card-footer {
    position: absolute;
    bottom: 0;
    // height: 130px;
    padding: 10px 15px;
    font-family: Helvetica;
    transition: background-image 0.3s;
  }
  .card-footer.selected {
    background-image: linear-gradient(transparent, rgb(134, 134, 134));
  }
  .text-body,
  .card-text {
    font-size: 14px;
    color: rgb(27, 27, 27);
    opacity: 0.7;
    transition: font-size 0.3s, opacity 0.3s, color 0.3s;
  }
  .card-text.selected {
    font-size: 30px;
    font-weight: bold;
    opacity: 1;
    // color: white;
  }
  .card-title {
    font-family: Serif;
  }
  .card-author {
    font-size: 14px;
    color: #bab096;

    transition: color 0.3s;
  }
  .card-author.selected {
    color: #6a6456;
  }
  .bottom-part {
    display: flex;
    justify-content: space-between;
  }
  .post-button {
    border-radius: 50px;
    color: rgb(231, 231, 231);
    opacity: 1;
    align-self: flex-end;
  }
</style>
