import User from "./User";
import UserClass from "./UserClass";
import React from "react";

class About extends React.Component {
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div>
                <h1>About</h1>
                <h2>This is an about us page.</h2>
                <UserClass name={"Kavita Kumari (class)"} location={"Gurgaon(class)"}
                />
            </div>
        );
    }
};
//const About = () => {
//    return(
//        <div>
//            <h1>About</h1>
//            <h2>This is an about us page.</h2>
//            <UserClass name={"Kavita Kumari (class)"} location={"Gurgaon(class)"}
//            />
//        </div>
//    );

//};

export default About;