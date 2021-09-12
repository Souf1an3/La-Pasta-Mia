import React from "react";

const SearchBar = ({searchQuery, setSearchQuery}) => (
    <div>

        <div className={"inputFields"}>


            <label className="custom-field">
                Keresés név alapján

                <input maxLength={55}
                       value={searchQuery}
                       type="text"
                       name="s"
                       onInput={(e) => setSearchQuery(e.target.value)}
                       id={"recipe-search"}
                       placeholder="&nbsp;"
                />
                <span className="placeholder">Recept neve...</span>
            </label>

        </div>
    </div>

);


export default SearchBar;