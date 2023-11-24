<template>
  <div id="app">
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      message: ''
    }
  },
  created() {
    axios.get('http://localhost:5001/')
      .then(response => {
        this.message = response.data;
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }
}
</script>
