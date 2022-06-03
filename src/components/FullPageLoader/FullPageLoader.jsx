import React from 'react'
// import Spinner from "../../resources/images/spinner.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../FontawesomeIcons/index'
const FullPageLoader = () => {
    return (
        <div className="fp-container ">
        
        <FontAwesomeIcon icon="fa-solid fa-spinner" style={{fontSize:"50px"}} className="fp-loader"/>
            {/* <img src={Spinner} className="fp-loader" alt="loading" /> */}
        </div>
    );
}

export default FullPageLoader