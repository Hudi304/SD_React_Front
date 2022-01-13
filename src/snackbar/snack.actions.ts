import { MyAction } from '../redux';
import { SNACK_ACTIONS } from "./snack.types";

export namespace SnackActions {
    export const showSnack = (data): MyAction<any> => ({
      type: SNACK_ACTIONS.SHOW_SNACK,
      payload: data
    });

    export const hideSnack = (data): MyAction<any> => ({
      type: SNACK_ACTIONS.HIDE_SNACK,
      payload: data
    });
}
