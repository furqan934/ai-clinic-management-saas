const app = require("./src/app");
const connect_db = require("./src/config/db");

connect_db();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});