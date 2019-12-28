import React, { Component } from "react";
import Nav from "../../components/Nav";
import "./style.css";
import axios from "axios";
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import API from "../../utils/API";

class SearchResult extends Component {
  state = {
    addressQuery: "",
    latitude: 39.952583,
    longitude: -75.165222,
    selectedDays: []
  };

  componentDidMount() {
    this.renderMap();
  }

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
  }

  handleDayClick(day, { selected }) {
    const { selectedDays } = this.state;
    if (selected) {
      const selectedIndex = selectedDays.findIndex(selectedDay =>
        DateUtils.isSameDay(selectedDay, day)
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }
    this.setState({ selectedDays });
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
      console.log(this.state.selectedDays)

      let firstDay = this.state.selectedDays[0]
      let lastDay = this.state.selectedDays[this.state.selectedDays.length -1]
      let dateRangeObj = {firstDay, lastDay}
      console.log(dateRangeObj)
      console.log(firstDay)
      console.log(lastDay)
     
        API.getAvailableListings(dateRangeObj)
        .then(res => console.log(res))
      // api get route for all available listings
      // api.getAvailableListings()
      // .then(res => console.log(res))
      // map or foreach to create markers for each listing
      
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
        <Nav/>
        <form onSubmit={this.handleSubmitSearch}>
          <input
            type="text"
            name="addressQuery"
            value={this.state.address}
            onChange={this.handleInputChange}
            placeholder="Search for your address here"
          />
          <button type="submit" className="btn btn-primary" id="queryAddress">Search</button>
        </form>
        <div>
        <DayPicker
          selectedDays={this.state.selectedDays}
          onDayClick={this.handleDayClick}
        />
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
