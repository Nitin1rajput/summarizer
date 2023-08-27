const {
  summarizeContent,
  summarizeWebpage,
} = require("../controllers/summarise.controller");

const router = require("express").Router();

router.post("/", summarizeContent);
router.get("/web-page", summarizeWebpage);

module.exports = router;
