import React,{useState} from 'react'
import FullPageLoader from '../components/FullPageLoader/FullPageLoader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../components/FontawesomeIcons/index'
const useFullPageLoader = () => {
    const [loading, setLoading] = useState(false);

    return [
        loading ? <FullPageLoader /> : null,
        () => setLoading(true), //Show loader
        () => setLoading(false) //Hide Loader
    ];
}

export default useFullPageLoader