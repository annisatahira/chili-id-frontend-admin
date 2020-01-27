/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.jsx";
import Profile from "views/examples/Profile.jsx";
import Maps from "views/examples/Maps.jsx";
import Register from "views/examples/Register.jsx";
// import Category from "views/Category.jsx";
import Login from "views/examples/Login.jsx";
import Tables from "views/examples/Tables.jsx";
import Icons from "views/examples/Icons.jsx";

//category
import CreateCategory from "views/category/Create.jsx";
import EditCategory from "views/category/Edit.jsx";
import CategoryList from "views/category/List.jsx";
import CategoryDetail from "views/category/Detail.jsx";

//product
import CreateProduct from "views/product/Create.jsx";
import EditProduct from "views/product/Edit.jsx";
import ProductList from "views/product/List.jsx";
import ProductDetail from "views/product/Detail.jsx";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/app"
  },
  {
    path: "/category/create",
    icon: "ni ni-planet text-blue",
    component: CreateCategory,
    layout: "/app",
    unlisted: true
  },
  {
    path: "/category/edit/:slug",
    icon: "ni ni-istanbul text-orange",
    component: EditCategory,
    layout: "/app",
    unlisted: true
  },
  {
    path: "/category/:slug",
    icon: "ni ni-pin-3 text-green",
    component: CategoryDetail,
    layout: "/app",
    unlisted: true
  },
  {
    path: "/category",
    name: "List Kategori",
    icon: "ni ni-pin-3 text-orange",
    component: CategoryList,
    layout: "/app",
    menu: "category"
  },
  {
    path: "/product/create",
    icon: "ni ni-planet text-blue",
    component: CreateProduct,
    layout: "/app",
    unlisted: true
  },
  {
    path: "/product/edit/:slug",
    icon: "ni ni-planet text-blue",
    component: EditProduct,
    layout: "/app",
    unlisted: true
  },
  {
    path: "/product/:slug",
    icon: "ni ni-planet text-blue",
    component: ProductDetail,
    layout: "/app",
    unlisted: true
  },
  {
    path: "/Product",
    name: "List Product",
    icon: "ni ni-planet text-blue",
    component: ProductList,
    layout: "/app",
    menu: "product"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/app"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/app"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/app"
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/app"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  }
];
export default routes;
