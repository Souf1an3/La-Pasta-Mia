import React, {useEffect, useRef, useState} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import {Box, Divider, Fab, Grow, InputAdornment, TextareaAutosize, TextField} from "@material-ui/core";
import './InputField.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import {ImageUpload} from './ImageUpload';
import AddIcon from "@material-ui/icons/Add";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import Rating from '@material-ui/lab/Rating';
import PersonIcon from '@material-ui/icons/Person';
import FireplaceIcon from '@material-ui/icons/Fireplace';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import BookIcon from '@material-ui/icons/Book';

const StyledRating = withStyles({
    iconFilled: {
        color: '#076620'
    },
    iconHover: {
        color: '#071621',
    },
})(Rating);






const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
    iconFilled: {
        color: "#076620",
    },
    iconHover: {
        color: '#076620',
    },

    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25px',
    },
}));

const labels = {
    1: 'Fine Dinning',
    2: 'Ketten jól laknak',
    3: 'Van repeta',
    4: 'Vendégnek is jut',
    5: 'Kiadós lakoma',
};

const dataFormat = [
    { value: 'szelet',
    label: "szelet"},

    {
        value: 'kg',
        label: 'kilógram',
    },
    {
        value: 'l',
        label: 'liter',
    },
    {
        value: 'db',
        label: 'darab',
    },
    {
        value: 'kanál',
        label: 'kanál',
    },
];


