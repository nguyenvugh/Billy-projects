import { List, Params } from "src/common/interfaces/common.interface";
import { toUrlQueryString } from "src/common/lib/common.lib";
import { execute } from "src/common/lib/request";
import { EMAILS } from "src/common/services/urlAPI";
import { Emails } from "./emails.interface";

export async function getAllEmailsService(emailsParams?: Params) {
  return execute.get<List<Emails>>(toUrlQueryString(EMAILS, emailsParams));
}

export async function deleteEmailsService(listId: number[]) {
  const ids = listId.join(",");
  return execute.delete(toUrlQueryString(EMAILS, { ids }));
}
