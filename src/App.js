import React,{lazy, Suspense} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
//import Grocery from "./components/Grocery";

const Grocery = lazy(()=> import("./components/Grocery"));

const AppComponent = () => {
    return (
        <Provider store={appStore}>
        <div className="app">
            <Header />
            <Outlet/>
            
        </div>
        </Provider>
    )
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppComponent/>,
        children: [
            {
                path:"/",
                element: <Body/>,
            },
            {
                path:"/about",
                element: <About/>,
            },
            {
                path: "/grocery",
                element: <Suspense fallback={<h1>Loading.....</h1>}><Grocery/></Suspense>,
            },
            {
                path: "/contact",
                element: <Contact/>,
            },
            {
                path: "/restaurants/:resId",
                element: <RestaurantMenu/>,
            },
            {
                path:"/cart",
                element: <Cart/>,
            },
        ],
        errorElement: <Error/>,
    },
]);

const root= ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter}/>);