
---

## Key Pages and Components

### 1. Login Page (`Login.jsx`)
- A form with username and password fields.
- Authenticates user credentials via Fake Store API's `/auth/login` endpoint.
- Stores JWT token in `localStorage`.

### 2. Product Listing Page (`Products.jsx`)
- Fetches and displays all products from `/products` endpoint.
- Implements a responsive grid layout for displaying products.

### 3. Product Detail Page (`ProductDetail.jsx`)
- Fetches and displays detailed information about a specific product using its ID.

### 4. Cart Page (`Cart.jsx`)
- Manages cart items using Context API.
- Allows users to update quantities, remove items, and checkout.

### 5. Header Component (`Header.jsx`)
- Provides navigation links for Home, Cart, and Logout.
- Dynamically displays the number of items in the cart.

---

## How It Works

1. **Authentication**
    - Users log in with their credentials.
    - On successful login, a JWT token is stored in `localStorage`.

2. **Product Management**
    - Products are fetched from Fake Store API's `/products` endpoint.
    - Clicking on a product redirects to its detail page.

3. **Cart Management**
    - Users can add products to their cart from the product detail page.
    - The cart page allows users to update quantities or remove items.

4. **Order Placement**
    - Clicking on "Checkout" clears the cart and shows an order confirmation message.

5. **Logout**
    - Clears the JWT token from `localStorage` and redirects to the login page.

---

## APIs Used

1. **Login Endpoint**  
    ```
    POST https://fakestoreapi.com/auth/login
    ```
    Example Request Body:
    ```
    {
      "username": "user",
      "password": "password"
    }
    ```

2. **Get All Products**  
    ```
    GET https://fakestoreapi.com/products
    ```

3. **Get Products by Category**  
    ```
    GET https://fakestoreapi.com/products/category/:category
    ```

4. **Get Product by ID**  
    ```
    GET https://fakestoreapi.com/products/:id
    ```

---

## Future Enhancements

- Add search functionality to filter products by name or description.
- Implement user registration functionality.
- Add persistent storage for cart items using `localStorage`.
- Improve styling with CSS frameworks like TailwindCSS or Bootstrap.

---

## License

This project is open-source and available under the [MIT License](LICENSE).

Feel free to contribute or fork this repository! 😊
