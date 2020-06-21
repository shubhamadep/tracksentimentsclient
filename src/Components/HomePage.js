import React, {useState, useEffect} from 'react';
import { Container, Paper, Typography, InputBase, Button, Grid, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import DirectionsIcon from '@material-ui/icons/Directions';
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
// import { LoginContext } from "./LoginContext";

const useStyles = makeStyles((theme) => ({
    root:{
        display: 'flex',
        height: '100vh',
        backgroundColor: theme.palette.primary.background
    },
    inputBar: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        marginTop: '50%',
      },
      input: {
        marginLeft: theme.spacing(1),
        flex: 1,
      },
      iconButton: {
        padding: 10,
      },
      divider: {
        height: 28,
        margin: 4,
      },
      AnalysisSection: {
        marginTop: '25px'
      },
      AnalysisSectionPaper: {
        height: '200px',
      },
      analysisBlock: {
          margin: '10px',
      }
}))
export default function HomePage() {
    const classes = useStyles()
    const [value, setValue] = useState("");
    const [sentimentScore, setSentimentScore] = useState(0)
    const [topWords, setTopWords] = useState('')
    const [gettingData, setGettingData] = useState(false)
    const [progress, setProgress] = React.useState(0);
    // const loginContext = React.useContext(LoginContext)
    
    async function getSentimentScore(){
        console.log("Calling API....")
        await axios.get('/',{
                    params: {SellerID: "A19R3BN6ZSO9A1"},
                    headers: {"Access-Control-Allow-Origin": "*"}
                    })
            .then(res=> {
                    setSentimentScore(res['data']['sentiment_score'])
                    setTopWords(res['data']['top_words'])
                    setGettingData(false)
                }
                
            )
            console.log("API call complete....")
    }

    useEffect(() => {
        function tick() {
          // reset when reaching 100%
          setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
        }
    
        const timer = setInterval(tick, 20);
        return () => {
          clearInterval(timer);
        };
      }, []);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleGoClick = (e) => {
        setGettingData(true)
        getSentimentScore()
    }

    if(!gettingData){
        return(
                <div  className={classes.root}>
                    <Container maxWidth="md">
                        <Paper className={classes.inputBar} align="left">
                                <InputBase
                                    placeholder="Enter Amazon Seller ID ... "
                                    className={classes.input}
                                    inputProps={{ 'aria-label': 'naked' }}
                                    onChange={handleChange}
                                />
                                <IconButton className={classes.iconButton} aria-label="search" align='right' onClick={handleGoClick}>
                                    <DirectionsIcon />
                                </IconButton>
                        </Paper>
                        <Grid container className={classes.AnalysisSection}>
                            
                        </Grid>
                    </Container>
                </div>
        )       
    }else{
        return(
            <div  className={classes.root}>
                    <Container maxWidth="md">
                        <Paper className={classes.inputBar} align="left">
                            <InputBase
                                placeholder="Enter Amazon Seller ID ... "
                                className={classes.input}
                                inputProps={{ 'aria-label': 'naked' }}
                                onChange={handleChange}
                            />
                            <IconButton className={classes.iconButton} aria-label="search" align='right' onClick={handleGoClick}>
                                <DirectionsIcon />
                            </IconButton>
                    </Paper>
                    <Grid container className={classes.AnalysisSection}>
                        <div>
                            <p></p>
                        </div>
                    </Grid>
                </Container>
            </div>
        )        
    }
}