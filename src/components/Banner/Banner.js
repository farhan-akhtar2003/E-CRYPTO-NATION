import { Container, makeStyles, Typography } from "@material-ui/core";
import Carousel from "./Carousel";

const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundImage: "url(./banner2.webp)",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
}));

function Banner() {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
              color: "rgb(150,222,209)",
            }}
          >
            E CRYPTO TRADING PLATFORM
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "rgb(0,255,255)",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
              fontSize: "25px",
            }}
          >
            WELCOME TO THE WORLD OF E CRYPTO NATION
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
}

export default Banner;
