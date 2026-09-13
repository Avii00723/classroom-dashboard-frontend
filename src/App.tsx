import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { BrowserRouter, Route, Routes, Outlet } from "react-router";
import routerProvider, {
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { dataProvider } from "./providers/data";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import "./App.css";
import { BookOpen, Building2, GraduationCap, Home, Users } from "lucide-react";
import { Layout } from "./components/refine-ui/layout/layout";
import { SchoolDataProvider } from "./providers/school-data";
import { AdminResourcePage, Dashboard, ResourceDetailPage } from "./pages/AdminPages";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <SchoolDataProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                notificationProvider={useNotificationProvider()}
                routerProvider={routerProvider}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  projectId: "CLCCID-igpoi9-Rpp806",
                }}
                resources={[
                  {
                    name: "dashboard",
                    list: "/",
                    meta: {
                      label: "Home",
                      icon: <Home />,
                    }
                  },
                  {
                    name: "subjects",
                    list: "/subjects",
                    create: "/subjects/create",
                    meta: {
                      label: "Subjects",
                      icon: <BookOpen />,
                    },
                  },
                  {
                    name: "users",
                    list: "/users",
                    show: "/users/:id",
                    meta: { label: "Users", icon: <Users /> },
                  },
                  {
                    name: "departments",
                    list: "/departments",
                    show: "/departments/:id",
                    meta: { label: "Departments", icon: <Building2 /> },
                  },
                  {
                    name: "classes",
                    list: "/classes",
                    show: "/classes/:id",
                    meta: { label: "Classes", icon: <GraduationCap /> },
                  },
                ]}
              >
                <Routes>
                  <Route element={
                    <Layout>
                      <Outlet />
                    </Layout>
                  }>

                    <Route path="/" element={<Dashboard />} />
                    <Route path="users" element={<AdminResourcePage resource="users" />} />
                    <Route path="users/:id" element={<ResourceDetailPage resource="users" />} />
                    <Route path="departments" element={<AdminResourcePage resource="departments" />} />
                    <Route path="departments/:id" element={<ResourceDetailPage resource="departments" />} />
                    <Route path="subjects" element={<AdminResourcePage resource="subjects" />} />
                    <Route path="subjects/:id" element={<ResourceDetailPage resource="subjects" />} />
                    <Route path="classes" element={<AdminResourcePage resource="classes" />} />
                    <Route path="classes/:id" element={<ResourceDetailPage resource="classes" />} />
                  </Route>
                </Routes>
                <Toaster />
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </SchoolDataProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
