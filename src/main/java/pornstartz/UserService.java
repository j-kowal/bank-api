/**
 * USERS SERVICE IS RESPONDING ON ACTIONS IN RESOURCE
 */

package pornstartz;

import java.util.ArrayList;
import java.util.Map;

public class UserService {
    private Map<Integer, User> users;
    private Map<Integer, Account> accounts;

    //constructor
    public UserService() {
        users = DatabaseStub.users;
        accounts = DatabaseStub.accounts;
    }

    //add user method
    public void addUser(User user){
        users.put(user.id, user);
        Account acc = new Account();
        accounts.put(acc.accNumber, acc);
        users.get(user.id).accounts.add(accounts.get(acc.accNumber));
    }
    //add account
    public void addAccount(Account acc) {
        accounts.put(acc.accNumber, acc);
    }
    //method checking if user with this id exists
    public boolean checkIdExists(int id) {
        return users.containsKey(id);
    }
    //method returning USER object with this id
    public User getUser(int id) {
        return users.get(id);
    }
    //method checking if Account exists
    public boolean checkIfAccountExists(int accNo) {
        return accounts.containsKey(accNo);
    }
    //method returning Account object
    public Account getAccount(int accNo) {
        return accounts.get(accNo);
    }
}
