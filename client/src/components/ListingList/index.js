import React from "react";
import { Container, Row, Col } from "../Grid";
import "./style.css";
import { PromiseProvider } from "mongoose";

// Exporting both ListingList and ListingListItem from this file

// ListingList renders a bootstrap list item
export function ListingList({ children }) {
  return <ul className="list-group">{children}</ul>;
}

// ListingListItem renders a bootstrap list item containing data from the recipe api call
export function ListingListItem({
  id,
  href,
  title,
  street,
  neighborhood,
  price,
  handleBookClick
}) {
  return (
    <li className="list-group-item">
      <Container>
        <Row>
          <Col size="xs-4 sm-4">
            <img alt={title} className="img-fluid" src={href} />
          </Col>
          <Col size="xs-8 sm-8">
            <h3>{title}</h3>
            <p>Street: {street}</p>
            <p>Neighborhood: {neighborhood}</p>
            <p>$ {price}</p>
            <button
              type="button"
              className="btn btn-primary bookbtn"
              onClick={event => handleBookClick(id)}
            >
              Book Now
            </button>
          </Col>
        </Row>
      </Container>
    </li>
  );
}
