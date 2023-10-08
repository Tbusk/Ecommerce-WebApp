package rest.ecommerceapp.square;

import javax.net.ssl.HttpsURLConnection;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ResourceBundle;

public final class CreateSquareConnection {

    String apiURL;
    String requestMethod;
    private static String squareVersion;
    private static String accessToken;
    private static String applicationID;

    static {
        ResourceBundle rb = ResourceBundle.getBundle("squareAuth");
        squareVersion = rb.getString("auth.version");
        accessToken = rb.getString("auth.accessToken");
        applicationID = rb.getString("auth.applicationID");
    }

    public String makeAPICall()  {
        String apiResult = "";

        try
        {
            URL url = new URL(apiURL);
            HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
            connection.setRequestMethod(requestMethod);
            connection.setRequestProperty("Accept", "application/json");


            String authHeaderValue = "Bearer " + accessToken;
            connection.setRequestProperty("Square-Version", squareVersion);
            connection.setRequestProperty("Authorization", authHeaderValue);

            if (connection.getResponseCode() != 200) {
                throw new RuntimeException("Failed : HTTP error code: " + connection.getResponseCode());
            }

            BufferedReader reader = new BufferedReader(new InputStreamReader(
                    (connection.getInputStream())
            ));

            String line;

            while ((line = reader.readLine()) != null) {
                apiResult += line;
            }

            connection.disconnect();


        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }


        return apiResult;
    }

    public String getApiURL() {
        return apiURL;
    }

    public void setApiURL(String apiURL) {
        this.apiURL = apiURL;
    }

    public String getRequestMethod() {
        return requestMethod;
    }

    public void setRequestMethod(String requestMethod) {
        this.requestMethod = requestMethod;
    }
}
