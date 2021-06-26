import React, { FC, useState, useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RootState } from '../../../redux/store';
import { UserState } from '../../../redux/types/UserTypes';
import * as userInteractors from '../../../redux/interactors/userInteractors';
import SlidingMessage, { MessageType } from '../SlidingMessage';

interface StateProps {
  user: UserState;
}

interface DispatchProps {
  resetLoginUserInteractor: typeof userInteractors.resetLoginUserInteractor;
  resetLogoutUserInteractor: typeof userInteractors.resetLogoutUserInteractor;
}

interface Props extends StateProps, DispatchProps {
  time: number;
  margin: number;
}

const UserError: FC<Props> = (props: Props) => {
  const timeWithMargin = props.time + props.margin;
  const { time, user, resetLoginUserInteractor, resetLogoutUserInteractor } = props;
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (user.loginUserStatus.error) {
      setErrorMessage(String(user.loginUserStatus.error));
      setTimeout(() => {
        resetLoginUserInteractor();
        setErrorMessage('');
      }, timeWithMargin);
    }
  }, [resetLoginUserInteractor, user.loginUserStatus.error, timeWithMargin]);

  useEffect(() => {
    if (user.logoutUserStatus.error) {
      setErrorMessage(String(user.logoutUserStatus.error));
      setTimeout(() => {
        resetLogoutUserInteractor();
        setErrorMessage('');
      }, timeWithMargin);
    }
  }, [resetLogoutUserInteractor, user.logoutUserStatus.error, timeWithMargin]);

  return (
    <>{errorMessage.length > 0 && <SlidingMessage message={errorMessage} type={MessageType.ERROR} time={time} />}</>
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
    },
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(UserError));
