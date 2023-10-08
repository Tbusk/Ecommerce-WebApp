package rest.ecommerceapp.square;

import java.util.HashMap;
import java.util.Map;
import java.util.ResourceBundle;

import com.squareup.square.Environment;
import com.squareup.square.SquareClient;
import com.squareup.square.api.CustomersApi;
import com.squareup.square.api.PaymentsApi;
import com.squareup.square.exceptions.ApiException;
import com.squareup.square.models.Address;
import com.squareup.square.models.CreatePaymentRequest;
import com.squareup.square.models.CustomerDetails;
import com.squareup.square.models.Money;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/")
public class SquareAPI {

    private static String accessToken;
    private static String locationId;
    static {
        ResourceBundle rb = ResourceBundle.getBundle("squareAuth");
        accessToken = rb.getString("auth.accessToken");
        locationId = rb.getString("auth.locationId");
    }

    SquareClient client = new SquareClient.Builder()
            .environment(Environment.SANDBOX)
            .accessToken(accessToken)
            .userAgentDetail("sample_app_java_payment")
            .build();
    private String currency = "USD";

    @GET
    @Path("/paymentPrep")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes("application/json")
    public String getAllReportTypes() {
        CreateSquareConnection connection = new CreateSquareConnection();
        connection.setApiURL("https://connect.squareupsandbox.com/v2/payments");
        connection.setRequestMethod("GET");

        return connection.makeAPICall();
    }


    @POST
    @Path("/pay")
    @Produces(MediaType.APPLICATION_JSON)
    public PaymentResult makePayment(@FormParam("firstName") String firstName, @FormParam("lastName") String lastName,
                                @FormParam("email") String email, @FormParam("address") String address1,
                                @FormParam("address2") String address2, @FormParam("country") String country,
                                @FormParam("state") String state, @FormParam("zip") String zip,
                                @FormParam("tokenFieldP1") String tokenFieldP1,
                                @FormParam("tokenFieldP2") String tokenFieldP2,
                                @FormParam("idempotencyKey") String idempotencyKey,
                                     @FormParam("checkoutSubtotal") double checkoutSubtotal,
                                     @FormParam("checkoutProducts") String checkoutProducts) {

        String token = tokenFieldP1 + ":" + tokenFieldP2;
        long amountInCents = (long)((checkoutSubtotal) * 100);

        System.out.println("firstName: " + firstName);
        System.out.println("lastName: " + lastName);
        System.out.println("email: " + email);
        System.out.println("address: " + address1);
        System.out.println("address2: " + address2);
        System.out.println("country: " + country);
        System.out.println("state: " + state);
        System.out.println("zip: " + zip);
        System.out.println("token: " + token);
        System.out.println("idempotencyKey: " + idempotencyKey);
        System.out.println("SubTotal: " + checkoutSubtotal);
        System.out.println("SubTotal (in cents): " + amountInCents);
        System.out.println("checkoutProducts: " + checkoutProducts);

        CustomersApi customersApi = client.getCustomersApi();

        PaymentsApi paymentsApi = client.getPaymentsApi();

        Address address = new Address.Builder()
                .addressLine1(address1)
                .addressLine2(address2)
                .administrativeDistrictLevel1(state)
                .country("US")
                .firstName(firstName)
                .lastName(lastName)
                .postalCode(zip)
                .build();

        Money amountMoney = new Money.Builder()
                .amount(amountInCents)
                .currency(currency)
                .build();

        CustomerDetails customerDetails = new CustomerDetails.Builder()
                .customerInitiated(true)
                .build();

        CreatePaymentRequest body = new CreatePaymentRequest.Builder(token, idempotencyKey)
                .amountMoney(amountMoney)
                .locationId(locationId)
                .buyerEmailAddress(email)
                .billingAddress(address)
                .note("Purchase of products")
                .customerDetails(customerDetails)
                .shippingAddress(address)
                .build();

        paymentsApi = client.getPaymentsApi();
        return paymentsApi.createPaymentAsync(body).thenApply(result -> new PaymentResult("SUCCESS", null)).exceptionally(exception -> {
            ApiException e = (ApiException) exception.getCause();
            System.out.println("Failed to make the request");
            System.out.printf("Exception: %s%n", e.getMessage());
            return new PaymentResult("FAILURE", e.getErrors());
        }).join();
    }

    @GET
    @Path("/constants")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getConstants() {

        Map<String,String> hashMap = new HashMap<>();
        hashMap.put("appId", "");
        hashMap.put("locationId", "");

        return Response.ok(hashMap).build();
    }

    @GET
    @Path("/payments")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPayments() {

        CreateSquareConnection connection = new CreateSquareConnection();
        connection.setApiURL("https://connect.squareupsandbox.com/v2/payments");
        connection.setRequestMethod("GET");

        return Response.ok(connection.makeAPICall()).build();
    }

}
