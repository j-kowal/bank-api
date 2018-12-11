package pornstartz;

import java.util.ArrayList;
import java.util.Map;

public class UserService {
    private Map<Integer, User> users;
    private Map<Integer, Account> accounts;

    public UserService() {
        users = DatabaseStub.users;
        accounts = DatabaseStub.accounts;
    }

    public void addUser(User user){
        users.put(user.id, user);
    }

    public void addAccount(Account acc) {
        accounts.put(acc.accNumber, acc);
    }

    public ArrayList<User> getUsers(){
        return new ArrayList<>(users.values());
    }

    public boolean checkIdExists(int id) {
        return users.containsKey(id);
    }

    public User getUser(int id) {
        return users.get(id);
    }

    public boolean checkIfAccountExists(int accNo) {
        return accounts.containsKey(accNo);
    }

    public Account getAccount(int accNo) {
        return accounts.get(accNo);
    }
}
