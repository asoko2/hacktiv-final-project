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
  invoice_dir: string;
  reason_need_revision?: string;
  need_revision_user_id?: string;
  reason_rejected?: string;
  rejected_user_id?: string;
  status_code?: string;
  status_name?: string;
  request_user_name?: string;
  atasan_name?: string;
  hrd_name?: string;
  authenticator_name?: string;
  need_revision_name?: string;
  rejector_name?: string;
};

export type SubmissionItem = {
  id?: any;
  [itemName: string | symbol]: any;
  price?: any;
  qty?: any;
  total?: any;
};
