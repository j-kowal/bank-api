/* 

DISPLAY CLASS - this class will be performint screen operations like:
 - changing current screen
 - handling on-screen events
 - handling API calls

*/

//import dependencies
import * as Views from './views'
import { get, post } from './request'
import swal from 'sweetalert2';

export default class Display {

    //function populating selector with options of all accounts
    getUserAccounts(selector) {
        return get("http://localhost:8080/BankApi/user/accounts", { id: window.state.userid })
        .then(res => {
            let options = ""
            res.map(acc => {
                options += 
                `<option>${acc.accNumber}</option>`
            })
            this.app.querySelector(selector).innerHTML = options
        })
    }

    //function making API call to backend to retrive info about user
    getUserDashboard() {
        get("http://localhost:8080/BankApi/user", { id: window.state.userid }).then(res => {
            this.app.querySelector('#welcomeTxt').innerHTML = res.firstname
            let temp = "" 
            res.accounts.map(acc => {
                let transactions = ""
                acc.transactions.map(tr => {
                    transactions += `
                    <tr>
                        <td>${tr.id}</td>
                        <td>${tr.type}</td>
                        <td>${tr.description}</td>
                        <td>${tr.date}</td>
                        <td><i class="fab fa-btc"></i>${tr.value}</td>
                        <td><i class="fab fa-btc"></i>${tr.balanceAfter}</td>
                    </tr>
                    `
                })
                temp += `
                <div class="account-details">
                <div>
                    <p class="title is-2">Account Number: ${acc.accNumber}</p>
                    <p class="subtitle is-4">Sort Code: ${acc.sortCode}</p>
                </div>
                <p class="title is-1" style="margin-left:auto">Balance: <i class="fab fa-btc"></i>${acc.currentBalance}</p>
                </div>
                <h4 class="subtitle">Transactions for AC: ${acc.accNumber}</h4>
                <table class="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Balance After</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${transactions}
                    </tbody>
                </table>
                `
            })
            this.app.querySelector('.accounts').innerHTML = temp;
        })
    }
    //function adding new account to the user
    addAccount() {
        this.removeActiveTabs()
        get('http://localhost:8080/BankApi/newaccount', { id: window.state.userid} )
        .then(res => {
            if(res === true) {
                swal("Success", "New Account was created see dashboard for changes.", "success")
                .then(() => { this.showDashboard() })
            }
        })
    }
    //log off function
    signOut() {
        if(!window.state.authorised) 
            return this.showLogin()
        
        post("http://localhost:8080/BankApi/logout", null, {id: window.state.userid}).then(res => {
            if(res === true) {
                window.state.authorised = false
                delete window.state.userid
                this.showLogin()
            }
            else {
                swal("Ooops", "Something wrong with logout...", "error")
            }
        })
    }
    //function shows withdrawal screen
    showWithdrawal() {
        if(!window.state.authorised) 
            return this.showLogin()
        this.sidebar.classList.add('visible')
        this.app.innerHTML = this.views.withdrawal

        this.getUserAccounts('select[name=from]')

        let temp = {}
        this.app.querySelector('button').addEventListener('click', () => {
            this.app.querySelectorAll('input, select').forEach(obj => {
                temp[obj.getAttribute("name")] = obj.value
            })
            temp.type = "withdrawal"
            temp.description = "Money withdraw."
            post('http://localhost:8080/BankApi/withdrawal', { from: temp.from }, temp)
            .then(res =>{
                if(res === true) {
                    swal("Thank You!", "Your withdraw is completed.", "success")
                    .then(() => { this.showDashboard() })
                }
                else {
                    swal("Ooops", "Something went wrong with transaction.", "error")
                }
            })
        })

    }
    //function displaying dashboard (using getUserDashboard function)
    showDashboard() {
        if(!window.state.authorised) 
            return this.showLogin()
        this.sidebar.classList.add('visible')
        this.removeActiveTabs()
        this.sidebarIcons[0].classList.add('active')
        this.app.innerHTML = this.views.dashboard
        this.getUserDashboard()
    }

