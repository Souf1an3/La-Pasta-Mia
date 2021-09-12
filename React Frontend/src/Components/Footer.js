import Typography from "@material-ui/core/Typography";
import React from "react";
import {CopyrightSharp} from "@material-ui/icons";
import Link from "@material-ui/core/Link";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));


export const Footer = () => {
    let date = 2021
    const classes = useStyles()


    return (

    <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
            La Pasta Mia  <CopyrightSharp/>
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            A főzés művészete
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://la-pasta-mia-v1.herokuapp.com/">
                La Pasta Mia
            </Link>{' '}
            {date}
            {''}
        </Typography>
    </footer>

    )
}