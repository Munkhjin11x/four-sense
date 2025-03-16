const baseUrl = "https://foursenses.onrender.com";

export async function apiLogin<T>(data: {
  username: string;
  password: string;
}): Promise<T> {
  const response = await fetch(`${baseUrl}/api/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

export async function apiTables<T>(): Promise<T> {
  const response = await fetch(`${baseUrl}/api/table/get-table-seats`);
  return response.json();
}

export async function apiUpdateTableSeat<T>(data: {
  tableName: string;
  seatIds: string[];
}): Promise<T> {
  console.log(data);
  const response = await fetch(
    `${baseUrl}/api/table/update-table-seat-status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return response.json();
}

export async function apiOrderList<T>(): Promise<T> {
  const response = await fetch(`${baseUrl}/api/order/get-orders`);
  return response.json();
}

export async function apiCreateOrder<T>(data: {
  name: string;
  phone: string;
  email: string;

  tableName: string;
  seatIds: string[];
}): Promise<T> {
  const response = await fetch(`${baseUrl}/api/order/create-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
