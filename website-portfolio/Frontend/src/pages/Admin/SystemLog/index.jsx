import React from 'react'
import "./style.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useGetLogsQuery } from '../../../Redux/services/LogCreateApi';

function createData(user, time, action) {
  return { user, time, action };
}
const rows = [
  createData("SuperAdmin", "2025-04-02 10:23", "Added new category: Electronics"),
  createData("SuperAdmin", "2025-04-02 10:23", "Added new category: Electronics"),


];
function SystemLog() {
  const { data: logData, isLoading, isError } = useGetLogsQuery()
  if (isLoading) {
    return <div className='loading'>Loading...</div>
  }
  if (isError) {
    return <div className='loading'>Something went wrong</div>
  }

  return (
    <div className='content'>
      <div className="admin-wrapper">
        <div className="table-content">

          <TableContainer component={Paper} style={{ backgroundColor: "#1E293B" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow >
                  <TableCell align="center" >User Email</TableCell>
                  <TableCell align="center" >Role</TableCell>
                  <TableCell align="center" >Time</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logData.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {row.user}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {row.role}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {row.time}
                    </TableCell>

                    <TableCell align="center" component="th" scope="row">  {row.action}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  )
}

export default SystemLog