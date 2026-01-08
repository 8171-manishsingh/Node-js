# API Practical Task - Product Management

A practical API task built with Node.js, Express, and MongoDB for managing products. This application provides a RESTful API for performing CRUD operations on products, including searching, filtering, sorting, and pagination.

## Features

- Get all products
- Get product by ID
- Search products by name, brand, or multiple fields
- Filter products by category, price range, or rating
- Sort products by price
- Paginated product listings
- Create new products

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd api-practical-task
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/productdb
   ```

4. Start the server:
   ```
   npm start
   ```

   Or for development:
   ```
   npm run dev
   ```

The server will start on the specified PORT (default: 3000) and connect to the MongoDB database.

## API Endpoints

### Base URL
```
http://localhost:3000
```

### Products

#### 1. Get All Products
- **GET** `/products`
- **Description**: Retrieve all products
- **Response**: Array of product objects

#### 2. Get Product by ID
- **GET** `/products/:id`
- **Description**: Retrieve a specific product by its ID
- **Parameters**: `id` (string) - Product ID
- **Response**: Product object or 404 if not found

#### 3. Search Products by Name
- **GET** `/products/search/name?name=<name>`
- **Description**: Search products by name (case-insensitive)
- **Query Parameters**: `name` (string)
- **Response**: Array of matching products

#### 4. Search Products by Brand
- **GET** `/products/search/brand?brand=<brand>`
- **Description**: Search products by brand (case-insensitive)
- **Query Parameters**: `brand` (string)
- **Response**: Array of matching products

#### 5. Search Products by Multiple Fields
- **GET** `/products/search/multiple?productName=<name>&category=<category>&brand=<brand>`
- **Description**: Search products by multiple fields (case-insensitive)
- **Query Parameters**: `productName`, `category`, `brand` (optional strings)
- **Response**: Array of matching products

#### 6. Get Products by Category
- **GET** `/products/category?category=<category>`
- **Description**: Get products by category (case-insensitive)
- **Query Parameters**: `category` (string)
- **Response**: Array of products in the category

#### 7. Filter Products by Price Range
- **GET** `/products/filter/price?min=<min>&max=<max>`
- **Description**: Filter products by price range
- **Query Parameters**: `min` (number, optional), `max` (number, optional)
- **Response**: Array of products within the price range

#### 8. Filter Products by Rating
- **GET** `/products/filter/rating?rating=<rating>`
- **Description**: Filter products with rating greater than or equal to the specified value
- **Query Parameters**: `rating` (number, 0-5)
- **Response**: Array of products with rating >= specified value

#### 9. Sort Products by Price
- **GET** `/products/sort/price?order=<order>`
- **Description**: Sort products by price
- **Query Parameters**: `order` (string, 'asc' or 'desc', default: 'asc')
- **Response**: Array of products sorted by price

#### 10. Get Products with Pagination
- **GET** `/products/pagination?page=<page>&limit=<limit>`
- **Description**: Get paginated list of products
- **Query Parameters**: `page` (number, default: 1), `limit` (number, default: 10)
- **Response**: Object with products array, total count, total pages, current page, and limit

#### 11. Create Product
- **POST** `/products`
- **Description**: Create a new product
- **Body** (JSON):
  ```json
  {
    "productName": "Product Name",
    "category": "Category",
    "brand": "Brand",
    "price": 99.99,
    "rating": 4.5,
    "description": "Product description"
  }
  ```
- **Response**: Created product object

## Product Schema

```javascript
{
  productName: String (required),
  category: String (required),
  brand: String (required),
  price: Number (required, positive),
  rating: Number (required, 0-5),
  description: String (optional)
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- **200**: Success
- **201**: Created
- **400**: Bad Request (validation errors)
- **404**: Not Found
- **500**: Internal Server Error

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **Dotenv**: Environment variable management

## Project Structure

```
api-practical-task/
├── app.js              # Express app setup
├── server.js           # Server entry point
├── package.json        # Dependencies and scripts
├── configs/
│   └── db.js           # Database connection
├── controllers/
│   └── route-controller.js  # API controllers
├── models/
│   └── product.model.js     # Product model
├── router/
│   └── routes.js       # Route definitions
└── .env                # Environment variables
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
