import AddCustomer from "./AddCustomer";
import ShowCustomers from "./ShowCustomers";
import { useState } from "react";

export default function Customers() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div style={{ width: "100%", maxWidth: "1200px" }}>
      <h1>Customer Details</h1>
      <AddCustomer onCustomerAdded={() => setRefresh(!refresh)} />
      <ShowCustomers refresh={refresh} />
    </div>
  );
}