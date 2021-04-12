import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  titleTypography: {

  },
  secondaryTypograph: {

  },
});

interface Props {
  specs: {
    name: string,
    brand: string,
    os: string,
    color: string,
    inches: number
  }
}

export default function CatalogCard({ specs }: Props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image="" title="Device" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {specs.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" component="p">
            {specs.brand}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" component="p">
            {specs.os} {specs.color}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" component="p">
            {specs.inches} inches display
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            These phones are really good, buy them now.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Buy
        </Button>
        <Button size="small" color="primary">
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

CatalogCard.defaultProps = {
  specs: {}
};