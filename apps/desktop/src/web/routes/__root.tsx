import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "react-hot-toast";
import { ErrorComponent, Layout } from "../components";
import { ToastBody } from "../components/toast";

export const Route = createRootRoute({
  component: () => (
    <>
      <Layout>
        <Outlet />
        {/* <Notifier /> */}
        {import.meta.env.DEV && (
          <TanStackRouterDevtools position="bottom-left" />
        )}
      </Layout>
      <Toaster
        position="top-center"
        // biome-ignore lint/correctness/noChildrenProp: <explanation>
        children={(props) => <ToastBody {...props} />}
      />
    </>
  ),
  errorComponent: (props) => <ErrorComponent {...props} />,
});
