import { Box, HStack, Image, Text } from "@chakra-ui/react";
import styles from "@ltp/styles/Post.module.scss";
import { formatDateTime } from "@ltp/utils/date";
import { useEffect, useRef } from "react";

function PostDetail({ item }) {
  const docsRef = useRef();
  useEffect(() => {
    if (!docsRef) return;
    const imagesSide = docsRef.current.querySelectorAll("figure.image-style-side");
    if (imagesSide.length > 0) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0, { length } = imagesSide; i < length; ++i) {
        const imageSide = imagesSide[i];
        const image = imageSide.querySelectorAll("img")[0];
        image.style.margin = 0;
        image.style.marginLeft = "auto";
      }
    }
  }, [docsRef]);
  return (
    <Box>
      <Text
        as="h1"
        color="#071133"
        fontWeight="bold"
        fontSize={{ base: "22px", md: "26px", xl: "28px" }}
      >
        {item?.title}
      </Text>
      <HStack color="#718096" fontSize="12px" fontWeight="500" padding="18px 0 34px">
        <Image
          src="/imgs/mock/category/clockRed.svg"
          alt="clock red"
          title="clock red"
          width="14px !important"
          height="14px"
        />

        <Text>{formatDateTime(item?.date)}</Text>
      </HStack>
      <Box>
        <Box style={{ textAlign: "center" }}>
          <Image
            style={{ marginLeft: "auto", marginRight: "auto", width: "100%" }}
            src={item?.image}
          />
        </Box>
        <Text
          style={{
            fontStyle: "italic",
            fontWeight: 400,
            size: 18,
            lineHeight: "150%",
            color: "#071133",
            marginBottom: 24,
            marginTop: 24,
          }}
        >
          {item?.description}
        </Text>
        <div className="post_module_detail">
          <div
            ref={docsRef}
            className={styles.docs}
            dangerouslySetInnerHTML={{ __html: item?.content }}
          />
        </div>
      </Box>
      <Text color="#000000" fontWeight="600" fontSize="16px" textAlign="right" marginTop="48px">
        {item?.writer}
      </Text>
    </Box>
  );
}
export default PostDetail;
