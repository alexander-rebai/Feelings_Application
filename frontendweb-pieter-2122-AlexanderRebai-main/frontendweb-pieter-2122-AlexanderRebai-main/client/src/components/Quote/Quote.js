import React, { useState, useEffect } from 'react';
import { Card, CardActions, Button, Typography, Grid } from '@material-ui/core';
import useStyles from './styles';
import './Quote.css';

const Quotes = () => {
    const classes = useStyles();
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        getQuote()
    }, []);

    const getQuote = () => {
        let url = `https://stoicquotesapi.com/v1/api/quotes/random`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setQuote(data.body);
                setAuthor(data.author);
            })
    }

    const handleClick = () => {
        getQuote();
    }

    const copyToClipboard = () => {
        const quote = document.getElementById("quote").innerHTML;
        navigator.clipboard.writeText(quote);
        const tooltip = document.getElementById("myTooltip");
        tooltip.innerHTML = "Quote Copied!"
    }

    return (

        <Grid className={classes.container} container spacing={3} >
            <Grid item xs={12} sm={6} >
                <Card className={classes.card}>
                    <div className={classes.title}>
                        <Typography variant='h6' id="quote">{quote}</Typography>
                    </div>
                    <div className={classes.details}>
                        <Typography variant='body2' color='textPrimary'>{author}</Typography>
                    </div>
                    <CardActions className={classes.cardActions}>
                        <Button size='small' color='primary' onClick={handleClick} variant='contained'>New Quote!</Button>
                        <div className='tooltip'>
                            <Button size='small' color='primary' onClick={copyToClipboard} variant='contained'>
                            <span className="tooltiptext" id="myTooltip">Copy</span>
                            Copy to Clipboard!
                            </Button>
                        </div>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>



    )
}



export default Quotes;