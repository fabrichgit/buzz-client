import { AiOutlineEdit } from "react-icons/ai";
import DateMethods from "../../../../../../methods/Date";
import useUser from "../../../../../../hooks/useUser";
import { useParams } from "react-router";

import "./info.css";

function Info({setPartState, setEdit, setInfo}) {
    const {id, idProfil} = useParams();
    const {user, setUser} = useUser(idProfil);
    
    return (
        <div className="info wall">
            <div className="list-info">
                <div className="item">
                    <div className="label">Name :</div>
                    <div className="result">
                    {
                        (()=>{
                            if (user) {
                                return user?.username;
                            }else{
                                return <i>wait...</i>;
                            }
                        })()
                    }
                    </div>
                </div>

                <div className="line"></div>

                <div className="item bio">
                    <div className="label">Bio :</div>
                    <div className="result">
                    {
                        (()=>{
                            if (user) {
                                if (user?.bio) {
                                    return user?.bio;
                                }
                                    return "empty";
                            }else{
                                return <i>wait...</i>;
                            }
                        })()
                    }
                    </div>
                </div>
                
                <div className="line"></div>

                <div className="item">
                    <div className="label">Sign-up date :</div>
                    <div className="result">
                    {
                        (()=>{
                            if (user) {
                                return DateMethods.Parse(user?.createdAt);
                            }else{
                                return <i>wait...</i>;
                            }
                        })()
                    }
                    </div>
                </div>
            </div>
            {
                id===idProfil &&
                <div className="edit-btn" onClick={()=>{setPartState('edit'); setEdit(true); setInfo(false)}}>
                    <span>Edit</span> <AiOutlineEdit className='icon'/>
                </div>
            }
        </div>
    )
}
export default Info;