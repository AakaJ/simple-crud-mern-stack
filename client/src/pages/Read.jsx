import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Read = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [failed, setFailed] = useState(false);
    const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

    const fetchUser = async () => {
        setLoading(true);
        setFailed(false);
        try{
            const response = await axios.get(`${BASE_API_URL}/api/users/${id}`);
            console.log(response.data);
            setUser(response.data.user);
        }
        catch(error){
            setFailed(true)
            console.error(`Failed fetching user: ${error}`);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])
  
    return (
        <div className="p-[10px] text-center">
            {loading && <p>Loading...</p>}
            {failed && <p>Failed loading user...</p>}
            <h1 className="text-3xl">{user.name}</h1>
            <p>Age: {user.age}</p>
            <p>Email: {user.email}</p>
            <p>Hobby: {user.hobby}</p>
            <div className="flex gap-[10px] justify-center">
                <button onClick={() => navigate(`/edit/${user._id}`)} className="w-[100px] h-[50px] bg-blue-400 hover:bg-blue-500 transition-all cursor-pointer rounded-xl">Edit</button>
                <button onClick={() => navigate("/")} className="w-[100px] h-[50px] bg-red-400 hover:bg-red-500 transition-all cursor-pointer rounded-xl">Back</button>
            </div>
        </div>
    )
}

export default Read