import { AppBar, Box, Button, Toolbar, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

export function CustomToolbar(props: any): JSX.Element {
    const history = useHistory()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography>EnMOD</Typography>
                    <Button
                        color="inherit"
                        onClick={e => {
                            history.push('/admin/users')
                        }}
                    >
                        Users
                    </Button>
                    <Button
                        color="inherit"
                        onClick={e => {
                            history.push('/admin/devices')
                        }}
                    >
                        Devices
                    </Button>
                    <Button
                        color="inherit"
                        onClick={e => {
                            history.push('/admin/sensors')
                        }}
                    >
                        Sensors
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
