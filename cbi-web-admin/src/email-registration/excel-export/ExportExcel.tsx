import React, { useRef, useState } from "react";
import { Button } from "@chakra-ui/react";
import { CSVLink } from "react-csv";
import { Emails } from "../emails.interface";
import { getAllEmailsService } from "../emails.services";
import { DATE_TIME_FORMAT } from "src/common/constants/common.constant";
import dayjs from "dayjs";

type ExportExcelProps = {
  data: Emails[];
  ml?: string;
  isDisabled: boolean;
};

const HEADER = [
  {
    label: "Email",
    key: "email",
  },
  {
    label: "Date Created",
    key: "createdAt",
  },
];

const ExportExcel = ({ ml, isDisabled }: ExportExcelProps) => {
  const [emails, setEmails] = useState<Emails[]>([]);
  const [isGettingAllEmail, setIsGettingAllEmail] = useState(false);
  const csvRef = useRef();

  async function handleGetAllEmails() {
    setIsGettingAllEmail(true);
    const res = await getAllEmailsService();
    const emailMapper = (res.data.results || []).map((email) => ({
      ...email,
      createdAt: dayjs(email.createdAt).format(DATE_TIME_FORMAT),
    }));
    setEmails(emailMapper);
    setIsGettingAllEmail(false);
    // @ts-ignore
    csvRef.current.link.click();
  }
  return (
    <>
      <Button
        ml={ml}
        disabled={isDisabled}
        onClick={handleGetAllEmails}
        isLoading={isGettingAllEmail}
        loadingText="Đang lấy dữ liệu..."
      >
        Xuất file (Excel)
      </Button>
      <CSVLink
        data={emails}
        ref={csvRef}
        filename="Users-Emails"
        target="_blank"
        headers={HEADER}
        separator=";"
      />
    </>
  );
};
export { ExportExcel };
