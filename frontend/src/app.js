import './scss/style.scss'
import 'bulma'
import '@fortawesome/fontawesome-free/js/all'
import Display from './components/display'
import swal from 'sweetalert2';


/*/LOGIN
post("http://localhost:8080/BankApi/login", null, {
    id: 1,
    password: "abc"
}).then(res => {
    alert(res)
})
*/

const app = document.querySelector('#app')

window.state = {}

window.state.authorised = false;

const display = new Display(app)


