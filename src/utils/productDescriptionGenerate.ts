import axios, { AxiosResponse } from "axios";

export const descriptionGenerator = async (
  title: string|undefined,
  category: string|undefined,
//   brand: string|undefined,
//   model: string|undefined,
): Promise<string | undefined> => {

  try {
    const options = {
      method: "POST",
      url: "http://localhost:9100/openai/text",
      headers: {},
      data: {
        prompt: `generate ${category} ${category} item description`,
        model: "text-davinci-003",
      },
    };

    try {
      const response: AxiosResponse = await axios.request(options);
      const result: string | undefined = response?.data;
      console.log(result);
      return result?.replace(/\n\n/g, '');
    } catch (error) {
      console.error(error);
    }
  } catch (err) {
    console.log(err);
    throw err; // Rethrow the error if needed
  }
};
