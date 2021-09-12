import AddShoppingCartSharpIcon from '@material-ui/icons/AddShoppingCartSharp';
import {useEffect, useState} from "react";
import './InputField.css'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import {
    Checkbox, CircularProgress,
    Fab, Grow,
    IconButton, List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText, TextField
} from "@material-ui/core";
import Button from "@material-ui/core/Button";


const GroceryList = () => {

    const [items, setItems] = useState([])
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);


    const getGroceries = async () => {
        const groceryLink = "https://la-pasta-mia.herokuapp.com/grocery/list/1"
        await fetch(groceryLink)
            .then(response => response.json()
                .then((json) => setItems(json))).then(() => setIsLoading(false))

    }

    useEffect(() => {
        getGroceries().catch((e) => {
            console.log(e)
        });
    }, [setItems])


    const toggleComplete = (id) => {
        const newItems = [...items];
        newItems.forEach(item => {
            if (item.id === id) {
                console.log(item.id, " ....", id)
                fetch(`https://la-pasta-mia.herokuapp.com/grocery/toggle/${item.id}`).catch(e => console.log(e))
                item.enabled = !item.enabled;

            }
        })
        setItems(newItems);
    };

    const handleAddButtonClick = () => {

        if (inputValue === "") {
            return;
        }

        fetch(`https://la-pasta-mia.herokuapp.com/grocery/add/1/${inputValue}`).then(res=> res.json().then(items => setItems(items)).catch((e) => {
            console.log(e)
        }));
        setInputValue("");
    };

    const removeItem = (id) => {
        fetch(`https://la-pasta-mia.herokuapp.com/grocery/remove/${id}`).then(() => getGroceries());
    }


    return (
        <>

            <h2 className="grocery-head">Bevásárlólista</h2>
        {isLoading && <div><CircularProgress/></div>}


    {!isLoading && <div className="grocery-list"> <Grow in>



        <div className="inputFields">
            <label className="custom-field">
                <TextField   onKeyPress={(ev) => {
                    console.log(`Pressed keyCode ${ev.key}`);
                    if (ev.key === 'Enter') {
                        handleAddButtonClick()
                        ev.preventDefault();
                    }
                }} value={inputValue} onChange={(event) => setInputValue(event.target.value)}
                       minLength={2} placeholder="&nbsp;" required={true}/>
                <span className="placeholder">Termék neve</span>
                &nbsp;&nbsp;
                    <Fab color="primary" aria-label="add" onClick={() => handleAddButtonClick()}>
                        <AddShoppingCartSharpIcon/>
                    </Fab>


            </label>


        </div>
    </Grow>

        <Grow in >

        <div className="grocery-container">
            <List>
                {items && items.map((value) => {
                    const labelId = `checkbox-list-label-${value.id}`;

                    return (
                        <ListItem key={value.id} role={undefined} dense button onClick={() => toggleComplete(value.id)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={!value.enabled}
                                    color={"default"}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{'aria-labelledby': labelId}}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value.enabled ? value.itemName :
                                <strike>{value.itemName}  </strike>}/>
                            <ListItemSecondaryAction>

                                <IconButton edge="end" onClick={() => removeItem(value.id)} aria-label="delete">
                                    <RemoveShoppingCartIcon color={"primary"}/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
            <Button color={"primary"} variant={"contained"} onClick={()=> {
                items.forEach((item) => {
                    if (!item.enabled) {
                        fetch(`https://la-pasta-mia.herokuapp.com/grocery/remove/${item.id}`).catch(e => console.log(e.message))
                    }
                })
                    getGroceries().catch(r => console.log(r.message));
            }
            }> Lista tisztítás</Button>
        </div>



        </Grow>
    </div>}
         </>)
}
export default GroceryList;