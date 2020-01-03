import React, { Component } from "react";
import moment from "moment";
import ListingCard from "../../components/ListingCard";
import ReservCard from "../../components/ReservCard";
import API from "../../utils/API";
import "./style.css";
import Nav from "../../components/Nav";


class Profile extends Component {
  state = {
    listing: [],
    reserved: [],
    user: {},
    userId: "",
    userName: ""
  };
  componentDidMount() {
    this.userInfo();
  }

  userInfo = () => {
    API.getUser()
      .then(res => {
        console.log("=======");
        console.log (res)
        console.log("=======");
        this.setState({ user: res.data });
        this.setState({ userId: res.data.user._id });
        // this.setState({userName: res.data.user.firstname})
        console.log(res.data.user._id);
        console.log("++++++++++++++++++++++++++++++++++++++");
        console.log(res.data.user.firstname);
        console.log(this.state.user);
        console.log("=======");
        this.loadListings();
        this.loadReserved();
      })
      .catch(err => console.log(err));
  };

  tester() {
    console.log("testing user");
    console.log(this.state);
  }

  // handleEditListing = event => {
  //   event.preventDefault();

  //   console.log("This is edit message!");
  // };

  // handleAvailListing = event => {
  //   event.preventDefault();

  //   console.log("this is availability message!");
  // };

  //  handleOpen = () => {
  //   setOpen(true);
  // };

  //  handleClose = () => {
  //   setOpen(false);
  // };

  //  handleOpen2 = () => {
  //   setOpen(true);
  // };

  loadListings = () => {
    API.getListingsForProf()
      .then(res => {
        console.log("xxxxxxxx");
        console.log(res.data);
        this.setState({ listing: res.data });
        console.log(this.state.listing);
        console.log(this.state.user);
        console.log("xxxxx");
        console.log("State User");
        console.log(this.state.user.user._id);
      })
      .catch(err => console.log(err));
  };
  loadReserved = () => {
    API.getReservForProf(this.state.userId)
      .then(res => {
        this.setState({ reserved: res.data });
        console.log("RESERVATIONS");
        console.log(res.data);
        // let reservListId =
      })

      .catch(err => console.log(err));
  };

  render() {
    console.log("##################");
    console.log(this.state.listing.length);
    console.log(
      this.state.listing.filter(item =>
        console.log(item.user === this.state.userId)
      )
    );
    console.log(this.state.userId);
    return (
      <div>
        {console.log(this.state.listing)}
        <Nav />
        {/* <h2>Welcome back, {this.state.userName}!</h2> */}

        {this.state.listing
          // .filter(listing => listing.user._id === this.state.user.user._id)
          .map(listing => {
            if (listing.user === this.state.userId) {
              return (
                <div>
                  <h1>LISTINGS</h1>
                  <ListingCard
                    key={listing._id}
                    id={listing._id}
                    title={listing.title}
                    photo={listing.photo}
                    address={listing.address}
                    city={listing.city}
                    state={listing.state}
                    zipcode={listing.zipcode}
                    handleEditListing={this.handleEditListing}
                    handleAvailListing={this.handleAvailListing}
                  />
                </div>
              );
            }
          })}

        {this.state.reserved.map(reserved => {
          if (reserved.renter === this.state.userId)
            // {this.state.listings.map(listing) => {
            //   if(listing._id === reserved.listing)

            return (
              <div>
                <h1>RESERVATIONS</h1>

                <ReservCard

              
                  date = {moment(reserved.date).format('LL')}
                  address={reserved.address}
                  title={reserved.title}
                  photo={reserved.photo}
                />
              </div>
            );
        })}
        {/* })} */}
      </div>
    );
  }
}

export default Profile;
