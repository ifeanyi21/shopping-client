import React, { useCallback, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BottomNavigation, Paper } from "@mui/material";
import CSS from "./SearchResult.module.css";
import CategoryDialog from "../../components/Search Result Side Bar/CategoryDialog";
import SortDropDown from "../../components/Search Result Side Bar/SortDropDown";
import Title from "../../components/Title/Title";
import { ProgressUpdate } from "../../components/Table/Table";
import Sort from "../../services/context/sort";
import Product from "../../components/home/Product";
import Empty from "../../components/Empty/Empty";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function ViewProductCategory() {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useContext(Sort);

  const { content } = useParams();
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
      `${process.env.REACT_APP_API_URL}cat/${content}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (state.value === 0) {
      setSearchResult(data.searchResult);
    }

    if (state.value === 1) {
      setSearchResult(data.searchResult.sort((a, b) => b.price - a.price));
    }

    if (state.value === 2) {
      setSearchResult(data.searchResult.sort((a, b) => a.price - b.price));
    }

    setLoading(false);
  }, [content, state]);

  useEffect(() => {
    getDetails();
  }, [getDetails, dispatch]);

  return (
    <div>
      <Title text={"Search Result"} />
      <div className="row">
        <div className="col-lg-12 p-3">
          <div className="p-4">
            {loading ? (
              <ProgressUpdate />
            ) : (
              <div className="row">
                {searchResult.length > 0 && (
                  <div className="d-flex mb-4 justify-between">
                    <h3 className="text-sm text-muted mb-3">
                      {searchResult.length} product(s) found
                    </h3>
                    <div className={`${CSS.searchSideBar}`}>
                      <SortDropDown marginTop={0} />
                    </div>
                  </div>
                )}

                {searchResult.length > 0 ? (
                  searchResult
                    .slice(pagesVisited, pagesVisited + contentPerPage)
                    .map((result) => (
                      <div
                        key={result._id}
                        className={`${CSS.searchResultContainer} col-lg-3 col-md-6 mb-8`}
                      >
                        <Product
                          image={result.Image}
                          productId={result._id}
                          name={result.name}
                          price={result.price}
                          salePrice={result.salePrice}
                          salePercent={result.salePercent}
                          quantity={result.quantity}
                        />
                      </div>
                    ))
                ) : (
                  <Empty text={"No Products Found"} />
                )}
              </div>
            )}
          </div>
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
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1 }}
          elevation={3}
        >
          <BottomNavigation
            sx={{
              justifyContent: "space-around !important",
            }}
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <CategoryDialog />
            <SortDropDown marginTop={1} marginLeft={5} />
          </BottomNavigation>
        </Paper>
      </div>
    </div>
  );
}

export default ViewProductCategory;
