## MERN - E-Commerce !
**This is an e-commerce website that is built on the MERN (MongoDB, Express.js, React.js, and Node.js) stack. The website offers a variety of features that are designed to provide users with an enjoyable and seamless shopping experience.**

- Product Search: <br>
The website includes a powerful search function that allows users to easily find the products they are looking for. The search function is fast and accurate and provides users with relevant results based on their search terms.

- Product Review and Ratings: <br>
Users can leave reviews and ratings for products, providing valuable feedback for other customers and helping them make informed purchasing decisions.

- User Profile with Order Details: <br>
The website includes a user profile feature, which allows users to view and manage their orders. This feature provides users with a convenient and centralized location for all of their order information.

- Realistic Checkout Process: <br>
The checkout process on This is realistic and straightforward. Users can easily add items to their cart, view their order details, and complete their purchase using the integrated PayPal payment system(Sandbox).

- Admin Product Management: <br>
The website includes an admin dashboard that allows the website owners to manage products and product information. This includes adding new products, editing existing products, and removing products that are no longer available.

- PayPal Payment Integration: <br>
This includes seamless integration with the PayPal payment system(SandBox), allowing users to easily and securely complete their purchases.

**Overall, This is a highly-functional and user-friendly e-commerce website that provides users with a wide range of features and capabilities. The website is built on the MERN stack, providing a stable and scalable platform for growth and development.**


Checkout our Store here -> [HERE]()

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

## Tech Stack

**Client:** React, Redux, React Bootstrap, React redux Bootstrap, React router dom, multer, react-paypal-button-v2

**Server:** Node, Express, MongoDB

### Progress 👇🏼

- [x] Navbar
- [x] Product listing page
- [x] Product page
- [x] APIs added (data served using backend)
- [x] MongoDB connected using mongoose
- [x] Added Redux 
- [x] Shopping cart logic
- [x] backend authentication
- [x] frontend authentication 
- [x] Checkout Process 
- [x] Admin - product creation, edit , delete and update functionality added.
- [x] Product review 
- [x] search a product 
- [ ] Deploy app

## Getting Started

This Documenation will help users and other developers to clone this repo to their local machine, to test and work with their new set of features.

### Prerequisites

- Node Js
- NPM
- Any Editor of your Choice

### Cloning Repository
- Goto Git Bash Terminal on root directory and run the following command
```
 $ git clone "https://github.com/Sabyasachi-Seal/MERN-Shopping"
 $ cd MERN-Shopping
```
### Installing

- Execute these commands from the project directory
- Run the following command after cloning, to install all dependencies with same version which, This Currently runs on...

```
npm install
```

### Create .env file
- Create .env file in project folder
- Enter these lines to that:

```
MONGODB_URI= your Mongo DB URL
JWT_SECRET= your password, something secret
PAYPAL_CLIENT_ID= "your paypal client id" or sb
PORT=5000
NODE_ENV=Development
```


### Running the app

Open a terminal root directory, (Runs both Frontend and Backend Server Concurrently)

```
npm run dev
```

### Migrate the data

```
npm run data:import
```

## Support

- Support us by, ⭐ this repository. It helps.


