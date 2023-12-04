import { BiSolidFace, BiSolidHappy, BiSolidHeart, BiSolidLaugh, BiSolidPaperPlane, BiSolidPhotoAlbum, BiSolidPlane, BiSolidSad, BiSolidSend } from "react-icons/bi";
import "./feedForm.css";
import { AiFillCloseCircle } from "react-icons/ai";
import ToggleProfil from "../../../../../../methods/BuzzMethods/ToggleProfil.jsx";

import { useState, useEffect } from "react";

function FeedForm({user, isLoad, feedCreateController, handlePostFeed, isError}) {

    const [isOpen, setIsOpen] = useState(false);

    const [isThere, setIsThere] = useState({
        text: false,
        mood: false,
        image: false,
    })

    const [isValideToShare, setIsValideToShare] = useState(false);

    useEffect(()=>{
        if (isThere.image===true || isThere.mood===true || isThere.text===true) {
            setIsValideToShare(true);
        }else{
            setIsValideToShare(false);
        }
    }, [isThere])

    const cssStatus = {
        fillItem: {
            init: { fill: "rgb(34, 185, 185)"},
            final: {fill:"rgb(9, 71, 71)"}
        },
        displayStatus: {
            init: {display: "none"},
            final: {display: "block"}
        },
        boxShare: {
            init: {
                backgroundColor: '#184a57',
                border: 'none',
                color: '#747070',
                cursor: 'auto'
            },
            final: {
                boxShadow: '0 0 20px #1beaf9',
                backgroundColor: '#1fb1d6',
                border: 'none',
                color: '#fff',
                cursor: 'pointer'
            }
        },
        cancel: {
            init: {
                color: {color: 'rgb(100, 99, 96)'},
                fill: {fill: 'rgb(9, 71, 71)'}
            },
            final: {
                color: {color: 'white'},
                fill: {fill: 'rgb(34, 185, 185)'}
            }
        }
    }



    const addMood = (name)=>{
        feedCreateController.setFeedCreate({...feedCreateController.feedToCreate, mood: name});
        setIsOpen(!isOpen);
        setIsThere({...isThere, mood: true});
        console.log(feedCreateController.feedToCreate.mood);
    }

    const handleChangeFeedCreate = (e)=>{
        const {name, value} = e.target;
        if (name==="image") {
            const formData = new FormData();
            formData.append('file', e.target.files[0]);
            formData.append('upload_preset', 'bgjvp2ju');
            feedCreateController.setFeedCreate({...feedCreateController.feedToCreate, [name]: formData});
            setIsThere({...isThere, image: true});
        }
        if (name=="text") {
            feedCreateController.setFeedCreate({...feedCreateController.feedToCreate, [name]: value});
            if (value.trim()==='') {
                setIsThere({...isThere, text: false});
                feedCreateController.setFeedCreate({...feedCreateController.feedToCreate, [name]: null});
            }else{
                setIsThere({...isThere, text: true});
            }
        }
    }

    const statusManager = (name)=>{
        if (name==='mood') {
            if (isThere.mood) {
                return{
                    fill: cssStatus.fillItem.final,
                    display: cssStatus.displayStatus.final
                }
            }
                return{
                    fill: cssStatus.fillItem.init,
                    display: cssStatus.displayStatus.init
                }
        }
        if (name==='image') {
            if (isThere.image) {
                return{
                    fill: cssStatus.fillItem.final,
                    display: cssStatus.displayStatus.final
                }
            }
                return{
                    fill: cssStatus.fillItem.init,
                    display: cssStatus.displayStatus.init
                }
        }
        if (name==='share') {
            if (isValideToShare) {
                return cssStatus.boxShare.final;
            }
                return cssStatus.boxShare.init;
        }
        if (name==='cancel') {
            if (isValideToShare) {
                return cssStatus.cancel.final;
            }
                return cssStatus.cancel.init;
        }
    }

    const handleReset = ()=>{
        feedCreateController.setFeedCreate({
            text:'',
            mood: null,
            image: null
        });
        setIsThere({
            mood: false,
            image: false
        });
        console.log(feedCreateController.feedToCreate);
    }

    const post = async (e)=> {
        e.preventDefault();
        console.log(feedCreateController.feedToCreate);
        isValideToShare && await handlePostFeed(feedCreateController.feedToCreate);
        handleReset();
    }

    const toggleLoad = ()=>{
        if (isLoad==='go') {
            return <div className="post-loader">
                        <div className="half-load"></div>
                    </div>;
        }else if (isLoad==='end') {
            return <div className="post-loader">
                        <div className="final-load"></div>
                    </div>;
        }
    }

    return (
        <div className="feedform-section">
            <form action="postFeed" method="post"  encType="multipart/form-data" onSubmit={post} onReset={handleReset}>
                <div className="input-text">
                    {ToggleProfil.profilValue(user)}
                    <input type="text" name="text" id="text" placeholder={user?.username?`What's up ${user?.username.toLowerCase()}...`:"What's up..."} value={feedCreateController.feedToCreate.text} onChange={(e)=>handleChangeFeedCreate(e)}/>
                </div>
                {toggleLoad()}
                <div className="btns-controller">
                    <div className="btn-input">
                        
                        <button class="dropdown-mood btn-item enterData">
                            <button class="dropbtn" onClick={(e)=>{setIsOpen(!isOpen); e.preventDefault()}}>
                                <BiSolidFace className="icon" style={statusManager('mood').fill}/>
                                <div className="status" style={statusManager('mood').display}></div>
                                <div>Mood</div>
                            </button>
                            {
                                isOpen &&
                                <div class="dropdown-content">
                                    <div className="drop-item" name="happy" onClick={(e)=>{e.preventDefault(); addMood('happy')}}>
                                        <BiSolidHappy className="icon happy" style={{fill: "rgb(207, 207, 0)"}}/>
                                        <div>Happy</div>
                                    </div>
                                    <div className="drop-item" name="sad" onClick={(e)=>{e.preventDefault(); addMood('sad')}}>
                                        <BiSolidSad className="icon sad" style={{fill: "rgb(0, 207, 173)"}}/>
                                        <div>Sad</div>
                                    </div>
                                    <div className="drop-item" name="crazy" onClick={(e)=>{e.preventDefault(); addMood('crazy')}}>
                                        <BiSolidLaugh className="icon crazy" style={{fill: "rgb(0, 207, 28)"}}/>
                                        <div>Crazy</div>
                                    </div>
                                    <div className="drop-item" name="love" onClick={(e)=>{e.preventDefault(); addMood('love')}}>
                                        <BiSolidHeart className="icon love" style={{fill: "rgb(207, 14, 0)"}}/>
                                        <div>Lover</div>
                                    </div>
                                </div>
                            }
                        </button>

                        <label htmlFor="image" className="btn-item controller enterData">
                            <BiSolidPhotoAlbum className="icon" style={statusManager('image').fill}/>
                            <div>Add photo</div>
                            <div className="status" style={statusManager('image').display}></div>
                            <input type="file" className="inputHide" name="image" id="image" accept="image/*" onChange={(e)=>handleChangeFeedCreate(e)}/>
                        </label>

                        <button className="btn-item controller cancel" type="reset">
                            <AiFillCloseCircle className="icon" style={statusManager('cancel').fill}/>
                            <div style={statusManager('cancel').color}>Cancel</div>
                        </button>

                    </div>
                    {
                        isError &&
                        <div style={{color: 'red', fontWeight: 'bold'}}>Error !</div>
                    }
                    <div className="btn-share">
                        <button type="submit" className="btn-item controller" style={statusManager('share')}>
                            <div>Share</div>
                            <BiSolidPaperPlane className="icon"/>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FeedForm;