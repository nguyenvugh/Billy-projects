import { About } from "@/src/components/aboutComponents";
import { ListImgProps } from "@/src/components/aboutComponents/interfaces";
import { getListPictureService } from "@/src/components/aboutComponents/services";
import { GetStaticProps } from "next";

const AboutPage = ({ listImg, listImgThumb }: ListImgProps) => {
  return <About listImg={listImg} listImgThumb={listImgThumb} />;
};

export const getStaticProps: GetStaticProps<ListImgProps> = async () => {
  const pictureRes = await getListPictureService();
  return {
    props: { listImg: pictureRes.data, listImgThumb: pictureRes.data },
    revalidate: 10,
  };
};

export default AboutPage;
