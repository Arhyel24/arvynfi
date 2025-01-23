export const GetAllTokens = async (publicKey: string) => {
  const response = await (
    await fetch("/api/getTokens", {
      method: "POST",
      body: JSON.stringify({ publicKey }),
    })
  ).json();
  //   console.log(response);
  return response.tokens;
};
