const apiBaseUrl = process.env.API_BASE_URL;

export const summarizeWebpage = async (options) => {
  try {
    const url =
      `${apiBaseUrl}/summarize/web-page?` + new URLSearchParams(options);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    throw new Error(
      error.message || "Error while summarizing! Please try again later"
    );
  }
};

export const postChat = async (body) => {
  try {
    const response = await fetch(`${apiBaseUrl}/chat`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getSummarizeData = async (body) => {
  try {
    const response = await fetch(`${apiBaseUrl}/summarize`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};
