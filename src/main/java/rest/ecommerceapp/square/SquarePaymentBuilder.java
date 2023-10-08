package rest.ecommerceapp.square;

import java.util.ResourceBundle;
import java.util.UUID;

import com.squareup.square.Environment;
import com.squareup.square.SquareClient;
import com.squareup.square.api.CustomersApi;
import com.squareup.square.api.PaymentsApi;
import com.squareup.square.models.Address;
import com.squareup.square.models.CreatePaymentRequest;
import com.squareup.square.models.CustomerDetails;
import com.squareup.square.models.Money;

public class SquarePaymentBuilder {

    private static String accessToken;
    static {
        ResourceBundle rb = ResourceBundle.getBundle("squareAuth");
        accessToken = rb.getString("auth.accessToken");
    }

    SquareClient client = new SquareClient.Builder()
            .environment(Environment.SANDBOX)
            .accessToken(accessToken)
            .build();

    private String customerAddressLine1;
    private String customerAddressLine2;
    private String customerFirstName;
    private String customerLastName;
    private long amountInCents;
    private String currency = "USD";
    private String customerEmailAddress;
    private String customerState;
    private String customerCountry;
    private String customerCity;
    private String customerZipCode;



    public void makePayment() {
        //CustomersApi customersApi = client.getCustomersApi();

        PaymentsApi paymentsApi = client.getPaymentsApi();

        Address address = new Address.Builder()
                .addressLine1(customerAddressLine1)
                .addressLine2(customerAddressLine2)
                .administrativeDistrictLevel1(customerState)
                .country(customerCountry)
                .firstName(customerFirstName)
                .lastName(customerLastName)
                .locality(customerCity)
                .postalCode(customerZipCode)
                .build();

        Money amountMoney = new Money.Builder()
                .amount(amountInCents)
                .currency(currency)
                .build();

        CustomerDetails customerDetails = new CustomerDetails.Builder()
                .customerInitiated(true)
                .build();

        CreatePaymentRequest body = new CreatePaymentRequest.Builder("EXTERNAL", UUID.randomUUID().toString())
                .amountMoney(amountMoney)
                .locationId("")
                .acceptPartialAuthorization(true)
                .buyerEmailAddress(customerEmailAddress)
                .billingAddress(address)
                .note("Purchase of products")
                .customerDetails(customerDetails)
                .shippingAddress(address)
                .build();

        paymentsApi.createPaymentAsync(body)
                .thenAccept(result -> {
                    System.out.println("Success!");
                })
                .exceptionally(exception -> {
                    System.out.println("Failed to make the request");
                    System.out.println(String.format("Exception: %s", exception.getMessage()));
                    return null;
                });
    }
}
