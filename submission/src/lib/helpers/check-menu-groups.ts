export function checkMenuGroup(
  groups: string[],
  currentGroup: string
): boolean {
  return groups.some((group) => currentGroup === group);
}
