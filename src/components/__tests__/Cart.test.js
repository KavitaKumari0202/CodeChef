import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react";
import RestaurantMenu from "../RestaurantMenu";
import MOCK_DATA from "../mocks/MockResMenu.json";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import Header from "../Header";
import Cart from "../Cart";

global.fetch = jest.fn(()=>
    Promise.resolve({
        json:()=>Promise.resolve(MOCK_DATA),
    })
);

// it("should load restaurant menu component", async()=>{
//     await act(async()=> render(
//     <BrowserRouter>
//         <Provider store={appStore}>
//         <Header/>
//         <RestaurantMenu/>
//         <Cart/>
//         </Provider>
//     </BrowserRouter>));

//     const accordionHeader = screen.getByText("Recommended (20)");
//     fireEvent.click(accordionHeader);
//     expect(screen.getAllByTestId("foodItems").length).toBe(20);

//     const addbtns = screen.getAllByRole("button", {name:"Add +"});
//     fireEvent.click(addbtns[0]);
//     expect(screen.getByText("Cart (1 items)")).toBeInTheDocument();
//     fireEvent.click(addbtns[1]);
//     expect(screen.getByText("Cart (2 items)")).toBeInTheDocument();


    
// })

it("should check that cart component contains two fooditems when 2 items are added", async()=>{
    await act(async()=> render(
    <BrowserRouter>
        <Provider store={appStore}>
        <Header/>
        <RestaurantMenu/>
        <Cart/>
        </Provider>
    </BrowserRouter>));

    const accordionHeader = screen.getByText("Recommended (20)");
    fireEvent.click(accordionHeader);
    //expect(screen.getAllByTestId("foodItems").length).toBe(20);

    const addbtns = screen.getAllByRole("button", {name:"Add +"});
    fireEvent.click(addbtns[0]);
    //expect(screen.getByText("Cart (1 items)")).toBeInTheDocument();
    fireEvent.click(addbtns[1]);
    //expect(screen.getByText("Cart (2 items)")).toBeInTheDocument();

    // total available items = 22(20 - resMenu + 2 cartpage)
    expect(screen.getAllByTestId("foodItems").length).toBe(22);

    fireEvent.click(screen.getByRole("button",{name:"Clear Cart"}));

    expect(screen.getAllByTestId("foodItems").length).toBe(20);

    expect(screen.getByText("Cart is empty...Add some items to cart!!")).toBeInTheDocument();



    
})