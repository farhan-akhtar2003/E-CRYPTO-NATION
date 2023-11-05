import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Button,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";
import { useEffect, useState } from "react";
import UserSidebar from "./Authentication/UserSidebar";

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "rgb(62,180,137)",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

function Header() {
  const classes = useStyles();
  const { currency, setCurrency, user } = CryptoState();
  const [walletAddress, setWalletAddress] = useState("");
  const history = useHistory();
  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  });

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      console.log("please install");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } else {
          console.log("connect to metamask");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      console.log("please install");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      setWalletAddress("");
      console.log("please install");
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => history.push(`/`)}
              variant="h6"
              className={classes.title}
            >
              E CRYPTO NATION
            </Typography>
            {user && (
              <Button
                variant="outlined"
                style={{
                  width:
                    walletAddress && walletAddress.length > 0 ? "27%" : "19.5%",
                  height: 40,
                  marginRight: 18,
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor:
                    walletAddress && walletAddress.length > 0
                      ? "rgb(0,200,0)"
                      : "red",
                }}
                onClick={connectWallet}
              >
                {walletAddress && walletAddress.length > 0
                  ? `CONNECTED: ${walletAddress.substring(
                      0,
                      6
                    )}...${walletAddress.substring(38)}`
                  : "CONNECT WALLET"}
              </Button>
            )}
            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              style={{ width: 85, height: 40 }}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>

            {user ? <UserSidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
