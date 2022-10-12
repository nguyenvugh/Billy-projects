export async function getServerSideProps({ res, params: { slug } }) {
  if (res) {
    res.writeHead(301, { location: `/${slug}/` });
    res.end();
  }
  return {
    props: {},
  };
}

const Info = () => {
  return <></>;
};

export default Info;
