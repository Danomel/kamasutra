import { render } from "@testing-library/react";
import SamuraiJSApp from "./App";
import React from "react";

test("renders learn react link", () => {
  const { unmount } = render(<SamuraiJSApp />);
  unmount(); // Это очистит отрендеренный компонент
});
