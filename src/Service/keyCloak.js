export const BADE_KEY_CLK_URL = "http://192.168.29.72:8180/auth/admin/realms/";
export const getRoles = (keycloak) => {
  return fetch(
    `${BADE_KEY_CLK_URL}vraio-client/clients/081e4840-8287-41cb-b6e1-ece897691041/roles`,
    {
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
        "Content-Type": "application/json",
      },
    }
  ).then((response) => {
    if (response.status == 200) {
      return response.json();
    } else {
      return { status: response.status, message: response.statusText };
    }
  });
};

export const getUsers = (keycloak) => {
  return fetch(`${BADE_KEY_CLK_URL}vraio-client/users`, {
    headers: {
      Authorization: `Bearer ${keycloak.token}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status == 200) {
      return response.json();
    } else {
      return { status: response.status, message: response.statusText };
    }
  });
};
