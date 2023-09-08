import client from "./client";

export const uploadTrailer = async (formData) => {
  const token = localStorage.getItem("auth_token");
  try {
    const { data } = await client.post("/movie/upload-trailer", formData, {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    console.log(data);
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;
    return { error: error.message || error };
  }
};
