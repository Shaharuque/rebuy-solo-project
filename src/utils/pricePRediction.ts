import axios, { AxiosResponse } from "axios";

export const pricePrediction = async (title: string, category: string): Promise<string | undefined> => {
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
        message: `can you tell the the price of ${title} ${category} in dollar on eBay`,
      },
    };

    try {
      const response: AxiosResponse = await axios.request(options);
      const result: string | undefined = response?.data?.RESULT;
      //   console.log(result);
      return result || 'The price is around\n25−150';
    } catch (error) {
      console.error(error);
    }
  } catch (err) {
    console.log(err);
    throw err; // Rethrow the error if needed
  }
};
