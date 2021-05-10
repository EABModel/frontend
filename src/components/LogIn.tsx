import React, { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UseStyles from '../styles/LogInStyles';
import { bindActionCreators } from 'redux';
import { RootState } from '../redux/store';
import { connect } from 'react-redux';
import { UserState, UserAuthFields } from '../redux/types/UserTypes';
import * as userInteractors from '../redux/interactors/userInteractors';
import * as modalInteractors from '../redux/interactors/modalInteractor';
import { Cancel } from '@material-ui/icons';
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Card,
  CircularProgress,
} from '@material-ui/core';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        EABModel
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

interface StateProps {
  user: UserState
}

interface DispatchProps {
  loginUserInteractor: typeof userInteractors.loginUserInteractor;
  resetUserStatusInteractor: typeof userInteractors.resetUserStatusInteractor;
  closePopUpInteractor: typeof modalInteractors.closePopUpInteractor;
}

interface Props extends StateProps, DispatchProps {
  closePopUp: Function;
}

const LogIn: FC<Props> = (props: Props) => {
  const styles = UseStyles();
  const history = useHistory();
  const { user } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user.loginUserStatus.success) {
      props.resetUserStatusInteractor();
      props.closePopUpInteractor();
      history.push('/about');
    }
  },[history, props, user]);

  const closePopUp = (): void => {
    props.closePopUp();
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  const handleSubmit = (): void => {
    const authFields: UserAuthFields = {
      email,
      password
    };
    props.loginUserInteractor(authFields);
  };

  return (
    <Card className={styles.popUp} component="main" variant="outlined">
      <div className={styles.cancelIcon} onClick={closePopUp} >
        <Cancel fontSize="large" color="secondary" />
      </div>
      <CssBaseline />
      <div className={styles.paper}>
        {user.loginUserStatus.loading && <CircularProgress />}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div className={styles.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onPasswordChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={styles.submit}
            disabled={!(email && password)}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                ¿Forgot password?
              </Link>
            </Grid>
            <Grid item xs>
              <Link href="#" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={4}>
        <Copyright />
      </Box>
    </Card>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  ...bindActionCreators(
    {
      ...userInteractors,
      ...modalInteractors,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
