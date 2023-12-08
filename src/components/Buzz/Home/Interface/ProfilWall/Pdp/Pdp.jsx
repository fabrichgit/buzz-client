import './pdp.css'

function Pdp({user}) {

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
                </div>
            </div>
        )
}

export default Pdp;