import React, { useState } from "react";
import "./App.css";

import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

function App() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [docType, setDocType] = useState("");

  const handleClickGenerateFile = () => {
    let link = document.getElementById("downloadFile");
    link.href = generateTextFile(text);
    link.download = `${title}.${docType}`;
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
    }, 1500);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDocChange = (e) => {
    e.preventDefault();
    setDocType(e.target.value)
  }

  return (
    <div className="app">
      <TextField
        label="Document title"
        value={title}
        onChange={handleTitleChange}
        variant="standard"
        margin="dense"
      />
      <TextField
        label="Document text"
        value={text}
        onChange={handleTextChange}
        variant="outlined"
        margin="normal"
        multiline
      />
      <div className="actions">
        <Select
          value={docType}
          label="Doc Type"
          onChange={handleDocChange}
          autoWidth="true"
          className='select'
          variant='standard'
        >
          <MenuItem value='txt'>TEXT</MenuItem>
          <MenuItem value='json'>JSON</MenuItem>
        </Select>
        <Button variant="outlined" id="btnCreateFile" onClick={handleClickGenerateFile}>
          Generate File
        </Button>
        <a
          download="info.txt"
          href="alt"
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
