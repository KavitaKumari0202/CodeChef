import React from "react";
class UserClass extends React.Component {
    constructor (props) {
        super(props);
        this.state= {
            userInfo: {
                name: "Dummy User",
                location: "Default",
            }
        };

    }

    async componentDidMount(){
        //api call
        const data = await fetch("https://api.github.com/users/KavitaKumari0202");
        const json = await data.json();

        this.setState({
            userInfo: json,
        });

        console.log(json);
    }

    render() {

        const{name, location, avatar_url}= this.state.userInfo;
        return (
            <div className="user-card">
                <img src={avatar_url}/>
                <h2>Name: {name}</h2>
                <h3>Location: {location}</h3>
                <h3>Contact: kavi456ta@gmail.com</h3>
            </div>
        );
    }
}

export default UserClass;