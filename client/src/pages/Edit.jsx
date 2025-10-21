import React from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Edit = () => {
    const [user, setUser] = useState([]);
    const [values, setValues] = useState({
        name: "",
        age: "",
        email: "",
        hobby: "",
    })
    const { id } = useParams();
    const navigate = useNavigate();
    const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

    const fetchUserData = async () => {
        try{
            const response = await axios.get(`${BASE_API_URL}/api/users/${id}`);
            console.log(response.data);
            setValues({
                name: response.data.user.name,
                age: response.data.user.age,
                email: response.data.user.email,
                hobby: response.data.user.hobby,
            })
            setUser(response.data.user);
        }
        catch(error){
            console.error(`Failed fetching user data: ${error}`);
        }
    }

    const updateUser = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.put(`${BASE_API_URL}/api/users/${id}`, values)
            console.log(response.data);
            navigate("/");
        }
        catch(error){
            console.error(`Failed updating user: ${error}`);
        }
    }

    
    useEffect(() => {
        fetchUserData();
    }, [])



    return (
        <div>
            <form onSubmit={updateUser}>
                <input type="text" placeholder="Update name" value={values.name} onChange={(e) => setValues({...values, name: e.target.value})} />
                <input type="number" placeholder="Update age" value={values.age} onChange={(e) => setValues({...values, age: e.target.value})} />
                <input type="email" placeholder="Update email" value={values.email} onChange={(e) => setValues({...values, email: e.target.value})} />
                <input type="text" placeholder="Update hobby" value={values.hobby} onChange={(e) => setValues({...values, hobby: e.target.value})} />
                <button type="submit">Update User</button>
                <button onClick={() => navigate("/")}>Back</button>
            </form>
        </div>
    )
}

export default Edit