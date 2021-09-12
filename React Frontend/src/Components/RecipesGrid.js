import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {Chip, Fab, Grow} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import FireplaceIcon from "@material-ui/icons/Fireplace";
import {People} from "@material-ui/icons";
import CardActions from "@material-ui/core/CardActions";
import {NavLink} from "react-router-dom";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
}));

export const RecipesGrid = ({loading,recipes}) => {
    const classes = useStyles();
    return (
        <Container className={classes.cardGrid} maxWidth="md">


            <Grid container spacing={4}>
                {!loading && recipes.map((card) => (
                    <Grow in>
                        <Grid item key={card.id}  xs={12}  sm={6} md={4} xl={3}>
                            <Card className={classes.card}>
                                <Grow in>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={card.imageName !== "" ? `https://res.cloudinary.com/bravesoul/image/upload/${card.imageName}.jpg` :
                                            "https://res.cloudinary.com/bravesoul/image/upload/v1629804930/logopasta.jpg.jpg"}
                                        title="Image title"
                                    />
                                </Grow>

                                <CardContent className={classes.cardContent}>
                                    <Typography style={{fontFamily:"'Amatic SC', cursive"}} gutterBottom variant="h4" component="h2">
                                        {card.name} {card.favorite && <FavoriteIcon color={"error"}/>}
                                    </Typography>
                                    <div>
                                        <Chip  label={card.preparationTime + " perc"}
                                              icon={<TimelapseIcon/>}> </Chip>
                                        <Chip  label={card.preparationTime + " °C"}
                                              icon={<FireplaceIcon/>}> </Chip>
                                        <Chip  label={card.personForMeal} icon={<People/>}> </Chip>
                                    </div>
                                </CardContent>
                                <CardActions style={{justifyContent:"space-around"}}>

                                    <NavLink style={{color:"white",textDecoration: 'none'}} to={`/recipe/${card.id}`}>
                                        <Fab variant="extended"
                                             color={"primary"}
                                             size={"medium"}
                                        >Recept</Fab>
                                    </NavLink>

                                </CardActions>
                            </Card>

                        </Grid>
                    </Grow>
                ))}
            </Grid>
        </Container>
    )
}