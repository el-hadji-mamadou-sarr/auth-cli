import { useEffect, useState } from "react";

export const Profile = ()=>{
        const [profile, setProfile] = useState({});

        const requestBody = {
                method: "GET", 
                credentials: "include", 
                headers : {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                } 
        }

        useEffect(()=>{
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
                <span>fullname:{profile.fullname}</span>
                <span>email:{profile.email}</span>
                <span>banner_color:{profile.banner_color}</span>
        </>
 );       
}