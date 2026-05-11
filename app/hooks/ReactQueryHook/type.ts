import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import React from "react";

export interface ReactQueryProps<T> {
  queryResult: UseQueryResult<T> | UseMutationResult<T>;
  render: (data: T) => React.ReactElement;
  renderLoading?: React.ReactElement;
  renderError?: React.ReactElement;
}