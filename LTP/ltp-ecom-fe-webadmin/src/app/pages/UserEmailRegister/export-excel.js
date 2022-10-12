import PrimaryButton from "app/components/Button/PrimaryButton";
import { ACTION_TYPE } from "app/reducers/email";
import { PAGE_SIZE_UNLIMIT } from "app/utils/constant";
import { formatDateTime } from "app/utils/validate";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import ReactExport from "react-data-export";
import { CircularProgress } from "@material-ui/core";
import { FiDownload } from "react-icons/fi";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function ExportExcel() {
  const refButton = useRef();
  const dispatch = useDispatch();
  const [emailList, setEmailList] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (emailList) {
      refButton?.current?.click();
    }
  }, [emailList])

  const exportExcel = () => {
    setLoading(true);
    dispatch({
      type: ACTION_TYPE.GET_EMAIL_LIST_REQUEST,
      params: {
        limit: PAGE_SIZE_UNLIMIT, page: 1, q: "",
      },
      success: (response) => {
        let emailList = response?.data?.results;
        if (Array.isArray(emailList)) {
          setEmailList(emailList);
        } else {
          setEmailList([]);
        }
        setLoading(false);
      }
    });
  }



  if (!emailList) {
    return (
      <PrimaryButton
        startIcon={loading ? <CircularProgress size={20} color="#ffffff" thickness={7} /> : <FiDownload />}
        onClick={exportExcel}
      >
        Xuất file excel
      </PrimaryButton>
    )
  }

  return (
    <ExcelFile
      element={
        <PrimaryButton ref={refButton} startIcon={<FiDownload />}>
          Xuất file excel
        </PrimaryButton>
      }
    >
      <ExcelSheet data={emailList} name="Employees">
        <ExcelColumn label="Email" value="email" />
        <ExcelColumn label="Thời gian đăng ký" value={(col) => formatDateTime(col?.created_at)} />
      </ExcelSheet>
    </ExcelFile>
  );
}