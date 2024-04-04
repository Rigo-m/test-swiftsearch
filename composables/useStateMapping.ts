import type { IndexUiState, UiState, StateMapping } from "instantsearch.js";

export const useStateMapping = () => {
  function getIndexStateWithoutConfigure<TIndexUiState extends IndexUiState>(
    uiState: TIndexUiState,
  ): TIndexUiState {
    const { configure, ...trackedUiState } = uiState;
    return trackedUiState as TIndexUiState;
  }

  function customStateMapping<TUiState extends UiState = UiState>(
    indexName: keyof TUiState,
  ): StateMapping<TUiState, TUiState> {
    return {
      $$type: "ais.singleIndex",
      stateToRoute(uiState) {
        const stateWithoutConfigure = getIndexStateWithoutConfigure(
          uiState[indexName] || {},
        );
        // now explode brand refinement list into a custom query
        if (stateWithoutConfigure.refinementList?.["brand"]) {
          // @ts-ignore
          stateWithoutConfigure["custom"] =
            stateWithoutConfigure.refinementList?.["brand"].join(",");
          delete stateWithoutConfigure.refinementList;
        }
        return stateWithoutConfigure as unknown as TUiState;
      },
      routeToState(routeState = {} as TUiState) {
        const stateWithoutConfigure = getIndexStateWithoutConfigure(routeState);
        // implode custom query to brand if present
        if (stateWithoutConfigure.custom) {
          stateWithoutConfigure.refinementList ??= {};
          stateWithoutConfigure.refinementList.brand =
            stateWithoutConfigure.custom.split(",");
        }
        return {
          [indexName]: stateWithoutConfigure,
        } as unknown as TUiState;
      },
    };
  }

  return customStateMapping;
};
