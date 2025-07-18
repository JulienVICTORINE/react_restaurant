const apiURL = "https://127.0.0.1:8000/api";
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/ld+json");

export async function fetchTables(capacite, dateReservation) {
  const raw = JSON.stringify({
    date: dateReservation,
    capacite: capacite,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  const response = await fetch(apiURL + "/booking/tables", requestOptions);
  const data = await response.json();
  return data;
}

export async function fetchClient(email) {
  const requestOptions = {
    headers: myHeaders,
  };

  const response = await fetch(
    apiURL + "/clients?email=" + email,
    requestOptions
  );
  const data = await response.json();
  const totalItems = data.totalItems;
  if (totalItems) {
    return data.member[0]["@id"];
  }
  return false;
}

export async function createClient(nom, email, telephone) {
  const raw = JSON.stringify({
    nom: nom,
    email: email,
    telephone: telephone,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  const response = await fetch(apiURL + "/clients", requestOptions);
  const data = await response.json();
  return data["@id"];
}

export async function createReservation(
  { dateReservation, capacite },
  idClient,
  idTable
) {
  const raw = JSON.stringify({
    createdAt: "2025-07-18T07:30:47.166Z",
    creneau: "string",
    nombrePersonne: parseInt(capacite),
    client: idClient,
    tableRestaurant: idTable,
    dateReservation: dateReservation,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  const response = await fetch(apiURL + "/reservations", requestOptions);
  const data = await response.json();
  return data;
}
