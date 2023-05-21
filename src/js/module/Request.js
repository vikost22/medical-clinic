export default class Request {
  login(email, password) {
    return fetch("https://ajax.test-danit.com/api/v2/cards/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.text())
      .catch((error) => {
        console.error(error.message);
      });
  }
  getCards(token) {
    return fetch("https://ajax.test-danit.com/api/v2/cards", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error(error.message);
      });
  }
  setCard(token, cardObj) {
    return fetch("https://ajax.test-danit.com/api/v2/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cardObj),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response.json();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
  changeCard(token, cardId, cardObj) {
    return fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cardObj),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error(error.message);
      });
  }
  deleteCard(token, cardId) {
    return fetch(`https://ajax.test-danit.com/api/v2/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).catch((error) => {
      console.error(error.message);
    });
  }
  getCard(token, id) {
    return fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error(error.message);
      });
  }
}
