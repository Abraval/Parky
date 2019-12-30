import React from "react";
import { Container, Row, Col } from "../Grid";

// Exporting both ListingList and ListingListItem from this file

// ListingList renders a bootstrap list item
export function ListingList({ children }) {
  return <ul className="list-group">{children}</ul>;
}

// ListingListItem renders a bootstrap list item containing data from the recipe api call
export function ListingListItem(
  {
    href,
    title,
    street,
    neighborhood
  }
) {
  return (
    <li className="list-group-item">
      <Container>
        <Row>
          <Col size="xs-4 sm-2">
            <img alt={title} src={href}/>
          </Col>
          <Col size="xs-8 sm-9">
            <h3>{title}</h3>
            <p>Street: {street}</p>
            <p>Neighborhood: {neighborhood}</p> 
          </Col>
        </Row>
      </Container>
    </li>
  );
}
