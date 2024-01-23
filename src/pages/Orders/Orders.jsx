import React from "react";
import AccountHeader from "../../components/Header/AccountHeader";
import Table from "../../components/Table/Table";
import Title from "../../components/Title/Title";

function Orders() {
  return (
    <div className={`px-6`}>
      <Title text={"Orders"} />
      <div className="p-2">
        <header className="text-left mb-4 mt-2">
          <AccountHeader title={"Orders"} />
        </header>
        <div className="row">
          <Table />
        </div>
      </div>
    </div>
  );
}

export default Orders;
