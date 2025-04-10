import {
  CircularProgress,
  Dialog,
  DialogTitle,
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
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

const skinColors = ["Fair", "Medium", "Tan", "Brown", "Dark"];
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
  const [generatedImage, setGeneratedImage ] = useState(null);

  useEffect(() => {
    if (!open) {
      setHeight("");
      setWeight("");
      setGender("");
      setBodyColor("");
      setSize("");
      setError("");
      setImageVariations("");
      setUploadedImage(null);
    }
  }, [open]);

  console.log('1', height);
  console.log('2', weight);
  console.log('3', gender);
  console.log('4', bodyColor);
  console.log('5', uploadedImage);

  // Handle form submission
  const handleSubmit = async () => {
    if (!height || !weight || !gender) {
      setError("Please provide height, weight & gender");
      return;
    }
    setLoading(true);
    setError("");
    setSize("");

    try {
      // First API call to fetch size
      const response = await axios.post("http://localhost:4000/get-size", {
        height,
        weight,
        gender,
      });
      setSize(response.data.size);

       // Now call the second API to generate images with the selected parameters
       const generateImageResponse = await axios.post("http://localhost:4000/generate-image", {
        clothing: selectedImage, // Assuming 'clothing' is the size
        skinTone: bodyColor,
        gender: gender,
        n: imageVariations || 1, // Use default 1 if imageVariations is not set
      });

      // Log the generated image URLs
      console.log("Generated Image URLs:", generateImageResponse.data.imageUrls);
      setGeneratedImage(generateImageResponse.data.imageUrls);
    } catch (err) {
      setError("Failed to fetch size. Try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Validate number input for image variations
  // const handleImageVariationsChange = (e) => {
  //   const value = e.target.value;
  //   if (/^\d*$/.test(value) && value <= 4) {
  //     setImageVariations(value);
  //   }
  // };

  // Handle image upload
  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setUploadedImage(imageUrl);
  //     setImageUrl(imageUrl);
  //   }
  // };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Try Now</DialogTitle>
      <DialogContent>
        {/* Dislay selected image */}
        {generatedImage ? (
          <Box display="flex" justifyContent="center" mb={2}>
          <img
            src={generatedImage}
            alt="generated Product"
            style={{ maxWidth: "100%", height: "200px", objectFit: "contain" }}
          />
        </Box>
        ) : (
          <Box display="flex" justifyContent="center" mb={2}>
          <img
            src={imageUrl || selectedImage || uploadedImage}
            alt="Selected Product"
            style={{ maxWidth: "100%", height: "200px", objectFit: "contain" }}
          />
        </Box>
        )}
        {/* <Box display="flex" justifyContent="center" mb={2}>
          <img
            src={imageUrl || selectedImage || uploadedImage}
            alt="Selected Product"
            style={{ maxWidth: "100%", height: "200px", objectFit: "contain" }}
          />
        </Box> */}

        {/* Image Upload Option */}
        {/* <input type="file" accept="image/*" onChange={handleImageUpload} /> */}

        {/* Rotate Image Button */}
        {/* <Box display="flex" justifyContent="center" mb={2}>
          <Button variant="outlined" onClick={rotateImage}>Rotate 360°</Button>
        </Box> */}

        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={100}
          >
            <CircularProgress />
          </Box>
        ) : size ? (
          <Typography variant="h6" align="center">
            Recommended Size: {size}
          </Typography>
        ) : (
          <>
            {/* Select Image Dropdown */}
            {/* <FormControl fullWidth margin="dense">
              <InputLabel>Select Image</InputLabel>
              <Select
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              >
                <MenuItem value={selectedImage}>{selectedImage}</MenuItem>
                <MenuItem value="https://example.com/image1.jpg">
                  Image 1
                </MenuItem>
                <MenuItem value="https://example.com/image2.jpg">
                  Image 2
                </MenuItem>
              </Select>
            </FormControl> */}

            {/* Height & Weight Fields */}
            <TextField
              label="Height in cm"
              fullWidth
              margin="dense"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <TextField
              label="Weight in kg"
              fullWidth
              margin="dense"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />

            {/* Gender Selection */}
            <FormControl fullWidth margin="dense">
              <InputLabel>Gender</InputLabel>
              <Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                {genders.map((gen) => (
                  <MenuItem key={gen} value={gen}>
                    {gen}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Skin Color Selection (Defaults to Dull Skin Tone) */}
            <FormControl fullWidth margin="dense">
              <InputLabel>Body Color</InputLabel>
              <Select
                value={bodyColor}
                onChange={(e) => setBodyColor(e.target.value || "Dull")}
              >
                {skinColors.map((color) => (
                  <MenuItem key={color} value={color}>
                    {color}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Number of Image Variations */}
            {/* <TextField
              label="Number of Image Variations (Max 4)"
              // type="number"
              fullWidth
              margin="dense"
              value={imageVariations}
              onChange={handleImageVariationsChange}
              slotProps={{
                htmlInput: {
                  inputMode: "numeric",
                  pattern: "[0-4]*"
                }
              }}
              // onChange={(e) => setImageVariations(e.target.value)}
            /> */}

            {/* <TextField label="Body Color" fullWidth margin="dense" value={bodyColor} onChange={(e) => setBodyColor(e.target.value)} /> */}
            {error && <Typography color="error">{error}</Typography>}
          </>
        )}
      </DialogContent>

      <DialogActions>
        {!size && (
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Submit
          </Button>
        )}
        <Button onClick={handleClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TryNowDialog;
