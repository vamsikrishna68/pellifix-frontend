import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper, Divider, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AddSubordinate from './AddSubordinate/AddSubordinate'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'gray',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));




const rows = [
    { name: 'Sabareesh', phone: '8309890570', status: 'Active', amount: 200 },
    { name: 'Ganesh', phone: '7659960779', status: 'InActive', amount: 1200 },
    { name: 'Surya', phone: '8309890570', status: 'Active', amount: 10000 },
    { name: 'Hari Krishna', phone: '8309890570', status: 'Active', amount: 800 },
]

const SubOrdinates = () => {
    const [page, setPage] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickClose = () => {
        setOpen(false);
    };
    return (
        <>
            <h3>Sub-Ordinates</h3>
            <div className='row'>
                <div className='col-sm-12 align-right'>
                    <Button onClick={() => handleClickOpen()} variant="contained"><AddIcon /> Add Sub-Ordinate</Button>
                </div>
            </div>
            <br />
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table size='small'>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Mobile Number</StyledTableCell>
                                <StyledTableCell>Status</StyledTableCell>
                                <StyledTableCell>Amount Earned</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell>
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell>{row.phone}</StyledTableCell>
                                    <StyledTableCell className={row.status === 'Active' ? 'activeColor' : 'inActiveColor'}>{row.status}</StyledTableCell>
                                    <StyledTableCell>{row.amount}</StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton><EditIcon style={{ fontSize: 'smaller' }} /></IconButton>
                                        <IconButton><DeleteIcon style={{ color: 'red', fontSize: 'smaller' }} /></IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Divider />
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {
                open ? <AddSubordinate close={handleClickClose} /> : null
            }
        </>
    );

}
export default SubOrdinates