import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  MenuItem,
  Select,
  Box,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import axios from "axios";

const skinColors = ["Fair", "Medium", "Tan", "Dull Skin", "Dark"];
const genders = ["Male", "Female"];

const TryNowDialog = ({ open, handleClose, selectedImage }) => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [bodyColor, setBodyColor] = useState("");
  const [imageUrl, setImageUrl] = useState(selectedImage || "");
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageVariations, setImageVariations] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);

  useEffect(() => {
    if (open) {
      setImageUrl(selectedImage);
    }
    if (!open) {
      resetForm();
    }
  }, [open]);

  useEffect(() => {
    setImageUrl(selectedImage);
    setGeneratedImage(null);
    setSize("");
    setHeight("");
    setWeight("");
    setGender("");
    setBodyColor("");
  }, [selectedImage]);

  const resetForm = () => {
    setHeight("");
    setWeight("");
    setGender("");
    setBodyColor("");
    setSize("");
    setError("");
    setImageVariations("");
    setUploadedImage(null);
    setGeneratedImage(null);
  };

  const handleSubmit = async () => {
    if (!height || !weight || !gender) {
      setError("Please provide height, weight & gender");
      return;
    }
    setLoading(true);
    setError("");
    setSize("");
    setGeneratedImage(null);

    try {
      const sizeRes = await axios.post("http://localhost:4000/get-size", {
        height,
        weight,
        gender,
      });

      const imageRes = await axios.post(
        "http://localhost:4000/generate-image",
        {
          clothing: selectedImage,
          skinTone: bodyColor,
          gender,
          n: imageVariations || 1,
        }
      );

      setSize(sizeRes.data.size);
      setGeneratedImage(imageRes.data.imageUrls);
    } catch (err) {
      setError("Failed to get response. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          height: "90vh",
          borderRadius: 3,
          position: "relative",
        },
      }}
    >
      {/* Cross Button Top-Right */}
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 12,
          top: 12,
          color: (theme) => theme.palette.grey[500],
          zIndex: 1,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        sx={{
          backgroundColor: "#f4f6f8",
          padding: "32px",
          overflowY: "auto",
        }}
      >
        {/* Loader while fetching both API responses */}
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="60vh"
          >
            <CircularProgress size={60} />
          </Box>
        ) : generatedImage && size ? (
          // After result is received
          <Box display="flex" flexDirection="row" gap={4}>
            {/* Left Side - Generated Image */}
            <Box
              width="70%"
              height="460px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <img
                src={generatedImage}
                alt="Generated Preview"
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                }}
              />
            </Box>

            {/* Right Side - Result Details */}
            <Box width="30%" marginTop="15px">
              <Typography variant="h6" gutterBottom color="primary">
                Recommended Size: <strong>{size}</strong>
              </Typography>
              <Typography variant="body2" mb={1}>
                👤 Height: {height} cm
              </Typography>
              <Typography variant="body2" mb={1}>
                ⚖️ Weight: {weight} kg
              </Typography>
              <Typography variant="body2" mb={1}>
                🚻 Gender: {gender}
              </Typography>
              {bodyColor && (
                <Typography variant="body2" mb={1}>
                  🎨 Skin Tone: {bodyColor}
                </Typography>
              )}
            </Box>
          </Box>
        ) : (
          // Form layout (image + form)
          <Box
            display="flex"
            flexDirection="row"
            gap={4}
            sx={{ padding: "10px" }}
          >
            {/* Left Side - Image */}
            <Box
              width="60%"
              height="460px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "12px",
              }}
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Selected Product"
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                  }}
                />
              )}
            </Box>

            {/* Right Side - Form */}
            <Box
              width="40%"
              display="flex"
              flexDirection="column"
              gap={2}
            >
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  label="Height in cm"
                  fullWidth
                  margin="dense"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  variant="outlined"
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
                <TextField
                  label="Weight in kg"
                  fullWidth
                  margin="dense"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  variant="outlined"
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
                <FormControl
                  fullWidth
                  margin="dense"
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                >
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    label="Gender"
                  >
                    {genders.map((gen) => (
                      <MenuItem key={gen} value={gen}>
                        {gen}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  fullWidth
                  margin="dense"
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                >
                  <InputLabel>Body Color</InputLabel>
                  <Select
                    value={bodyColor}
                    onChange={(e) => setBodyColor(e.target.value || "Dull")}
                    label="Body Color"
                  >
                    {skinColors.map((color) => (
                      <MenuItem key={color} value={color}>
                        {color}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {error && (
                  <Typography color="error" mt={1}>
                    {error}
                  </Typography>
                )}
              </Box>

              {/* Submit Button */}
              <Box display="flex" justifyContent="center" mt={1}>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TryNowDialog;
