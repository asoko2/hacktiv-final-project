import { useAuth } from "@/components/auth-provider";
import MenuItem from "@/components/layout/menu-item";
import { checkMenuGroup } from "@/lib/helpers/check-menu-groups";
import { checkMenuPermission } from "@/lib/helpers/check-menu-permission";
import { dashboardRoutes } from "@/lib/routes";

export default function Sidebar() {
  const { currentGroup } = useAuth();

  const filteredRoutes = dashboardRoutes.filter((item) => {
    if (item.groups.length === 0) {
      return true;
    }

    return checkMenuGroup(item.groups, currentGroup);
  });

  return (
    <aside className="fixed w-64 flex-1 flex-col overflow-y-auto hide-scrollbar h-full bg-primary-900 text-white shadow-sm border-r-2">
      <div className="w-full h-16 flex items-center justify-center">
        <h1 className="text-xl font-semibold">SIJUANG</h1>
      </div>
      <div className="flex-1 flex flex-col gap-2 px-4 pt-2">
        {filteredRoutes.map((route, index) => (
          <MenuItem key={index} {...route} currentGroup={currentGroup} />
        ))}
      </div>
    </aside>
  );
}
