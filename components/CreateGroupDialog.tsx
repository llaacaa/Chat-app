import React, { useState } from "react";
import { User } from "@/types/context";
import { CheckboxWithText } from "./FriendAddToGroupChat";
import { toast } from "sonner";

interface CreateGroupDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup: (users: User[], groupName: string) => void;
  friends: User[] | [] | undefined;
  membersToFilter: string[]
}

const CreateGroupDialog: React.FC<CreateGroupDialogProps> = ({
  isOpen,
  onClose,
  onCreateGroup,
  friends,
  membersToFilter
}) => {
  const [selectedFriends, setSelectedFriends] = useState<User[]>([]);
  const [groupName, setGroupName] = useState("");

  const handleCreateGroup = () => {
    if (selectedFriends.length === 0) {
      toast.error("Please select at least one friend to add to the group.");
      return;
    }
    onCreateGroup(selectedFriends, groupName);
    onClose();
  };

  const handleOutsideClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleSelectFriend = (friend: User) => {
    setSelectedFriends((friends) =>
      friends.includes(friend)
        ? friends.filter((f) => f._id !== friend._id)
        : [...friends, friend]
    );
  };

  if (!isOpen) return null;

  const displayText = "Add to Group Chat";

  return (
    <div
      className="fixed inset-0  bg-opacity-50 flex justify-center items-center"
      onClick={handleOutsideClick}
    >
      <div className="bg-white rounded-lg p-4 w-96">
        <h2 className="text-lg font-bold mb-2">{displayText}</h2>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Group Name"
          className="w-full p-2 mb-2 border border-gray-400"
        />
        <div className="space-y-2">
          {friends?.filter((friend) => !membersToFilter.includes(friend._id))?.map((friend) => (
            <label key={friend._id} className="flex items-center">
              <CheckboxWithText
                selectedFriends={selectedFriends}
                friend={friend}
                changeFunction={handleSelectFriend}
              />
            </label>
          ))}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCreateGroup}
        >
          {displayText}
        </button>
      </div>
    </div>
  );
};

export default CreateGroupDialog;
