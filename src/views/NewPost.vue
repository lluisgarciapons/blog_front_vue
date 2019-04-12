<template>
  <v-content>
    <v-container fluid>
      <v-flex
        xs12
        sm6
        offset-sm3
        class="text-xs-center text-sm-center text-md-center text-lg-center"
      >
        <v-text-field
          v-model="title"
          :rules="[rules.required]"
          label="Title"
          clearable
        >
        </v-text-field>
        <v-textarea
          v-model="body"
          auto-grow
          box
          height="300px"
          label="Body content"
          rows="1"
        ></v-textarea>
        <img
          :src="imageUrl"
          height="150"
          v-if="imageUrl"
        />
        <v-text-field
          label="Select Image"
          @click='pickFile'
          v-model='imageName'
          prepend-icon='attach_file'
        ></v-text-field>
        <input
          type="file"
          style="display: none"
          ref="image"
          accept="image/*"
          @change="onFilePicked"
        >
        <v-btn
          color="mb-4 blue lighten-1"
          dark
          @click="submit"
        >Submit</v-btn>
      </v-flex>

    </v-container>
  </v-content>
</template>

<script>
  export default {
    data() {
      return {
        title: "",
        body: "",
        rules: {
          required: value => !!value || "Required.",
          counter: value => value.length <= 500 || "Max 500 characters"
        },
        dialog: false,
        imageName: "",
        imageUrl: "",
        imageFile: ""
      };
    },

    methods: {
      pickFile() {
        this.$refs.image.click();
      },

      onFilePicked(e) {
        const files = e.target.files;
        console.log(files);
        console.log("ghigs");
        if (files[0] !== undefined) {
          this.imageName = files[0].name;
          if (this.imageName.lastIndexOf(".") <= 0) {
            return;
          }
          const fr = new FileReader();
          fr.readAsDataURL(files[0]);
          fr.addEventListener("load", () => {
            this.imageUrl = fr.result;
            this.imageFile = files[0]; // this is an image file that can be sent to server...
          });
        } else {
          this.imageName = "";
          this.imageFile = "";
          this.imageUrl = "";
        }
      },
      submit: () => {
        //submit post
      }
    },
    computed: {}
  };
</script>
