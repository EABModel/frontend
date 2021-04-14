import React, { FC } from 'react';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { UserState } from '../store/types/UserTypes';


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

export const NavBar: FC = () => {
	// A way of doing it in case the state is an object
	// const { sessionType } = useSelector<UserState, UserState['user']>((state) => state.user);
	const user = useSelector<UserState, UserState['user']>((state) => state.user);
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						{user.sessionType === 'ANONYMOUS' ? `Hello Dear ${user.username}` : `Hello ${user.username}`}
					</Typography>
					<Button color="inherit">Login</Button>
					</Toolbar>
			</AppBar>
		</div>)
};
