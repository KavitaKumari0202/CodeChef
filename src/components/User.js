import { useState } from "react";
const User = (props) => {
    const[count] = useState(0);
    const[count2] = useState(1);

    return (
        <div className="user-card">
            <h1>Count = {count}</h1>
            <h1>Count2 = {count2}</h1>
            <h2>Name: {props.name}</h2>
            <h3>Location: Gurgaon</h3>
            <h3>Contact: kavi456ta@gmail.com</h3>
        </div>
    );
};

export default User;