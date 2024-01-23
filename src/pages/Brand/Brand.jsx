import { Card } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../../components/Products/Product";
import { ProgressUpdate } from "../../components/Table/Table";
import Title from "../../components/Title/Title";
import CSS from "../Search Result/SearchResult.module.css";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Empty from "../../components/Empty/Empty";

function ViewBrand() {
  const [loading, setLoading] = useState(true);

  const { name } = useParams();
  const [searchResult, setSearchResult] = useState([]);

  const [pageNumber, setPageNumber] = useState(0);
  const contentPerPage = 8;
  const pagesVisited = pageNumber * contentPerPage;

  const pageCount = Math.ceil(searchResult.length / contentPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const getDetails = useCallback(async () => {
    setLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}brand/${name}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (data.done) {
      setSearchResult(data.searchResult);
    } else {
      //searchResult([]);
    }

    setLoading(false);
  }, [name]);

  useEffect(() => {
    getDetails();
  }, [getDetails]);
  return (
    <div className="col-lg-12 p-3">
      <div className="p-4">
        {loading ? (
          <ProgressUpdate />
        ) : (
          <div className="row">
            <Title text={name} content={`Get all your ${name} Products here. Shop more with Gadget Spot`} />
            <div className="d-flex mb-4 justify-center">
              <h3 className="text-3xl mb-3 uppercase font-semibold">{name}</h3>
            </div>
            <Card sx={{ py: 6, marginBottom: 10 }}>
              <div className="row">
                {searchResult.length > 0 ? (
                  searchResult
                    .slice(pagesVisited, pagesVisited + contentPerPage)
                    .map((result) => (
                      <div
                        key={result._id}
                        className={`${CSS.searchResultContainer} col-lg-3 col-md-6 mb-8`}
                      >
                        <Product
                          productId={result._id}
                          image={result.Image}
                          name={result.name}
                          price={result.price}
                          salePrice={result.salePrice}
                          salePercent={result.salePercent}
                        />
                      </div>
                    ))
                ) : (
                  <Empty text={"No Products Found"} />
                )}
              </div>
            </Card>
            {searchResult.length > 0 && (
              <ReactPaginate
                previousLabel={<FaChevronLeft color="#000" />}
                nextLabel={<FaChevronRight color="#000" />}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
                nextLinkClassName={"nextBtn"}
                previousLinkClassName={"prevBtn"}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewBrand;
