import * as Views from './views'
import { get, post } from './request'
import swal from 'sweetalert2';

export default class Display {

    getUserDashboard() {
        get("http://localhost:8080/BankApi/user", { id: window.state.userid }).then(res => {
            this.app.querySelector('#welcomeTxt').innerHTML = res.firstname
            let temp = "" 
            res.accounts.map(acc => {
                let transactions = ""
                acc.transactions.map(tr => {
                    transactions += `
                    <div class="account-transaction">
                        <p>${tr.id}</p>
                        <p>${tr.type}</p>
                        <p>${tr.value}</p>
                        <p>${tr.date}</p>
                        <p>${tr.balanceAfter}</p>
                        <p>${tr.description}</p>
                    </div>
                    `
                })
                temp += `
                <div class="account-detais">
                    <p>Sort code: ${acc.sortCode}</p>
                    <p>Account number: ${acc.accNumber}</p>
                    <p>Balance: ${acc.currentBalance}</p>
                    <div class="transactions">
                        ${transactions}
                    </div>
                </div>
                `
            })
            this.app.querySelector('.accounts').innerHTML = temp;
        })
    }

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

    showWithdrawal() {
        if(!window.state.authorised) 
            return this.showLogin()
        this.sidebar.classList.add('visible')
        this.app.innerHTML = this.views.withdrawal
    }

    showDashboard() {
        if(!window.state.authorised) 
            return this.showLogin()
        this.sidebar.classList.add('visible')
        this.removeActiveTabs()
        this.sidebarIcons[0].classList.add('active')
        this.app.innerHTML = this.views.dashboard
        this.getUserDashboard()
    }

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
            case 'signout':
                this.signOut()
                break;
        }
    }

    removeActiveTabs() {
        this.sidebarIcons.forEach(icon => {
            icon.classList.remove('active')
        })
    }

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

    showLodgement() {
        if(!window.state.authorised) 
            return this.showLogin()
        this.sidebar.classList.add('visible')
        this.app.innerHTML = this.views.lodgement
    }

    showTransfer() {
        if(!window.state.authorised) 
            return this.showLogin()
        this.sidebar.classList.add('visible')
        this.app.innerHTML = this.views.transfer
        this.app.querySelector('.button').addEventListener('click', () => {
            this.showLodgement()
        })
    }

    showAfterRegistration(id) {
        this.sidebar.classList.remove('visible')
        this.app.innerHTML = this.views.afterRegistration
        this.app.querySelector('#newId').innerHTML = id
        this.app.querySelector('.button').addEventListener('click', () => {
            this.showTransfer()
        })
    }

    showRegistration() {
        this.sidebar.classList.remove('visible')
        this.app.innerHTML = this.views.registration
        this.app.querySelector('.button').addEventListener('click', () => {
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
                    alert('Problems with registration')
                }
            })
        })
    }
    
    showLogin() {
        if(window.state.authorised) 
            return this.showDashboard()
        this.sidebar.classList.remove('visible')
        this.app.innerHTML = this.views.login;
        this.loginBtn = this.app.querySelector(".button");
        this.signUpBtn = this.app.querySelector(".signup")
        
        this.app.querySelector('.logo').addEventListener('click', () => { window.state.authorised = true })

        this.loginBtn.addEventListener('click', () => {
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
        });
        this.signUpBtn.addEventListener('click', () => {
            this.showRegistration()
        });
    }
    
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
