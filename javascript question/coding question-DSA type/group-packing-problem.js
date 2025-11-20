//Bin packing problem

function groupOrders(orders) {
  // sort by weight descending
  orders.sort((a, b) => b.weight - a.weight);
  const vans = [];
  for (let order of orders) {
    let placed = false;
    // try to put this order into an existing van
    for (let van of vans) {
      const currentWeight = van.reduce((sum, o) => sum + o.weight, 0);
      if (currentWeight + order.weight <= 100) {
        van.push(order);
        placed = true;
        break;
      }
    }
    // if not placed, create a new van
    if (!placed) {
      vans.push([order]);
    }
  }
  return vans;
}
const orders = [
  { orderId: "A1", weight: 40 },
  { orderId: "B2", weight: 70 },
  { orderId: "C3", weight: 20 },
  { orderId: "D4", weight: 50 },
  { orderId: "E5", weight: 30 },
  { orderId: "F6", weight: 60 },
];
console.log(groupOrders(orders));
