/***
 * USERS RESOURCE
 * using pornstartz package
 */

package pornstartz;

//imports
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;

//path for class - root
@Path("/")
public class UserResource {

    //UserService object will be handling service for resource.
    UserService userService = new UserService();

    //POST - method creating new user.
    @Path("/newuser")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public int create(User user) {
        try {
            userService.addUser(user);
            return user.id;
        } catch (Exception e) {
            return 0;
        }
    }

    //POST - method logging and authorising user.
    @Path("/login")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public boolean login(UserCredentials credentials) {
        if(userService.checkIdExists(credentials.id)) {
            if(
                    credentials.id == userService.getUser(credentials.id).id
                    && credentials.password.equals(userService.getUser(credentials.id).password)
            ) {
                userService.getUser(credentials.id).logIn();
                return true;
            }
            return false;
        }
        return false;
    }

    //POST - method logging off and de-authorising user.
    @Path("/logout")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public boolean logout(UserCredentials credentials) {
        if(userService.checkIdExists(credentials.id)) {
            if(credentials.id == userService.getUser(credentials.id).id) {
                userService.getUser(credentials.id).logOut();
                return true;
            }
            return false;
        }
        return false;
    }

    //GET - method returning User object of id
    @Path("/user")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public User getUser(@QueryParam("id") int id) {
        return userService.getUser(id);
    }

    //GET - method returing user's accounts in ArrayList
    @Path("/user/accounts")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public ArrayList<Account> getUserAccounts(@QueryParam("id") int id) {
        return userService.getUser(id).accounts;
    }

    //GET - method creating new account for user with ID (param).
    @Path("/newaccount")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public boolean newAccount(@QueryParam("id") int id) {
        if(userService.checkIdExists(id)) {
            if(userService.getUser(id).authenticated){
                Account temp = new Account();
                userService.addAccount(temp);
                userService.getUser(id).accounts.add(userService.getAccount(temp.accNumber));
                return true;
            }
            return false;
        }
        return false;
    }

    //POST - method handling lodging money.
    @Path("/lodge")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public boolean lodge(@QueryParam("to") int accNo, Transaction transaction) {
        if(userService.checkIfAccountExists(accNo)) {
            userService.getAccount(accNo).currentBalance += transaction.value;
            transaction.balanceAfter = userService.getAccount(accNo).currentBalance;
            userService.getAccount(accNo).transactions.add(transaction);
            return true;
        }
        return false;
    }

    //POST - method handling withdrawing money
    @Path("/withdrawal")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public boolean withdrawal(@QueryParam("from") int accNo, Transaction transaction) {
        if(userService.checkIfAccountExists(accNo)) {
            if(userService.getAccount(accNo).currentBalance - transaction.value >= 0) {
                userService.getAccount(accNo).currentBalance -= transaction.value;
                transaction.balanceAfter = userService.getAccount(accNo).currentBalance;
                userService.getAccount(accNo).transactions.add(transaction);
                return true;
            }
            return false;
        }
        return false;
    }

    //POST - method handling transferring money between the user/users
    @Path("/transfer")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public boolean transfer(@QueryParam("from") int from, @QueryParam("to") int to, Transaction transaction) {
        if(userService.checkIfAccountExists(from) && userService.checkIfAccountExists(to)) {
            //DEBIT
           if(transaction.type.equals("debit")) {
               if(userService.getAccount(from).currentBalance >= transaction.value) {

                   userService.getAccount(from).currentBalance -= transaction.value;
                   userService.getAccount(to).currentBalance += transaction.value;

                   Transaction transaction1 = new Transaction();
                   transaction1.id = transaction.id;
                   transaction1.value = transaction.value;
                   transaction1.type = transaction.type;
                   transaction1.date = transaction.date;
                   transaction1.description = String.format("%s transfer to AC: %d", transaction.type, to);
                   transaction1.balanceAfter = userService.getAccount(from).currentBalance;
                   userService.getAccount(from).transactions.add(transaction1);

                   Transaction transaction2 = new Transaction();
                   transaction2.id = transaction.id;
                   transaction2.value = transaction.value;
                   transaction2.type = transaction.type;
                   transaction2.date = transaction.date;
                   transaction2.description = String.format("%s transfer from AC: %d", transaction.type, from);
                   transaction2.balanceAfter = userService.getAccount(to).currentBalance;
                   userService.getAccount(to).transactions.add(transaction2);

                   return true;
               }
           }
           //CREDIT
           else if(transaction.type.equals("credit")) {

               userService.getAccount(from).currentBalance -= transaction.value;
               userService.getAccount(to).currentBalance += transaction.value;

               Transaction transaction1 = new Transaction();
               transaction1.id = transaction.id;
               transaction1.value = transaction.value;
               transaction1.type = transaction.type;
               transaction1.date = transaction.date;
               transaction1.description = String.format("%s transfer to AC: %d", transaction.type, to);
               transaction1.balanceAfter = userService.getAccount(from).currentBalance;
               userService.getAccount(from).transactions.add(transaction1);

               Transaction transaction2 = new Transaction();
               transaction2.id = transaction.id;
               transaction2.value = transaction.value;
               transaction2.type = transaction.type;
               transaction2.date = transaction.date;
               transaction2.description = String.format("%s transfer from AC: %d", transaction.type, from);
               transaction2.balanceAfter = userService.getAccount(to).currentBalance;
               userService.getAccount(to).transactions.add(transaction2);

               return true;
           }
           return false;
        }
        return false;
    }
}
