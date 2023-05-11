import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


export default function BookCard(props) {
  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100%"
          image={props.data.volumeInfo.imageLinks.smallThumbnail}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.data.volumeInfo.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.data.volumeInfo.subtitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}