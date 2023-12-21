import { AiOutlineEdit } from 'react-icons/ai';
import './pdp.css'
import { useParams } from 'react-router';

function Pdp({user, setPartState, setEdit, setInfo}) {

    const {idProfil, id} = useParams();

    const classImg = {
        bgcImg: {
            backgroundImage: `url('${user?.pathProfile}')`
        }
    }

    return (
            <div className="section-image">
                <div className="image-flou" style={user?.pathProfile?classImg?.bgcImg:{backgroundColor: 'rgb(19, 20, 20)'}}></div>
                <div className="image-net">
                    <img src={user?.pathProfile} className="img" style={{backgroundColor: 'rgb(19, 20, 20)'}}/>
                    {
                        idProfil===id &&
                        <AiOutlineEdit className='icon' onClick={()=>{setPartState('edit'); setEdit(true); setInfo(false)}}/>
                    }
                </div>
            </div>
        )
}

export default Pdp;