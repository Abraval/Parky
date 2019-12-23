import React, { Component } from "react";
import "./style.css";

class Map extends Component {
  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAqMhysRXqdWYWpzfxHxkxe3_SqVP-UnIo&callback=initMap"
    );
    window.initMap = this.initMap;
  };

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8
    });
  };


getAddress = () => {

axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=1400%20John%20F%20Kennedy%20Blvd,%20Philadelphia,%20PA%2019107&key=AIzaSyAqMhysRXqdWYWpzfxHxkxe3_SqVP-UnIo").then(function(response) {

console.log("Response data is", response.data); 
});

}

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
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

export default Map;
