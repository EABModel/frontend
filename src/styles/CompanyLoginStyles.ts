import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    padding: '20px',
    width: '50%',
    height: '60vh',
    borderRadius: '15px',
    overflowY: 'scroll',
  },
  shopContainer: {
    position: 'relative',
    padding: '10px',
    margin: '15px 0',
    borderRadius: '15px',
    'box-shadow': '5px 6px 12px -4px rgba(0,0,0,0.75)',
  },
  name: {
    fontSize: '20px',
    textAlign: 'left',
    padding: 0,
    margin: '0 5px',
  },
  location: {
    fontSize: '15px',
    textAlign: 'left',
    padding: 0,
    margin: '0 5px',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '12px',
    right: '15px',
  },
});

export default useStyles;
