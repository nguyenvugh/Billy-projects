import { Box, Button, useBoolean } from "@chakra-ui/react";
import ClearContent from "@ltp/components/ClearContent";
import TitlePanel from "@ltp/components/TitlePanel";
import useTranslation from "@ltp/hooks/useTranslation";
import React, { useRef, useState } from "react";

function DescDetail({ description, isHiddenTitle, boxStyle }) {
  const { t } = useTranslation();
  const [flag, setFlag] = useBoolean();
  const refDivElement = useRef(null);
  const [isHiddenShow, setSize] = useState(false);

  React.useEffect(() => {
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, [refDivElement.current]);
  const handler = () => {
    if (refDivElement.current) {
      if (refDivElement.current.clientHeight >= 123) {
        setSize(true);
      }
    }
  };
  setTimeout(() => {
    handler();
  }, 400);

  return (
    <Box>
      {!isHiddenTitle && <TitlePanel title={t("detailDescription")} />}
      <Box
        padding={{
          base: "20px 16px 25px",
          md: "15px 16px 30px",
          lg: "15px 20px 30px",
        }}
        bg="#F9FBFC"
        marginTop="20px"
        {...boxStyle}
      >
        <Box height={!flag ? "123px" : "auto"} overflowY="hidden">
          {description && (
            <Box ref={refDivElement}>
              <ClearContent content={description} />
            </Box>
          )}
        </Box>
        {isHiddenShow && (
          <Box textAlign="center">
            <Button
              borderRadius="4px"
              border="1px solid #718096"
              background="#ffff"
              padding="8px 45px"
              height="auto"
              color="#718096"
              marginTop="16px"
              fontSize={{ base: "14px", md: "15px", lg: "16px" }}
              onClick={() => {
                setFlag.toggle();
              }}
            >
              {!flag ? t("viewMore") : t("viewLess")}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default DescDetail;
