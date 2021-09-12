import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useHistory} from 'react-router-dom';
import {
    Card,
    CardActionArea,
    CardActions,
    Chip,
    Container, Divider,
    Fab, Grow,
    List,
    ListItem, ListItemIcon, ListItemText, ListSubheader,
    Paper
} from "@material-ui/core";
import LabelIcon from '@material-ui/icons/Label';
import EditIcon from '@material-ui/icons/Edit';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {SimpleDialog} from './AddToGroceryDialog'
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import {LoadingSpinnerPasta} from './LoadingSpinnerPasta';
import TimelapseIcon from "@material-ui/icons/Timelapse";
import FireplaceIcon from "@material-ui/icons/Fireplace";
import {People} from "@material-ui/icons";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";


const Recipe = () => {

    const history = useHistory()
    const [open, setOpen] = useState(false)
    const [recipe, setRecipe] = useState();
    const [isLoading, setIsLoading] = useState(true)

    const styles =
        {

            media: {
                height: '140px',
                paddingTop: '56.25%', // 16:9,
                marginTop: '30'
            }
        };


    let {id} = useParams();
    const getRecipe = async (id) => {
        const link = `https://la-pasta-mia.herokuapp.com/recipe/${id}`
        const response = await fetch(
            link);

        await response.json()
            .then((json) => {
                setRecipe(json);
                setIsLoading(false)
            })


    };

    const handleClickOpen = () => {
        setOpen(true);

    };
    const handleClose = () => {
        setOpen(false);

    };

    useEffect(() => {
        getRecipe(id).catch(e => {
            console.log(e)
        });
    }, [id]);


    function changeFavoriteStatus(id) {
        const url = `https://la-pasta-mia.herokuapp.com/recipe/favorite/${id}`
        fetch(url).then(() => {
            getRecipe(id).catch(e => console.log(e))
        })
    }

    return (


        <div>

            {isLoading && <LoadingSpinnerPasta/>}


            {!isLoading && <Container maxWidth={"sm"}>
                <Grow in>

                    <Card>
                        <CardActionArea>

                            <CardMedia
                                image={`https://res.cloudinary.com/bravesoul/image/upload/${recipe.imageName}.jpg`}
                                title="Image"
                                style={styles.media}
                            />
                            <CardContent>

                                <h1 className={"grocery-head"} style={{fontSize:"36px"}}>
                                    {recipe.name}
                                </h1>

                                <Chip color={"primary"} label={recipe.preparationTime + " perc"}
                                      icon={<TimelapseIcon/>}> </Chip>
                                <Chip color={"primary"} label={recipe.preparationTime + " °C"}
                                      icon={<FireplaceIcon/>}> </Chip>
                                <Chip color={"primary"} label={`${recipe.personForMeal} személyre`}
                                      icon={<People/>}> </Chip>


                                <List subheader={<ListSubheader ><h2 className={"grocery-head"}>Hozzávalók</h2></ListSubheader>} dense={true}
                                      disablePadding={true}>
                                    {recipe.ingredients.map(ingredient =>
                                        <ListItem key={ingredient.id}>
                                            <ListItemIcon>
                                                <LabelIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={`${ingredient.amount} ${ingredient.unitType}  ${ingredient.name}`}
                                            />
                                        </ListItem>,
                                    )}
                                </List>
                                <Fab color={"primary"}  onClick={handleClickOpen}>
                                    <AddShoppingCartIcon/>
                                </Fab>

                            </CardContent>
                            <Divider variant={"middle"}/>
                            <CardContent>
                                <h1 className={"grocery-head"}>Elkészítés Virág módra</h1>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <Paper elevation={3}>
                                        <p>{recipe.details}</p>
                                    </Paper>
                                </Typography>
                            </CardContent>

                            <Divider variant={"middle"}/>
                        </CardActionArea>
                        <CardActions>
                            <Fab color={"default"} onClick={() => {
                                history.goBack()
                            }}>
                                <ArrowBackSharpIcon/>

                            </Fab>
                            <Fab aria-label="like" onClick={() => changeFavoriteStatus(recipe.id)}>
                                <FavoriteIcon color={recipe.favorite ? "secondary" : "action"}/>
                            </Fab>

                            <Link to="/grocery" className="btn btn-primary">
                                <Fab color="secondary" aria-label="edit">
                                    <EditIcon/>
                                </Fab>

                            </Link>



                        </CardActions>

                    </Card>
                </Grow>

                <div>


                    <SimpleDialog open={open} ingredientsData={recipe.ingredients} onClose={handleClose}/>
                </div>
            </Container>}

        </div>

    )
}

export default Recipe;
