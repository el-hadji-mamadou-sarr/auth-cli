import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Home = ()=>{
        const navigate = useNavigate();
        const [profile, setProfile] = useState({});



        useEffect(()=>{
                const requestBody = {
                        method: 'GET', 
                        credentials: 'include', 
                }
                fetch("http://localhost:5000/api/users/profile", requestBody)
                .then((res)=>{
                        if(res.status === 200){
                                res.json().then((res)=>{  
                                        setProfile(res);
                                        console.log(res);
                                })
                        }
                })
        },[])

        return (
                <>
                        <h1>Welcome to home</h1>
                        <button onClick={()=>navigate('/profile')}>go to profile</button>
                </>
        );
}