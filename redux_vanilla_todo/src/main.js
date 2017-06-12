import {createStore} from 'redux'

// actions - send to the store using dispatch

const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
let id = 0

function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

function removeTodo(id) {
  return {
    type: REMOVE_TODO,
    id
  }
}

// reducers

const initialState = {
    todos: []
}

function todoApp(state = initialState, action){
    switch(action.type){
        case ADD_TODO:
            id++
            return Object.assign({}, state, {
                    todos: [
                      ...state.todos,
                      {
                        task: action.text,
                        id
                      }
                    ]
                  })
        case REMOVE_TODO:
            let foundIndex = state.todos.findIndex(v => v.id === Number(action.id))
            return Object.assign({}, state, {
                todos: state.todos.slice(0, foundIndex).concat(state.todos.slice(foundIndex+1))
            })
        default:
            return state;
    }
}

// store

let store = createStore(todoApp)

// DOM manipulation

window.onload = function(){
    let todoList = document.getElementById("todoList")
    let newForm = document.getElementById("newTodoForm")

    function removeTodoFromDOM(removed_id){
        let todos = Array.from(document.getElementsByTagName('li'))
        todos.forEach(function(todo){
            if(Number(todo.getAttribute('data-id')) === removed_id){
                todo.remove()
            }
        })
    }

    function removeSingleTodo(removed_id){
        store.dispatch(removeTodo(removed_id))
        removeTodoFromDOM(removed_id)
    }

    function createTodo(state){
        let newTodo = document.createElement("li")
        newTodo.innerText = state.todos[state.todos.length-1].task
        newTodo.innerHTML += '<button>X</button>'
        newTodo.setAttribute('data-id', id)
        newTodo.children[0].addEventListener('click', removeSingleTodo.bind(this,newTodo.getAttribute('data-id')))
        todoList.appendChild(newTodo)
    }

    newForm.addEventListener("submit", function(e){
        store.dispatch(addTodo(e.target.task.value))
        createTodo(store.getState())
        newForm.reset()
    })
}





