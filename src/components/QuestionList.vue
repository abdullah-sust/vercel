<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <template>
          <v-data-table
            :headers="headers"
            :items="questionList"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar
                flat
              >
                <v-toolbar-title>All Questions</v-toolbar-title>
                <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog
                  v-model="dialog"
                  max-width="500px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click="onAskQuestion"
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      Ask Question
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">Ask Question</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-form
                          ref="form"
                          v-model="valid"
                          lazy-validation
                        >
                          <v-row>
                            <v-col
                              cols="12"
                              sm="12"
                              md="12"
                            >
                              <v-text-field
                                v-model="newQuestion"
                                :rules="questionRules"
                                counter="150"
                                label="Write your question"
                                multiple-line
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        :disabled="newQuestion === ''"
                        @click="save"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.count="{item}">
                  {{ item.answer.length }}
            </template>
            <template v-slot:item.reply="{item}">
                  <v-btn
                    text
                    v-if="isLoggedIn === true"
                    color="primary"
                    @click="clickedReply(item.id)"
                  >
                    Reply
                  </v-btn>
            </template>
            <template v-slot:item.actions="{item}">
                  <v-btn
                    text
                    color="primary"
                    @click="clickedItem(item)"
                  >
                    View answers
                  </v-btn>
            </template>
          </v-data-table>
        </template>
      </v-col>
    </v-row>
    <v-dialog
      v-model="replyDialog"
      max-width="500px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Reply answer</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-form
              ref="form2"
              v-model="valid2"
              lazy-validation
            >
              <v-row>
                <v-col
                  cols="12"
                  sm="12"
                  md="12"
                >
                  <v-text-field
                    v-model="newAnswer"
                    :rules="answerRules"
                    counter="550"
                    label="Write your answer"
                    multiple-line
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="closeReply"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :disabled="newAnswer === ''"
            @click="saveReply()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      color="primary"
      bottom
      right
    >
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    dialog: false,
    replyDialog: false,
    valid: true,
    valid2: true,
    snackbar: false,
    snackbarText: '',
    isLoggedIn: false,
    headers: [
      {
        text: 'Id',
        align: 'start',
        sortable: true,
        value: 'id',
        width: '10%'
      },
      { text: 'Question', value: 'question', width: '60%' },
      { text: 'Total reply', value: 'count', width: '10%' },
      { text: '', value: 'reply', width: '10%' },
      { text: '', value: 'actions', width: '10%' }
    ],
    questionList: [],
    newAnswer: '',
    newQuestion: '',
    questionId: null,
    questionRules: [
      value => !!value || 'This field is required.',
      value => value.length <= 150 || 'Max 150 characters'
    ],
    answerRules: [
      value => !!value || 'This field is required.',
      value => value.length <= 550 || 'Max 550 characters'
    ]
  }),

  computed: {
    // computed properties goes here
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      if (localStorage.getItem('isUserLoggedIn') === '1') {
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
      }
      if (localStorage.getItem('question_list') === null) {
        this.questionList = []
      } else {
        this.questionList = JSON.parse(localStorage.getItem('question_list'))
      }
    },

    clickedItem (item: any) {
      this.$router.push('/answer-list/' + item.id + '/')
    },

    clickedReply (id: any) {
      this.replyDialog = true
      this.questionId = id
    },

    closeReply () {
      this.newAnswer = ''
      this.replyDialog = false
    },

    saveReply () {
      this.questionList.forEach(item => {
        if (item.id === this.questionId) {
          item.answer.push(this.newAnswer)
        }
      })
      localStorage.setItem('question_list', JSON.stringify(this.questionList))
      this.newAnswer = ''
      this.snackbarText = 'Successfully replied'
      this.snackbar = true
      this.replyDialog = false
    },

    close () {
      this.dialog = false
    },

    onAskQuestion () {
      if (this.isLoggedIn === true) {
        this.dialog = true
      } else {
        this.$router.push('/login')
      }
    },

    save () {
      this.questionList.push({ id: this.questionList.length + 1, question: this.newQuestion, answer: [] })
      localStorage.setItem('question_list', JSON.stringify(this.questionList))
      this.newQuestion = ''
      this.snackbarText = 'Successfully saved'
      this.snackbar = true
      this.close()
    }
  }
})
</script>
