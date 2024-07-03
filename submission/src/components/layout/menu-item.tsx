"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { checkMenuPermission } from "@/lib/helpers/check-menu-permission";
import { checkMenuGroup } from "@/lib/helpers/check-menu-groups";

export type MenuItemProps = {
  label: string;
  href: string;
  groups: string[];
  icon?: string;
  children?: MenuItemProps[];
  currentGroup?: string;
};

export default function MenuItem({
  label,
  href,
  groups,
  icon,
  children,
  currentGroup,
}: MenuItemProps) {
  const pathname = usePathname();

  const isActive =
    href &&
    (pathname === href ||
      children?.some((child) => pathname.startsWith(child.href!)));

  const checkPermissions = () => {
    return checkMenuGroup(groups, currentGroup!);
  };

  return (
    <section>
      {checkPermissions() ? (
        <div>
          {href && !children ? (
            <Link href={href}>
              <div
                className={`flex text-sm flex-grow gap-4 items-center px-4 py-2 hover:no-underline hover:bg-primary-500 hover:text-slate-300 transition-all rounded ${
                  isActive ? "bg-primary-500" : ""
                }`}
              >
                <Icon icon={icon!} className="h-4 w-4" />
                {label}
              </div>
            </Link>
          ) : (
            <Accordion type="single" collapsible className="text-white">
              <AccordionItem
                value="item-1"
                className="border-b-0 text-white no-underline"
              >
                <AccordionTrigger
                  className={`flex flex-grow gap-4 hover:no-underline hover:bg-primary-500 rounded items-center px-4 py-2 text-white justify-between hover:text-slate-300 ${
                    isActive ? "bg-primary-500" : ""
                  }`}
                >
                  <div className="flex gap-4">
                    <Icon icon={icon!} className="h-4 w-4" />
                    {label}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-0">
                  {children && (
                    <div className="ml-4 flex flex-col gap-2">
                      {children.map((child, index) => {
                        return (
                          <MenuItem
                            key={index}
                            {...child}
                            currentGroup={currentGroup}
                          />
                        );
                      })}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </div>
      ) : null}
    </section>
  );
}
