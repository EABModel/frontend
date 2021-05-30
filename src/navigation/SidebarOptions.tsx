import React, { FC } from 'react';
import * as userInteractors from '../redux/interactors/userInteractors';
import * as modalInteractors from '../redux/interactors/modalInteractors';
import { UserState } from '../redux/types/UserTypes';
import { CompanyState } from '../redux/types/CompanyTypes';
import { bindActionCreators } from '@reduxjs/toolkit';
import { RootState } from '../redux/store';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import '../styles/css/layout.scss';

interface StateProps {
  user: UserState;
  company: CompanyState;
}

interface DispatchProps {
  logoutUserInteractor: typeof userInteractors.logoutUserInteractor;
  showPopUpInteractor: typeof modalInteractors.showPopUpInteractor;
}

interface Props extends StateProps, DispatchProps {
  // extra props you want to add
}

const SidebarOptions: FC<Props> = (props: Props) => {
  const { user, company } = props;
  const history = useHistory();
  const goToHomePage = (): void => {
    history.replace('/home');
  };

  const goToAdministrationPortal = (): void => {
    history.replace('/administration');
  };
  return (
    <div className="options">
      {company.id && (
        <Button color="inherit" onClick={goToHomePage}>
          Home
        </Button>
      )}
      {user.sessionType !== 'ANONYMOUS' && (
        <Button color="inherit" onClick={goToAdministrationPortal}>
          Administration
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    user: state.user,
    company: state.company,
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

export default connect(mapStateToProps, mapDispatchToProps)(SidebarOptions);
