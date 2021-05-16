import React, { FC, useState, useEffect } from 'react';
import { RootState } from '../redux/store';
import { connect } from 'react-redux';
import { CompanyState } from '../redux/types/CompanyTypes';
import CompanyLoginForm from '../components/CompanyLoginComponents/CompanyLoginForm';
import ShopsList from '../components/CompanyLoginComponents/ShopsList';

interface StateProps {
  company: CompanyState;
}

interface Props extends StateProps {}

const CompanyLogin: FC<Props> = (props: Props) => {
  const { company } = props;
  const [showShops, setShowShops] = useState(false);

  useEffect(() => {
    if (company.loginCompanyStatus.success) {
      setShowShops(true);
    }
  }, [company.loginCompanyStatus]);

  return <>{showShops ? <ShopsList shops={company.shops} /> : <CompanyLoginForm />}</>;
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    company: state.company,
  };
};

export default connect(mapStateToProps)(CompanyLogin);
