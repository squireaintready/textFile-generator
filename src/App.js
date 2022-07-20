import React, { useState } from "react";
import "./App.css";

import Button from "@mui/material/Button";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import TextField from "@mui/material/TextField";


function App() {
  const [saveAsText, setSaveAsText] = useState('true')
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const handleClickGenerateFile = () => {
    let link = document.getElementById("downloadFile");
    link.href = generateTextFile(text);
    link.download = `${saveAsText ? `${title}.txt` : `${title}.json`}`;
    link.style.display = "inline-block";
  };

  const generateTextFile = (text) => {
    let textFile = null;
    let data = new Blob([text], { text: "text/plain" });
    if (text === "") {
      return alert(
        "You are trying to save an empty document. Please enter characters in the field to continue."
      );
    }
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }
    textFile = window.URL.createObjectURL(data);
    return textFile;
  };

  const toggleSaveAsText = () => {
    setSaveAsText(prev => setSaveAsText(!prev))
  }

  const hideDownload = () => {
    let link = document.getElementById("downloadFile");
    setTimeout(() => {
      link.style.display = "none";
    }, 1500);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="app">
      <form className="app__form">
        <TextField
          label="Document title"
          value={title}
          onChange={handleTitleChange}
          variant="standard"
          margin="dense"
          color="secondary"
        />
        <TextField
          label="Document text"
          value={text}
          onChange={handleTextChange}
          variant="outlined"
          margin="normal"
          color="secondary"
          multiline
          
        />
        <div className="app__formActions">
          <FormControlLabel
            control={<Switch color="secondary" checked={saveAsText} onChange={toggleSaveAsText}/>}
            label={`file format .${saveAsText ? "text" : "json"}`}
            labelPlacement="bottom"
            className="app__formActionsSwitch"
          />
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClickGenerateFile}
          >
            Generate File
          </Button>
          <a
            download="info.txt"
            href="alt"
            id="downloadFile"
            style={{ display: "none" }}
            onClick={hideDownload}
          >
            Download
          </a>
        </div>
      </form>
    </div>
  );
}

export default App;
