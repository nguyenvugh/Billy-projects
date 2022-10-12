import { BaseEntities, BooleanNumber, Lang } from "@/src/common/interfaces/common.interface";
import { ChakraProps } from "@chakra-ui/react";
export interface TimeLeftProps {
  timeStart: string;
  wrapperStyle?: ChakraProps;
}
export interface EventContentItemProps {
  wrapperStyle?: ChakraProps;
}
export interface DescriptionProps {
  children: React.ReactNode;
  wrapperStyle?: ChakraProps;
  content?: string;
}

export interface Event extends BaseEntities {
  thumbnail: Thumbnail;
  title: string;
  shortDesc: string;
  content: string;
  location: string;
  timeStart: string;
  timeEnd: string;
  field: string;
  slug: string;
  isFeature: BooleanNumber;
  lang: Lang;
}

type Thumbnail = {
  url?: string;
};
