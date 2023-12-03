import React, { useEffect, useState } from "react";
import Rows from "../Components/RowMembers";
import PaginationWork from "../Pagination/Pagination";
import { FaTrash } from "react-icons/fa6";
import fetchData from "../Components/ApiCall";

const HomePage = () => {
  const [membersData, setMembersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [postsPerPage] = useState(10);
  const [query, setQuery] = useState("")
  
  useEffect(() => {
    fetchData().then((data) => {
      setMembersData(data)
    });
  }, [currentPage]);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = membersData.slice(indexOfFirstPost, indexOfLastPost);
  const pageHandler = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleMultipleDelete = () => {
    selectedUsers.map((user) => setMembersData((data) => data.map((item) => item.id !== user ? item : "")));
    setSelectedUsers([])
    if (isAllSelected === true) {
        setIsAllSelected(false);
    }
  };

  const handleSearch = () => {
    if (query !== "") {
        const filteredData = membersData.filter((data) => {
            if (data.id.includes(query) || data.name.includes(query) || data.email.includes(query) || data.role.includes(query)) {
                return data;
            }
            else {
                return "";
            }
        })
        setMembersData(filteredData);
    }
    else {
      fetchData();
    }
  }

  if (membersData.length > 0) {
    return (
      <section>
        <div className="flex ms-4 justify-between md:mx-8 my-5 items-center">
          <div className="flex items-center w-full text-xl">
            <input
              type="text"
              className="w-1/2 md:w-1/5 border-2 rounded-lg placeholder-gray-400 text-gray-900"
              placeholder=" Search"
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(e) => e.key === "Enter" ? handleSearch() : ""}
              value={query}
            />
            <button className="bg-white p-4" onClick={() => handleSearch()}>🔍</button>
          </div>
          <div>
            <FaTrash
              size={30}
              className="cursor-pointer"
              onClick={() => handleMultipleDelete()}
            />
          </div>
        </div>
        <Rows
          data={currentPosts}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          isAllSelected={isAllSelected}
          setIsAllSelected={setIsAllSelected}
        />
        <PaginationWork
          onChangepage={pageHandler}
          postsPerPage={postsPerPage}
          totalPosts={membersData.length}
        />
      </section>
    );
  }
};
export default HomePage;
