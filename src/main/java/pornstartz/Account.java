package pornstartz;

import java.util.ArrayList;

public class Account {
    public int sortCode;
    public int accNumber;
    public double currentBalance;
    public ArrayList<Transaction> transactions;
    public static int accCreationId = 100000;

    public Account() {
        this.sortCode = 988022;
        this.currentBalance = 0;
        this.transactions = new ArrayList<>();
        this.accNumber = accCreationId;
        accCreationId++;
    }
}
