import React from "react";

const LangBox = ({ langs }) => {
  return (
    <div className="language-container">
      <div><b>Language</b></div>
      <div>
        {langs.map((lang) => (
          <div key={lang.index} className="lang-content">
            <div>{lang.lang}</div>
            <div>{lang.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LangBox;
