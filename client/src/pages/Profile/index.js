import React, { Component } from "react";
import ListingCard from "../../components/ListingCard";
import API from "../../utils/API";
import "./style.css";
import Nav from "../../components/Nav";

class Profile extends Component {
  state = {
    listing: [],
    user: {},
    userId: ""
  };
  componentDidMount() {
    this.userInfo();
  }

  userInfo = () => {
    API.getUser()
      .then(res => {
        console.log("=======");
        this.setState({ user: res.data });
        this.setState({ userId: res.data.user._id });
        console.log(res.data.user._id);
        console.log(this.state.user);
        console.log("=======");
        this.loadListings();
      })
      .catch(err => console.log(err));
  };

  tester() {
    console.log("testing user");
    console.log(this.state);
  }

  loadListings = () => {
    API.getListingsForProf()
      .then(res => {
        console.log("xxxxxxxx");
        this.setState({ listing: res.data });
        console.log(this.state.listing);
        console.log(this.state.user);
        console.log("xxxxx");
        console.log("State User");
        console.log(this.state.user.user._id);
      })
      .catch(err => console.log(err));
  };

  render() {
    console.log("##################");
    console.log(this.state.listing.length);
    console.log(this.state.listing.filter(item => console.log(item.user === this.state.userId)));
    console.log(this.state.userId);
    return (
 
      <div>
           
        <Nav />
    
          <div>
            {this.state.listing
              // .filter(listing => listing.user._id === this.state.user.user._id)
              .map(listing => {

                if (listing.user === this.state.userId) {
                  return (
                    <ListingCard
                      key={listing._id}
                      title={listing.title}
                      photo={listing.photo}
                      address={listing.address}
                      city={listing.city}
                      state={listing.username}
                      zipcode={listing.zipcode}
                    />
                  );
                }
             
               
              })}
          </div>
  
      </div>
    );
  }
}

export default Profile;
