const baseApiHandler = (): string => {
  const nextMode = process.env.NEXT_PUBLIC_MODE;

  const prodLink = process.env.NEXT_PUBLIC_PROD_API_URL;
  const devLink = process.env.NEXT_PUBLIC_DEV_API_URL;

  if (!prodLink || !devLink) {
    throw new Error("API URLs are not properly defined in the environment.");
  }

  if (nextMode === "dev") {
    return devLink;
  }

  if (nextMode === "prod") {
    return prodLink;
  }

  throw new Error("mode is undefined, defaulting to production API.");
};

export default baseApiHandler;
