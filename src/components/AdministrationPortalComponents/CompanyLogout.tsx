import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as companyInteractors from '../../redux/interactors/companyInteractors';
import * as shopInteractors from '../../redux/interactors/shopInteractors';
import * as userInteractors from '../../redux/interactors/userInteractors';
import * as catalogInteractors from '../../redux/interactors/catalogInteractors';

interface DispatchProps {
  logoutCompanyInteractor: typeof companyInteractors.logoutCompanyInteractor;
  resetShopInteractor: typeof shopInteractors.resetShopInteractor;
  logoutUserInteractor: typeof userInteractors.logoutUserInteractor;
  resetCatalogInteractor: typeof catalogInteractors.resetCatalogInteractor;
}

interface Props extends DispatchProps {}

const CompanyLogoutButton: FC<Props> = (props: Props) => {
  const history = useHistory();

  const companyLogout = (): void => {
    props.resetShopInteractor();
    props.logoutUserInteractor();
    props.resetCatalogInteractor();
    props.logoutCompanyInteractor();
    history.replace('/');
  };
  return (
    <Button variant="outlined" color="secondary" onClick={companyLogout}>
      Company Logout
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  ...bindActionCreators(
    {
      ...companyInteractors,
      ...shopInteractors,
      ...userInteractors,
      ...catalogInteractors,
    },
    dispatch,
  ),
});

export default connect(null, mapDispatchToProps)(CompanyLogoutButton);
