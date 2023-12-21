import useUser from "../../../../../../hooks/useUser";
import "./edit.css";
import { CgImage } from "react-icons/cg";
import { useEffect, useState } from "preact/hooks";
import axios from "axios";
import constants from "../../../../../../Contants/constants";
import imageToCloud from "../../../../../../Axios/imageTocloud";
import { useNavigate } from "react-router";

function Edit({setPartState, setEdit, setInfo}) {

    const {user, setUser} = useUser();
    const [fieldState, setFieldState] = useState({
        username: undefined,
        bio: undefined,
        image: undefined
    })
    const [imageSelected, setImageSelected] = useState({url: undefined});
    const [isAbleSubmitting, setIsAbleSubmitting] = useState(false);

    const Navigate  = useNavigate();
    const [status, setStatus] = useState('normal');

    useEffect(()=>{
        if (status==='error') {
            setTimeout(() => {
                setStatus('normal');
            }, 1000);
        }
    }, [status])

    useEffect(()=>{
        parseData();
        if ([fieldState.username,fieldState.bio, fieldState.image].toString()===[undefined, undefined, undefined].toString()) {
            setIsAbleSubmitting(false);
        }else{
            setIsAbleSubmitting(true);
        }

    }, [fieldState])

    const handleChange = (e)=>{
        const {value, name} = e.target;
        if (name!=='image') {
            if (value.trim()!=='') {
                setFieldState({...fieldState, [name]: value});   
            }else{
                setFieldState({...fieldState, [name]: undefined});
            }
        }else{

            setImageSelected({url:URL.createObjectURL(e.target.files[0])});
            const formData = new FormData();
            formData.append('file', e.target.files[0]);
            formData.append('upload_preset', 'bgjvp2ju');
            setFieldState({...fieldState, [name]: formData});
            console.log(formData.get('file'));
        }
    }

    const parseData = ()=>{
        if (fieldState.username!==undefined) {
            if (fieldState.username.trim()==='') {
                setFieldState({...fieldState, username: undefined});
                console.log('username bio');   
            }
        }

        if (fieldState.bio!==undefined) {
            if (fieldState.bio.trim()==='') {
                setFieldState({...fieldState, bio: undefined});
                console.log('nope bio');   
            }
        }
    }

    const handleSubmit = ()=>{
        if (isAbleSubmitting) {
            console.log('allowed');
            setStatus('load');
            if (fieldState?.image===undefined) {
                parseData();
                const toUpdate = {...fieldState};
                (()=>{
                    if (toUpdate.username!==undefined) {
                        toUpdate.username = toUpdate.username.toUpperCase();   
                    }
                })();
                console.log(toUpdate);

                axios.put(constants.pathToServer(`/api/users/${user?.id}`), {...toUpdate})
                    .then((response)=>{
                        console.log(response.data);
                        setTimeout(() => {
                            setStatus('success');
                        }, 1000);
                        setTimeout(() => {
                            Navigate('/login')
                        }, 2000);
                    })
                    .catch((err)=>{
                        setStatus('error')
                        console.error(err);
                    })
            }else{
                console.log('with image');
                const toUpdate = {...fieldState};
                (()=>{
                    if (toUpdate.username!==undefined) {
                        toUpdate.username = toUpdate.username.toUpperCase();   
                    }
                })();
                console.log(toUpdate);

                imageToCloud(toUpdate.image)
                    .then((response)=>{
                        console.log(response.data);
                        const dataUrl = response.data;
                        toUpdate.image = undefined;
                        toUpdate.pathProfile = dataUrl.secure_url;
                        console.log("final",toUpdate);
    
                        const postAll = (async ()=>{
                            await axios.put(constants.pathToServer(`/api/users/${user?.id}`), {...toUpdate})
                                .then((response)=>{
                                    console.log(response.data);
                                    console.log('vitaaa');
                                    setTimeout(() => {
                                        setStatus('success');
                                    }, 500);
                                    setTimeout(() => {
                                        Navigate('/login')
                                    }, 500);
                                })
                                .catch((err)=>{
                                    setStatus('error');
                                    console.error(err);
                                })
                        })();
    
                    })
                    .catch((err)=>{
                        setStatus('error');
                        console.error(err);
                    })
            }
        }else{
            setStatus('error');
            console.log('not allowed');
        }
    }

    return (
        <div className="edit">

                {(()=>{
                    if (status!=='load') {
                        return (
                            <>
                                <div className="list-edit">
                                    <div className="item">
                                        <label htmlFor="name-edit">Edit name :</label>
                                        <div className="result">
                                            <input type="text" id="name-edit" name="username" value={fieldState.username} onChange={handleChange} placeholder={(()=>{
                                                if (user) {
                                                    if (user?.username) {
                                                        return user?.username;
                                                    }
                                                        return "empty";
                                                }else{
                                                    return "wait...";
                                                }
                                            })()}/>
                                        </div>
                                    </div>

                                    <div className="line"></div>

                                    <div className="item bio">
                                    <label htmlFor="bio-edit">Edit bio :</label>
                                        <div className="result">
                                            <input type="text" id="bio-edit" name="bio" value={fieldState.bio} onChange={handleChange} placeholder={(()=>{
                                                if (user) {
                                                    if (user?.bio) {
                                                        return user?.bio;
                                                    }
                                                        return "empty";
                                                }else{
                                                    return "wait...";
                                                }
                                            })()}/>
                                        </div>
                                    </div>
                                    <div className="line"></div>

                                    <div className="item">
                                        <label htmlFor="image-edit" style={{height: 'max-content'}}>Profil <CgImage/> </label>
                                        <input type="file" name="image" id="image-edit" accept="image/*" onChange={handleChange} style={{visibility:'hidden'}} />
                                        <div className="result img">
                                        {
                                            (()=>{
                                                if (imageSelected) {
                                                    if (imageSelected?.url) {
                                                        return <img src={imageSelected?.url} alt={`photo of ${user?.username}`} className="bull"/>;
                                                    }else{
                                                        if (user?.pathProfile) {
                                                            return <img src={user?.pathProfile} alt={`photo of ${user?.username}`}/>;
                                                        }else{
                                                            return <i>empty</i>
                                                        }
                                                    }
                                                }
                                            })()
                                        }
                                        </div>
                                    </div>
                                </div>
                                <div className="btns-controller">
                                    {
                                        status==='error' &&
                                        <div style={{color: 'red', fontWeight: 'bold', fontSize:'large'}}>Error !</div>
                                    }
                                    {
                                        status === 'normal' &&
                                        <>
                                            <div className="edit-btn" onClick={handleSubmit}>
                                                <span>Confirm</span>
                                            </div>
                                            <div className="edit-btn" onClick={()=>{setPartState('info'); setInfo(true); setEdit(false)}}>
                                            <span>Cancel</span>
                                            </div>
                                        </>
                                    }
                                    {
                                        status === 'success' &&
                                        <h1 style={{color: 'rgb(40, 124, 124)', fontSize: 'x-large'}}>Successfully !</h1>
                                    }
                                </div>
                            </>
                        )
                    }else if(status==='load'){
                        return (
                            <div className="spin-container">
                                <h1>{'Please Wait...'}</h1>
                                <dir>You will be redirected into login page if it works</dir>
                                <div className="spinner"></div>
                            </div>
                        )
                    }
                 })()}

        </div>
    )
}

export default Edit;