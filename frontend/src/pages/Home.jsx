import { Container, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ShoppingImage from "../assets/shopping.jpg"; // Add an image for visual appeal

const HomeContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  height: "86vh",
  width: "100vw",
  backgroundImage: `url(${ShoppingImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  padding: "20px",
  position: "relative",
  margin: 0
});

const HeroSection = styled(Box)({
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "#fff9e2",
  padding: "20px 30px",
  background: "rgba(0, 0, 0, 0.7)",
  borderRadius: "50px",
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
  marginBottom: "20px",
  display: "inline-block"
});

const Description = styled(Typography)({
  fontSize: "1.3rem",
  color: "#ecf0f1",
  maxWidth: "700px",
  marginBottom: "20px",
  background: "rgba(0, 0, 0, 0.5)",
  padding: "10px",
  borderRadius: "10px"
});

const CTAButton = styled(Button)({
  backgroundColor: "#ffcc00",
  color: "#2c3e50",
  padding: "14px 30px",
  fontSize: "1.2rem",
  borderRadius: "50px",
  textTransform: "none",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  '&:hover': {
    backgroundColor: "#ffaa00"
  }
});

const Home = () => {
  return (
    <HomeContainer>
      {/* Hero Section */}
      <HeroSection>
        Perfect Fit, Every Time!
      </HeroSection>

      {/* Description Section */}
      <Description>
        Welcome to <strong>FitWear</strong>, where shopping is smart and effortless! Get the best fit for your body shape with our intelligent sizing recommendations.
      </Description>

      {/* CTA Button */}
      <CTAButton
        variant="contained"
        component={Link}
        to="/products"
      >
        Start Shopping
      </CTAButton>
    </HomeContainer>
  );
};

export default Home;
