<template>
  <div>
    <v-navigation-drawer
      class="hidden-sm-and-up"
      v-model="drawer"
      absolute
      temporary
    >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list
        class="pt-0"
        dense
      >
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          :to="item.to"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar>
      <v-toolbar-side-icon
        class="hidden-sm-and-up"
        @click.stop="drawer = !drawer"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/">Home</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <template v-if="!$store.getters.login">
          <v-btn
            flat
            to="/login"
          >Login</v-btn>
          <v-btn
            flat
            to="/signup"
          >Create Account</v-btn>
        </template>
        <template v-else>
          <v-btn
            flat
            @click="logout"
          >Logout</v-btn>
          <v-btn
            flat
            to="/newPost"
          >Create New Post</v-btn>
        </template>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        drawer: null,
        items: [
          { title: "home", icon: "home", to: "/" },
          { title: "Log In", icon: "dashboard", to: "/login" },
          { title: "Create account", icon: "dashboard", to: "/signup" },
          { title: "New Post", icon: "dashboard", to: "/newPost" }
        ]
      };
    },
    methods: {
      logout: function() {
        this.$store.dispatch("logout");
      }
    }
  };
</script>
