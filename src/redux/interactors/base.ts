import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from '@reduxjs/toolkit';

export const buildInteractor = (
  loadingAction: ActionCreatorWithoutPayload,
  successAction: ActionCreatorWithPayload<any>,
  errorAction: ActionCreatorWithPayload<any>,
  request: ((args: any) => Promise<any>) | null,
) => (params: any) => {
  return async function (dispatch: any) {
    dispatch(loadingAction());
    try {
      const response = await request!(params);
      dispatch(successAction(response));
    } catch (error) {
      dispatch(errorAction(error));
    }
  };
};

export const buildInteractorNoParams = (
  loadingAction: ActionCreatorWithoutPayload,
  successAction: ActionCreatorWithPayload<any>,
  errorAction: ActionCreatorWithPayload<any>,
  request: (() => Promise<any>) | null,
) => () => {
  return async function (dispatch: any) {
    dispatch(loadingAction());
    try {
      let response: any;
      if (request) {
        response = await request!()
      }
      dispatch(successAction(response));
    } catch (error) {
      dispatch(errorAction(error));
    }
  };
};

// Exceptional case for auth only
export const buildAuthInteractor = (
  loadingAuthAction: ActionCreatorWithoutPayload,
  successAuthAction: ActionCreatorWithPayload<any>,
  errorAuthAction: ActionCreatorWithPayload<any>,
  successUserAction: ActionCreatorWithPayload<any>,
  errorUserAction: ActionCreatorWithPayload<any>,
  request: ((args: any) => Promise<any>) | null,
) => (params: any) => {
  return async function (dispatch: any) {
    dispatch(loadingAuthAction());
    try {
      const response = await request!(params);
      const { sessionType, authToken, refreshToken, username, email, id } = response;
      const authResponse = {
        sessionType,
        authToken,
        refreshToken
      };
      const userResponse = {
        username,
        email,
        userId: id
      };
      dispatch(successAuthAction(authResponse));
      dispatch(successUserAction(userResponse));
    } catch (error) {
      dispatch(errorAuthAction(error));
      dispatch(errorUserAction(error));
    }
  };
};
