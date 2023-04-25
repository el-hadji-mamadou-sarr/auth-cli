import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Register =()=>{
        const [userValue, setUserValue] = useState({email:'', password:''});
        const navigate = useNavigate();

        const handleSubmit = (e)=>{
                e.preventDefault();
                const requestBody = {
                        method: "POST",
                        headers : {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                                
                        }, 
                        body: JSON.stringify({
                                email: userValue.email,
                                password: userValue.password
                        })       
                }
                fetch("http://localhost:5000/register", requestBody)
                .then((res)=>{
                        if(res.status === 200){
                                res.json().then((res)=>{
                                        navigate('/home');
                                        console.log(res);

                                })
                        }
                })
        }

        return (
               <>
                        <h1>Register</h1>
                        <form onSubmit={handleSubmit}>
                                <label for="email">email</label>
                                <input type="text" 
                                id="email" 
                                name="email" 
                                value={userValue.email} 
                                onChange={(e)=>setUserValue({...userValue, 'email':e.target.value})}/>
                                <br/>
                                <label for="password">password</label>
                                <input type="password" 
                                id="password" 
                                name="password" value={userValue.password}
                                onChange={(e)=>setUserValue({...userValue, 'password':e.target.value})}/>
                                <br/>
                                <button type="submit" onsub>submit</button>
                        </form>
                        
                        <Link to='/login'>login</Link>
               </> 
        );
}