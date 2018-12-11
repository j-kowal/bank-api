import './scss/style.scss'
import 'bulma'
import '@fortawesome/fontawesome-free/js/all'
import Display from './components/display'


const app = document.querySelector('#app')

window.state = {}

window.state.authorised = false;

const display = new Display(app)

display.showLogin();


