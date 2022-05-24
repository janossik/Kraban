import Head from "next/head";

const CustomHead = ({ title = "Kraban" }: { title?: string }) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default CustomHead;
