import './pdp.css'

function Pdp({user}) {

    const classImg = {
        bgcImg: {
            backgroundImage: `url('${user?.pathProfile}')`
        }
    }

    return (
            <div className="section-image">
                <div className="image-flou" style={classImg?.bgcImg}></div>
                <div className="image-net">
                    <img src={user?.pathProfile} className="img"/>
                </div>
            </div>
        )
}

export default Pdp;