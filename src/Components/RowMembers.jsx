import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

const Rows = ({data, selectedUsers, setSelectedUsers,isAllSelected, setIsAllSelected}) => {
  
  const [users, setUsers] = useState(data);
  const [editedValues, setEditedValues] = useState({
    id: 0,
    name: "",
    email: "",
    role: "",
  });

  useEffect (() => {
    setUsers(data.filter((item) => item !== ""))
  },[data])

  const selectAll = () => {
    setSelectedUsers([]);

    if (!isAllSelected) {
      users.forEach((user) => {
        setSelectedUsers((prevSelectedUsers) => [
          ...prevSelectedUsers,
          user.id,
        ]);
      });
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleUserSelect = (user) => {
    if (selectedUsers.includes(user.id)) {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((id) => id !== user.id)
      );
    } else {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user.id]);
    }
  };

  const isUserSelected = (user) => {
    return selectedUsers.includes(user.id);
  };

  const handleEdit = () => {
    if (editedValues.name !== "") {
        setUsers((users) => users.map((user) =>
        user.id === editedValues.id ? { ...user, name: editedValues.name } : user
      ))
    }
    if (editedValues.email !== "") {
        setUsers((users) => users.map((user) =>
        user.id === editedValues.id ? { ...user, email: editedValues.email } : user
      ));
    }
    if (editedValues.role !== "") {
        setUsers((users) => users.map((user) =>
        user.id === editedValues.id ? { ...user, role: editedValues.role } : user
      ));
    }
    setEditedValues({
        ...editedValues,
        id: 0,
      })
  };

  const handleDelete = (userId) => {
    setUsers((users) => users.filter((user) =>
        user.id !== userId
    )
    )
  }

  if (users) {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={selectAll}
                />
              </th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={isUserSelected(user)}
                    onChange={() => handleUserSelect(user)}
                  />
                </td>
                <td>{user.id}</td>
                <td
                  contentEditable={
                    editedValues.id === user.id ? `true` : `false`
                  }
                  onInput={(e) =>
                    setEditedValues({
                      ...editedValues,
                      name: e.target.textContent,
                    })
                  }
                >
                  {user.name}
                </td>
                <td
                  contentEditable={
                    editedValues.id === user.id ? `true` : `false`
                  }
                  onInput={(e) =>
                    setEditedValues({
                      ...editedValues,
                      email: e.target.textContent,
                    })
                  }
                >
                  {user.email}
                </td>
                <td
                  contentEditable={
                    editedValues.id === user.id ? `true` : `false`
                  }
                  onInput={(e) =>
                    setEditedValues({
                      ...editedValues,
                      role: e.target.textContent,
                    })
                  }
                >
                  {user.role}
                </td>
                <td className="flex flex-col items-center md:flex-row gap-2">
                  {editedValues.id === user.id ? (
                    <FaCheck
                      size={30}
                      className="save cursor-pointer"
                      onClick={() => handleEdit()}
                    />
                  ) : (
                    <FaPen
                      size={30}
                      className="edit cursor-pointer"
                      onClick={() => setEditedValues({
                        ...editedValues,
                        id: user.id,
                      })}
                    />
                  )}
                  <FaTrash size={30} className="delete cursor-pointer" onClick={() => handleDelete(user.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default Rows;
