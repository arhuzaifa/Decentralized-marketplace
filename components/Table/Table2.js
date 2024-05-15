import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "components/CustomButtons/Button.js";
//////////
import { ethers } from "ethers";
// import { useMoralis } from "react-moralis";
var provider = 0;
var signer = 0;
var numberContract = "";
var ContractAbi = "";
var ContractAddress = "";

const columns = [
  { id: "id", label: "ID", minWidth: 120 },
  { id: "client", label: "Client", minWidth: 120 },
  { id: "worker", label: "Worker", minWidth: 120 },
  { id: "budget", label: "Budget", minWidth: 120 },
  { id: "status", label: "Status", minWidth: 120 },
  { id: "finishjob", label: "Finish Job", minWidth: 120 },
];

function createData(id, client, worker, budget, status, finishjob) {
  //const density = population / size;
  return { id, client, worker, budget, status, finishjob };
}

// var accountLinked = "";
// var currentUser = 0;
// var contract = 0;

export default function StickyHeadTable(props) {
  // const { isAuthenticated, user, Moralis } = useMoralis();
  const { ...rest } = props;
  console.log(rest);

  const jobDone = async (jobOfferId) => {
    var data;
    try {
      const res = await fetch(`/contract/${jobOfferId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      data = await res.json();
      console.log(data);
      ContractAddress = data.ContractAddress;
      console.log(ContractAddress);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
    console.log("ImCAlled");
    // ContractAddress = "0x0625A6F85D21fcEAEd6De73C8d1970704C97Cd2e";
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    console.log("signer", signer);
    ContractAbi = ["function jobDone() payable public"];
    numberContract = new ethers.Contract(ContractAddress, ContractAbi, signer);
    const txResponse = await numberContract.jobDone();
    await txResponse.wait();
    console.log(txResponse.hash);
  };
  const rows = [
    rest.projects.projects.map((projects, index) => {
      return createData(
        index + 1,
        projects.clientName,
        projects.workerName,
        projects.budget,
        projects.status,
        <Button
          onClick={() => jobDone(projects.job_id)}
          size="sm"
          color="black"
          href=""
        >
          Finish Job
        </Button>
      );
    }),
    // createData("01", "Musa", "Wadood", "Plumber", "245656"),
    // createData("02", "Arooj", "Wadood", "Electrician", "245656"),
    // createData("03", "Huzaifa", "Wadood", "Chef", "245656"),
  ];
  // console.log(rows[0]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "80%",
        overflow: "hidden",
        margin: "auto",
        marginBottom: 10,
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead
          // style={{
          //   background: "linear-gradient(60deg, #29524a, #e9bcb7)",
          // }}
          >
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows[0]
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
