import { URL_EMAIL } from "@cbi/services/urlAPI";
import { postApi } from "@cbi/services/api";
import { ContactFormI } from "src/home-page/components/footer/ContactForm";
export const postEmailServices = async (data: { email: string }) => {
  return await postApi(URL_EMAIL, data);
};
