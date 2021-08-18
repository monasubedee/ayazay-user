import api from "../../constants/api";
import { GET_CAMPAIGN, GET_CAMPAIGN_ERROR } from "./type";

export const getHomePage = () => async (dispatch) => {
  const response = await api.get("/campaign");
  console.log("YOOO");
  try {
    dispatch({
      type: GET_CAMPAIGN,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_CAMPAIGN_ERROR,
      payload: error,
    });
  }
};
