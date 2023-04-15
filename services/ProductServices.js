import consts from '../src/consts/consts';
import React, { useState, useEffect } from 'react'

const getAll = () => {
    //TODO return list product

    const [data, setdata] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        const apiURL = consts.URL_API + "/item"
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

const getById = (id) => {
    //TODO return 1 product by it's id
    return products[1];
}

export default { getAll, getById };