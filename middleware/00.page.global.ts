import qs from "qs";

const removePageFromUrl = (url: string) => {
  // Use a regular expression to remove any '/page/:id' part from the URL
  return url.replace(/\/page\/\d+/, "");
};

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.client) return;

  const isPaginationPage =
    to.name === "withPage-page-page" || to.name === "withPage";

  if (!isPaginationPage) return;

  const { query, path, params, name } = to;
  const pageValue = query?.page2 ?? false;
  // @ts-ignore
  const pageParam = params?.page ?? false;

  console.log("pageValue", pageValue === pageParam);
  if (pageValue === pageParam) return;

  console.log("name", name);
  console.log("path", path);
  console.log("params", name);
  console.log("query", query);

  if (pageValue) {
    const pathWithoutPage = removePageFromUrl(path);
    console.log("pathWithoutPage", pathWithoutPage);

    const { page2, ...queryTmp } = query;
    const newFullPath = qs.stringify(queryTmp);
    console.log("newFullPath", newFullPath);

    const fullPath = `${pathWithoutPage}/page/${pageValue}${
      newFullPath ? "?" + newFullPath : ""
    }`;
    console.log("fullPath of redirect", fullPath);
    return navigateTo(fullPath, {
      redirectCode: 301,
      external: true,
    });
  }
});
