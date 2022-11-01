import CircularProgress from '@mui/material/CircularProgress';

const Loading = ({ loading }) => {
    return (
        <>
            {
                loading ? <div style={{ zIndex: 10000, width: '99vw', height: '100vh', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.4)' }}>
                    <CircularProgress color="primary" />
                </div> : null
            }
        </>



    )
}
export default Loading