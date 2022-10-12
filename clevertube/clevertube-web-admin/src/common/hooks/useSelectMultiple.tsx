// import jwtDecode, { JwtPayload } from "jwt-decode";
import { useState } from "react";

export function useSelectMultiple<T>(
  listIdInCurrentPage: T[],
  currentPage = 1,
  initialSelected?: T[]
) {
  const [checkedByPage, setCheckedByPage] = useState({ 1: false });
  const [selectedIds, setSelectedIds] = useState<T[]>(initialSelected || []);

  function handleSelectItem(selectedId: T, isChecked: boolean) {
    if (isChecked) {
      const newestIds = [...selectedIds, selectedId];
      setSelectedIds(newestIds);
      const isCheckedAll = listIdInCurrentPage.every((id) => newestIds.includes(id));
      currentPage && handleSetCheckAllByPage(currentPage, isCheckedAll);
    } else {
      setSelectedIds(selectedIds.filter((id) => id !== selectedId));
      currentPage && handleSetCheckAllByPage(currentPage, false);
    }
  }

  function handleCheckAll(isChecked: boolean) {
    currentPage && handleSetCheckAllByPage(currentPage, isChecked);
    if (isChecked) {
      const newUniqueId = [
        // @ts-ignore
        ...new Set([...selectedIds, ...listIdInCurrentPage]),
      ];
      setSelectedIds(newUniqueId);
    } else {
      const newUniqueId = selectedIds.filter((id) => !listIdInCurrentPage.includes(id));
      setSelectedIds(newUniqueId);
    }
  }

  function handleSetCheckAllByPage(page: number, isChecked: boolean) {
    setCheckedByPage({ ...checkedByPage, [page]: isChecked });
  }

  function reset() {
    setCheckedByPage({ 1: false });
    setSelectedIds([]);
  }

  return {
    checkedByPage,
    // @ts-ignore
    isCheckedAll: checkedByPage[currentPage || 1],
    selectedIds,
    handleSelectItem,
    handleCheckAll,
    setSelectedIds,
    handleSetCheckAllByPage,
    reset,
  };
}