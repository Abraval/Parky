import React, { Component } from "react";
import "./style.css";
import axios from "axios";
// import Map from "../components/Map";

class SearchResult extends Component {
  state = {
    addressQuery: "",
    latitude: 39.952583,
    longitude: -75.165222
  };

  componentDidMount() {
    this.renderMap();
  }

  handleInputChange = event => {
    console.log(event.target);
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmitSearch = e => {
    e.preventDefault();
    console.log("submit search works");
    const address = this.getAddress();
    address.then(data => {
      console.log(data);
      this.setState({
        address: "worked"
      });
    });
  };

  renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAqMhysRXqdWYWpzfxHxkxe3_SqVP-UnIo&callback=initMap"
    );
    window.initMap = this.initMap;
  };

  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: this.state.latitude, lng: this.state.longitude },
      zoom: 16
    });

    // Create An InfoWindow
    var infowindow = new window.google.maps.InfoWindow();

    // We will need to change this
    var contentString = this.state.address;

    var marker = new window.google.maps.Marker({
      position: {
        lat: this.state.latitude,
        lng: this.state.longitude
      },
      map: map
    });

    // Click on A Marker!
    marker.addListener("click", function() {
      // Change the content
      infowindow.setContent(contentString);

      // Open An InfoWindow
      infowindow.open(map, marker);
    });
  };

  getAddress = async () => {
    console.log("a string");
    let location = this.state.addressQuery;
    console.log(location);

    axios
      .get("https://maps.googleapis.com/maps/api/geocode/json", {
        params: {
          address: location,
          key: "AIzaSyAqMhysRXqdWYWpzfxHxkxe3_SqVP-UnIo"
        }
      })
      .then(response => {
        console.log("Response data is", response.data);
        var latitude = response.data.results[0].geometry.location.lat;
        console.log("latitude: " + latitude);

        var longitude = response.data.results[0].geometry.location.lng;
        console.log("longitude: " + longitude);
        this.setState({ latitude: latitude, longitude: longitude });
        this.renderMap();
      });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <form onSubmit={this.handleSubmitSearch}>
          <input
            type="text"
            name="addressQuery"
            value={this.state.address}
            onChange={this.handleInputChange}
            placeholder="Search for your address here"
          />
        </form>
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