    //switch method which is handling click on sidebar
    selectScreenFromTabs(active) {
        switch(active) {
            case 'dashboard':
                this.showLogin()
                break;
            case 'transfer':
                this.showTransfer()
                break;
            case 'lodgement':
                this.showLodgement()
                break;
            case 'withdrawal':
                this.showWithdrawal()
                break;
            case 'add':
                this.addAccount()
                break;
            case 'signout':
                this.signOut()
                break;
        }
    }
    //reseting active sidebar tab
    removeActiveTabs() {
        this.sidebarIcons.forEach(icon => {
            icon.classList.remove('active')
        })
    }
    //event handler to sidebar tabs - clicking
    addSidebarClicks() {
        this.sidebarIcons.forEach(icon => {
            icon.addEventListener('click', () => {
                this.removeActiveTabs()
                let active = icon.dataset.id
                icon.classList.add('active')
                this.selectScreenFromTabs(active)
            })
        })
    }
    //function showing lodgement screen
    showLodgement() {

        if(!window.state.authorised) 
            return this.showLogin()

        this.sidebar.classList.add('visible')
        this.app.innerHTML = this.views.lodgement

        this.getUserAccounts('select[name=to]')
        
        let temp = {}
        this.app.querySelector('button').addEventListener('click', () => {
            this.app.querySelectorAll('input, select').forEach(obj => {
                temp[obj.getAttribute("name")] = obj.value
            })
            temp.type = "lodgement"
            temp.description = "lodgement from teller"
            post('http://localhost:8080/BankApi/lodge', { to: temp.to }, temp)
            .then(res =>{
                if(res === true) {
                    swal("Thank You!", "Your lodgement is completed.", "success")
                    .then(() => { this.showDashboard() })
                }
                else {
                    swal("Ooops", "Something went wrong with transaction.", "error")
                }
            })
        })

    }
    //function showing transfer screen
    showTransfer() {
        if(!window.state.authorised) 
            return this.showLogin()
        this.sidebar.classList.add('visible')
        this.app.innerHTML = this.views.transfer

        this.getUserAccounts('select[name=from]')
        
        let temp = {}
        this.app.querySelector('button').addEventListener('click', () => {
            this.app.querySelectorAll('input, select').forEach(obj => {
                temp[obj.getAttribute("name")] = obj.value
            })
            post('http://localhost:8080/BankApi/transfer', { to: temp.to, from: temp.from }, temp)
            .then(res =>{
                if(res === true) {
                    swal("Thank You!", "Your transfer is completed.", "success")
                    .then(() => { this.showDashboard() })
                }
                else {
                    swal("Ooops", "Something went wrong with transaction.", "error")
                }
            })
        })
    }
    //function shows thank-you screen after registration
    showAfterRegistration(id) {
        this.sidebar.classList.remove('visible')
        this.app.innerHTML = this.views.afterRegistration
        this.app.querySelector('#newId').innerHTML = id
        this.app.querySelector('.button').addEventListener('click', () => {
            this.showTransfer()
        })
    }
    //function displays registration screen
    showRegistration() {
        this.sidebar.classList.remove('visible')
        this.app.innerHTML = this.views.registration
        this.app.querySelector('.button').addEventListener('click', () => {
            let check = true;
            

            document.querySelectorAll('input').forEach(input => {
                if(input.value === "") check = false;
            })
            
            const pass1 = document.querySelector('input[name=password]');
            const pass2 = document.querySelector('input[name=repeatPassword]');
            let passwordsSame = pass1.value === pass2.value;

            if(check && passwordsSame) {
                let temp = {}
                document.querySelectorAll('input').forEach(input => {
                    let key = input.getAttribute("name")
                    let val = input.value
                    temp[key] = val
                })
                post("http://localhost:8080/BankApi/newuser", null, temp).then(res => {
                    if(res !== 0) {
                        this.showAfterRegistration(res)
                    }
                    else {
                        swal("Ooops", "Something wrong registration...", "error")
                    }
                })
            }
            else if(check && !passwordsSame) {
                swal("Ooops", "Password you repeated is not the same.", "error")
            }
            else {
                swal("Ooops...", "Please fill all user inputs", "error");
            }
            
        })
    }
    //function shows login screen
    showLogin() {
        //is authorised?
        if(window.state.authorised) 
            return this.showDashboard()
        this.sidebar.classList.remove('visible')
        this.app.innerHTML = this.views.login;
        this.loginBtn = this.app.querySelector(".button");
        this.signUpBtn = this.app.querySelector(".signup")

        this.loginBtn.addEventListener('click', () => {
            let check = true;
            document.querySelectorAll('input').forEach(input => {
                if(input.value === "") check = false;
            })

            if(check) {
                let temp = {}
                document.querySelectorAll('input').forEach(input => {
                    let key = input.getAttribute("name")
                    let val = input.value
                    temp[key] = val
                })
                post("http://localhost:8080/BankApi/login", null, temp).then(res => {
                    if(res === true) {
                        window.state.userid = temp.id
                        window.state.authorised = true
                        this.showDashboard()
                    }
                    else {
                        swal("Ooops", "Something wrong with credentials...", "error")
                    }
                })
            }
            else {
                swal("Ooops...", "Please fill all user inputs", "error");
            }
            
        });
        this.signUpBtn.addEventListener('click', () => {
            this.showRegistration()
        });
    }
    //constructor function
    constructor(app) {
        this.app = app
        this.views = Views
        this.sidebar = document.querySelector('.sidebar')
        this.sidebar.innerHTML = this.views.sidebar
        this.sidebarIcons = this.sidebar.querySelectorAll('.sidebar-icon')
        this.addSidebarClicks()
        this.showLogin()
    }

} 
