import { useParams } from "react-router";
import "./bar.css";

function Bar({setPartState, info, edit, setInfo, setEdit}) {

    const {idProfil, id} = useParams();

    const switching = (name)=>{
        setPartState(name);
        switch (name) {
            case 'info':
                setInfo(true);
                setEdit(false);
                break;
            case 'edit':
                setInfo(false);
                setEdit(true);
            default:
                break;
        }
    }

    return (
        <div className="nav">
            <div className="items">
                <div className={info?'active':'item'} name="info" onClick={()=>switching('info')}>Information</div>
                {
                    idProfil===id &&
                    <div className={edit?'active':'item'} name="edit" onClick={()=>switching('edit')}>Edit</div>
                }
            </div>
            <div className="btn item"  name="post" onClick={()=>switching('post')}>All Feeds</div>
        </div>
    )
}

export default Bar;