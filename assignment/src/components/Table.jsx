import React, { useEffect, useState } from "react";
import { API_URL, RECORD_PER_PAGE } from "../utils";
import Pagination from "./Pagination";
import Columns from "./Columns";
import Rows from "./Rows";
import NoData from "./NoData";


const Table = () => {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Pagination related values
    const indexOfLastRecord = currentPage * RECORD_PER_PAGE;
    const indexOfFirstRecord = indexOfLastRecord - RECORD_PER_PAGE;
    const currentProjects = projects.slice(indexOfFirstRecord, indexOfLastRecord);
  
    // Fetch data from API
    useEffect(() => {
      const fetchProjects = async () => {
        setLoading(true);
        try {
          const response = await fetch(API_URL);
          const data = await response.json();
          setProjects(data || []);
        } catch (err) {
          setError("Failed to fetch data");
        } finally {
          setLoading(false);
        }
      };
      fetchProjects();
    }, []);

    if(error){
      return <p>{error}</p>;
    }

    return (
      <div className="app">
        {!loading && !error && (
          <div className="tableBox">
            {/* Table */}
            <section className="tableSection">
              <table>
                <thead>
                  <Columns />
                </thead>
                <tbody>
                  {loading && <tr><td>Loading...</td></tr>}
                  <Rows rows={currentProjects} />
                  <NoData rows={currentProjects} />
                </tbody>
              </table>
            </section>

            {/* Pagination */}
            <Pagination 
              totalNumberItem={projects.length}
              itemPerPage={RECORD_PER_PAGE}
              currentActivePage={currentPage}
              setCurrentActivePage={setCurrentPage}
            />
          </div>
        )}
      </div>
    );
};

export default Table;
