const homeRoute = "Home";
const cartRoute = "Cart";
const cartItemRoute = "CartItem";
const settingsRoute = "Settings";

const navigateToCartItem = id => [cartItemRoute, { id }];

export {
  homeRoute,
  cartRoute,
  cartItemRoute,
  navigateToCartItem,
  settingsRoute
};
