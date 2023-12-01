import { useParams } from "react-router";
import { useEffect, useState } from "preact/hooks";
import "./bar.css";

function Bar({setPartState}) {

    const {idProfil, id} = useParams();

    const [classCss, setClassCss] = useState({
        "info": true,
        "edit": false
    });
    
    useEffect(()=>{
        if (classCss.info) {
            setPartState('info');
        }else if (classCss.edit) {
            setPartState('edit');
        }
    }, [classCss])

    const switching = (name)=>{
        console.log(name);
        switch (name) {
            case 'info':
                {
                    setClassCss({
                        "edit": false, "info": true
                    });
                }
                break;
            case 'edit':
                {
                    setClassCss({
                        "info": false, "edit": true
                    });
                }
            default:
                break;
        }
        console.log(classCss);
    }

    return (
        <div className="nav">
            <div className="items">
                <div className={classCss.info?'active':'item'} name="info" onClick={()=>switching('info')}>Information</div>
                {
                    idProfil===id &&
                    <div className={classCss.edit?'active':'item'} name="edit" onClick={()=>switching('edit')}>Edit</div>
                }
            </div>
            <div className="btn item">Your Feeds</div>
        </div>
    )
}

export default Bar;