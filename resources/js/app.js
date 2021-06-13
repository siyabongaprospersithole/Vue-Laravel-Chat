/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue').default;

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))
import VueChatScroll from 'vue-chat-scroll';

Vue.use(VueChatScroll);
import Toaster from 'v-toaster'
 
// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'v-toaster/dist/v-toaster.css'
 
// optional set default imeout, the default is 10000 (10 seconds).
Vue.use(Toaster, {timeout: 5000})





Vue.component('message-component', require('./components/message.vue').default);


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    data: {
        message: '',
        chat: {
            message: [],
            user: [],
            color: [],
            time: [],
        },
        typing: '',
        numberOfusers : 0
    },
    
    watch: {
        message(){
            Echo.private(`chat`)
            .whisper('typing', {
                name: this.message
            });
        }
    },methods: {
        send: function(){
            if(this.message.length > 0){
                this.chat.message.push(this.message)
                this.chat.user.push('You')
                this.chat.color.push('success')
                this.chat.time.push(this.getTime())
                
                axios.post('/send', {
                    message: this.message
                  })
                  .then(function (response) {
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
                  this.message = '';
            }
            
        },
        getTime(){
            let time = new Date(); 

            return time.getHours()+":"+time.getMinutes();
        }
    },
    mounted(){
        console.log("listening");
        Echo.private(`chat`)
        .listen('ChatEvent', (e) => {
            console.log(e);
            this.chat.message.push(e.message)
            this.chat.user.push(e.user)
            this.chat.color.push('danger')
            this.chat.time.push(this.getTime())
        }).listenForWhisper('typing', (e) => {
            if(e.name){
               this.typing =  "Typing";
            }else{
                this.typing =  "";
            }
            
        });


        Echo.join(`chat`)
            .here((users) => {
                this.numberOfusers = users.length;
            })
            .joining((user) => {
                this.numberOfusers += 1;
                this.$toaster.success(user.name+" has joined");
            })
            .leaving((user) => {
                this.numberOfusers -= 1;
                this.$toaster.success(user.name+" has left");
            }) 
            .error((error) => {
                console.error(error);
            });


    }                                  
                    });
