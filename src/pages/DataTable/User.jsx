import React, { useEffect, useState, useMemo } from "react";
import { TableHeader, Pagination, Search } from "../../components/DataTable/index";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../components/FontawesomeIcons/index'


const User = () => {
    const [comments, setComments] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [gender, setGender] = useState("")

    const ITEMS_PER_PAGE = 6;

    const headers = [
        { name: "ID", field: "id", sortable: true },
        { name: "Name", field: "name", sortable: true },
        { name: "Email", field: "email", sortable: true },
        { name: "Gender", field: "gender", sortable: false },
        { name: "Status", field: "status", sortable: false }
    ];
    // try {
    //     console.log(num);
    //     const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`);
    //   //   const realData = await res.json();
    //     console.log(res.data);
    //     setPname(res.data.name)
    //     setMoves(res.data.moves.length)
    //   //   setData(realData.statewise);
    //   }
    //   catch (error) {
    //     console.log(error);
    //   }
    // }

    useEffect(() => {
        const getData = async () => {
            showLoader();
           try{
            const res = await axios.get("https://gorest.co.in/public/v1/users");
              const realData = await res.data.data;
              console.log(res.realData);
              if(res.length!==0){
                hideLoader();
              }
              else{
                console.log("no data");
              }
             
              setComments(realData);
              console.log(realData);
           }
           catch (error) {
            console.log(error);
            <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" />
          }

            // axios.get("https://gorest.co.in/public/v1/users")
            //     .then(resp =>
            //         resp.data.data
            //     )
            //     .then(json => {
            //         hideLoader();
            //         setComments(json);
            //         console.log(json);
            //     }).catch(e => { console.log(e); <FontAwesomeIcon icon="fa-duotone fa-circle-exclamation" /> });
        };

        getData();
    }, []);


    const commentsData = useMemo(() => {
        let computedComments = comments;
        // console.log("comments"+computedComments);
        if (search) {
            computedComments = computedComments.filter(
                comment =>
                    comment.name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.email.toLowerCase().includes(search.toLowerCase()) ||
                    comment.id.toString().includes(search.toString())
                // <FontAwesomeIcon icon="fa-duotone fa-triangle-exclamation" />
            );

        }

        // console.log(computedComments.length);
        // console.log("search"+search);
        setTotalItems(computedComments.length);






        //Sorting comments
        // if (sorting.field) {
        //     const reversed = sorting.order === "asc" ? 1 : -1;
        //     computedComments = computedComments.sort(
        //         (a, b) =>
        //             reversed * a[sorting.field].localeCompare(b[sorting.field])
        //     );
        // }
        function typeOrder(x) {
            if (x == null)
                return 2;
            if (isNaN(+x))
                return 1;
            return 0;
        }
        function sortNumber(a, b) {
            a = parseInt(a, 10); b = parseInt(b, 10);
            if (isNaN(a) || isNaN(b))
                return 0;
            return a - b;
        }
        function sortString(a, b) {
            if (typeof a != "string" || typeof b != "string")
                return 0;
            return +(a > b) || -(b > a);
        }
        // function sortData(a, b) {
        //     return order * ( typeOrder(a)-typeOrder(b)
        //                      || sortNumber(a, b)
        //                      || sortString(a, b)
        //                    );
        // }
        // order = order == "dsc" ? -1 : 1;
        // numericArr.sort(function(a, b) {
        //     return order * ( typeOrder(a)-typeOrder(b)
        //                      || sortNumber(a, b)
        //                      || sortString(a, b)
        //                    );
        // });
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedComments = computedComments.sort(function (a, b) {
                return reversed * (typeOrder(a[sorting.field]) - typeOrder(b[sorting.field])
                    || sortNumber(a[sorting.field], b[sorting.field])
                    || sortString(a[sorting.field], b[sorting.field])
                );
            });
        }
        //Current Page slice
        return computedComments.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [comments, currentPage, search, sorting]);


    return (
        <>
            <section className="wrapper">
                <div className="content">
                    <div className="row w-100">
                        <div className="col col-12 text-center">
                            <div className="row mb-bottom-40">
                                <div className="col-md-6">
                                    <p className="heading">Users</p>
                                </div>
                                <div className="col-md-6 d-flex flex-row-reverse">
                                
                                    <Search
                                        onSearch={value => {
                                            setSearch(value);
                                            setCurrentPage(1);
                                        }}
                                    />
                                </div>
                            </div>

                           <div className="table-outer">
                           <table className="table table-striped user-table">
                                <TableHeader

                                    headers={headers}
                                    onSorting={(field, order) =>
                                        setSorting({ field, order })
                                    }
                                />
                                <tbody>
                                    {commentsData.map(comment => (
                                        <tr>
                                            <td scope="row" key={comment.id}>
                                                {comment.id}
                                            </td>
                                            <td>{comment.name}</td>
                                            <td ><FontAwesomeIcon className="flex-thr" icon="fa-solid fa-envelope" />{comment.email}</td>
                                            <td >   <FontAwesomeIcon className="flex-thr flex-th"
                                                icon={
                                                    comment.gender === "male"
                                                        ? 'fa-person'
                                                        : 'fa-person-dress'
                                                }
                                            />{comment.gender}

                                            </td>
                                            <td><button type="button" className= {`btn btn-table ${comment.status==="active" ? 'btn-outline-success' : 'btn-outline-danger'}`}> {comment.status}</button>
                                           
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                           </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="text-center">
                                        <Pagination

                                            total={totalItems}
                                            itemsPerPage={ITEMS_PER_PAGE}
                                            currentPage={currentPage}
                                            onPageChange={page => setCurrentPage(page)}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {loader}
                </div>

            </section>


        </>
    );
}

export default User