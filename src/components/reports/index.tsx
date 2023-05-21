import css from "./style.module.css"
import { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function Reports(props: { categoryOptions: Array<{ category: string; }> | any, expenses: any }) {
  const { categoryOptions, expenses } = props
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  console.log(categoryOptions);

  const dataCategory = expenses.reduce((expensesObj: any, currentExpense: any) => {
    const category = currentExpense.category;
    const counter = currentExpense.amount;
    // const expensesCounter = counter + 1;


    if (expensesObj[category]) {
      expensesObj[category] = expensesObj[category] + counter;
    } else {
      expensesObj[category] = counter;
    }
    return expensesObj;
  }, {});
  console.log(dataCategory);
  const labes = Object.keys(dataCategory);
  const datas = Object.values(dataCategory);

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: labes,
      datasets: [
        {
          data: datas,
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-700'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--red-500'),
            documentStyle.getPropertyValue('--purple-500'),
            documentStyle.getPropertyValue('--cyan-500'),
            documentStyle.getPropertyValue('--pink-500'),
            documentStyle.getPropertyValue('--orange-600'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
            documentStyle.getPropertyValue('--red-400'),
            documentStyle.getPropertyValue('--purple-400'),
            documentStyle.getPropertyValue('--cyan-400'),
            documentStyle.getPropertyValue('--pink-400'),
            documentStyle.getPropertyValue('--orange-400'),
          ]
        }
      ]
    }
    console.log(data);

    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true
          }
        }
      }
    };

    setChartData(data);
    setChartOptions(options);
  }, []);


  return (
    <div className={css.reportsDiv}>
      <div className="card flex justify-content-center">
        <h3 style={{ color: "black" }}> Reports </h3>
        <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
      </div>
    </div>

  )
}

