import React, { useState, useRef } from "react";
import axios from "axios";

export default function Feedback()
 {
  const rName = useRef();
  const [name,setName] = useState("");
	const [email,setEmail] = useState("");
	const [feedback,setFeedback] = useState("");
  const [rating, setRating] = useState("");
  const [hoveredRating, setHoveredRating] = useState("");

	const hName = (event) => {setName(event.target.value);}
	const hEmail = (event) => {setEmail(event.target.value);}
  const hFeedback = (event) => {setFeedback(event.target.value);}
  const hRating = (selectedRating) => {
    setRating(selectedRating === rating ? 0 : selectedRating);
  };

  const hRatingHover = (hoveredRating) => {
    setHoveredRating(hoveredRating);
  };

  const hRatingHoverEnd = () => {
    setHoveredRating(0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      alert("Name cannot be empty.");
      rName.current.focus();
      return;
    }

    if (!email.trim()) {
      alert("Email cannot be empty.");
      return;
    }

    if (!rating) {
      alert("Please rate your feedback using the stars.");
      return;
    }

    if (!feedback) {
      alert("Please enter your feedback.");
      return;
    }

    let data = { name, email, feedback, rating };
    let urladd = "http://localhost:9000/save";
    axios
      .post(urladd, data)
      .then((res) => {
        setName("");
        setEmail("");
        setFeedback("");
        setRating("");
        rName.current.focus();
        alert("Feedback Saved");
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") alert("Please Try After Sometime");
      });
  };

  return (
    <>
      <center>
        <h1>Feedback App</h1>
        <form className="text" onSubmit={handleSubmit}>
        <div className="container">
          <input className="text"
            type="text"
            placeholder="Enter Name"
            onChange={hName}
            value={name}
            ref={rName}
          />
          <br />
          <br />
          <input className="text"
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={hEmail}
            value={email}
            autoComplete="off"
          />
          <br />
          <br />
          <textarea className="text"
            name="feedback"
            rows={3}
            cols={21}
            placeholder="Feedback Please"
            onChange={hFeedback}
            value={feedback}
          />
          <br />
          <div>
            {[1, 2, 3, 4, 5].map((starValue) => (
              <span
                key={starValue}
                className={`star-rating ${
                  starValue <= rating ? "star-filled" : ""
                } ${starValue <= hoveredRating ? "hovered" : ""}`}
                onClick={() => hRating(starValue)}
                onMouseEnter={() => hRatingHover(starValue)}
                onMouseLeave={hRatingHoverEnd}
              >
                &#128970;
              </span>
            ))}
          </div>
          <input id="button" type="submit" value="Submit" />
        </div>
        </form>
      </center>
    </>
  );
}