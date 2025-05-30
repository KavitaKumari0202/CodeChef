import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Body from "../Body";
import MOCK_DATA from "../mocks/MockResList.json";
import { act } from "react";
import { BrowserRouter } from "react-router-dom";


global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(MOCK_DATA),
    })
  );

test("should render the body Component with search button", async()=>{
    await act(async()=>{render(
    <BrowserRouter>
        <Body/>
    </BrowserRouter>
    )});
    
    //Querying
    const searctBtn = screen.getByRole("button",{name:"Search"});

    //Assertion
    expect(searctBtn).toBeInTheDocument();
})

test("should check res-list for search input pizza", async()=>{
    await act(async()=>{render(
    <BrowserRouter>
        <Body/>
    </BrowserRouter>
    )});
    
    //Querying
    const cardsBeforeClickingSearchBtn = screen.getAllByTestId("resCard");
    //Checking that before clicking the cards number should be 20
    expect(cardsBeforeClickingSearchBtn.length).toBe(20);

    const searctBtn = screen.getByRole("button",{name:"Search"});
    const searchInput = screen.getByTestId("searchInput");
    //firing an change event to check the imput from input box by 
    fireEvent.change(searchInput,{target:{value:"pizza"}});
    // firing an event to click the search button after entering any value
    fireEvent.click(searctBtn);

    //Checking that after clicking the cards number should be 2
    const cards = screen.getAllByTestId("resCard");

    //Assertion
    expect(cards.length).toBe(2);
});

test("should filter top-rated restaurants", async()=>{
    await act(async()=>{render(
    <BrowserRouter>
        <Body/>
    </BrowserRouter>
    )});
    
    //Querying
    const cardsBeforeFilter = screen.getAllByTestId("resCard");

    expect(cardsBeforeFilter.length).toBe(20);

    const topRatedResButton = screen.getByRole("button", {name:"Top Rated Restaurants"});
    fireEvent.click(topRatedResButton);

    const cardsAfterFilter = screen.getAllByTestId("resCard");

    expect(cardsAfterFilter.length).toBe(20);
});