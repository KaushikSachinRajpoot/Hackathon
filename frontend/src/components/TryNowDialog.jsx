import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField, MenuItem, Select, Box, FormControl, InputLabel } from "@mui/material";
import { useState } from "react";

const TryNowDialog = ({ open, handleClose, selectedImage }) => {
    const [height, setHeight] = useState("");
    const [width, setWidth] = useState("");
    const [bodyColor, setBodyColor] = useState("");
    const [imageUrl, setImageUrl] = useState(selectedImage || "");

    // Handle form submission
    const handleSubmit = () => {
        const formData = { height, width, bodyColor, imageUrl };
        console.log("Submitted Data:", formData);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Try Now</DialogTitle>
            <DialogContent>
                {/* Display Selected Image */}
                <Box display="flex" justifyContent="center" mb={2}>
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="Selected Product"
                            style={{ maxWidth: "100%", height: "200px", objectFit: "contain" }}
                        />
                    ) : (
                        <img
                            src={selectedImage}
                            alt="Selected Product"
                            style={{ maxWidth: "100%", height: "200px", objectFit: "contain" }}
                        />
                    )}
                </Box>


                {/* Image Dropdown */}
                <FormControl fullWidth margin="dense">
                    <InputLabel>Select Image</InputLabel>
                    <Select
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    >
                        {/* By default, selected image URL */}
                        <MenuItem value={selectedImage}>{selectedImage}</MenuItem>

                        {/* Other image URLs can be added later */}
                        <MenuItem value="https://example.com/image1.jpg">Image 1</MenuItem>
                        <MenuItem value="https://example.com/image2.jpg">Image 2</MenuItem>
                    </Select>
                </FormControl>

                {/* Input Fields */}
                <TextField
                    label="Height"
                    fullWidth
                    margin="dense"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                />
                <TextField
                    label="Width"
                    fullWidth
                    margin="dense"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                />
                <TextField
                    label="Body Color"
                    fullWidth
                    margin="dense"
                    value={bodyColor}
                    onChange={(e) => setBodyColor(e.target.value)}
                />
            </DialogContent>

            <DialogActions>
                {/* Submit Button */}
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Submit
                </Button>

                {/* Close Button */}
                <Button onClick={handleClose} color="secondary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TryNowDialog;
