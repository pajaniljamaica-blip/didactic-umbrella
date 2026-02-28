import React from "react";
import ProductTable from "../../../components/data-table/datatable";
import data from "./data.json";

export default function ProductData() {
  return (
    <div>
      < ProductTable items={data} />
    </div>
  );
}