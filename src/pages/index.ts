import { lazy } from "react";

export const DashboardPage = lazy(() => import("./DashboardPage"));
export const NotFoundPage = lazy(() => import("./NotFoundPage"));

export { default as LoadingPage } from "./LoadingPage";
