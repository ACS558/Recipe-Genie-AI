import React from "react";
import ReactMarkdown from "react-markdown";

const MistralRecipe = (props) => {
  return (
    <section
      className="text-[#475467] leading-7 text-lg font-normal"
      aria-live="polite"
    >
      <h2 className="mt-6 font-semibold text-2xl mb-3">
        Recipe Genie Recommends:
      </h2>
      <ReactMarkdown
        components={{
          ul: ({ node, ordered, ...rest }) => (
            <ul className="list-disc pl-5 mb-4" {...rest} />
          ),
          ol: ({ node, ordered, ...rest }) => (
            <ol className="list-decimal pl-5 mb-4" {...rest} />
          ),
          li: ({ node, ordered, ...rest }) => <li className="mb-2" {...rest} />,
        }}
      >
        {props.recipe}
      </ReactMarkdown>
    </section>
  );
};

export default MistralRecipe;
