<template>
  <div>
    <question-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import QuestionList from '../components/QuestionList.vue'

export default Vue.extend({
  name: 'Home',

  components: {
    QuestionList
  }
})
</script>
