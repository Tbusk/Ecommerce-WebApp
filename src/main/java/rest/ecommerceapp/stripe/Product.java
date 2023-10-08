package rest.ecommerceapp.stripe;

public class Product {
    private int id;
    private String shortTitle;
    private double price;
    private int quantity;

    public int getId() {
        return id;
    }

    public String getShortTitle() {
        return shortTitle;
    }

    public double getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }
}
