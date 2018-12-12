//MAIN APP JS

//loading styles and dependencies
import './scss/style.scss'
import 'bulma'
import '@fortawesome/fontawesome-free/js/all'
import Display from './components/display'

//app element
const app = document.querySelector('#app')

//global state
window.state = {}
window.state.authorised = false;

//new display object
const display = new Display(app)


