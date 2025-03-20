import { AppBar, Toolbar, Typography, Button, InputBase, Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "rgb(1,58,75)", padding: "8px 16px" }}>
      <Toolbar>
        {/* Logo / Title */}
        <Typography variant="h5" component={Link} to="/" sx={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
          SmartBuy Hub
        </Typography>

        {/* Search Bar */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", mx: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "white", borderRadius: 2, padding: "4px 8px", width: "50%" }}>
            <SearchIcon sx={{ color: "gray" }} />
            <InputBase placeholder="Search for products..." sx={{ ml: 1, flex: 1 }} />
          </Box>
        </Box>

        {/* Navigation Buttons */}
        <Button color="inherit" component={Link} to="/" sx={{ textTransform: "none", fontSize: "16px" }}>
          Home
        </Button>
        <Button color="inherit" component={Link} to="/products" sx={{ textTransform: "none", fontSize: "16px" }}>
          Products
        </Button>
        
        {/* Cart Icon */}
        <IconButton component={Link} to="/#" sx={{ color: "white", ml: 2 }}>
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;