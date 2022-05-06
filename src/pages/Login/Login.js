import './style.scss'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


const Login = () => {
    return (
        <>
            <div className='login-bg-image'></div>
            <div className='container-fluid login-container'>

                <Card className='card' elevation={4}>
                    <CardContent>
                        <Typography className='center secondary-color heading' variant='h4'>Login</Typography>
                        <br></br>
                        <form>
                            <TextField size="small" className="full-width" label="Username" variant="outlined" />
                            <TextField type="password" size="small" className="full-width" label="Password" variant="outlined" />
                            <Button className="full-width" variant="contained">Login</Button>
                            <div className='center info-text'>
                                New User? <a href='javascript:void(0)' >Register</a>
                            </div>

                        </form>

                    </CardContent>
                </Card>
            </div>
        </>
    )
};
export default Login