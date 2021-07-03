import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  textContainer: {
    width: '40%',
    marginLeft: theme.spacing(43),
  },
  resetContainer: {
    padding: theme.spacing(2),
    marginLeft: theme.spacing(3),
  },
}));
