import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  createProductReducer,
  createProductReviewReducer,
  deleteProductReducer,
  productListReducer,
  productReducer,
  topproductListReducer,
  updateProductReducer,
} from "./reducers/productReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./reducers/cartReducers";
import {
  deleteUserReducer,
  userByIdReducer,
  userDetailsReducer,
  userDetailsUpdateReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateByIdReducer,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
  orderPayReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  products: productListReducer,
  productDetails: productReducer,
  createProduct: createProductReducer,
  createProductReview: createProductReviewReducer,
  updateProduct: updateProductReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userDetailsUpdateReducer,
  createOrder: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  myOrders: orderListMyReducer,
  orders: orderListReducer,
  userList: userListReducer,
  deletedUsers: deleteUserReducer,
  currentUser: userByIdReducer,
  userUpdateReducer: userUpdateByIdReducer,
  deleteProductReducer: deleteProductReducer,
  topRatedProduct: topproductListReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};
const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleWare = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
