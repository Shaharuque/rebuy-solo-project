import axios, { AxiosResponse } from "axios";

export const ItemDetailsGenerate = async (title: string, category: string): Promise<string | undefined> => {
  try {
    const options = {
      method: "POST",
      url: "https://open-ai21.p.rapidapi.com/askaicoder",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "a605c3b6e0msh8adf98d26426a8fp159e43jsn988dae0f91ed",
        "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
      },
      data: {
        message: `can you describe ${title} ${category} for selling don't excced 100 words.`,
      },
    };

    try {
      const response: AxiosResponse = await axios.request(options);
      const result: string | undefined = response?.data?.RESULT;
      //   console.log(result);
      return result 
    } catch (error) {
      console.error(error);
    }
  } catch (err) {
    console.log(err);
    throw err; // Rethrow the error if needed
  }
};
