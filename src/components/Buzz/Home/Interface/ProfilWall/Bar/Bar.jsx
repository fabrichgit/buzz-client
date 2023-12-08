import { useParams } from "react-router";
import { useEffect, useState } from "preact/hooks";
import "./bar.css";

function Bar({setPartState}) {

    const [classCss, setClassCss] = useState({
        "info": true,
        "edit": false
    })

    const {idProfil, id} = useParams();

    const switching = (name)=>{
        console.log(name);
        setPartState(name);
        switch (name) {
            case 'info':
                setClassCss({
                    "info": true, "edit": false
                })
                break;
            case 'edit':
                setClassCss({
                    "info": false, "edit": true
                })
            case 'post':
                setClassCss({
                    "info": false, "edit": false
                })
            default:
                break;
        }
    }

    return (
        <div className="nav">
            <div className="items">
                <div className={classCss?.info?'active':'item'} name="info" onClick={()=>switching('info')}>Information</div>
                {
                    idProfil===id &&
                    <div className={classCss?.edit?'active':'item'} name="edit" onClick={()=>switching('edit')}>Edit</div>
                }
            </div>
            <div className="btn item"  name="post" onClick={()=>switching('post')}>All of {idProfil===id?"your":"his"} Feeds</div>
        </div>
    )
}

export default Bar;