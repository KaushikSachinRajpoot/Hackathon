import { CircularProgress, Container, Grid2, Card, CardMedia, CardContent, Typography, Button, Chip, Box, Tooltip, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import TryIcon from "@mui/icons-material/TouchApp";
import { useState, useEffect } from "react";
import TryNowDialog from "../components/TryNowDialog";


const ProductCard = styled(Card)({
    transition: "0.3s",
    boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
    width: "100%",
    margin: "auto",
    "&:hover": {
        transform: "scale(1.05)",
        boxShadow: "0px 10px 20px rgba(0,0,0,0.2)"
    }
});

const BuyButton = styled(Button)({
    backgroundColor: "#ff9f00",
    color: "white",
    fontWeight: "bold",
    "&:hover": {
        backgroundColor: "#ff7800"
    }
});

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const handleDialogOpen = (image) => {
        setSelectedImage(image);
        setDialogOpen(true);
    };

    useEffect(() => {
        // Fetch products from backend
        fetch("http://localhost:4000/products")
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    return (
        <Container sx={{ marginTop: 4, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom fontWeight="bold" marginBottom="2rem">
                Explore Our Collection
            </Typography>
            {loading ? (
               <Box display="flex" justifyContent="center" alignItems="center" height={100}>
                  <CircularProgress />
                </Box>
            ) : (
            <Grid2 container spacing={3} justifyContent="center">
                {products.map((product) => (
                    <Grid2 key={product._id} sx={{ display: "flex", justifyContent: "center" }}>
                        <ProductCard sx={{ width: "100%", maxWidth: "300px", position: "relative" }}>
                            {/* Image Wrapper with Try Now Button */}
                            <Box sx={{ position: "relative" }}>
                                <CardMedia
                                    component="img"
                                    sx={{ aspectRatio: "10/9", objectFit: "cover", width: "100%" }}
                                    image={`/assets/${product.image}`}
                                    alt={product.name}
                                />
                                {/* Try Now Button with Tooltip */}
                                <Tooltip title="Click to try your perfect sizes!" arrow>
                                    <IconButton
                                        onClick={() => handleDialogOpen(`/assets/${product.image}`)}
                                        sx={{
                                            position: "absolute",
                                            top: 8,
                                            right: 8,
                                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                                            "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                                        }}
                                    >
                                        <TryIcon color="primary" style={{ color: "#002c80" }} />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <CardContent>
                                {/* Name and Chip in a single row */}
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h6" fontWeight="bold" fontSize="1rem" textAlign="left">
                                        {product.name}
                                    </Typography>
                                    <Chip
                                        label={product.inStock ? "In Stock" : "Out of Stock"}
                                        color={product.inStock ? "success" : "error"}
                                        sx={{ height: 22, fontSize: 12 }}
                                    />
                                </Box>

                                <Typography variant="body1" color="text.secondary" textAlign="left">
                                    Price: <Typography component="span" color="primary" fontWeight="bold">{product.price}</Typography>
                                </Typography>
                                <Typography variant="body2" color="text.secondary" textAlign="left">
                                    Category: <Typography component="span" color="success.main" fontWeight="medium">{product.category}</Typography>
                                </Typography>
                                <Typography variant="body2" color="text.secondary" textAlign="left">
                                    Sizes: <Typography component="span" color="warning.main" fontWeight="medium">{product.sizes.join(", ")}</Typography>
                                </Typography>
                                <BuyButton fullWidth variant="contained" sx={{ mt: 2 }} disabled={!product.inStock}>
                                    {product.inStock ? "Buy Now" : "Sold Out"}
                                </BuyButton>
                            </CardContent>
                        </ProductCard>
                    </Grid2>
                ))}
            </Grid2>
            )}

            {/* Dialog Box  */}
            <TryNowDialog open={dialogOpen} handleClose={() => setDialogOpen(false)} selectedImage={selectedImage} />
        </Container>
    );
};

export default Products;
