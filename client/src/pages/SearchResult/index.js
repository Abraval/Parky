import React, { Component } from "react";
import Nav from "../../components/Nav";
import "./style.css";
import axios from "axios";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import API from "../../utils/API";
import { ListingList, ListingListItem } from "../../components/ListingList";

class SearchResult extends Component {
  state = {
    addressQuery: "",
    latitude: 39.952583,
    longitude: -75.165222,
    selectedDays: [],
    markerData: [],
    idToBook: ""
  };

  // componentDidMount() {
  //   this.renderMap();
  // }

  componentDidUpdate(prevProps, props) {
    if (this.state.markerData !== props.markerData) {
      this.renderMap();
      // this.renderCards();
    }
  }

  handleBookClick = id => {
    this.setState({
      idToBook: id
    });
  };

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
  }

  handleDayClick(day, { selected }) {
    const { selectedDays } = this.state;

    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay => {
        DateUtils.isSameDay(selectedDay, day);
      });
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }
    this.setState({ selectedDays });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmitSearch = e => {
    e.preventDefault();
    console.log("handleSubmitSearch");
    const address = this.getAddress();

    let a = this.state.selectedDays.map(i => {
      // console.log(i);
      // console.log(b);
    });

    // console.log(a);

    address.then(data => {
      const formattedDates = this.state.selectedDays.map(date =>
        date.toISOString()
      );

      // console.log(formattedDates);
      this.setState({ markerData: [] });
      this.setState({ listings: [] });

      API.getAvailableListings(formattedDates).then(res => {
        console.log("here", res);

        let emptyArr = []; // these are the items that we are displaying

        const datesLength = formattedDates.length;
        console.log(datesLength);

        for (let i = 0; i < res.data.length; i++) {
          let count = 0;
          for (let j = 0; j < res.data.length; j++) {
            // console.log(res.data[i].listing === res.data[j].listing);
            if (res.data[i].listing === res.data[j].listing) {
              count++;
              // console.log(count);
              // console.log(emptyArr.findIndex(x => x.listing === res.data[i].listing) === -1);

              if (
                count == datesLength &&
                emptyArr.findIndex(x => x.listing === res.data[i].listing) ===
                  -1
              ) {
                emptyArr.push(res.data[i]);
              }
            }
          }
        }

        // console.log(emptyArr);

        emptyArr.map(item => {
          API.getListingById(item.listing).then(listing => {
            console.log("listing here", listing);
            // Set this.state.markerData here.
            const data = listing.data[0];
            // console.log(data.title);
            this.setState({
              markerData: [
                ...this.state.markerData,
                [
                  data.address,
                  data.location.coordinates[1],
                  data.location.coordinates[0],
                  data.title,
                  data.streetName,
                  data.neighborhood,
                  data.photo
                ]
              ]
            });
          });
        });
      });
    });
  };

  renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAqMhysRXqdWYWpzfxHxkxe3_SqVP-UnIo&callback=initMap"
    );
    window.initMap = this.initMap;
    // console.log(this.state.markerData);
  };

  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: this.state.latitude, lng: this.state.longitude },
      zoom: 16
    });

    // Create An InfoWindow
    var infoWindow = new window.google.maps.InfoWindow(),
      marker,
      i;

    // We will need to change this
    var contentString = this.state.address;

    for (i = 0; i < this.state.markerData.length; i++) {
      var position = new window.google.maps.LatLng(
        this.state.markerData[i][1],
        this.state.markerData[i][2]
      );
      // bounds.extend(position);
      // console.log("position", position);
      marker = new window.google.maps.Marker({
        position: position,
        map: map,
        title: this.state.markerData[i][0]
      });

      // Allow each marker to have an info window
      window.google.maps.event.addListener(
        marker,
        "click",
        (function(marker, i) {
          return function() {
            // infoWindow.setContent(infoWindow[i][0]);
            infoWindow.open(map, marker);
          };
        })(marker, i)
      );
    }
  };

  getAddress = async () => {
    let location = this.state.addressQuery;

    axios
      .get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address: location,
          key: "AIzaSyAqMhysRXqdWYWpzfxHxkxe3_SqVP-UnIo"
        }
      })
      .then(response => {
        // console.log(response);
        var latitude = response.data.results[0].geometry.location.lat;
        var longitude = response.data.results[0].geometry.location.lng;
        this.setState({ latitude, longitude });
        // this.renderMap();
      });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <Nav />
        <form onSubmit={this.handleSubmitSearch}>
          <input
            type="text"
            name="addressQuery"
            value={this.state.address}
            onChange={this.handleInputChange}
            placeholder="Search for your address here"
          />
          <button type="submit" className="btn btn-primary" id="queryAddress">
            Search
          </button>
        </form>
        <div>
          <DayPicker
            locale="en"
            selectedDays={this.state.selectedDays}
            onDayClick={this.handleDayClick}
          />
        </div>
        <div>
          {!this.state.markerData.length ? (
            <h1 className="text-center">No Spots to Display</h1>
          ) : (
            <ListingList>
              {this.state.markerData.map(spot => {
                console.log(spot);
                return (
                  <ListingListItem
                    key={spot[3]}
                    title={spot[3]}
                    href={spot[6]}
                    street={spot[4]}
                    neighborhood={spot[5]}
                  />
                );
              })}
            </ListingList>
          )}
        </div>
        <main>
          <div id="map"></div>
        </main>
      </div>
    );
  }
}

function loadScript(url) {
  let index = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default SearchResult;
