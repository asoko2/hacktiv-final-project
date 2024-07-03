export type User = {
  id: string;
  name: string;
  nip: string;
  username: string;
  email: string;
};

export const userGroups = ["hrd", "pengesah", "atasan", "pegawai"];

export type UserWithGroups = User & {
  groups: string[];
};

export const UserWithGroupsCollection = "users-with-groups";

export type Submission = {
  id: string;
  name: string;
  total_qty: number;
  total_price: number;
  total_item: number;
  status: string;
  year: number;
};

export type SubmissionItem = {
  id?: any;
  [itemName: string]: any;
  price?: any;
  qty?: any;
  total?: any;
};
