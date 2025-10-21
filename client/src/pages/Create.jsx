import React from 'react'
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const BASE_API_URL = import.meta.env.VITE_API_BASE_URL
    const [values, setValues] = useState({
        name: null,
        age: null,
        email: null,
        hobby: null
    })

    const addUser = async (e) => {
        setLoading(true);
        e.preventDefault();
        try{
            const response = await axios.post(`${BASE_API_URL}/api/users`, values);
            console.log(response.data);
            navigate("/");
        }
        catch(error){
            console.error(`Failed adding user: ${error}`);
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <div>
            <form onSubmit={addUser} className='w-[800px] border rounded-xl p-[10px] flex flex-col items-center mr-auto ml-auto mt-[100px]'>
                <input type="text" placeholder="Enter name" onChange={(e) => setValues({...values, name: e.target.value})} required className="bg-gray-100 w-[600px] h-[50px] p-[10px] rounded-xl outline-0 border-0" />
                <input type="number" placeholder="Enter age" onChange={(e) => setValues({...values, age: e.target.value})} required className="bg-gray-100 w-[600px] h-[50px] p-[10px] rounded-xl outline-0 border-0 mt-[10px]" />
                <input type="email" placeholder="Enter email" onChange={(e) => setValues({...values, email: e.target.value})} required className="bg-gray-100 w-[600px] h-[50px] p-[10px] rounded-xl outline-0 border-0 mt-[10px]" />
                <input type="text" placeholder="Enter hobby (optional)" onChange={(e) => setValues({...values, hobby: e.target.value})} className="bg-gray-100 w-[600px] h-[50px] p-[10px] rounded-xl outline-0 border-0 mt-[10px]" />
                <div className="flex gap-[10px]">
                    <button type="submit" className="w-[200px] h-[50px] bg-blue-400 hover:bg-blue-500 transition-all cursor-pointer rounded-xl mt-[10px]">{loading ? "Adding..." : "Add User"}</button>
                    <button onClick={() => navigate("/")} className="w-[200px] h-[50px] bg-red-400 hover:bg-red-500 transition-all cursor-pointer rounded-xl mt-[10px]">Back</button>
                </div>
            </form>
        </div>
    )
}

export default Create