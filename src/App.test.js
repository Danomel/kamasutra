import { render } from "@testing-library/react";
import SamuraiJSApp from "./App";

test("renders learn react link", () => {
  const { unmount } = render(<SamuraiJSApp tab="home" />);
  unmount(); // Это очистит отрендеренный компонент
});
