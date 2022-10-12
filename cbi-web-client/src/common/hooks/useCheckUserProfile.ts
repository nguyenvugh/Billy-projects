import React, { useEffect, useState } from "react";
import { ResponseUserInforI } from "src/ClimateAccount/interface";
import { UserInfoDefault } from "src/ClimateAccount/constants";
import { getProfile } from "@cbi/services/profile";
import { getAccessToken } from "../utils";

function useCheckUserProfile(callback?: (isCan: boolean) => void) {
  const [isCompletedProfile, setCompletedProfile] = useState(false);
  const [userProfile, setUserProfile] = useState<ResponseUserInforI>(UserInfoDefault);
  const token = getAccessToken();

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const user = await getProfile();
        const { avatar, birthday, email, fullName, phoneNumber, userCompany } = user;

        const isCompleteProfile =
          !!avatar && !!birthday && !!email && !!fullName && !!phoneNumber && !!userCompany;

        callback && callback(isCompleteProfile);
        setCompletedProfile(isCompleteProfile);
        setUserProfile(user);
      } catch (error) {
        callback && callback(false);
      }
    })();
  }, [token]);

  return { isCompletedProfile, userProfile };
}

export { useCheckUserProfile };
