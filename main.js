import test from "./test.vue"

const app = Vue.createApp({
  /*data() {
    return {
      message: 'Hello Vue!'
    };
  },*/
  components: {
    test
  },
  template: `
  <div>
  <test />
  <div/>`
});

// Mount the app
app.mount('#mainGround');

/*
import Header from './Header.vue';

const app = createApp({
  components: {
    Header, // Register the component
  },
  template: `
    <div>
      <Header />
    </div>
  `,
});

app.mount('#app');

 */