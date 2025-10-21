import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [failed, setFailed] = useState(false);
    const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

    const fetchUsers = async () => {
        setLoading(true);
        setFailed(false);
        try{
            const response = await axios.get(`${BASE_API_URL}/api/users`);
            console.log(response.data);
            setUsers(response.data.users);
        }
        catch(error){
            setFailed(true);
            console.error(`Failed fetching users: ${error}`);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])
  
    return (
        <div className="p-[10px]">
            <button onClick={() => navigate("/create")} className="w-[100px] h-[50px] bg-blue-400 hover:bg-blue-500 transition-all rounded-xl cursor-pointer">Add User</button>
            {loading && <p>Loading...</p>}
            {failed && <p>Failed loading users...</p>}
            {!users ? 
                <p>No recorded users</p>
                :
                <div>
                    {users.map((user) => (
                        <div>
                            <h1 className="text-2xl">{user.name}</h1>
                            <p>{user.age}</p>
                            <p className="text-gray-500">{user.email}</p>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Home