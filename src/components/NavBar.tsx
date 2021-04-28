import React, { FC } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../store/store';
import { UserState } from '../store/types/UserTypes';
import { PopUpState } from '../store/types/LogInTypes';
import * as userInteractors from '../store/interactors/UserInteractor';
import * as logInInteractors from '../store/interactors/LogInInteractor';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

interface StateProps {
  user: UserState;
  logIn: PopUpState;
}

interface DispatchProps {
  fetchUserInteractor: typeof userInteractors.fetchUserInteractor;
  logoutUserInteractor: typeof userInteractors.logoutUserInteractor;
  showPopUpInteractor: typeof logInInteractors.showPopUpInteractor;
}

interface Props extends StateProps, DispatchProps {
  // extra props you want to add
}

const NavBar: FC<Props> = (props: Props) => {
	const { user } = props;
	const classes = useStyles();

  const openPopUp = () => {
    props.showPopUpInteractor();
  }

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						{user.sessionType === 'ANONYMOUS' ? `Hello Dear Customer!` : `Hello ${user.username}!`}
					</Typography>
					<Button color="inherit" onClick={openPopUp}>Login</Button>
					</Toolbar>
			</AppBar>
		</div>)
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    user: state.user,
    logIn: state.logIn,
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  ...bindActionCreators(
    {
      ...userInteractors,
      ...logInInteractors,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);