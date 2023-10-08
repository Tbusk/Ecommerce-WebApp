package rest.ecommerceapp.stripe;

import java.util.HashMap;
import java.util.Map;
import java.util.ResourceBundle;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/")
public class StripeAPI {

    private static String secretKey;
    private static String publishableKey;
    private static int orderNumber = 0;

    static {
        ResourceBundle rb = ResourceBundle.getBundle("stripeAuth");
        secretKey = rb.getString("auth.secretKey");
        publishableKey = rb.getString("auth.publishableKey");
    }

    static class CreatePaymentResponse {
        private String clientSecret;

        public CreatePaymentResponse(String clientSecret) {
            this.clientSecret = clientSecret;
        }
    }


    @GET
    @Path("/balance")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes("application/json")
    public String getAllReportTypes() {
        CreateStripeConnection connection = new CreateStripeConnection();
        connection.setApiURL("https://api.stripe.com/v1/balance");
        connection.setRequestMethod("GET");

        return connection.makeAPICall();
    }

    @POST
    @Path("/create-payment-intent")
    @Produces("application/json")
    @Consumes("application/json")
    public Response paymentIntent(ProductList productList) {
        Stripe.apiKey = secretKey;
        Gson gson = new Gson();

        double subtotal = 0.0d;
        int totalProducts = 0;
        for(Product p : productList.getItems()) {
            //System.out.println("id: " + p.getId() + ", shortTitle: " + p.getShortTitle() + ", price: " + p.getPrice() + " x " + p.getQuantity());
            subtotal += p.getPrice() * p.getQuantity();
            totalProducts += p.getQuantity();
        }

        String description = "Order " + (orderNumber +=1) + " - Purchase of " + totalProducts + " products at test ecommerce site.";

        long subtotalPriceInCents = (long)(subtotal*100);
        long stripeFee = (long)((subtotalPriceInCents * 0.029) + 30);
        long totalInCents = subtotalPriceInCents + stripeFee;
        //System.out.println("Subtotal: " + subtotal);
        //System.out.println("Subtotal (Cents): " + subtotalPriceInCents);
        //System.out.println("Fees: " + stripeFee);
        //System.out.println("Total (Cents): " + totalInCents);

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setCurrency("USD")
                .setAmount(totalInCents)
                .addPaymentMethodType("card")
                .setDescription(description)
                .build();

        try {
            PaymentIntent intent = PaymentIntent.create(params);
            CreatePaymentResponse paymentResponse = new CreatePaymentResponse(intent.getClientSecret());

            return Response.ok(gson.toJson(paymentResponse)).build();
        } catch (StripeException e) {
            e.printStackTrace();
            return Response.status(400).build();
        } catch (Exception e) {
            return Response.status(500).build();
        }
    }

    @GET
    @Path("/constants")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getConstants() {

        Map<String,String> hashMap = new HashMap<>();
        hashMap.put("secretKey", "");
        hashMap.put("publishableKey", "");

        return Response.ok(hashMap).build();
    }

}

