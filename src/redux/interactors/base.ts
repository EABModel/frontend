/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';

export const buildInteractor =
  (
    loadingAction: ActionCreatorWithoutPayload,
    successAction: ActionCreatorWithPayload<any>,
    errorAction: ActionCreatorWithPayload<any>,
    request: ((args: any) => Promise<any>) | null,
  ) =>
  (params: any) => {
    return async function (dispatch: any) {
      dispatch(loadingAction());
      try {
        // Simulate API call on localhost, remove in production
        setTimeout(async () => {
          const response = await request!(params);
          dispatch(successAction(response));
        }, 1500);
      } catch (error) {
        dispatch(errorAction(error));
      }
    };
  };

export const buildInteractorNoParams =
  (
    loadingAction: ActionCreatorWithoutPayload,
    successAction: ActionCreatorWithPayload<any>,
    errorAction: ActionCreatorWithPayload<any>,
    request: (() => Promise<any>) | null,
  ) =>
  () => {
    return async function (dispatch: any) {
      dispatch(loadingAction());
      try {
        let response: any;
        if (request) {
          response = await request!();
        }
        dispatch(successAction(response));
      } catch (error) {
        dispatch(errorAction(error));
      }
    };
  };
