import React, { FC, useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { ReassignUserFields, UserState } from '../../redux/types/UserTypes';
import ReassignShop from './ReassignShop';
import * as userInteractors from '../../redux/interactors/userInteractors';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { ShopBackendState } from '../../redux/types/CompanyTypes';
import * as companyInteractors from '../../redux/interactors/companyInteractors';

interface StateProps {
  user: UserState;
}

interface DispatchProps {
  deleteUserInteractor: typeof userInteractors.deleteUserInteractor;
  removeCompanyUserInteractor: typeof companyInteractors.removeCompanyUserInteractor;
}

interface Props extends StateProps, DispatchProps {
  data: UserState;
  shops: ShopBackendState[];
}

const CompanyUserRow: FC<Props> = (props: Props) => {
  const { user, data, shops, deleteUserInteractor, removeCompanyUserInteractor } = props;
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    if (user.deleteUserStatus.success && deleted) {
      removeCompanyUserInteractor(data.id);
    }
  }, [user.deleteUserStatus.success]);

  const handleDelete = (userId: string) => {
    deleteUserInteractor(userId);
    setDeleted(true);
  };

  const reassignSection = (sessionType: string, defaultId: string, userId: string) => {
    if (sessionType === 'ADMINISTRATOR') {
      return;
    } else {
      return <ReassignShop shops={shops} defaultId={defaultId} userId={userId} />;
    }
  };

  return (
    <TableRow key={data.username}>
      <TableCell component="th" scope="row">
        {data.username}
      </TableCell>
      <TableCell align="right">{data.sessionType}</TableCell>
      <TableCell align="center">{reassignSection(data.sessionType, data.shopId, data.id)}</TableCell>
      <TableCell align="left">
        <Button variant="contained" color="secondary" onClick={() => handleDelete(data.id)}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
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
      ...companyInteractors,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyUserRow);
