import React from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

function Orders2Cards(props) {
  console.log(props);
  const columnas = [
    {
      name: "ID",
      selector: "id",
      sortable: true,
    },
    {
      name: "CREATE",
      selector: "create",
      sortable: true,
    },
  ];

  const data = [props];

  /*   let ArrayStocks = JSON.parse(props.stocks); */
  /*   console.log(stocks); */
  return (
    <div>
      <DataTable columns={columnas} data={data} />
      {/*  <p>Cod ID: {id}</p>
      <p>Creation Date: {create}</p>
      <p>ID Paypal: {idPaypal}</p>
      <p>State Order: {stateOrder}</p>
      <p>Price Total: {price}</p>
      <Link to={`/OrderDetails/${id}`}>
        <button>ViewDetails</button>
      </Link>
 */}
      {/*ArrayStocks.length !== 0 ?
                ArrayStocks.map((c) => (
                  <p>amount:{c.amount} value: {c.value} total: {(c.amount*c.value).toFixed(2)} </p>
                )) :
                <div className="cards">
                    <p>
                        <h3 className={""}>No Stocks.</h3>
                    </p>
                </div>*/}
      {/*   <div>" "</div> */}
    </div>
  );
}

export default Orders2Cards;
