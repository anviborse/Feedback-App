import {useState , useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default function Admindata(){
	const [info,setInfo] = useState([]);

	useEffect(() => {
		fetch("http://localhost:9000/api/student")
	  .then((res) => {
		if (!res.ok) {
		  throw new Error("Network response was not ok");
		}
		return res.json();
	  })
	  .then((data) => {
		setInfo(data);
	  })
	  .catch((error) => {
		console.log("Error:", error);
	  });
  	  }, []);
	
	  const handleDelete = (id) => {
		fetch(`http://localhost:9000/api/student/${id}`, {
		  method: "DELETE",
		})
		  .then((res) => res.data)
		  .then(() => {
			setInfo((prevInfo) => prevInfo.filter((student) => student._id !== id));
			alert("Are you sure you want to delete?");
			window.location.reload();
		  })
		  .catch((error) => {
			alert("Error deleting", error);
		  });
	  };
	return(
	<>
	<center>
	<h1>Feedbacks Recieved</h1>
	<table border = "3" style ={{"width":"70%"}} margin="auto">
		<tbody>
		<tr>
			<th>Name</th>
			<th>Email</th>
			<th>Rating</th>
            <th>Feedback</th>
			<th>Delete</th>

	</tr>
	{
		info.map((e)=>(
			<tr key={e._id} id="rfeed">
		<td>{e.name}</td>
		<td>{e.email}</td>
		<td>{e.rating}</td>
        <td>{e.feedback}</td>
		<td><button id="button" onClick={() => handleDelete(e._id)}>Delete</button></td>
		</tr>

	))
	}
	</tbody>
	</table>
	<Link to= "/admin"><button id="button">Logout</button></Link>
	</center>
	</>
	);
}
