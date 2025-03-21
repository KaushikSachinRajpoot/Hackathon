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

const TryNowDialog = ({ open, handleClose, selectedImage }) => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bodyColor, setBodyColor] = useState("");
  const [imageUrl, setImageUrl] = useState(selectedImage || "");
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setHeight("");
      setWeight("");
      setBodyColor("");
      setSize("");
      setError("");
    }
  }, [open]);

  // Handle form submission
  const handleSubmit = async () => {
    if (!height || !weight) {
      setError("Please provide height and weight");
      return;
    }
    setLoading(true);
    setError("");
    setSize("");
    console.log(bodyColor);

    try {
      const response = await axios.post("http://localhost:4000/get-size", {
        height,
        weight,
      });
      setSize(response.data.size);
    } catch (err) {
      setError("Failed to fetch size. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Try Now</DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="center" mb={2}>
          <img
            src={imageUrl || selectedImage}
            alt="Selected Product"
            style={{ maxWidth: "100%", height: "200px", objectFit: "contain" }}
          />
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={100}>
            <CircularProgress />
          </Box>
        ) : size ? (
          <Typography variant="h6" align="center">Recommended Size: {size}</Typography>
        ) : (
          <>
            <FormControl fullWidth margin="dense">
              <InputLabel>Select Image</InputLabel>
              <Select value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}>
                <MenuItem value={selectedImage}>{selectedImage}</MenuItem>
                <MenuItem value="https://example.com/image1.jpg">Image 1</MenuItem>
                <MenuItem value="https://example.com/image2.jpg">Image 2</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Height" fullWidth margin="dense" value={height} onChange={(e) => setHeight(e.target.value)} />
            <TextField label="Weight" fullWidth margin="dense" value={weight} onChange={(e) => setWeight(e.target.value)} />
            <FormControl fullWidth margin="dense">
              <InputLabel>Body Color</InputLabel>
              <Select value={bodyColor} onChange={(e) => setBodyColor(e.target.value)}>
                {skinColors.map((color) => (
                  <MenuItem key={color} value={color}>{color}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
