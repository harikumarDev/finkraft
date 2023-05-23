import React, { useState } from "react";
import "./App.css";
import { Table, TableOptions } from "./components";

function App() {
  const [options, setOptions] = useState({
    page: 1,
    resPerPage: 10,
    search: "",
    sortBy: "",
    order: 0,
  });

  const handleOptionChange = (e) => {
    const { name, value } = e.target;

    let newOptions = {
      ...options,
      [name]: value,
    };

    if (name === "search") {
      newOptions = {
        ...newOptions,
        page: 1,
      };
    }
    setOptions(newOptions);
  };

  return (
    <div>
      <div className="space-y-4 md:space-y-0 px-6 lg:px-32 py-7">
        <h2 className="text-lg font-semibold">Employees</h2>
      </div>
      <div className="mx-auto w-full max-w-7xl px-4 py-4">
        <TableOptions
          options={options}
          handleOptionChange={handleOptionChange}
        />
        <Table options={options} setOptions={setOptions} />
      </div>
    </div>
  );
}

export default App;
