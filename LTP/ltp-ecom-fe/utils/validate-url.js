export const concatUrls = (domain, path) => {
  if (domain[domain.length - 1] === "/" && path[0] === "/") {
    const newPath = `${path.substring(0, 0)}${path.substring(0 + 1)}`;
    return domain + newPath;
  }
  if (domain[domain.length - 1] !== "/" && path[0] !== "/") {
    return `${domain}/${path}`;
  }
  return domain + path;
};

export function addTrailingSlash(url = "") {
  const isContainTrailingSlash = url.charAt(url.length - 1) === "/";
  return isContainTrailingSlash ? url : url + "/";
}
