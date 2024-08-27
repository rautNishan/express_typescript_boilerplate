export function returnAdminApiDocs(): string[] {
  const adminDocApis = [
    "./src/routes/admin/admin.user.route.ts",
    "./src/modules/users/docs/admin/admin.user.doc.ts",
  ];
  return adminDocApis;
}
