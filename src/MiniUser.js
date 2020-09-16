import React, { useEffect, useState } from "react";

const MiniUser = (props) => {
  const [detail, setDetail] = useState(null);
  useEffect(() => {
    if (props.keycloak) {
      props.keycloak.loadUserInfo().then((userInfo) => {
        console.log(userInfo);
        setDetail({
          name: userInfo.name,
          email: userInfo.email,
          id: userInfo.sub,
          avatar: userInfo.avatar,
        });
      });
    }
  }, [props.keycloak]);
  return (
    <React.Fragment>
      {detail && (
        <div className="text-center">
          <img
            src={detail.avatar}
            className="mb-2 rounded"
            alt=""
            style={{ width: 50 }}
          />
          <br />
          <p>{detail.name || detail.email}</p>
        </div>
      )}
    </React.Fragment>
  );
};

export default MiniUser;
