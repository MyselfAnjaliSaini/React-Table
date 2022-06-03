import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../FontawesomeIcons/index'
import {faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const Search = ({ onSearch }) => {
    const [search, setSearch] = useState("");

    const onInputChange = value => {
        setSearch(value);
        onSearch(value);

    };
    return (
        <div className="icon-outer">
            {/* <i className="fa-solid fa-magnifying-glass"></i> */}
            <input id="font-asm"
                type="text"
                className="my-form-control "
                style={{ width: "364px", height: "40px" }}
                placeholder=" Search for ID Name or Email"
                value={search}

                onChange={e => onInputChange(e.target.value)}
            />
          <FontAwesomeIcon className="s-icon" icon={faMagnifyingGlass}/>
        </div>
    );
};

export default Search;