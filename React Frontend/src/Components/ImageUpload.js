import {IconButton} from '@material-ui/core';
import {PhotoCamera} from '@material-ui/icons';
import React, {useState} from 'react';
import Button from '@material-ui/core/Button';


export const ImageUpload = ({setImageName}) => {

    const [imageSelected, setImageSelected] = useState(false)
    const [image, setImage] = useState()
    const [uploadedImage, setUploadedImage] = useState(false);

    const submitPicture = async () => {
        try {
            const formData = new FormData();
            formData.append("file", image);
            const options = {
                method: 'POST',
                body: formData
            };
            const API_URL = "https://la-pasta-mia.herokuapp.com/images/upload";
            await fetch(API_URL, options).then(() => setUploadedImage(true))


        } catch (err) {
            alert(err.message);
        }
    };

    const selectedPicture = (e) => {
        setImageName(e.target.files[0].name)
        setImage(e.target.files[0])
        setImageSelected(true);
    }


    return (
        <div>
            <input style={{display: "none"}} accept="image/*" id="icon-button-file" type="file"
                   onChange={(e) => selectedPicture(e)}/>
            <label htmlFor="icon-button-file">
                <IconButton disabled={uploadedImage} color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera/>
                </IconButton>
            </label>

            {imageSelected && image && <Button variant={'contained'} disabled={uploadedImage} color="secondary"
                                               onClick={e => submitPicture(e)}>{uploadedImage ? "Kész" : "Feltöltés"}</Button>}
        </div>

    )

}


