import axios from "axios";
export const refreshToken = async () => {
  try {
    const response = await axios.post(
      "https://account.kafryuba.com/connect/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        client_id: "Pipebricks_App",
        scope: "offline_access email Pipebricks",
        refresh_token: localStorage.getItem("token") || "",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.data && response.data.access_token) {
      return response.data.access_token;
    } else {
      return null;
    }
  } catch (err: any) {
    console.log(err);
  } finally {
  }
};
