import { AppBar, Box, Button, Toolbar, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

export function UserToolbar(props: any): JSX.Element {
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
                        btn1
                    </Button>
                    <Button
                        color="inherit"
                        onClick={e => {
                            history.push('/admin/devices')
                        }}
                    >
                        btn1
                    </Button>
                    <Button
                        color="inherit"
                        onClick={e => {
                            history.push('/admin/sensors')
                        }}
                    >
                        btn1

                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
