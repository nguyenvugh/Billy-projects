import { Policy } from "src/authorization/interfaces";
import { UserType } from "../casl/interfaces";
import { getToken } from "../utils/authentication.util";

export type JwtPayloadType = {
  usernameOrEmail: string;
  policies: Policy[];
  userType: UserType;
  iat: number;
  exp: number;
};
/**
 * get payload from token
 * @param token
 * @returns payload in token
 */
export function readJWTPayload(token: string): JwtPayloadType | null {
  if (!token) return null;
  const payloadPosison = 1;
  const rawPayload = window.atob(token.split(".")[payloadPosison]);
  return JSON.parse(rawPayload);
}

/**
 * To get current policies of user
 * @returns {Policy[]}
 */
export function getCurrentPolicies(): {
  policies: Policy[];
  userType: UserType;
} {
  const token = getToken();
  if (!token) {
    return {
      policies: [],
      userType: "CLIENT",
    };
  }

  const payload = readJWTPayload(token);
  return {
    policies: payload ? payload.policies : [],
    userType: payload ? payload.userType : "CLIENT",
  };
}
