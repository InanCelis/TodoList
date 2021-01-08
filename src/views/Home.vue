<template>
  <div id="app">
    <SearchTodo  v-model="search" v-on:search-option="searchOption"/>
    <div class="home">
      <AddTodo v-on:add-todo="addTodo"/>
      <Todos v-bind:todos="todos" v-on:del-todo="deleteTodo"/>
      <div class="bottom">
        <button class="btn show-more" @click="showmore" >+ Show More Data </button>
        <p class="num">Number of data: <b> {{ todoNumber }}</b></p>
      </div>
      
    </div>
    
  </div>
</template>

<script>
import SearchTodo from '../components/SearchTodo';
import Todos from '../components/Todos';
import AddTodo from '../components/AddTodo';
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    SearchTodo,
    Todos, 
    AddTodo
  },

  data () {
    return {
      todos: [],
      todoNumber: 5,
      search:'',
      seachCategories:null,
    }
  },
  created() {
    this.getTodo();
  },
  watch: {
    search() {
      this.doSearch();
    }
  },
  methods: {
    getTodo () {
      axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${this.todoNumber}`)
      .then(res => this.todos = res.data)
      .catch(err => console.log(err));
    },

    doSearch() {
      if(this.seachCategories) {
        if(this.search){
          axios.get('https://jsonplaceholder.typicode.com/todos?'+this.seachCategories+ '=' + this.search)
          .then((response) => {this.todos = response.data})
          .catch(e => console.log(e));
        } else {
          this.getTodo();
        }
      } 
      else {
        this.$swal({
            icon: 'error',
            title: 'Opps..',
            text: 'Please Select Categories to Search',
        });
      }
      
    },
    searchOption(val){
      this.seachCategories = val;
    },
    
    addTodo(newTodo) {
      const { title, completed } = newTodo;
      if(title){
        axios.post('https://jsonplaceholder.typicode.com/todos', {
          title, 
          completed
        })
        .then(res => this.todos = [...this.todos, res.data])
        .catch(err => console.log(err));
        this.todoNumber += 1;
      } else {
        this.$swal({
            icon: 'error',
            title: 'Opps..',
            text: 'No value to add.',
        });
      }
    },

    deleteTodo(id){
      //filter all todo item except this id
      this.$swal({
          icon: 'warning',
          title: 'Confirm',
          text:'Are you sure, do you want to remove it?',
          showCancelButton: true,
          confirmButtonText: `Yes`,
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
          .then(this.todos = this.todos.filter(todo => todo.id !== id))
          .catch(err => console.log(err));
          this.todoNumber -= 1;
          this.$swal({
              icon: 'success',
              title: 'Deleted',
              text: 'Successfully Deleted',
          })
        } else {
          return false;
        }
          
      })
     
    },

    showmore() {
      this.todoNumber += 5;
      this.getTodo();
    },
    
  },
  
}
</script>

<style>
 *{
   box-sizing: border-box;
   margin: 0;
   padding: 0;
 }

 body {
   font-family: Arial, Helvetica, sans-serif;
   line-height: 1.4;
 }

 .btn {
   display: inline-block;
   border: none;
   background: #555;
   color: #fff;
   padding: 7px 20px;
   cursor: pointer;
 }

 .btn:hover {
   background: #666;
 }
 .show-more {
   margin: 5px;
 }
 .home {
   padding: 20px;
 }
 
 .bottom {
   display: flex;
   justify-content: space-between;
 }
 
 input:focus {
    background-color:#fafafa;
    border: none;
  }
</style>
