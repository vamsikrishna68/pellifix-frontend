import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));



const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

export default function AddSubordinate({ close }) {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        close()
        setOpen(false);
    };

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Add Sub-Ordinate
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <TextField size="small" style={{marginTop:'15px'}} fullWidth label="Name" variant="outlined" />
                    <TextField size="small" style={{marginTop:'15px'}} fullWidth label="Email" variant="outlined" />
                    <TextField size="small" style={{marginTop:'15px'}} fullWidth label="Mobile Number" variant="outlined" />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus variant="contained" onClick={handleClose}>
                        Submit
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
