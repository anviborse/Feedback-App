import {Link} from "react-router-dom";

export default function NavBar()
{
    return(
    <>
    <center>
        <div className="navbar">
            <Link to = "/">User</Link>
            <Link to = "/admin">Admin</Link>
        </div>
    </center>
    </>
    );
}
