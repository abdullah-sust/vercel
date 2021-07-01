<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
           <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Login</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid">
                            <v-text-field
                                id="login"
                                name="login"
                                label="Login"
                                type="text"
                                v-model="user.email"
                                :rules="emailRules"
                            ></v-text-field>
                            <v-text-field
                                id="password"
                                name="password"
                                label="Password"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showPassword ? 'text' : 'password'"
                                @click:append="showPassword = !showPassword"
                                v-model="user.password"
                                :rules="[ passwordRules.required, passwordRules.min, passwordRules.max , passwordRules.upperCase , passwordRules.lowerCase, passwordRules.number, passwordRules.specialChar ]"
                            ></v-text-field>
                            <label>Don't have an account? </label>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" :disabled="user.email === null || user.password === null || valid === false" @click="onLoggedIn">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Login',

  data: () => ({
    user: {
      email: null,
      password: null
    },
    valid: false,
    showPassword: false,
    minPasswordChar: 6,
    maxPasswordChar: 20,
    emailRules: [
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: {
      required: v => !!v || 'Required.',
      min: v => (v || '').length >= 6 || ' Minimum 6 characters',
      max: v => (v || '').length <= 20 || ' Maximum 20 characters',
      upperCase: v => (/[a-z]+/).test(v || '') || 'At least one lowercase letter required.',
      lowerCase: v => (/[A-Z]+/).test(v || '') || 'At least one uppercase letter required.',
      number: v => (/[0-9]+/).test(v || '') || 'At least one number required.',
      specialChar: v => !(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/).test(v || '') || 'No special characters allowed'
    }
  }),

  methods: {

    onLoggedIn () {
      localStorage.setItem('isUserLoggedIn', '1')
      location.reload()
    }
  }
})
</script>
