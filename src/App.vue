<template>
  <v-app>
    <v-toolbar />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
  import Toolbar from "./components/Toolbar";
  export default {
    name: "App",
    components: {
      "v-toolbar": Toolbar
    },
    data() {
      return {
        //
      };
    }
  };
</script>
