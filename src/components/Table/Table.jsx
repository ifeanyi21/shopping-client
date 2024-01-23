import { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ViewOrderDropDown from "../Dropdown/ViewOrderDropDown";

const columns = [
  {
    name: "Order ID",
    selector: (row) => row.OrderId,
  },
  {
    name: "Order Total",
    selector: (row) => <div>₦ {row.Total.toLocaleString()}</div>,
    sortable: true,
  },
  {
    name: "Date Ordered",
    selector: (row) => new Date(row.dateOrdered).toDateString(),
  },
  {
    name: "Status",
    selector: (row) => (
      <div
        className={`${
          row.orderStatus === 100 ? "text-success" : "text-primary"
        }`}
      >
        {row.orderStatus === 25 && "Processing"}
        {row.orderStatus === 50 && "Confirmed"}
        {row.orderStatus === 75 && "Shipped"}
        {row.orderStatus === 100 && "Delivered"}
      </div>
    ),
  },
  {
    name: "",
    selector: (row) => <ViewOrderDropDown id={row._id} />,
  },
];

export function ProgressUpdate() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress color="warning" />
    </Box>
  );
}

function Table() {
  const [pending, setPending] = useState(true);
  const [rows, setRows] = useState([]);
  const getOrders = useCallback(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });

    const data = await response.json();
    if (data.status) {
      setRows(data.Orders);
    }
    setPending(false);
  }, []);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <DataTable
      columns={columns}
      data={rows}
      progressPending={pending}
      progressComponent={<ProgressUpdate />}
      pagination
    />
  );
}

export default Table;
