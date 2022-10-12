import Container from "src/common/components/container";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  Link as LinkUI,
} from "@chakra-ui/react";
import { useUserContext } from "@cbi/context/AuthContext";
import Lodash from "lodash";
import Link from "next/link";
import { listProfile } from "./constants";
import ModalContainer from "@cbi/components/ModalContainer";
import { useRef, useState } from "react";
import { SCREEN_AUTH } from "@cbi/constants/index";
import { clearCache } from "@cbi/utils/dataCache";
import { useRouter } from "next/router";
function NavTop() {
  const { userContext, setUserContext } = useUserContext();
  const router = useRouter();
  const refSignIn = useRef<any>(null);
  const [textSearch, setTextSearch] = useState("");
  const logout = () => {
    clearCache();
    setUserContext({});
    router.push("/");
  };
  function handleEnterSearch(key: string) {
    if (key === "Enter") {
      router.push(`/news?textSearch=${textSearch}`);
    }
  }
  return (
    <Box bg="#44841A" pt="15px" pb="8px">
      <Container>
        <Flex
          justifyContent="space-between"
          position="relative"
          paddingBottom={{ base: "45px", sm: 0 }}
        >
          <Box>
            <Image src="/img/global/logo.svg" height={"48px"} w="128px" />
          </Box>
          <Box
            w={{ base: "100%", sm: "35%" }}
            bg="#FFFFFF"
            border="1px solid #E2E8F0"
            borderRadius="6px"
            h={{ base: "35px", sm: "40px" }}
            position={{ base: "absolute", sm: "initial" }}
            bottom={"-5px"}
            right={0}
            left={0}
          >
            <Input
              h="100%"
              w="calc(100% - 53px)"
              border="none"
              pl={"16px"}
              pr="16px"
              borderRadius="6px 0 0 6px"
              _focus={{
                outline: "none",
              }}
              value={textSearch}
              onChange={(e) => {
                setTextSearch(e.target.value);
              }}
              onKeyDown={(e) => handleEnterSearch(e.key)}
            />
            <Button
              bg="#EDF2F7"
              border="none"
              borderRadius="0px 6px 6px 0px"
              h="100%"
              w="53px"
              mt={-1}
              onClick={() => {
                router.push(`/news?textSearch=${textSearch}`);
              }}
            >
              <Image src="/img/global/ic_search.svg" />
            </Button>
          </Box>
          {Lodash.isEmpty(userContext) ? (
            <Box>
              <Button
                {...styleButtonSignIn_Up}
                color="rgba(255, 255, 255, 0.92)"
                mr={{ base: "8px", md: "16px" }}
                bg="transparent"
                fontSize={"13px"}
                h={{ base: "35px", md: "40px" }}
                w={{ base: "83px", md: "98px" }}
                onClick={() => {
                  refSignIn.current.openModal(SCREEN_AUTH.SIGN_UP);
                }}
              >
                Đăng ký
              </Button>
              <Button
                {...styleButtonSignIn_Up}
                fontSize={"13px"}
                h={{ base: "35px", md: "40px" }}
                w={{ base: "83px", md: "98px" }}
                color="#61A533"
                onClick={() => {
                  refSignIn.current.openModal(SCREEN_AUTH.SIGN_IN);
                }}
              >
                Đăng nhập
              </Button>
            </Box>
          ) : (
            <Box>
              <Popover isLazy trigger="hover" placement="bottom-end">
                <PopoverTrigger>
                  <Flex>
                    <Avatar
                      w="40px"
                      h="40px"
                      name="Dan Abrahmov"
                      cursor="pointer"
                      src={userContext?.avatarUrl || "/img/avatars/avatar-default.png"}
                    />
                    <Image cursor="pointer" src="/img/global/ic_drop_down.svg" ml="16px" />
                  </Flex>
                </PopoverTrigger>
                <PopoverContent w="224px" color="#2D3748" bg="#FFFFFF" border="1px solid #E2E8F0">
                  <Box>
                    <Box px="44px" pt="32px" textAlign={"center"}>
                      <Avatar
                        w="136px"
                        h="136px"
                        name="Dan Abrahmov"
                        cursor="pointer"
                        src={userContext?.avatarUrl || "/img/avatars/avatar-default.png"}
                      />
                    </Box>
                    <Box fontSize="16px" color="Gray/700">
                      <Text py="24px" textAlign={"center"}>
                        {userContext?.email}
                      </Text>
                      <Box border={"1px solid #E2E8F0"}>
                        {listProfile.map((item: menuProfileI, index: number) => (
                          <Text {...styleLinkProfile} key={item.name}>
                            <Link href={item.href}>{item.name}</Link>
                          </Text>
                        ))}
                        <Text {...styleLinkProfile} key="logout">
                          <span style={{ cursor: "pointer" }} onClick={logout}>
                            Đăng xuất
                          </span>
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </PopoverContent>
              </Popover>
            </Box>
          )}
        </Flex>
      </Container>
      <ModalContainer ref={refSignIn} />
    </Box>
  );
}

export default NavTop;
interface menuProfileI {
  name: string;
  href: string;
}
const styleButtonSignIn_Up = {
  fontWeight: "bold",
  border: "1px solid rgba(255, 255, 255, 0.92)",
  borderRadius: "6px",
};

const styleLinkProfile = {
  px: "16px",
  py: "12px",
};
