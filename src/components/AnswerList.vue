<template>
  <v-container class="pt-6">
    <v-row class="text-center">
      <v-col cols="12">
        <v-row justify="center">
          <v-alert
            v-if="isQuestionFound === false"
            dense
            outlined
            type="error"
          >
            No question found!
          </v-alert>
          <v-alert
            v-else
            color="primary"
            dark
            border="top"
            icon="mdi-head-question"
            transition="scale-transition"
          >
            {{ question }}
          </v-alert>
          <v-expansion-panels inset focusable v-if="isQuestionFound === true && answers.length > 0">
            <v-expansion-panel
              v-for="(answer, i) in answers" :key="i"
            >
              <v-expansion-panel-header>{{ answer.substring(0, 50) + ' . . .'}}</v-expansion-panel-header>
              <v-expansion-panel-content>
                {{ answer }}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col class="col-12">
        <v-row>
          <v-alert
            v-if="isQuestionFound === true && answers.length === 0"
            dense
            outlined
            type="error"
          >
            No replies found!
          </v-alert>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AnswerList',

  data: () => ({
    questionId: -1,
    isQuestionFound: false,
    question: null,
    answers: []
  }),

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.questionId = parseInt(this.$route.params.id)
      if (localStorage.getItem('question_list') !== null) {
        var questionList = JSON.parse(localStorage.getItem('question_list'))
        questionList.forEach(item => {
          if (item.id === this.questionId) {
            this.question = item.question
            this.answers = item.answer
            this.isQuestionFound = true
          }
        })
      }
    }
  }
})
</script>
