import { ClassConstructor } from "class-transformer";

export function containsKey(
  typeArgument: ClassConstructor<any>,
  toBeCheckArgument: Record<string, any>
): Boolean {
  let hasAMatch: boolean[] = [];
  const actualKeys: string[] = [];
  const incomingKeys: string[] = [];

  for (let key of Object.keys(typeArgument)) {
    actualKeys.push(key);
  }

  for (let key of Object.keys(toBeCheckArgument)) {
    incomingKeys.push(key);
  }

  if (actualKeys.length < incomingKeys.length) {
    return false;
  }

  for (let i = 0; i < incomingKeys.length; i++) {
    for (let j = 0; j < actualKeys.length; j++) {
      if (incomingKeys[i] === actualKeys[j]) {
        hasAMatch[i] = true;
        break;
      }
      if (hasAMatch[i] != true) {
        hasAMatch[i] = false;
      }
    }
  }

  //Check if the keys are valid or not
  for (let i = 0; i < hasAMatch.length; i++) {
    if (hasAMatch[i] === false) {
      return false;
    }
  }
  return true;
}
