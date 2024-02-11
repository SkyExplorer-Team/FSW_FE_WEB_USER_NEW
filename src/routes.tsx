import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { ConfigProvider } from "antd";

const PRESERVED: {
  [key: string]: { default: React.ComponentType };
} = import.meta.glob("/src/pages/(_app|_404).tsx", {
  eager: true,
});
const ROUTES: {
  [key: string]: { default: React.ComponentType };
} = import.meta.glob("/src/pages/**/[a-z[]*.tsx", {
  eager: true,
});

const preserved: {
  _app?: React.ComponentType;
  _404?: React.ComponentType;
} = Object.keys(PRESERVED).reduce((preserved, file) => {
  const key = file.replace(/\/src\/pages\/|\.tsx$/g, "");
  return { ...preserved, [key]: PRESERVED[file].default };
}, {});

const routes = Object.keys(ROUTES).map((route) => {
  const path = route
    .replace(/\/src\/pages|index|\.tsx$/g, "")
    .replace(/\[\.{3}.+\]/, "*")
    .replace(/\[(.+)\]/, ":$1");

  return { path, component: ROUTES[route].default };
});

function App() {
  const App = preserved?.["_app"] || Fragment;
  const NotFound = preserved?.["_404"] || Fragment;

  const location = useLocation();

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#38A993",
            headerColor: "white",
            borderColor: "white",
            cellPaddingBlock: 4
          },
        },
        token: {
          colorPrimary: "#38A993",
        },
        hashed: false,
      }}
    >
      <App>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {routes.map(({ path, component: Component = Fragment }) => (
              <Route
                key={path}
                path={path}
                element={<Component />}
                lazy={() => import(`./pages${path}/index.tsx`)}
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </App>
    </ConfigProvider>
  );
}

export default App;
