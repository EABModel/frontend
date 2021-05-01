import React, { FC } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../redux/store';
import { UserState } from '../redux/types/UserTypes';
import { PopUpState } from '../redux/types/ModalTypes';
import { AuthState } from '../redux/types/AuthTypes';
import * as authInteractors from '../redux/interactors/authInteractors';
import * as userInteractors from '../redux/interactors/userInteractors';
import * as modalInteractors from '../redux/interactors/modalInteractor';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
  },
}));

interface StateProps {
  user: UserState;
  auth: AuthState;
  modal: PopUpState;
}

interface DispatchProps {
  logoutAuthInteractor: typeof authInteractors.logoutAuthInteractor;
  logoutUserInteractor: typeof userInteractors.logoutUserInteractor;
  showPopUpInteractor: typeof modalInteractors.showPopUpInteractor;
}

interface Props extends StateProps, DispatchProps {
  // extra props you want to add
}

const NavBar: FC<Props> = (props: Props) => {
	const { user, auth } = props;
  const history = useHistory();
	const styles = useStyles();

  const openPopUp = (): void => {
    props.showPopUpInteractor();
  };

  const logOut = (): void => {
    props.logoutAuthInteractor();
    props.logoutUserInteractor();
    history.replace('/');
  };

	return (
		<div className={styles.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" className={styles.menuButton} color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={styles.title}>
						{auth.sessionType === 'ANONYMOUS' ? `Hello Dear Customer!` : `Hello ${user.username}!`}
					</Typography>
          {auth.sessionType === 'ANONYMOUS' && <Button color="inherit" onClick={openPopUp}>Login</Button>}
          {auth.sessionType !== 'ANONYMOUS' && <Button color="secondary" onClick={logOut}>Logout</Button>}
					</Toolbar>
			</AppBar>
		</div>)
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    user: state.user,
    auth: state.auth,
    modal: state.modal,
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  ...bindActionCreators(
    {
      ...authInteractors,
      ...userInteractors,
      ...modalInteractors
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
