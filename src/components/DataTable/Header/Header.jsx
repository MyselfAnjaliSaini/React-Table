import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../FontawesomeIcons/index'
const Header = ({ headers, onSorting }) => {
    const [sortingField, setSortingField] = useState("");
    const [sortingOrder, setSortingOrder] = useState("asc");

    const onSortingChange = (field) => {
        const order =
            field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

        setSortingField(field);
        setSortingOrder(order);
        onSorting(field, order);
    };

    return (
        <thead>
            <tr>
                {headers.map(({ name, field, sortable }) => (
                    <th 
                        key={name}
                        

                        onClick={() =>
                            sortable ? onSortingChange(field) : null
                        }
                    >
                        {name}
                       
                        {sortingField && sortingField === field && ( 
                            <FontAwesomeIcon className="flex-th cursor fa-duotone " 
                                icon ={
                                    sortingOrder === "asc"
                                        ? 'fa-caret-up'
                                        : 'fa-caret-down'
                                } 
                            />
                        )}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

export default Header