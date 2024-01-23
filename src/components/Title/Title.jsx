import React from "react";

function Title({ text, content }) {
  return (
    <>
      <title>{text} | Yemzy Apparel</title>
      <meta name="description" content={content} />
    </>
  );
}

export default Title;
