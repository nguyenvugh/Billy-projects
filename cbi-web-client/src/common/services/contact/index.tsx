import { URL_CONTACT } from "@cbi/services/urlAPI";
import { postApi } from "@cbi/services/api";
import { ContactFormI } from "src/home-page/components/footer/ContactForm";
export const postConactServices = async (data: ContactFormI) => {
  return await postApi(URL_CONTACT, data);
};
