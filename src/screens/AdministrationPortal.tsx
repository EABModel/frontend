import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../redux/store';
import { UserState } from '../redux/types/UserTypes';
import { Typography } from '@material-ui/core';
import UseStyles from '../styles/AdministrationPortalStyles';
import MenuSection from '../components/AdministrationPortalComponents/MenuSection';
import CompanyLogout from '../components/AdministrationPortalComponents/CompanyLogout';

interface StateProps {
  user: UserState;
}

interface Props extends StateProps {
  // extra props you want to add
}

const AdministrationPortal: FC<Props> = (props: Props) => {
  const history = useHistory();
  const styles = UseStyles();
  const { user } = props;

  const goToCallsMenu = (): void => {
    history.push('/administration/calls');
  };

  const goToCatalogueMenu = (): void => {
    history.push('/administration/catalogue');
  };

  const goToStoreMenu = (): void => {
    history.push('/administration/shop');
  };

  const goToEmployeesMenu = (): void => {
    history.push('/administration/employees');
  };

  return (
    <div>
      <Typography variant="h2" color="textSecondary">
        Administration Portal
      </Typography>
      <div className={styles.mainContainer}>
        <MenuSection
          title={'Video Calls'}
          body={'Menu for managing video calls from current store.'}
          callback={goToCallsMenu}
        />
        <MenuSection
          title={'Catalogue'}
          body={'Menu for adding, removing or updating products from the main catalogue.'}
          callback={goToCatalogueMenu}
        />
        <MenuSection
          title={'Shop'}
          body={'Menu for updating shops, their location, policies and other specifications.'}
          callback={goToStoreMenu}
        />
        {user.sessionType === 'ADMINISTRATOR' && (
          <MenuSection
            title={"Employee's"}
            body={"Menu for updating employee's status and for managing store employees."}
            callback={goToEmployeesMenu}
          />
        )}
        <CompanyLogout />
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(AdministrationPortal);
