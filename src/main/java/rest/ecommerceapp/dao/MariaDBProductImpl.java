package rest.ecommerceapp.dao;

import rest.ecommerceapp.model.Product;
import rest.ecommerceapp.store.MariaDBUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class MariaDBProductImpl implements ProductDAO{
    @Override
    public String addProduct(Product product) {

        String sqlQuery = "INSERT INTO product(short_title, long_title, description, category, image_url, price, rating) VALUES (?,?,?,?,?,?,?)";

        try (Connection conn = MariaDBUtil.getConnection();
             PreparedStatement preparedStatement = conn.prepareStatement(sqlQuery);){

            preparedStatement.setString(1, product.getShortTitle());
            preparedStatement.setString(2, product.getLongTitle());
            preparedStatement.setString(3, product.getDescription());
            preparedStatement.setString(4, product.getCategory());
            preparedStatement.setString(5, product.getImageURL());
            preparedStatement.setDouble(6, product.getPrice());
            preparedStatement.setDouble(7, product.getRating());

            preparedStatement.executeUpdate();

            return product.getShortTitle() + " added.";

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Product findById(long id) {

        String sqlQuery = "SELECT * FROM product WHERE id = ?";

        try (Connection conn = MariaDBUtil.getConnection();
             PreparedStatement preparedStatement = conn.prepareStatement(sqlQuery);){

            preparedStatement.setLong(1,id);
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                Product product = new Product();
                product.setId(resultSet.getInt("id"));
                product.setShortTitle(resultSet.getString("short_title"));
                product.setLongTitle(resultSet.getString("long_title"));
                product.setDescription(resultSet.getString("description"));
                product.setCategory(resultSet.getString("category"));
                product.setImageURL(resultSet.getString("image_url"));
                product.setRating(resultSet.getDouble("rating"));
                product.setPrice(resultSet.getDouble("price"));
                return product;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public String updateProduct(Product product) {

        String sqlQuery = "UPDATE product SET short_title=?, long_title=?, description=?, category=?, image_url=?, rating=?, price=? WHERE id=?";

        try (Connection conn = MariaDBUtil.getConnection();
             PreparedStatement preparedStatement = conn.prepareStatement(sqlQuery);){

            preparedStatement.setString(1, product.getShortTitle());
            preparedStatement.setString(2, product.getLongTitle());
            preparedStatement.setString(3, product.getDescription());
            preparedStatement.setString(4, product.getCategory());
            preparedStatement.setString(5, product.getImageURL());
            preparedStatement.setDouble(6, product.getRating());
            preparedStatement.setDouble(7, product.getPrice());
            preparedStatement.setLong(8, product.getId());

            int count = preparedStatement.executeUpdate();

            if (count == 0) {
                return "invalid id";
            }

            return product.getId() + " updated.";

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public void deleteProduct(long id) {
        String sqlQuery = "DELETE FROM product WHERE id = ?";

        try (Connection conn = MariaDBUtil.getConnection();
             PreparedStatement preparedStatement = conn.prepareStatement(sqlQuery);){

            preparedStatement.setLong(1, id);
            preparedStatement.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    @Override
    public List<Product> getAllProducts() {

        String sqlQuery = "SELECT * FROM product";
        List<Product> products = new ArrayList<>();

        try (Connection conn = MariaDBUtil.getConnection();
             PreparedStatement preparedStatement = conn.prepareStatement(sqlQuery);
             ResultSet resultSet = preparedStatement.executeQuery();){

            while(resultSet.next()) {
                Product product = new Product();
                product.setId(resultSet.getInt("id"));
                product.setShortTitle(resultSet.getString("short_title"));
                product.setLongTitle(resultSet.getString("long_title"));
                product.setDescription(resultSet.getString("description"));
                product.setCategory(resultSet.getString("category"));
                product.setImageURL(resultSet.getString("image_url"));
                product.setRating(resultSet.getDouble("rating"));
                product.setPrice(resultSet.getDouble("price"));
                products.add(product);
            }

            resultSet.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return products;
    }

    @Override
    public List<Product> getSearchedProducts(String item) {
        String sqlQuery = "SELECT * FROM product WHERE short_title LIKE ?";
        List<Product> products = new ArrayList<>();

        try (Connection conn = MariaDBUtil.getConnection();
             PreparedStatement preparedStatement = conn.prepareStatement(sqlQuery);){

            preparedStatement.setString(1,"%" + item + "%");
            ResultSet resultSet = preparedStatement.executeQuery();

            while(resultSet.next()) {
                Product product = new Product();
                product.setId(resultSet.getInt("id"));
                product.setShortTitle(resultSet.getString("short_title"));
                product.setLongTitle(resultSet.getString("long_title"));
                product.setDescription(resultSet.getString("description"));
                product.setCategory(resultSet.getString("category"));
                product.setImageURL(resultSet.getString("image_url"));
                product.setRating(resultSet.getDouble("rating"));
                product.setPrice(resultSet.getDouble("price"));
                products.add(product);
            }

            System.out.println(products.size());
            resultSet.close();

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return products;
    }
}
