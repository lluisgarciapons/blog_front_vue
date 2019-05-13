<template>
  <div>
    <v-form>
      <v-container text-xs-center>
        <v-layout
          row
          wrap
        >
          <v-flex
            xs12
            sm6
            offset-sm3
          >
            <h2>LOGIN</h2>
            <v-text-field
              v-model="username"
              :rules="[rules.required]"
              label="Choose Username"
              clearable
            >
            </v-text-field>
            <v-text-field
              v-model="email"
              :rules="[rules.required, rules.email]"
              label="E-mail"
              clearable
            >
            </v-text-field>
            <v-text-field
              :append-icon="show ? 'visibility_off' : 'visibility'"
              :rules="[rules.required, rules.counter]"
              :type="show ? 'text' : 'password'"
              name="input-10-2"
              label="Password"
              v-model="password"
              value=""
              class="input-group--focused"
              @click:append="show = !show"
              clearable
            ></v-text-field>
            <v-alert
              v-if="error"
              :value="true"
              type="error"
            >
              {{test}}
            </v-alert>
          </v-flex>
        </v-layout>
      </v-container>
      <div class="buttons text-xs-center">
        <v-btn
          class="mb-4"
          color="green lighten-1"
          dark
          @click="logIn"
        >Log In</v-btn>
        <v-spacer></v-spacer>
        <router-link to="/signup">create an account</router-link>
      </div>
    </v-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        email: "",
        username: "",
        rules: {
          required: value => !!value || "Required.",
          counter: value => value.length >= 6 || "Min 6 characters",
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(value) || "Invalid e-mail.";
          }
        },
        show: false,
        password: "",
        password2: "",
        test: "testing",
        error: false
      };
    },
    methods: {
      logIn: function() {
        let payload = {
          username: this.username,
          password: this.password
        };
        this.$store.dispatch("login", payload);
      }
    }
  };
</script>
