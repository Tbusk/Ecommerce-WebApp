package rest.ecommerceapp.store;

import java.sql.Connection;
import java.sql.DriverManager;
import java.util.ResourceBundle;

public final class MariaDBUtil {

    private static Connection con = null;
    private static String url;
    private static String serverName;
    private static short portNumber;
    private static String username;
    private static String password;
    private static String database;
    private static String driver;

    private MariaDBUtil() {

    }

    static {
        ResourceBundle rb = ResourceBundle.getBundle("jdbc");
        url = rb.getString("mariadb.url");
        serverName = rb.getString("mariadb.serverName");
        portNumber = Short.parseShort(rb.getString("mariadb.portNumber"));
        username = rb.getString("mariadb.username");
        password = rb.getString("mariadb.password");
        database = rb.getString("mariadb.database");
        driver = rb.getString("mariadb.driver");
    }

    public static Connection getConnection() {

        try {
            String connectionURL = url + serverName + ":"  + portNumber + "/" + database;
            Class.forName(driver);
            con = DriverManager.getConnection(connectionURL, username, password);
        } catch(Exception e) {
            e.printStackTrace();
            System.out.println("Error Trace in getConnection() : " + e.getMessage());
        }

        return con;
    }


}
