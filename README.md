# Ecommerce-WebApp
Sample Ecommerce Web App - created for SENG 315 at Ferris State University.

* This project contains a web store, an admin page, and a checkout page.
* The admin page allows a user to add, update, and or remove items from the store. 
* The web store showcases products in the mariadb database using custom APIs made using JAX-RS. 
* The web store allows a user to search for items, filter results based on rating or price, add items to the cart, and view the cart.
* The cart shows users a summary of what was added to the cart and allows them to checkout or remove items from the cart.
* The checkout page contains a form for filling out data and a square card element to purchase an item, along with a cart section.
* Additionally, there is stripe element below the square, allowing the user to purchase the items using stripe.
* Upon successful purchase, a basic receipt modal will be displayed, the cart will be cleared, and the user will be brought to the store page.

  To set this up fully, you'll need to create a dev account on stripe and square as well as load up a mariadb server and run the mariadb.sql file to create the database and populate it.
  You also will need to modify StripeAPI.java, SquareAPI.java, and the three property files and add your credentials (for mariadb, square, and stripe).
  Also, the project is using a local apache tomcat 10.1.6 server, and it is only guaranteed to work on that server.
  Additionally, this project was made for eclipse, but it will work in other IDEs after a few URLS in the file are updated to run it on another IDE like IDEA due to how the IDEs host webpages.

  Templates used in this web project:
* https://startbootstrap.com/template/shop-homepage
* https://getbootstrap.com/docs/5.0/examples/checkout/

  Structure of store products API was based on FakeStoreAPI's catalogue
  * https://fakestoreapi.com/products
