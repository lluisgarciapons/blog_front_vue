<template>
  <div class="page">
    <template>
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
              <h2>SIGN IN</h2>
              <v-text-field
                v-model="name"
                :rules="[rules.required]"
                label="Your Name"
                clearable
              >
              </v-text-field>
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
              <v-text-field
                :append-icon="show2 ? 'visibility_off' : 'visibility'"
                :rules="[rules.required, rules.counter]"
                :type="show2 ? 'text' : 'password'"
                name="input-10-2"
                label="Confirm Password"
                v-model="password2"
                value=""
                class="input-group--focused"
                @click:append="show2 = !show2"
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
            color="mb-4 blue lighten-1"
            dark
            @click="signUp"
          >create account</v-btn>
          <v-spacer></v-spacer>
          <router-link to="/login">Back to Login</router-link>
        </div>
      </v-form>
    </template>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    data() {
      return {
        name: "",
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
        show2: false,
        password: "",
        password2: "",
        test: null,
        error: false
      };
    },
    methods: {
      signUp: function() {
        console.log("signup");
        let body = {
          username: this.username,
          password: this.password,
          passwordConfirmation: this.password2
        };
        axios({
          method: "POST",
          url: "https://quiet-savannah-72383.herokuapp.com/register",
          headers: {
            "Content-Type": "application/json"
          },
          data: body
        })
          .then(res => {
            console.log(res);
            // this.$store.dispatch("login");
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };
</script>
