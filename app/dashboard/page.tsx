import { Suspense } from "react";
import { DashboardRoleAccess } from "./components/dashboardRoleAccess";

export default function page() {
    return <Suspense><DashboardRoleAccess /></Suspense>
}