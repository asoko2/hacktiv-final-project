export const dashboardRoutes = [
  {
    label: "Dashboard",
    href: "/dashboard",
    permissions: ["apps.common"],
    groups: ["atasan", "hrd", "pengesah", "pegawai"],
    icon: "ic:round-dashboard",
  },
  {
    label: "Users",
    href: "/dashboard/users",
    permissions: ["users.manage"],
    icon: "ic:round-people-alt",
    groups: ["hrd"],
    children: [
      {
        label: "Manage Users",
        href: "/dashboard/users",
        groups: ["hrd"],
        permissions: ["users.manage"],
      },
      {
        label: "Manage Hak Akses",
        href: "/dashboard/users/permissions",
        groups: ["hrd"],
        permissions: ["users.manage"],
      },
    ],
  },
  {
    label: "Pengajuan Barang",
    href: "/dashboard/submissions",
    permissions: [
      "submission.input",
      "submission.first-approval",
      "submission.second-approval",
      "submission.authenticator-approval",
      "submission.need-revision",
      "submission.reject",
    ],
    groups: ["atasan", "hrd", "pengesah", "pegawai"],
    icon: "ic:round-shopping-bag",
  },
  {
    label: "Monitor Pengajuan",
    href: "/dashboard/submissions/monitor",
    permissions: [
      "submission.first-approval",
      "submission.second-approval",
      "submission.authenticator-approval",
      "submission.need-revision",
      "submission.reject",
    ],
    groups: ["atasan", "hrd", "pengesah"],
    icon: "ic:round-shopping-bag",
  },
];
