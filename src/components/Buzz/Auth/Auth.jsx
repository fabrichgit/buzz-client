import { FaUser, FaLock, FaCloud } from 'react-icons/fa'
import { useNavigate } from 'react-router';
import { useState } from 'react';
import "./auth.css";


function Auth({title, setData, loadStatus, errorStatus}) {

    const [formData, setFormData] = useState({});

    const Navigate = useNavigate();

    const addConfirmPassword = (title)=>{
        if (title=='Sign up') {
            return(
                <div>
                    <FaLock style={{fill: 'black'}}/>
                    <input type="password" placeholder="Confirm password" name='confirmPassword' value={formData.confirmPassword} onChange={handleChangeFormData} required/>
                </div>
            )
        }
    }
    
    const optionSwicth = (title)=>{
        if (title=='Sign up') {
            return(
                <div className="option">
                    Already have an account? <span onClick={()=>handleSwicth(title)}>Sign in</span>
                </div>   
            )
        }else{
            return(
                <div className="option">
                    Don't have an account? <span onClick={()=>handleSwicth(title)}>Sign up</span>
                </div>
            )
        }
    }

    const handleSwicth = (title)=>{
        console.log('swicth');
        if (title=='Sign up') {
            Navigate('/buzz-deploy/login');
        }else{
            Navigate('/buzz-deploy/register');
        }
    }

    const handleChangeFormData = (e)=>{
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const submit = (e)=>{
        e.preventDefault();
        setData(formData);
    }

    const template = (title)=>{
        return (
            <section id="auth">
                <div className="welcome">
                    <div>Welcome to</div>
                    <h1>Buzz</h1>
                </div>
                <div className="form-container">
                    <div className="float-form">
                        {
                            !loadStatus ? <h1>{title}</h1> : <div className='loader-container'><div className="spinner"></div></div>
                        }
                        {
                            errorStatus &&
                            <div className='error'>error !</div>
                        }
                        <form action="authentification" onSubmit={(e)=>submit(e)} >
                            <div>
                                <FaUser style={{fill: 'black'}}/>
                                <input type="text" placeholder="Username" name='username' value={formData.username} onChange={handleChangeFormData} required/>
                            </div>
                            <div>
                                <FaLock style={{fill: 'black'}}/>
                                <input type="password" placeholder="Password" name='password' value={formData.password} onChange={handleChangeFormData} required/>
                            </div>
                            {addConfirmPassword(title)}
                            <button type="submit">{title}</button>
                        </form>
                        <div className='lines'>
                            <div className="line"></div>
                            <FaCloud style={{width: '10%'}}/>
                            <div className="line"></div>
                        </div>
                        {optionSwicth(title)}
                    </div>
                </div>
            </section>
        )
    }

    return template(title);
}

export default Auth;