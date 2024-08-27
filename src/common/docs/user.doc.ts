export function returnUserApiDocs(): string[] {
  const userDocApis = [
    "./src/routes/user/user.route.ts",
    "./src/modules/auth/docs/auth.user.doc.ts",
    "./src/modules/users/docs/user/user.doc.ts",
  ];
  return userDocApis;
}
