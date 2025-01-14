import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Rows from "../components/Rows";
import Pagination from "../components/Pagination";
import { COLUMNS } from "../utils"; // Mock this if needed

jest.mock("../utils", () => ({
  COLUMNS: [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "value", label: "Value" },
  ],
}));

describe("Rows Component", () => {
  const mockRows = [
    { id: 1, name: "Project A", value: 100 },
    { id: 2, name: "Project B", value: 200 },
  ];

  test("renders the correct number of rows", () => {
    render(<table><tbody><Rows rows={mockRows} /></tbody></table>);
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(mockRows.length);
  });

  test("renders the correct data for each row", () => {
    render(<table><tbody><Rows rows={mockRows} /></tbody></table>);
    mockRows.forEach((row, rowIndex) => {
      COLUMNS.forEach((column) => {
        expect(screen.getByText(row[column.key])).toBeInTheDocument();
      });
    });
  });

  test("renders the correct number of columns per row", () => {
    render(<table><tbody><Rows rows={mockRows} /></tbody></table>);
    const firstRowCells = screen.getAllByRole("cell");
    expect(firstRowCells).toHaveLength(mockRows.length * COLUMNS.length);
  });
});


describe("Pagination Component", () => {
  const totalNumberItem = 50; // Total items for testing
  const itemPerPage = 10; // Items per page

  const setup = (initialPage = 1) => {
    const setCurrentActivePage = jest.fn();
    render(
      <Pagination
        totalNumberItem={totalNumberItem}
        itemPerPage={itemPerPage}
        currentActivePage={initialPage}
        setCurrentActivePage={setCurrentActivePage}
      />
    );
    return { setCurrentActivePage };
  };

  test("renders the pagination component with page numbers", () => {
    setup();
    expect(screen.getByText("<")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText(">")).toBeInTheDocument();
  });

  test("disables the Previous button on the first page", () => {
    setup(1);
    const prevButton = screen.getByText("<");
    expect(prevButton).toBeDisabled();
  });

  test("disables the Next button on the last page", () => {
    const totalPages = Math.ceil(totalNumberItem / itemPerPage);
    setup(totalPages);
    const nextButton = screen.getByText(">");
    expect(nextButton).toBeDisabled();
  });

  test("calls setCurrentActivePage on clicking Next button", () => {
    const { setCurrentActivePage } = setup(1);
    const nextButton = screen.getByText(">");
    fireEvent.click(nextButton);
    expect(setCurrentActivePage).toHaveBeenCalledWith(expect.any(Function));
  });

  test("calls setCurrentActivePage on clicking Previous button", () => {
    const { setCurrentActivePage } = setup(2);
    const prevButton = screen.getByText("<");
    fireEvent.click(prevButton);
    expect(setCurrentActivePage).toHaveBeenCalledWith(expect.any(Function));
  });

  test("highlights the active page", () => {
    const activePage = 3;
    setup(activePage);
    const activePageButton = screen.getByText(String(activePage));
    expect(activePageButton).toHaveStyle("background: #007BFF; color: #FFF;");
  });

  test("handles page number button clicks", () => {
    const { setCurrentActivePage } = setup(1);
    const pageButton = screen.getByText("3");
    fireEvent.click(pageButton);
    expect(setCurrentActivePage).toHaveBeenCalledWith(3);
  });
});