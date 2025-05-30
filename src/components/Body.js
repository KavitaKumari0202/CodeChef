import RestaurantCard, {withLabelPopular} from "./RestaurantCard";
//import resList from "../utils/mockdata";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
    const [listOfRestaurants, setListOfRestaurant] = useState([]);
    const [filteredRestaurant, setfilteredRestaurant] = useState([]);

    const [searchText, setsearchText] = useState("");

    const RestaurantCardPopular = withLabelPopular(RestaurantCard);

    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=28.5355161&lng=77.3910265&carousel=true&third_party_vendor=1");

        const json = await data.json();
        console.log(json);
        setListOfRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setfilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

    const onlineStatus = useOnlineStatus();

    if(onlineStatus === false) return <h1>Looks like you're offline. Please check ypur internet connection!!</h1>

    if(listOfRestaurants.length===0){
        return <Shimmer/>;
    };

    return (
        <div className="body">
            <div className="filter flex">
                <div className="p-4 m-4">
                    <input type="text" data-testid="searchInput" className="border border-solid border-black" value={searchText} onChange={(e)=>{
                        setsearchText(e.target.value);
                    }}>
                    </input>
                    <button className="px-4 py-1 bg-green-100 m-4 rounded-lg" onClick={()=>{
                        const filteredRestaurant = listOfRestaurants.filter((res)=>
                        res.info.name.toLowerCase().includes(searchText.toLowerCase()));
                        setfilteredRestaurant(filteredRestaurant);
                    }}>
                        Search
                    </button>

                </div>
                <div className="p-4 m-4 flex items-center">
                    <button className="px-4 py-1 bg-gray-100 rounded-lg" onClick={ () => {
                        const filtered_list = listOfRestaurants.filter(    
                            (res) => {return (res.info.avgRating > 4.5) }
                        );
                        setListOfRestaurant(filtered_list);
                    }}
                    >
                        Top Rated Restaurants
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap">
                {
                    filteredRestaurant.map(
                        (restaurant)=>(
                        <Link key={restaurant.info.id} to={"/restaurants/"+restaurant.info.id}>
                            {(restaurant.info.avgRating > 4.4) ? (<RestaurantCardPopular resData={restaurant}/>
                        ) : (
                        <RestaurantCard resData={restaurant}/>)
                        }
                        </Link>
                    ))
                }

               

            </div>

        </div>
    )
};

export default Body;