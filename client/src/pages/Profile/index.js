import React, { Component } from "react";
import ListingCard from "../../components/ListingCard";
import API from "../../utils/API";
import "./style.css";
import Nav from "../../components/Nav";

class Profile extends Component {
  state = {
    listing: [],
    user: {}
  };
  componentDidMount() {
    this.userInfo();
  }

  userInfo = () => {
    API.getUser()
      .then(res => {
        console.log("=======");
        this.setState({ user: res.data });
        console.log(res.data);
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
    API.getListings()
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
    
    return (
      <div>
        <Nav />
        {this.state.listing.length > 0 ? (
          <div>
            {this.state.listing
              // .filter(listing => listing.user._id === this.state.user.user._id)
              .map(listing => {
                console.log("Map Listing!");
                console.log(listing.user._id);
                console.log("State User");
                console.log(this.state.user.user._id);
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
              })}
          </div>
        ) : (
          <h3>No Results to Display</h3>
        )}
      </div>
    );
  }
}

export default Profile;
