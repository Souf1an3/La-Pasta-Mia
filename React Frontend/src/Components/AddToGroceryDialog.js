import {Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import BackspaceSharpIcon from '@material-ui/icons/BackspaceSharp';
import {useState} from "react";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';


export function SimpleDialog({onClose, open, ingredientsData}) {

    const [ingredients, setIngredients] = useState(ingredientsData);


    const removeIngredient = (removeItem) => {
        const newIngredient = ingredients.filter(item => item.id !== removeItem.id);
        setIngredients(newIngredient)
    }


    const addRecipeIngredientsToGroceryList = () => {
        for (let ingredient of ingredients) {
            fetch(`https://la-pasta-mia.herokuapp.com/grocery/add/1/${ingredient.name}`).catch((e) => {
                console.log(e)
            });

        }
        onClose()

    };
    return (
        <Dialog onClose={() => onClose()} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Hozzávalók kiválasztása</DialogTitle>
            <List>
                {ingredients && ingredients.map((ingredient) => (
                    <ListItem button key={ingredient.id} onClick={() => removeIngredient(ingredient)}>
                        <ListItemAvatar>

                            <BackspaceSharpIcon/>
                        </ListItemAvatar>
                        <ListItemText primary={ingredient.name}/>
                    </ListItem>
                ))}

            </List>
            <Button variant="contained"
                    size="large"
                    color="primary"
                    endIcon={<SaveIcon/>}
                    onClick={() => addRecipeIngredientsToGroceryList()}
            >
                LISTÁHOZ ADOM

            </Button>
        </Dialog>
    );
}