import Header from "../Header";
import {render, screen, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { BrowserRouter } from "react-router-dom";

it("Should load the header component with a login button ",()=>{
    render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header/>
            </Provider>
        </BrowserRouter>
    );
    //Querying
    const loginButton = screen.getByRole("button", {name:"Login"});
    //Assertion
    expect(loginButton).toBeInTheDocument();
})

it("Should render header component with cart items 0",()=>{
    render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header/>
            </Provider>
        </BrowserRouter>
    );
    //Querying
    const cartItems = screen.getByText("Cart (0 items)");
    //Assertion
    expect(cartItems).toBeInTheDocument();
})

it("Should render header component with cart(any number of items 0,1,2,etc)",()=>{
    render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header/>
            </Provider>
        </BrowserRouter>
    );
    //Querying
    const cartItems = screen.getByText(/Cart/);
    //Assertion
    expect(cartItems).toBeInTheDocument();
})

it("Should change login button to logout on click",()=>{
    render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header/>
            </Provider>
        </BrowserRouter>
    );
    //Querying
    const loginButton = screen.getByRole("button", {name:"Login"});
    fireEvent.click(loginButton);
    const logoutButton = screen.getByRole("button", {name:"Logout"});
    //Assertion
    expect(logoutButton).toBeInTheDocument();
})