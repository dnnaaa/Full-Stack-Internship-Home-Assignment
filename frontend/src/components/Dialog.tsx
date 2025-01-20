import { Dialog as MuiDialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from "@mui/material";

interface DialogInterface {
    openDialog: boolean;
    handleCloseDialog: () => void;
    handleConfirmDelete: () => void;
}

const Dialog = ({ openDialog, handleCloseDialog, handleConfirmDelete }: DialogInterface) => {
    return (
        <MuiDialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Are you sure you want to delete this job?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={handleConfirmDelete} variant="contained" color="secondary">Delete</Button>
            </DialogActions>
        </MuiDialog>
    )
}
export default Dialog