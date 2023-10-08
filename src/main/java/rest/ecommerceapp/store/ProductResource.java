package rest.ecommerceapp.store;


import java.util.ArrayList;
import java.util.Comparator;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Response;
import rest.ecommerceapp.dao.MariaDBProductImpl;
import rest.ecommerceapp.dao.ProductDAO;
import rest.ecommerceapp.model.Product;

@Path("/")
public class ProductResource {

    private ProductDAO productDAO = new MariaDBProductImpl();
    private String searchedItem;
    @Path("/products-api")
    @GET
    @Produces("application/json")
    public Response getAllProducts() {
        return Response.ok(productDAO.getAllProducts()).build();
    }

    @Path("/products-api/sortedByRating")
    @GET
    @Produces("application/json")
    public Response getProductsSortedByRating() {
        ArrayList<Product> sortedList = new ArrayList<>(productDAO.getAllProducts());
        Comparator<Product> ratingComparator = Comparator.comparing(Product::getRating).reversed();
        sortedList.sort(ratingComparator);
        return Response.ok(sortedList).build();
    }

    @Path("/products-api/sortedByPrice-high")
    @GET
    @Produces("application/json")
    public Response getProductsSortedByPrice() {
        ArrayList<Product> sortedList = new ArrayList<>(productDAO.getAllProducts());
        Comparator<Product> priceComparator = Comparator.comparing(Product::getPrice).reversed();
        sortedList.sort(priceComparator);
        return Response.ok(sortedList).build();
    }

    @Path("/products-api/sortedByPrice-low")
    @GET
    @Produces("application/json")
    public Response getProductsSortedByPriceLow() {
        ArrayList<Product> sortedList = new ArrayList<>(productDAO.getAllProducts());
        Comparator<Product> priceComparator = Comparator.comparing(Product::getPrice);
        sortedList.sort(priceComparator);
        return Response.ok(sortedList).build();
    }

    @Path("/products-api/search")
    @GET
    @Produces("application/json")
    public Response getSearchResults(@QueryParam("item") String item) {
        ArrayList<Product> searchedList = new ArrayList<>(productDAO.getSearchedProducts(item));
        return Response.ok(searchedList).build();
    }


    @Path("/products-api/{id}")
    @GET
    @Produces("application/json")
    public Response getProduct(@PathParam("id") long id) {
        return Response.ok(productDAO.findById(id)).build();
    }

    @POST
    @Consumes("application/json")
    public Response addProduct(Product product) {
        return Response.ok(productDAO.addProduct(product)).build();
    }

    @Path("/products-api/{id}")
    @PUT
    @Consumes("application/json")
    public Response updateProduct(@PathParam("id") long id, Product product) {

        product.setId(id);
        return Response.ok(productDAO.updateProduct(product)).build();
    }

    @Path("/products-api/{id}")
    @DELETE
    public Response removeProduct(@PathParam("id") long id) {
        productDAO.deleteProduct(id);
        return Response.ok().build();
    }
}
