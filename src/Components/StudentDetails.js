import axios from "axios";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStudentDetails } from "../ReduxStateManagement/actions/Action";

import { SearchBar } from "./SearchBar";
import { TableData } from "./TableData";
import { useTable,useSortBy,useFilters,useGlobalFilter,usePagination} from "react-table";
import { Columns } from "../react-table/Columns";
import { GlobalSearch } from "../react-table/GlobalSearch";
import { Input } from "@mui/material";
import { ExportFile } from "../react-table/ExportFile";
export const StudentDetails = () => {
  const dispatch = useDispatch();

  const getData = async () => {
    
    const res = await axios
      .get(
        "https://develop.hipoz.com/api/userprofile?type=Admin&user_id=0&status_enum_id=0&job_search_status_enum_id=0"
      )
      .catch((error) => {
        alert("Error");
      });
    dispatch(setStudentDetails(res.data.data));
    //console.log(res.data.data);
    //  res.data.data.map((res)=>{

    //
    // })
  };
  useEffect(() => {
    getData();
  });
  const StudentData = useSelector((state) => state.SDetails.datas);
  // const searchResult = useSelector(state => state.search_result);
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => StudentData, []);

  const tableInstance = useTable({
    columns,
    data,
    initialState:{pageIndex:0}
  },useFilters,
  useGlobalFilter,useSortBy,usePagination
);
  const { getTableProps, 
    getTableBodyProps, 
    headerGroups, 
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    prepareRow,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    setGlobalFilter 
  } = tableInstance;
    const {globalFilter,pageIndex,pageSize}= state;
    //console.log(globalFilter);
  return (
    <>
      <GlobalSearch filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="d-flex float-right">
        <div className="d-flex p-2">
          <ExportFile csvData={data} fileName={"Table Data"} />
        </div>
      </div>
      <table className="table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column)=>(
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                      {column.isSorted ?(column.isSortedDesc?' ASC':' DESC'):''}
                      <div>{column.canFilter ? column.render('Filter'): null}</div>
                  </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            {page.map((row)=>{
              prepareRow(row)
              return(
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell)=>{
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                  </tr>
              )
            })}
        </tbody>
      </table>
      <button onClick={()=> gotoPage(0)} disabled={!canPreviousPage}>{"<--"}</button>
        <button className="mx-3" onClick={()=> gotoPage(pageCount-1)} disabled={!canNextPage}>{"-->"}</button>
      <div className="float-right">
      <span>
        <select className="mr-3" value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
        {
          [5,10,15].map((pageSize)=>(
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))
        }
        </select>
        Page{' '}
        <strong>
          {(pageIndex==='')?0:(pageIndex)} of {pageOptions.length-1}
        </strong>{' '}
      </span>
        <Input style={{"width":"50px"}}type="number" onChange={(e)=>gotoPage(e.target.value)}/>
        <button className="mx-2 btn btn-primary" onClick={()=> previousPage()} disabled={!canPreviousPage}>Prev</button>
        <button className="mx-3 btn btn-primary" onClick={()=> nextPage()} disabled={!canNextPage}>Next</button>
      </div>
    </>
  );
};
/* <SearchBar />
      <table className="table">
          <thead>
              <tr>
              <th>user_id</th>
              <th>user_name</th>
              <th>date_of_birth</th>
              <th>email_id</th>
              <th>mobile_number</th>
              <th>country_name</th>
              </tr>
          </thead>
          <tbody>
            
        <TableData />
    </tbody>
      </table> */
