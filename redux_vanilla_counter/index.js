import {createStore} from 'redux'


const INCREMENT = "INCREMENT"
const DECREMENT = "DECREMENT"
const RESET = "RESET"
const SENDDATA = "SENDDATA"

function increment(){
    return {
        type: 'INCREMENT'
    }
}

function decrement(){
    return {
        type: 'DECREMENT'
    }
}

function reset(){
    return {
        type: 'RESET'
    }
}

function sendData(data){
    return {
        type: "SENDDATA",
        data
    }
}

const initialstate = {
    count: 0,
    info: []
}

function counterApp(state=initialstate, action){
    switch(action.type){
        case SENDDATA:
            state.info = [...state.info, action.data]
            // return Object.assign({}, state, {
            //     info: state.info.concat([action.data])
            // })
            return state
        case INCREMENT:
            state.count++
            return state
        case DECREMENT:
            state.count--
            return state
        case RESET:
            state.count = 0
            return state
        default:
            return state
    }
}

let store = createStore(counterApp)

window.onload = function(){

    let initialState = store.getState()

    console.log(initialState)

    store.dispatch(sendData('FIRST'))

    console.log(store.getState())

    store.dispatch(sendData('SECOND'))

    console.log(store.getState())

    let counter = document.getElementById('counter')

    let plusButton = document.getElementById('plus')

    let minusButton = document.getElementById('minus')

    let resetCount = document.getElementById('reset')

    function displayContent(){
        counter.innerText = store.getState().count
    }

    minusButton.addEventListener("click", function(){
        store.dispatch(decrement())
        displayContent()
    })

    plusButton.addEventListener("click", function(){
        store.dispatch(increment())
        displayContent()
    })

    resetCount.addEventListener('click', function(){
        store.dispatch(reset())
        displayContent()
    })
}