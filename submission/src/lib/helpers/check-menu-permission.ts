export function checkMenuPermission(
  permissions: string[],
  currentPermissions: string[]
): boolean {

  return permissions.some((permission) =>
    currentPermissions.some(
      (currentPermission) => currentPermission === permission
    )
  );
}
