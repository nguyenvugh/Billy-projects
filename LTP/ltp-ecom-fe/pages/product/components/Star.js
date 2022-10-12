import { Image } from "@chakra-ui/react";

export default function RenderStar({ num_rating, ...rest }) {
  return [1, 2, 3, 4, 5].map((e, index) => {
    if (e <= num_rating) {
      return <Image src="/imgs/mock/products/Star.svg" alt="Star" {...rest} key={index} />;
    }
    return <Image src="/imgs/mock/products/unStar.svg" alt="Unstar" {...rest} key={index} />;
  });
}
