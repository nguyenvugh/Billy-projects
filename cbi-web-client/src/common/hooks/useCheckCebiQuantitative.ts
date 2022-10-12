import { getIsCanOpenSecretCbi } from "@cbi/services/cbi";
import { useEffect, useState } from "react";
import { getAccessToken } from "../utils";

function useCheckCebiQuantitative(callback?: (isCan: boolean) => void) {
  const [isCanOpenCebiQuan, setCanOpen] = useState(false);
  const accessToken = getAccessToken();

  useEffect(() => {
    if (!accessToken) return;
    (async () => {
      try {
        const response = (await getIsCanOpenSecretCbi()) as any;
        const isCan = response.result ? (response.result === -1 ? false : true) : false;
        setCanOpen(isCan);
        callback && callback(isCan);
      } catch (err) {
        console.log(err);
        console.error(err);
        callback && callback(false);
      }
    })();
  }, [accessToken]);

  return { isCanOpenCebiQuan };
}

export { useCheckCebiQuantitative };
