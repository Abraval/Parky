import React, { Component } from "react";
import Map from "../components/Map"; 

class SearchResult extends Component {

state = {
    addressQuery: ""
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
        })
    })
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

getAddress = async () => {

    // axios.get("https://maps.googleapis.com/maps/api/geocode/json",{
    //     params:{
    //         address:location,
    //         key: "AIzaSyAqMhysRXqdWYWpzfxHxkxe3_SqVP-UnIo"
    //     }
    // }).then(function(response) {

    // console.log("Response data is", response.data); 

    // });

}

render() {
    console.log(this.state); 
    return (
        <div>
            <form onSubmit={this.handleSubmitSearch}>
                <input type="text" name="addressQuery" value={this.state.address} onChange={this.handleInputChange} placeholder="Search for your address here"/>
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