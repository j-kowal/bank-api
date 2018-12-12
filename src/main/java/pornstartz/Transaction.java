/**
 * TRANSACTION CLASS
 */

package pornstartz;

public class Transaction {
    public static int transactionIdNumber = 1;
    public int id;
    public double value;
    public String type;
    public String date;
    public String description;
    public Double balanceAfter;

    public Transaction() {
        this.date = DateFormatter.today();
        this.id = transactionIdNumber;
        transactionIdNumber++;
    }
}
