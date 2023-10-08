package rest.ecommerceapp.dao;

import rest.ecommerceapp.model.Product;

import java.util.List;

public interface ProductDAO {

    // CRUD Operations
    public String addProduct(Product product);
    public Product findById(long id);
    public String updateProduct(Product product);
    public void deleteProduct(long id);

    // Queries
    public List<Product> getAllProducts();
    public List<Product> getSearchedProducts(String item);
}
