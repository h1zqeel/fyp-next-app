// module.exports = {
//     async headers() {
//       return [
//         {
//           source: "/test/individual",
//           headers: [
//             { key: "Access-Control-Allow-Origin", value: "*" },
//           ],
//         },
//       ]
//     },
//   }

module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/covid_api",
        destination: "https://fyp-flask-app.herokuapp.com/image",
      },
    ];
  };
  return {
    rewrites,
  };
};