import { useState } from "react";
import Pagination from "react-js-pagination";

const PaginationWork = (props) => {
const [currentPage, setCurrentPage] = useState(1);

const recordPerPage = props.postsPerPage;

const totalRecords = props.totalPosts;

const pageRange = 3;

const handlePageChange = (pageNumber) => {
setCurrentPage(pageNumber);
props.onChangepage(pageNumber);
window.scrollTo(0, 0);
};

return (
<div className='page-pagination'>
<Pagination
activePage={currentPage}
itemsCountPerPage={recordPerPage}
totalItemsCount={totalRecords}
pageRangeDisplayed={pageRange}
itemClassFirst="first-page"
itemClassPrev="previous-page"
itemClassNext="next-page"
itemClassLast="last-page"
onChange={handlePageChange}
innerClass="pagination-style"
itemClass="pagination-contents"
/>
</div>
);
}

export default PaginationWork;