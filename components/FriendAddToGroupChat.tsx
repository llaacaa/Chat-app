"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/types/context";

export function CheckboxWithText({
  friend,
  changeFunction,
  selectedFriends,
}: {
  friend: User;
  changeFunction: (friend: User) => void;
  selectedFriends: User[];
}) {
  return (
    <div className="items-top flex space-x-2">
      <Checkbox
        id={`${friend._id}`}
        checked={selectedFriends.includes(friend)}
        onCheckedChange={() => changeFunction(friend)}
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={`${friend._id}`}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
            {friend.username}
        </label>
        <p className="text-sm text-muted-foreground">
            {friend.email}
        </p>
      </div>
    </div>
  );
}
