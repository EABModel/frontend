import React, { FC } from 'react';
import { bindActionCreators } from 'redux';
import { RootState } from '../redux/store';
import { PopUpState } from '../redux/types/ModalTypes';
import * as modalInteractors from '../redux/interactors/modalInteractors';
import Catalog from '../components/HomeComponents/Catalog';
import Login from '../components/NavbarComponents/UserLogin';
import { connect } from 'react-redux';

interface StateProps {
  modal: PopUpState;
}

interface DispatchProps {
  closePopUpInteractor: typeof modalInteractors.closePopUpInteractor;
}

interface Props extends StateProps, DispatchProps {
  // extra props you want to add
}

const Home: FC<Props> = (props: Props) => {
  const { modal } = props;
  const closePopUp = (): void => {
    props.closePopUpInteractor();
  };

  return (
    <div>
      <Catalog />
      {modal.open && <Login closePopUp={closePopUp} />}
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    modal: state.modal,
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  ...bindActionCreators(
    {
      ...modalInteractors,
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
