"use client";
import { saveGroup } from "@/api/authorization";
import { useAuth } from "@/components/auth-provider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { forwardRef, useRef, useState } from "react";

const SwitchGroupComponent = () => {
  const { currentSession, currentGroup, switchGroup, currentPermissions } =
    useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hasOpenDialog, setOpenDialog] = useState(false);
  const dropdownTriggerRef = useRef(null);
  const focusRef = useRef(null);

  const onChangeGroup = (group: string) => {
    switchGroup(group);
    saveGroup(group);
  };

  if (!currentSession) {
    return <div>Loading...</div>;
  }

  const handleDialogItemSelect = () => {
    focusRef.current = dropdownTriggerRef.current;
  };

  const handleDialogItemOpenChange = (open: boolean) => {
    setOpenDialog(open);
    if (open === false) {
      setDropdownOpen(false);
    }
  };

  return (
    <Select
      value={currentGroup}
      onValueChange={(value) => onChangeGroup(value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Group" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(currentSession.groups).map((group: any, index: number) => (
          <SelectItem value={group} key={index}>
            {group === "hrd"
              ? "HRD"
              : group === "pegawai"
              ? "Pegawai"
              : group === "pengesah"
              ? "Pengesah"
              : "Atasan"}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SwitchGroupComponent;

const DialogItem = forwardRef((props: any, forwardedRef) => {
  const { triggerChildren, children, onSelect, onOpenChange, ...itemProps } =
    props;

  return (
    <AlertDialog onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <SelectItem {...itemProps}>{triggerChildren}</SelectItem>
      </AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogContent>
          {children}
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSelect}>Select</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
});
