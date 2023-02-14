import {
    IconButton
  } from "@mui/material";
  import ClearIcon from '@mui/icons-material/Clear';
const ImageGrid = ({ images,removeFile }) => {
  // render each image by calling Image component
  const renderImage = (image, index) => {
    return (
      <div key={`${index}-image`} className="file-item">
        <IconButton
          onClick={removeFile(image)}
          size="small"
          className="clear-btn"
          color="primary"
          component="span"
        >
          <ClearIcon />
        </IconButton>
        <img alt={`img - ${index}`} src={image} className="file-img" />
      </div>
    );
  };
  // Return the list of files//
  return <section className="file-list">{images.map(renderImage)}</section>;
};

export default ImageGrid;
