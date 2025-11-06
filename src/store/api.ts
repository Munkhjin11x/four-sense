// Use local development API or production URL based on environment
const baseUrl = "";

interface ApiError {
  error?: string;
}

function isApiError(obj: unknown): obj is ApiError {
  return typeof obj === "object" && obj !== null && "error" in obj;
}

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
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = isApiError(errorData)
      ? errorData.error
      : "Login failed";
    throw new Error(errorMessage);
  }

  return response.json();
}

export async function apiSignup<T>(data: {
  email: string;
  password: string;
}): Promise<T> {
  const response = await fetch(`${baseUrl}/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errorMessage = (errorData as any)?.error || "Signup failed";
    throw new Error(errorMessage);
  }

  return response.json();
}

export async function apiTables<T>(): Promise<T> {
  const response = await fetch(`${baseUrl}/api/tables`);
  return response.json();
}

export async function apiUpdateTableSeat<T>(data: {
  tableName: string;
  seatIds: string[];
}): Promise<T> {
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

export async function apiOrderList<T>(params?: {
  page?: number;
  limit?: number;
}): Promise<T> {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.append("page", params.page.toString());
  if (params?.limit) searchParams.append("limit", params.limit.toString());

  const url = `${baseUrl}/api/order${
    searchParams.toString() ? `?${searchParams.toString()}` : ""
  }`;
  const response = await fetch(url);
  return response.json();
}

export async function apiCreateOrder<T>(data: {
  name: string;
  phone: string;
  email: string;
  tableName: string;
  seatIds: string[];
  date: Date;
  turnstileToken: string;
  eventDate: number;
}): Promise<T> {
  const response = await fetch(`${baseUrl}/api/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = isApiError(errorData)
      ? errorData.error
      : "Order creation failed";
    throw new Error(errorMessage || "Order creation failed");
  }

  return response.json();
}

export async function apiApproveOrder<T>(data: {
  orderId: number;
}): Promise<T> {
  const response = await fetch(`${baseUrl}/api/approve-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = isApiError(errorData)
      ? errorData.error
      : "Failed to approve order";
    throw new Error(errorMessage);
  }

  return response.json();
}

export async function apiCancelOrder<T>(data: { orderId: number }): Promise<T> {
  const response = await fetch(`${baseUrl}/api/cancel-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = isApiError(errorData)
      ? errorData.error
      : "Failed to cancel order";
    throw new Error(errorMessage);
  }

  return response.json();
}
