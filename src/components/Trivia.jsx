import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, TextField } from "@mui/material";

// import OutlinedInput from "@mui/material/OutlinedInput";

function Trivia() {
  const [data, setData] = useState({});
  const [state, setState] = useState(1);
  const [answer, setAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [option, setOption] = useState([]);
  const textInput = React.useRef(null);

  const fetchHandler = async () => {
    const Response = await axios.get("https://opentdb.com/api.php?amount=1");
    console.log(Response.data.results[0]);

    setData(Response.data.results[0]);
    setCorrectAnswer(Response.data.results[0].correct_answer);
    let array = [
      Response.data.results[0].correct_answer,
      ...Response.data.results[0].incorrect_answers,
    ];
    setOption(array);
  };

  const submitHandler = () => {
    if (correctAnswer === answer) alert("Correct Answer");
    else alert("Wrong Answer");
    // setState((prev) => prev + 1);
    let inputElement = document.getElementById("input");
    inputElement.value = "";
    // console.log(data.question.split(/&.*;/g));
  };

  const changeHandler = (e) => {
    setAnswer(e.currentTarget.value);
  };

  const nextQuestionHandler = () => {
    textInput.current.value = "";
    setState((prev) => prev + 1);
  };

  useEffect(() => {
    fetchHandler();
    // console.log(state);
  }, [state]);

  return (
    <div className="App">
      <Container fixed>
        <h1 style={{ color: "red", fontSize: "60px", textAlign: "center" }}>
          MODERN TRIVIA
        </h1>
        <h1 style={{ color: "blue" }}>Question : </h1>
        {/* <p>{data.question.replace(/&.*;/g, "----")}</p> */}
        <div style={{ textAlign: "left" }}>
          <p style={{ fontWeight: "bold", fontSize: "24px" }}>
            {data.question}{" "}
          </p>
          <ul>
            {option.map((IndividualOption, index) => {
              console.log(IndividualOption);
              return (
                <li
                  key={index}
                  style={{ fontSize: "20px", marginBottom: "20px" }}
                >
                  {IndividualOption}
                </li>
              );
            })}
          </ul>
        </div>
        <h1 style={{ color: "blue" }}>Answer :</h1>
        <form onSubmit={submitHandler}>
          <TextField
            // label="Required"
            inputRef={textInput}
            required
            color="secondary"
            focused
            style={{ marginBottom: "20px", width: "500px" }}
            onChange={changeHandler}
            // value=""
            // value={(e) => e.target.value}
            // required={true}
          />
          <br></br>
          <Button
            type="submit"
            variant="contained"
            color="success"
            style={{ marginBottom: "20px" }}
          >
            CHECK ANSWER
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={nextQuestionHandler}
            style={{ marginBottom: "20px", marginLeft: "200px" }}
          >
            NEXT QUESTION
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default Trivia;
