import { CDN_URL, LOGO_URL } from "../utils/constants";

const RestaurantCard = (props) => {
    const {resData} = props;
    const {
        cloudinaryImageId,name,cuisines,avgRating,deliveryTime,costForTwo,
    } = resData?.info
    return (
        <div data-testid="resCard" className="m-4 p-4 w-[250px] bg-gray-100 rounded-lg hover:bg-gray-200">
            <img className="rounded-lg" alt="res-logo" 
            src={CDN_URL
                + cloudinaryImageId
            }
            />
            <h3 className="font-bold py-3 text-lg">{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRating} stars</h4>
            <h4>{costForTwo}</h4>
            <h4>{resData.info.sla.deliveryTime}</h4>
        </div>
    )
};

// Higher order component
export const withLabelPopular = (RestaurantCard) => {
    return (props) => {
        return (
            <div>
                <label className="absolute bg-black text-white m-1 p-1">Popular</label>
                <RestaurantCard {...props}/>
            </div>
        );
    };
};

export default RestaurantCard;