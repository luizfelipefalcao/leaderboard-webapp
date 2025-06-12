import React, { useCallback, useState, useRef, useEffect, JSX, useMemo } from "react";

import { UserService } from "../../../services/User";
import springLogo from "../../assets/spring-logo.svg";

import NewUserForm from "../../components/NewUserForm";
import SortItemsRow from "../../components/SortItemsRow";
import SearchUserRow from "../../components/SearchUserRow";
import UserList from "../../components/UserList";
import SpaceLine from "../../components/SpaceLine";
import AddUserButton from "../../components/AddUserButton";
import Loading from "../../components/Loading";

export type User = { _id?: string; name: string; age: number; points: number; address: string };

function LeaderboadScreen(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState<User>({ name: "", age: 0, points: 0, address: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (showAddForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [showAddForm]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const userList = await UserService.retrieveUsers();
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users", error);
      } finally {
        setTimeout(() => setIsLoading(false), 500);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = useCallback((index: number, id?: string) => {
    const processDeleteUser = async () => {
      try {
        setIsLoading(true);
        if (!id) return;
        await UserService.deleteUser(id);
        setUsers((prev) => prev.filter((_, i) => i !== index));
      } catch (error) {
        console.error("Error deleting user", error);
      } finally {
        setTimeout(() => setIsLoading(false), 500);
      }
    };
    processDeleteUser();
  }, []);

  const handleSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const addLocalUser = () => {
        setUsers((prev) => [...prev, newUser]);
        setNewUser({ name: "", age: 0, points: 0, address: "" });
        setShowAddForm(false);
      };

      const processAddUser = async () => {
        try {
          setIsLoading(true);
          await UserService.addUser(newUser);
          addLocalUser();
        } catch (error) {
          console.error("Error adding user", error);
        } finally {
          setTimeout(() => setIsLoading(false), 500);
        }
      };
      processAddUser();
    },
    [newUser]
  );

  const handleIncrement = useCallback(
    (index: number) => {
      const updatedUsers = [...users].map((user, i) => (i === index ? { ...user, points: user?.points + 1 } : user));
      const sortedUsers = updatedUsers.sort((a, b) => b?.points - a?.points);
      setUsers(sortedUsers);
    },
    [users]
  );

  const handleDecrement = useCallback(
    (index: number) => {
      const updatedUsers = [...users].map((user, i) => (i === index ? { ...user, points: Math.max(0, user?.points - 1) } : user));
      const sortedUsers = updatedUsers.sort((a, b) => b?.points - a?.points);
      setUsers(sortedUsers);
    },
    [users]
  );

  const handleUserClick = useCallback(
    (user: User) => {
      setSelectedUser(selectedUser === user ? null : user);
    },
    [selectedUser]
  );

  const handleSortByName = useCallback(() => {
    const sorted = [...users].sort((a, b) => a?.name.localeCompare(b?.name));
    setUsers(sorted);
  }, [users]);

  const handleSortByPoints = useCallback(() => {
    const sorted = [...users].sort((a, b) => b?.points - a?.points);
    setUsers(sorted);
  }, [users]);

  const renderUserList = useMemo(() => {
    if (!users || users.length === 0) return <div />;

    return (
      <UserList
        onDecrement={handleDecrement}
        onDelete={handleDelete}
        onIncrement={handleIncrement}
        onUserClick={handleUserClick}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        users={users}
        selectedUser={selectedUser}
      />
    );
  }, [handleDecrement, handleDelete, handleIncrement, handleUserClick, searchTerm, selectedUser, users]);

  const renderNewUserForm = useMemo(() => {
    if (!showAddForm || !newUser) return null;

    return <NewUserForm newUser={newUser} onSubmitForm={handleSubmitForm} ref={formRef} setNewUser={setNewUser} />;
  }, [handleSubmitForm, newUser, showAddForm]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 sm:p-0 p-4">
      <div className="bg-white border border-gray-300 rounded-lg w-full max-w-lg shadow-md flex flex-col h-[750px]">
        <div className="w-full max-w-md">
          <div className="px-6 mt-2 -mb-3 flex items-center">
            <img src={springLogo} alt="Spring Logo" className="h-14 sm:h-20 w-14 sm:w-20 mr-2" />
          </div>
        </div>

        <SortItemsRow sortByName={handleSortByName} sortByPoints={handleSortByPoints} />
        <SearchUserRow searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <SpaceLine />

        <div className="overflow-y-auto flex-1 p-6 h-90vh max-h-[calc(100vh-200px)]">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="space-y-3">
              {renderUserList}
              {renderNewUserForm}
            </div>
          )}
        </div>
        <SpaceLine />

        <AddUserButton setShowAddForm={() => setShowAddForm((prev) => !prev)} showAddForm={showAddForm} />
      </div>
    </div>
  );
}

export default LeaderboadScreen;
