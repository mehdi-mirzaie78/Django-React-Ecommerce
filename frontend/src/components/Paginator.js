import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginator = ({
  pages,
  page,
  pathname = "/",
  search = "",
  isAdmin = false,
}) => {
  if (search) {
    search = search.match(/search=([^&]*)/i)[1];
  }

  if (isAdmin) {
    pathname = "/admin/product/list/";
  }

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={{
              pathname: pathname,
              search: `search=${search}&page=${x + 1}`,
            }}
          >
            <Pagination.Item
              linkStyle={{ background: "dodgerblue" }}
              active={x + 1 === page}
            >
              {x + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginator;
