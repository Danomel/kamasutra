import { fireEvent, render, screen } from "@testing-library/react";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
  test("renders a span element with correct status", async () => {
    // Передаем status через пропсы
    const status = "it-kamasutra.com";
    render(<ProfileStatus status={status} />);

    // Ждем, пока появится элемент span
    const spanElement = await screen.findByRole("status");

    // Проверяем, содержит ли компонента тэг span
    expect(spanElement).toBeInTheDocument();

    // Проверяем, содержит ли span переданный пропс status
    expect(spanElement.textContent).toBe(status);
  });

  test("after creation <input> shouldn't be displayed", async () => {
    // Передаем status через пропсы
    const status = "it-kamasutra.com";
    render(<ProfileStatus status={status} />);

    // Ждем, пока появится элемент span
    const inputElement = screen.queryByRole("input");

    // Проверяем, содержит ли компонента тэг input
    expect(inputElement).not.toBeInTheDocument();
  });

  test("input should be displayed in editMode instead span", async () => {
    // Передаем status через пропсы
    const status = "it-kamasutra.com";
    render(<ProfileStatus status={status} />);

    // Ждем, пока появится элемент span
    const spanElement = await screen.findByRole("status");
    fireEvent.doubleClick(spanElement);
    expect(spanElement).not.toBeInTheDocument();
    const inputElement = await screen.findByRole("input", { value: status });

    // Проверяем, содержит ли компонента тэг input
    expect(inputElement).toBeInTheDocument();
  });
  test("deactivateEditMode method is called once when span is double clicked", async () => {
    // Создаем мок функцию для updateStatus
    const updateStatusMock = jest.fn();

    // Рендерим компонент ProfileStatus с пропсом updateStatus
    render(
      <ProfileStatus
        status="it-kamasutra.com"
        updateStatus={updateStatusMock}
      />
    );

    // Находим элемент span
    const spanElement = screen.getByRole("status");

    // Делаем двойной клик по элементу span
    fireEvent.doubleClick(spanElement);

    // Находим элемент input
    const inputElement = screen.getByRole("input");

    // Делаем изменение в input
    fireEvent.change(inputElement, { target: { value: "New status" } });

    // Имитируем потерю фокуса с элемента input
    fireEvent.blur(inputElement);

    // Убеждаемся, что метод updateStatus был вызван один раз
    expect(updateStatusMock).toHaveBeenCalledTimes(1);

    // Убеждаемся, что метод updateStatus был вызван с правильным аргументом
    expect(updateStatusMock).toHaveBeenCalledWith("New status");
  });
});
