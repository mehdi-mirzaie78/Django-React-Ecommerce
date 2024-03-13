import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <Card className="my-2 p-2 rounded border">
      <Link to={`/products/${product.id}`}>
        <Card.Img src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`/products/${product.id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-1">
            <Rating
              value={product.rating}
              text={
                product.numReviews === 1
                  ? `${product.numReviews} review`
                  : `${product.numReviews} reviews`
              }
              color={"#f8e825"} // yellow color for stars
            />
          </div>
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
