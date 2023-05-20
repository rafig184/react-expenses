import { useState } from "react";
import "./App.css";
import Header from "./components/header";
import Controls from "./components/controls";
import AddExpense from "./components/add-expense";
import ExpensesList from "./components/expenses-list";
import Reports from "./components/reports";
import { data } from "./data";
// type Expense = (typeof data)[0];
function App() {
  const [isAddExpenseVisible, setIsExpenseVisible] = useState(false);
  const [isAddReportsVisible, setIsReportsVisible] = useState(false);
  const [expenses, setExpenses] = useState(data);
  const [selectedYear, setSelectedYear] = useState<{
    name: string;
    code: string;
  } | null>(null);
  const formHandler = (expenseVisibility: boolean) => {
    setIsExpenseVisible(expenseVisibility);
  };
  const reportsHandler = (expenseVisibility: boolean) => {
    setIsReportsVisible(expenseVisibility);
  };
  const [selectedCategory, setSelectedCategory] = useState<{
    name: string;
    code: string;
  } | null>(null)

  const allYears = expenses
    .map((e) => {
      const year = new Date(e.date).getFullYear().toString();
      return { code: year, name: year };
    })
    .reduce((yearsObj: any, currentYear) => {
      yearsObj[currentYear.code] = currentYear;
      return yearsObj;
    }, {});

  console.log(expenses);
  const allCategories = expenses.map((c) => {
    const category = c.category.toString();

    return { code: category, name: category }
  })
    .reduce((categoryObj: any, currentCategory) => {
      categoryObj[currentCategory.code] = currentCategory;
      return categoryObj;
    }, {})

  // const filteredExpenses =
  //   !selectedYear || selectedYear?.code === "all"
  //     ? expenses
  //     : expenses.filter((e) => {
  //       return e.date.getFullYear().toString() === selectedYear?.code;
  //     });

  const filteredExpenses =
    (!selectedYear && !selectedCategory || selectedCategory?.code === "all" &&
      selectedYear?.code === "all" || selectedCategory?.code === "all" &&
      !selectedYear?.code || selectedYear?.code === "all" && !selectedCategory?.code)
      ? expenses
      : expenses.filter((c) => {
        if (!selectedYear?.code || selectedYear?.code === "all")
          return c.category === selectedCategory?.code
        else {
          if (!selectedCategory?.code || selectedCategory?.code === "all") {
            return c.date.getFullYear().toString() === selectedYear?.code
          }
          return c.category === selectedCategory?.code && c.date.getFullYear().toString() === selectedYear?.code
        }
      })


  return (
    <div style={{ background: "lightgrey" }}>
      {expenses.length}
      <Header text={"My Expenses"} />
      <Controls {..._getControlsProps()} />
      {isAddExpenseVisible ? (
        <AddExpense
          onSave={(expense: any) => {
            setExpenses([...expenses, expense]);
          }}
        />
      ) : null}
      {isAddReportsVisible ? (
        <Reports {..._getControlsProps()} />
      ) : null}

      <ExpensesList
        expenses={filteredExpenses}

      />
    </div>
  );

  function _getControlsProps() {
    return {
      changeExpenseVisibility: formHandler,
      changeReportsVisibility: reportsHandler,
      isAddExpenseVisible: isAddExpenseVisible,
      isAddReportsVisible: isAddReportsVisible,
      options: [{ code: "all", name: "All" }, ...Object.values(allYears)],
      categoryOptions: [{ code: "all", name: "All" }, ...Object.values(allCategories)],
      setYearHandler: setSelectedYear,
      selectedYear,
      setCategoryHandler: setSelectedCategory,
      selectedCategory,
      expenses: expenses,
    };
  }
}




export default App;
