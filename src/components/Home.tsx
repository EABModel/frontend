import React, { FC } from 'react';
import { bindActionCreators } from 'redux';
import { RootState } from '../redux/store';
import { PopUpState } from '../redux/types/ModalTypes';
import * as modalInteractors from '../redux/interactors/modalInteractor';
import { Catalog } from './Catalog';
import LogIn from './LogIn';
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
  const closePopUp = () => {
    props.closePopUpInteractor();
  }

  return (
    <div>
      <Catalog />
      {modal.open && <LogIn closePopUp={closePopUp} />}
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
