import { useDropzone } from "react-dropzone";
import React, { useState, useMemo } from "react";
import theme from "../themes/theme";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: theme.palette.primary.main,
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  maxWidth: 700
};

const activeStyle = {
  borderColor: "#2196f3"
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};

const img = {
  display: "block",
  width: "auto",
  height: "100%"
};

function FileUpload(props) {
  const [isCorrectFileNumber, setIsCorrectFileNumber] = useState(true);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles.length > props.fileNumber) {
        props.setFiles([]);
        rejectedFiles = acceptedFiles.splice(acceptedFiles.length);
        setIsCorrectFileNumber(false);
      } else {
        setIsCorrectFileNumber(true);
        props.setFiles(
          acceptedFiles.map(file =>
            Object.assign(file, {
              preview: URL.createObjectURL(file)
            })
          )
        );
      }
    },
    maxFiles: props.fileNumber,
    init: function() {
      this.on("addedfile", function(file) {
        this.removeAllFiles();
        props.setFiles([]);
      });
    }
  });

  const thumbs = props.files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt={file.name} />
      </div>
    </div>
  ));

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {})
    }),
    [isDragActive]
  );

  return (
    <React.Fragment>
      <section className="container">
        <div
          {...getRootProps({
            className: "dropzone",
            style
          })}
        >
          <input {...getInputProps()} />
          <p>
            Drag and drop at most {props.fileNumber} file
            {props.fileNumber > 1 ? "s" : ""} here, or click to select the file
            {props.fileNumber > 1 ? "s" : ""}
          </p>
          {isCorrectFileNumber ? "" : <p>Added too many files</p>}
        </div>
        <aside style={thumbsContainer}>{thumbs}</aside>
      </section>
    </React.Fragment>
  );
}

export default FileUpload;
