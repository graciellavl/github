import React from "react";

const LangBox = ({ langs }) => {
  return (
    <div class="language-container">
      <div>Language</div>
      <div>
        {langs.map((lang, index) => (
          <div key={lang} className="lang-content">
            <div>{lang.lang}</div>
            <div>{lang.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LangBox;
