import React, { useState } from "react";
import "./App.css";

import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";

function App() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState('')

  const handleClick = () => {
    let link = document.getElementById("downloadFile");
    link.href = generateTextFile(text);
    link.download = title;
    link.style.display = "inline-block";
  };

  const generateTextFile = (text) => {
    let textFile = null;
    let data = new Blob([text], { text: "text/plain" });
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }
    textFile = window.URL.createObjectURL(data);
    return textFile;
  };

  const hideDownload = () => {
    let link = document.getElementById("downloadFile");
    setTimeout(() => {
      link.style.display = "none";
    }, 1500)
  }

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className="app">
      <TextField
        id="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
        variant="standard"
        margin="dense"
      />
      <TextField
        id="dummyText"
        fullWidth
        multiline
        label="Enter New Text"
        value={text}
        onChange={handleTextChange}
        variant="outlined"
        margin='normal'
      />
      <div className='actions'>
        <Button variant="outlined" id="btnCreateFile" onClick={handleClick}>
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
    </div>
  );
}

export default App;
