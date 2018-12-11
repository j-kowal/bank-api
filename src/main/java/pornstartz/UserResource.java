package pornstartz;

import javax.json.bind.annotation.JsonbProperty;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;

/**
 * Root resource (exposed at "myresource" path)
 */
@Path("/")
public class UserResource {

    UserService userService = new UserService();

    /**
     * Method handling HTTP GET requests. The returned object will be sent
     * to the client as "text/plain" media type.
     *
     * @return String that will be returned as a text/plain response.
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public ArrayList<User> main() {
        return userService.getUsers();
    }

    @Path("/newuser")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String create(User user) {
        try {
            userService.addUser(user);
            return "User added";
        } catch (Exception e) {
            return "There were problems with adding this user";
        }
    }

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

    @Path("/newaccount/{userId}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public boolean newAccount(@PathParam("userId") int id) {
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

    @Path("/transfer")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public boolean transfer(@QueryParam("from") int from, @QueryParam("to") int to, Transaction transaction) {
        if(userService.checkIfAccountExists(from) && userService.checkIfAccountExists(to)) {
           if(transaction.type.equals("debit")) {
               if(userService.getAccount(from).currentBalance >= transaction.value) {

                   userService.getAccount(from).currentBalance -= transaction.value;
                   userService.getAccount(to).currentBalance += transaction.value;

                   transaction.balanceAfter = userService.getAccount(from).currentBalance;
                   userService.getAccount(from).transactions.add(transaction);

                   transaction.balanceAfter = userService.getAccount(to).currentBalance;
                   userService.getAccount(to).transactions.add(transaction);

                   return true;
               }
           }
        }
        else if(transaction.type.equals("credit")) {

            userService.getAccount(from).currentBalance -= transaction.value;
            userService.getAccount(to).currentBalance += transaction.value;

            transaction.balanceAfter = userService.getAccount(from).currentBalance;
            userService.getAccount(from).transactions.add(transaction);

            transaction.balanceAfter = userService.getAccount(to).currentBalance;
            userService.getAccount(to).transactions.add(transaction);

            return true;
        }
        return false;
    }
}
