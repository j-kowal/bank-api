export const login =
`
<section class="hero is-fullheight has-text-centered">
    <div class="hero-body">
      <div class="container">
        <img src="/images/logo.svg" class="logo">
        <div class="column is-4 is-offset-4">
            <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input class="input is-warning is-medium" type="email" placeholder="ID">
                <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
                </span>
            </p>
            </div>
            <div class="field">
            <p class="control has-icons-left">
                <input class="input is-warning is-medium" type="password" placeholder="Password">
                <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
                </span>
            </p>
            </div>
            <div class="field">
            <p class="control">
                <button class="button is-warning is-pulled-right is-medium">
                Login
                </button>
            </p>
            </div>
        </div>
        <div style="margin-top:60px">
            <p>Still no account? <span class="signup">Sign up</span> today!</p>
        </div>
      </div>
    </div>
</section>
`

export const registration =
`
<div class="container">

    <div class="column has-text-centered">
        <img src="/images/logo.svg" class="logo top">
    </div>
    
    <hr>
    <h1 class="title has-text-centered">Registration</h1>
    <div class="column is-6 is-offset-3">
        <div class="field">
            <label class="label is-small">First Name</label>
            <div class="control">
                <input name="firstname" class="input is-warning" type="text" placeholder="e.g. John">
            </div>
        </div>
        <div class="field">
            <label class="label is-small">Last Name</label>
            <div class="control">
                <input name="lastname" class="input is-warning" type="text" placeholder="e.g. Doe">
            </div>
        </div>
        <div class="field">
            <label class="label is-small">Address</label>
            <div class="control">
                <input name="address" class="input is-warning" type="text" placeholder="e.g. Camden Court 4">
            </div>
        </div>
        <div class="field">
            <label class="label is-small">E-mail</label>
            <div class="control">
                <input name="email" class="input is-warning" type="email" placeholder="e.g. john@mail.com">
            </div>
        </div>
        <div class="field">
            <label class="label is-small">Password</label>
            <div class="control">
                <input name="password" class="input is-warning" type="password" placeholder="Your password...">
            </div>
        </div>
        <div class="field">
            <label class="label is-small">Password Repeat</label>
            <div class="control">
                <input name="repeatPassword" class="input is-warning" type="password" placeholder="Repeat your password...">
            </div>
        </div>
        <div class="field">
            <button class="button is-warning is-pulled-right is-medium"><i class="far fa-address-card"></i> Register</button>
        </div>
    </div>
</div>
`

export const afterRegistration =
`
<section class="hero is-fullheight has-text-centered">
    <div class="hero-body">
      <div class="container">
        <h1 style="font-size:6em"><i class="fas fa-check check"></i></h1>
        <h1 class="title is-size-1">Thanks for registering!</h1>
        <h1 class="subtitle is-size-3">Your ID is: <span id="newId"></span> please remember it for future.</h1>
        <button class="button is-warning is-medium">Login</button>
    </div>
</section>
`

export const dashboard = 
`
<div class="container">

    <div class="column has-text-centered">
        <img src="/images/logo.svg" class="logo top">
    </div>
    
    <hr>
    <h1 class="title has-text-centered">Dashboard</h1>

</div>
`

export const transfer = 
`
<div class="container">

    <div class="column has-text-centered">
        <img src="/images/logo.svg" class="logo top">
    </div>
    
    <hr>
    <h1 class="title has-text-centered">Transfer</h1>
    <div class="column is-6 is-offset-3">
        <div class="field">
            <label class="label is-small">From</label>
            <div class="control has-icons-left">
                <div class="select is-warning is-fullwidth">
                    <select name="from">
                    <option selected disabled>Account</option>
                    <option>125412</option>
                    <option>5325235</option>
                    </select>
                </div>
                <div class="icon is-small is-left">
                    <i class="fab fa-bitcoin"></i>
                </div>
            </div>
        </div>
        <div class="field">
            <label class="label is-small">To</label>
            <p class="control has-icons-left has-icons-right">
                <input class="input is-warning" name="to" type="number" placeholder="To...">
                <span class="icon is-small is-left">
                    <i class="fas fa-sign-in-alt"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <label class="label is-small">Amount</label>
            <p class="control has-icons-left has-icons-right">
                <input class="input is-warning" name="amount" type="number" placeholder="Amount...">
                <span class="icon is-small is-left">
                    <i class="fas fa-euro-sign"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <label class="label is-small">Message</label>
            <p class="control has-icons-left has-icons-right">
                <input class="input is-warning" name="message" type="text" placeholder="Message to beneficiary...">
                <span class="icon is-small is-left">
                    <i class="far fa-comment"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <button class="button is-warning is-pulled-right is-medium"><i class="fas fa-exchange-alt"></i> Make Transfer</button>
        </div>
    </div>
</div>
`

export const lodgement = 
`
<div class="container">

    <div class="column has-text-centered">
        <img src="/images/logo.svg" class="logo top">
    </div>
    
    <hr>
    <h1 class="title has-text-centered">Lodgement</h1>
    <div class="column is-6 is-offset-3">
        <div class="field">
            <label class="label is-small">To</label>
            <div class="control has-icons-left">
                <div class="select is-warning is-fullwidth">
                    <select name="to">
                    <option selected disabled>Account</option>
                    <option>125412</option>
                    <option>5325235</option>
                    </select>
                </div>
                <div class="icon is-small is-left">
                    <i class="fab fa-bitcoin"></i>
                </div>
            </div>
        </div>
        <div class="field">
            <label class="label is-small">Amount</label>
            <p class="control has-icons-left has-icons-right">
                <input class="input is-warning" name="amount" type="number" placeholder="Amount...">
                <span class="icon is-small is-left">
                    <i class="fas fa-euro-sign"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <button class="button is-warning is-pulled-right is-medium"><i class="fab fa-bitcoin"></i> Lodge Money</button>
        </div>
    </div>
</div>
`

export const withdrawal = 
`
<div class="container">

    <div class="column has-text-centered">
        <img src="/images/logo.svg" class="logo top">
    </div>
    
    <hr>
    <h1 class="title has-text-centered">Withdrawal</h1>
    <div class="column is-6 is-offset-3">
        <div class="field">
            <label class="label is-small">From</label>
            <div class="control has-icons-left">
                <div class="select is-warning is-fullwidth">
                    <select name="from">
                    <option selected disabled>Account</option>
                    <option>125412</option>
                    <option>5325235</option>
                    </select>
                </div>
                <div class="icon is-small is-left">
                    <i class="fab fa-bitcoin"></i>
                </div>
            </div>
        </div>
        <div class="field">
            <label class="label is-small">Amount</label>
            <p class="control has-icons-left has-icons-right">
                <input class="input is-warning" name="amount" type="number" placeholder="Amount...">
                <span class="icon is-small is-left">
                    <i class="fas fa-euro-sign"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <button class="button is-warning is-pulled-right is-medium"><i class="fas fa-money-bill-alt"></i> Withdraw Money</button>
        </div>
    </div>
</div>
`

export const sidebar = 
`
<div class="sidebar-icon" data-id="dashboard"><i class="fas fa-home"></i></div>
<div class="sidebar-icon" data-id="transfer"><i class="fas fa-exchange-alt"></i></div>
<div class="sidebar-icon" data-id="lodgement"><i class="fab fa-bitcoin"></i></div>
<div class="sidebar-icon" data-id="withdrawal"><i class="fas fa-money-bill-alt"></i></div>
<div class="sidebar-icon" data-id="signout"><i class="fas fa-sign-out-alt"></i></div>
`