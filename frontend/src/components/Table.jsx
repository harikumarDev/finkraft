import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { headers } from "../utils/table";
import Loader from "./Loader";

function Table(props) {
  const { options, setOptions } = props;

  const [employees, setEmployees] = useState([]);
  const [count, setCount] = useState(0);
  const [pages, setPages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    setIsLoading(true);
    try {
      const { data } = await fetch(
        `${process.env.REACT_APP_API}/employee/all`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(options),
        }
      ).then((resp) => resp.json());

      const { employees, count } = data;
      setEmployees(employees);
      setCount(count);
      setPages(new Array(Math.ceil(count / options.resPerPage)).fill(0));
      setIsLoading(false);
    } catch (err) {
      console.log("Something went wrong :: ", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [options]);

  const handleSort = (header) => {
    if (!options.sortBy || options.sortBy !== header.key) {
      setOptions({
        ...options,
        sortBy: header.key,
        order: 1,
      });
    } else {
      const order = options.order === -1 ? 0 : -1;
      setOptions({
        ...options,
        sortBy: order === 0 ? "" : header.key,
        order,
      });
    }
  };

  return (
    <div className="mt-6 flex flex-col">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden border border-gray-200 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {headers.map((hd) => (
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      key={hd.key}
                      style={{
                        minWidth: "12rem",
                      }}
                    >
                      <div
                        className="cursor-pointer select-none flex items-center gap-1"
                        onClick={() => handleSort(hd)}
                      >
                        <span>{hd.value}</span>
                        {options.sortBy === hd.key &&
                          (options.order === 1 ? (
                            <span className="up-arrow"></span>
                          ) : (
                            <span className="down-arrow"></span>
                          ))}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {isLoading ? (
                  <tr>
                    <td className="p-2 flex items-center justify-center">
                      <Loader />
                    </td>
                  </tr>
                ) : (
                  employees.map((employee) => (
                    <tr key={employee._id}>
                      {headers.map((hd) => (
                        <td
                          key={hd.key}
                          className="whitespace-nowrap px-5 py-4"
                        >
                          <div className="text-sm text-gray-900 ">
                            {hd.key === "salary" && "$"}
                            {hd.key === "start_date"
                              ? employee[hd.key].substring(0, 10)
                              : employee[hd.key]}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="p-2">
            Showing{" "}
            {Math.min((options.page - 1) * options.resPerPage + 1, count)} to{" "}
            {Math.min(options.page * options.resPerPage, count)} of {count}{" "}
            entries
          </div>
        </div>
      </div>

      <Pagination options={options} pages={pages} setOptions={setOptions} />
    </div>
  );
}

export default Table;
