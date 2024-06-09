import React from "react";
import { useLocation } from "react-router-dom";
import CurrentBook from "../../components/currentRead/CurrentBook";

const BookInfo = () => {
  const location = useLocation();
  const MoreInfoBookId = location.state;
  return <div>{<CurrentBook selectedBookId={MoreInfoBookId} />}</div>;
};

export default BookInfo;
