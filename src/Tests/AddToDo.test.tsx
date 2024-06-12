import { fireEvent, render, screen } from "@testing-library/react";
import ToDoApp from "../pages/ToDoApp";

describe("Тестирование добавлениие задачи", () => {
  test("добавление задачи при вводе текста", () => {
    render(<ToDoApp />);

    const input = screen.getByTestId("add-input");
    const addButton = screen.getByTestId("add-btn");

    // записываем начальное количество ToDo
    const toDoElemLength = screen.getAllByTestId("todo-elem").length;

    // добавляем новую задачу
    fireEvent.input(input, {
      target: { value: "новая задача" },
    });
    fireEvent.click(addButton);

    // проверяем, что количество ToDo увеличилось на 1
    expect(screen.getAllByTestId("todo-elem").length).toBe(toDoElemLength + 1);
  });

  test("добавление задачи при вводе пустого текста", () => {
    render(<ToDoApp />);

    const addButton = screen.getByTestId("add-btn");

    // записываем начальное количество ToDo
    const toDoElemLength = screen.getAllByTestId("todo-elem").length;

    // нажимаем на кнопку, не вписывая текст в input
    fireEvent.click(addButton);

    // проверяем, что количество ToDo не изменилось
    expect(screen.getAllByTestId("todo-elem").length).toBe(toDoElemLength);
  });
});
