import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

interface IPaginationProps {
  value: number;
  onChangePage: (page: number) => void;
}

function Pagination({ value, onChangePage }: IPaginationProps) {
  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={3}
      pageCount={3}
      forcePage={value - 1}
    />
  );
}

export default Pagination;
