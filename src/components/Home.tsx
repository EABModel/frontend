import React, { FC } from 'react';
import { PopUpState } from '../store/types/LogInTypes';
import { Catalog } from './Catalog';
import LogIn from './LogIn';
import { connect } from 'react-redux';


interface StateProps {
  logIn: PopUpState;
}

interface Props extends StateProps {
  // extra props you want to add
}

const Home: FC<Props> = (props: Props) => {
  // const history = useHistory();
  // const goToAboutPage = () => {
  //   history.push('/about');
  // }
  const { logIn } = props;
  return (
    <div>
      {logIn.open && <LogIn/>}
      <Catalog />
    </div>
  );
};

const mapStateToProps = (state: { logIn: PopUpState }): StateProps => {
  return {
    logIn: state.logIn,
  };
};

export default connect(mapStateToProps)(Home);
