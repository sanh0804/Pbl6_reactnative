import categories from "../mockdata/CategoryData"
import React, { useState, useEffect } from 'react'
import consts from "../src/consts/consts";
const getAll = () => {
    // TODO return list category

    const [data, setdata] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        const apiURL = consts.URL_API + "/category"
        fetch(apiURL)
            .then((res) => res.json())
            .then((resJson) => {
                setdata(resJson)
            }).catch((err) => {
                console.log("ERROR: ", err);
            })
    }, []);

    return data;
}
export default { getAll }