import { Button } from "primereact/button";
import css from "./style.module.css";
import { Dropdown } from "primereact/dropdown";

export default function Controls(props: {
  isAddExpenseVisible: boolean;
  isAddReportsVisible: boolean;
  changeReportsVisibility: Function;
  changeExpenseVisibility: Function;
  yearsOption: Array<{ code: string; name: string }> | any;
  categoryOptions: Array<{ category: string; }> | any;
  setYearHandler: Function;
  selectedYear: any;
  setCategoryHandler: Function;
  selectedCategory: any;

}) {
  const { isAddExpenseVisible, changeExpenseVisibility, selectedYear, selectedCategory, isAddReportsVisible, changeReportsVisibility } = props;
  const text = isAddExpenseVisible ? "Hide" : "Show";
  const reportText = isAddReportsVisible ? "Hide" : "Show";
  return (
    <div style={styles.mainDiv}>
      <h3> Controls </h3>
      <div className={css.controlsContainer}>
        <Button
          onClick={() => {
            changeExpenseVisibility(!isAddExpenseVisible);
          }}
        >
          {text} Expense Form
        </Button>
        <Button
          onClick={() => {
            changeReportsVisibility(!isAddReportsVisible);
          }}>{reportText} Reports</Button>
        <Dropdown
          value={selectedYear}
          onChange={(e) => {
            props.setYearHandler(e.value);
            console.log(selectedYear);
          }}
          options={props.yearsOption}
          optionLabel="name"
          placeholder="Select a Year"
          filter
          className="w-full md:w-14rem"
        />
        <Dropdown
          value={selectedCategory}
          onChange={(e) => {
            props.setCategoryHandler(e.value);
            console.log(selectedCategory);
          }}
          options={props.categoryOptions}
          optionLabel="name"
          placeholder="Select a Category"
          filter
          className="w-full md:w-14rem"
        />
      </div>
    </div>
  );
}

const styles = {
  mainDiv: {
    color: "black",
    background: "lightblue",
    padding: "10px",
    border: "1px solid black",
    borderRadius: "10px",
  },
};
