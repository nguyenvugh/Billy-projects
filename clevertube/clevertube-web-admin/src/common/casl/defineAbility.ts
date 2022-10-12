import { AppAbility, UserType } from "./interfaces";
import { ability } from "./Abilities";
import { Ability, AbilityBuilder } from "@casl/ability";
import { Policy } from "src/authorization/interfaces";

export function updateAbility(
  abilities: typeof ability,
  policies: Policy[],
  userType: UserType
) {
  const { can, rules } = new AbilityBuilder<AppAbility>(Ability);
  if (userType === "SUPER_ADMIN") {
    can("manage", "admin");
  } else if (userType === "ADMIN") {
    policies.forEach((policy) => {
      can(policy.action, policy.resource);
    });
  }
  abilities.update(rules);
}
