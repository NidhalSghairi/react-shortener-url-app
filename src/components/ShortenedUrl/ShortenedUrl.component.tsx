import React from "react";

type ShortenedUrlProps = {
  title: string;
  inputPlaceholder: string;
  buttonTitle: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  action: () => void;
  text: string;
};

const ShortenedUrl: React.FC<ShortenedUrlProps> = ({
  title,
  inputPlaceholder,
  buttonTitle,
  value,
  onChange,
  action,
  text,
}) => {
  return (
    <div>
      <h1>{title}</h1>
      <div>
        <input
          type="text"
          placeholder={inputPlaceholder}
          value={value}
          onChange={onChange}
        />
        <button onClick={action}>{buttonTitle}</button>
      </div>
      <div>{text}</div>
    </div>
  );
};

export default ShortenedUrl;
