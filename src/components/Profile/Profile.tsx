import { useState } from "react";

const Profile = () => {
  const [message, setMessage] = useState("пустота");
  const [value, setValue] = useState<string>("");

  return (
    <div className="container">
      <div>Count: {message}</div>
      <input
        data-testid={"input-update"}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
      <button
        data-testid={"button-update"}
        onClick={() => {
          setMessage("button-update");
        }}
      >
        update
      </button>
    </div>
  );
};

export default Profile;
