// const circles = document.querySelectorAll(".circle");

// circles.forEach((circle) => {
//   const hue = Math.floor(Math.random() * 360);
//   console.log(hue);
//   circle.style.cssText = `
//   background-color: hsl(${hue},100%,90%);
//   border-left-color: hsl(${hue},100%,50%);
//   `;
// });

const arr = [
  {
    name: "foo",
    value: 1,
  },
  {
    name: "bar",
    value: 2,
  },
  {
    name: "baz",
    value: 3,
  },
];

const arr2 = new Array(arr.length).fill({});

arr2.forEach((obj, i) => {
  obj.name = arr[i].name;
  obj.value = i;
});

console.log(arr2);

//result is:
// [
//   {
//     name: "baz",
//     value: 2
//   },
//   {
//     name: "baz",
//     value: 2
//   },
//   {
//     name: "baz",
//     value: 2
//   }
// ]
