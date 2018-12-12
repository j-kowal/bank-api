/**
 * CLASS WILL RETURN FORMATED DATE/TIME
 */

package pornstartz;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateFormatter {
    private static DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
    public static String today() {
        return dateFormat.format(new Date());
    }
}
