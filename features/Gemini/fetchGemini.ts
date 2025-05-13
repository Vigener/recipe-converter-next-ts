export function fetchGemini(prompt: string) {
  const postData = async (prompt: string) => {
    const res = await fetch("/api/gemini-api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt_post: prompt }),
    });
    console.log(res);
    // return res.text();
    const json = await res.json();
    return json.message;
  };
  return postData(prompt);
}