export const RecipeForm = () => {
    const classes = useStyles();
    const recipeForm = useRef()
    const [ingredients, setIngredients] = useState([])
    const [imageName, setImageName] = useState("");
    const [ingredientInputName, setIngredientInputName] = useState("")
    const [ingredientInputUnit, setIngredientInputUnit] = useState("")
    const [ingredientInputAmount, setIngredientInputAmount] = useState("")
    const [validForm, setValidForm] = useState(false)
    const [recipeSent, setRecipeSent] = useState(false)
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);


    const [recipe, setRecipe] = useState({
        ingredients: [],
        imageName: "",
        preparationTime: undefined,
        temperature: undefined,
        name: undefined,
        personForMeal: undefined

    });


    const removeIngredient = (ingredientName) => {
        setIngredients(ingredients.filter(item => item.name !== ingredientName))
    }


    useEffect(() => {
        const validateRecipeFormData = () => {
            setValidForm(true)
            for (const recipeElement in recipe) {

                if (recipe[recipeElement] === undefined) {
                    setValidForm(false)

                }
            }

        }
        validateRecipeFormData()
    }, [recipe])

    const addIngredient = () => {
        if (ingredientInputName === "" || ingredientInputUnit === "" || ingredientInputAmount === "") {
            return;
        }

        setIngredients([...ingredients, {
            'name': ingredientInputName,
            'unitType': ingredientInputUnit,
            'amount': ingredientInputAmount,
            'personPerMeal' : value
        }])
    }

    const submitForm = () => {

        setRecipe({...recipe, ...recipe.ingredients = ingredients})
        setRecipe({...recipe, ...recipe.imageName = imageName})
        if (validForm) {
            fetch('https://la-pasta-mia.herokuapp.com/recipe/save', {
                method: 'POST',
                body: JSON.stringify(recipe),
                headers: {'Content-Type': 'application/json'}

            })
                .catch(response => console.log(response))
        }
        setRecipeSent(true)

    }
    return (
        <div>

            <h2 className={"grocery-head"}>Recept hozzáadása</h2>
            <Grow in>
            <form className={classes.root} ref={recipeForm} onSubmit={submitForm} autoComplete="off">
                <TextField
                    id="recept-neve" label="Recept neve" fullWidth={true} placeholder="Recept neve"
                    value={recipe.name}
                    type="text"
                    name="recipe[name]"
                    onChange={e => setRecipe({...recipe, name: e.target.value})}
                    required={true}
                    InputProps={{startAdornment: (<InputAdornment position={"start"}><BookIcon/></InputAdornment>)}}
                />

                <ImageUpload setImageName={setImageName}/>
                <div>

                </div>
                <div>
                    <TextField
                        // endAdornment={<InputAdornment position="end">perc</InputAdornment>}

                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <TimelapseIcon/>
                                </InputAdornment>
                            )    }}
                        onChange={e => setRecipe({...recipe, preparationTime: e.target.value})}
                        label={"Elkészítési idő"}
                        type={"number"}
                        id="filled-error"
                        placeholder="Elkészítési idő"
                        helperText="Perc"
                        required={true}

                    />

                    <Box component="fieldset" mb={3} borderColor="transparent">
                        <h5>Adagszám</h5>
                        <StyledRating
                            name="customized-color"
                            defaultValue={value}

                            getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : 'ok'}`}
                            precision={1}
                            icon={<PersonIcon fontSize="inherit"/>}
                            onChange={
                            (event, newValue) => {
                                setValue(newValue);setRecipe({...recipe, personForMeal: newValue})
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                        />
                    </Box>


                    {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}

                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FireplaceIcon />
                                </InputAdornment>
                            )    }}

                        label={"Hőmérséklet"}
                        type={"number"}
                        id="temperature"
                        placeholder="Sütési hőfok"
                        onChange={e => setRecipe({...recipe, temperature: e.target.value})}
                        helperText="Celcius"

                    />
                    <Divider variant={"fullWidth"}/>
                    <h3>Hozzávalók</h3>
                    <ul>
                        {ingredients && ingredients.map(ingredient =>
                            <li key={ingredient.id+ingredient.name}>
                                {ingredient.amount} {ingredient.unitType} {ingredient.name} <FontAwesomeIcon
                                onClick={() =>
                                    removeIngredient(ingredient.name)
                                } icon={faMinusCircle}/>
                            </li>)}
                    </ul>
                </div>
                {/*<div className={"kingredientForm"} id={"ingredientInput"}>*/}
                <TextField
                    label="Mennyiség"
                    defaultValue="0"
                    className="custom-field" id={"amount"} name={"amount"}
                    step="0.1" type={"number"} required
                    helperText={"Szám"}
                    onChange={(e) => setIngredientInputAmount(e.target.value)}

                />
                <TextField
                    select
                    label="Válassz"
                    value={ingredientInputUnit}
                    helperText="Mértékegység"
                    id={"unit"} name={"unit"}
                    required onChange={(e) => setIngredientInputUnit(e.target.value)}
                >
                    {dataFormat.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}</TextField>

                 <div>
                <TextField className="custom-field" id={"name"} placholder={"Hozzávaló"} label={"Hozzávaló"}
                           name={"name"} type={"text"}
                           helperText="Hozzávaló"
                           outlined onChange={(e) => setIngredientInputName(e.target.value)} required/>

                </div>


                <div><Fab size="small" color="primary" aria-label="add" onClick={() => addIngredient()}>
                    <AddIcon/>
                </Fab></div>

                <h3>Elkészítés</h3>

                <TextareaAutosize className="detailsField" aria-label="minimum height" minRows={10} label="Elkészítés"
                                  name={"recipe[details]"}

                                  onChange={e => setRecipe({...recipe, details: e.target.value})}
                                  placeholder={"Elkészítés Virág módra.."}
                                  required/>


            </form>
        </Grow>

             {/*TODO validate form*/}

            {validForm &&
            <Button type="submit"
                    form={"recipeDataForm"}
                    variant="contained"
                    disabled={recipeSent}
                    color="secondary"
                    size="large"
                    startIcon={<SaveIcon/>} onClick={() => submitForm()}>
                Recept mentése
            </Button>
            }
            {!validForm && <Button type="submit"
                                   form={"recipeDataForm"}
                                   variant="contained"
                                   color="secondary"
                                   size="large"
                                   disabled
                                   startIcon={<SaveIcon/>} onClick={() => submitForm()}>
                Recept mentése
            </Button>}</div>
    );
}
