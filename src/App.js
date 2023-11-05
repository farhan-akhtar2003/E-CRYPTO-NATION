import { makeStyles } from "@material-ui/core";
import Homepage from "./Pages/HomePage";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import CoinPage from "./Pages/CoinPage";
import Header from "./components/Header";
import Alert from "./components/Alert";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "black",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();
  // async function requestAccount(){
  //   if(window.ethereum){
  //     console.log("detected");
  //   }
  //   else{
  //     console.log("not detected");
  //   }
  // }

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Route path="/" component={Homepage} exact />
        <Route path="/coins/:id" component={CoinPage} exact />
      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;
