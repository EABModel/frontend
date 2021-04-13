import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  }
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

export const CatalogCard: FC<Props> = ({ specs }: Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image="CHANGE-LATER" title="Device" />
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
  specs: {
    name: 'Defaut Device',
    brand: 'Default Brand',
    os: 'Default OS',
    color: 'Default Color',
    inches: 5
  }
};