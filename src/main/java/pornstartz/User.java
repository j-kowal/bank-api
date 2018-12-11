package pornstartz;

import java.util.ArrayList;

public class User {
    public String firstname;
    public String lastname;
    public String address;
    public String email;
    public String password;
    public boolean authenticated;
    public ArrayList<Account> accounts;
    public int id;
    public static int numberForId = 1;

    public User() {
        this.accounts = new ArrayList<Account>();
        this.id = numberForId;
        this.authenticated = false;
        numberForId++;
    }

    public void logIn() {
        authenticated = true;
    }

    public void logOut() {
        authenticated = false;
    }
}
