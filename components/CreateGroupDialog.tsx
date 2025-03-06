import React, {useState} from 'react';
import {User} from "@/types/context";

interface CreateGroupDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateGroup: (groupName: string) => void;
    friends: User[] | [] | undefined;
}

const CreateGroupDialog: React.FC<CreateGroupDialogProps> = ({
                                                                 isOpen, onClose, onCreateGroup, friends
                                                             }) => {
    const [selectedFriends, setSelectedFriends] = useState<User[]>([]);
    const [groupName, setGroupName] = useState('');

    const handleCreateGroup = () => {
        onCreateGroup(groupName);
        onClose();
    };

    const handleOutsideClick = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const handleSelectFriend = (friend: User) => {
        setSelectedFriends(friends => friends.includes(friend) ?
            friends.filter(f => f._id !== friend._id) :
            [...friends, friend]);
    };

    if (!isOpen) return null;

    return (<div
        className="fixed inset-0  bg-opacity-50 flex justify-center items-center"
        onClick={handleOutsideClick}
    >
        <div className="bg-white rounded-lg p-4 w-96">
            <h2 className="text-lg font-bold mb-2">Create a Group</h2>
            <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Group Name"
                className="w-full p-2 mb-2 border border-gray-400"
            />
            <div className="space-y-2">
                {friends?.map(friend => (
                    <label key={friend._id} className="flex items-center">
                        <input
                            type="checkbox"
                            checked={selectedFriends.includes(friend)}
                            onChange={() => handleSelectFriend(friend)}
                            className="mr-2"
                        />
                        <span className="text-sm">{friend.username}</span>
                    </label>
                ))}
            </div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleCreateGroup}
            >
                Create Group
            </button>
        </div>
    </div>);
};

export default CreateGroupDialog;