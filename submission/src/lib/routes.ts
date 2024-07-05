export const dashboardRoutes = [
  {
    label: "Dashboard",
    href: "/dashboard",
    permissions: ["apps.common"],
    groups: ["atasan", "hrd", "pengesah", "pegawai"],
    icon: "tabler:layout-dashboard-filled",
  },
  {
    label: "Users",
    href: "/dashboard/users",
    permissions: ["users.manage"],
    icon: "tabler:user-filled",
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
    icon: "tabler:shopping-cart-filled",
  },
  {
    label: "Approve Pengajuan",
    href: "/dashboard/submissions/monitor",
    permissions: [
      "submission.first-approval",
      "submission.second-approval",
      "submission.authenticator-approval",
      "submission.need-revision",
      "submission.reject",
    ],
    groups: ["atasan", "hrd", "pengesah"],
    icon: "tabler:copy-check-filled",
  },
];
