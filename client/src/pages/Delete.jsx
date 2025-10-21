import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Delete = () => {
    const [name, setName] = useState({
        name: "",
    })
    const navigate = useNavigate();
    const { id } = useParams();
    const BASE_API_URL = import.meta.env.VITE_API_BASE_URL
    
    const fetchUserData = async () => {
        try{
            const response = await axios.get(`${BASE_API_URL}/api/users/${id}`);
            console.log(response.data);
            setName({
                name: response.data.user.name,
            })
        }
        catch(error){
            console.error(`Failed fetching user data: ${error}`);
        }
    }

    const deleteUser = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.delete(`${BASE_API_URL}/api/users/${id}`);
            console.log(response.data);
            navigate("/");
        }
        catch(error){
            console.error(`Failed deleting user: ${error}`);
        }
    }

    useEffect(() => {
        fetchUserData();
    }, [])
  
    return (
        <div>
            <div className="w-[800px] border rounded-xl mr-auto ml-auto mt-[100px] p-[10px]">
                <h1>Are you sure you want to delete <strong>{name.name}'s</strong> user</h1>
                <div className="flex gap-[10px]">
                    <button onClick={deleteUser} className="bg-red-400 hover:bg-red-500 transition-all cursor-pointer w-[100px] h-[50px] rounded-xl">Delete</button>
                    <button onClick={() => navigate("/")} className="bg-blue-400 hover:bg-blue-500 transition-all cursor-pointer w-[100px] h-[50px] rounded-xl">Back</button>
                </div>
            </div>
        </div>
    )
}

export default Delete