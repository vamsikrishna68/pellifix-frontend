
const Snackbar = ({ open, message }) => {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            open={open}
            message={message}
        />
    )
}
export default Snackbar