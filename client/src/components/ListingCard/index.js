import React from "react";
import "./style.css";

function ListingCard(props) {
  return (
      <div className="card" {...props} tabIndex="0">
          <div className="card-header">
            <div className="row">
              <div className="card-title">{props.title}</div>
            </div>
          </div>
          <div className="card-body">
          <img className="photo img-fluid" src={props.photo}/>
          <p className="adress">{props.address}</p>
          <p className="city">{props.city}</p>
          <p className="city">{props.state}</p>
          <p className="zipcode">{props.zipcode}</p>
          </div>

        <div className="card-footer">
        </div>
      </div>
  );
}

export default ListingCard;