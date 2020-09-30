import { Dispatch } from "redux";
import { HEX_SELECTED } from "../reducer/boardReducer";

export default (dispatch: Dispatch) => ({
    selectHex: (hex: any) => {
        dispatch({
            type: HEX_SELECTED,
            payload: hex
        });
    }
})