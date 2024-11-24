export const postAPI = async (path, payload) => {
  try {
    const result = await fetch(`http://localhost:3000/api/${path}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (result.ok) {
      return await result.json();
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
