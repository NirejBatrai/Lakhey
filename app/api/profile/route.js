export async function GET(request) {
  const token = request.headers.get("authorization");

  if (!token) {
    return new Response(
      JSON.stringify({ message: "Authentication required" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const response = await fetch("http://localhost:3001/profile", {
      headers: {
        Authorization: token,
      },
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error fetching profile data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
