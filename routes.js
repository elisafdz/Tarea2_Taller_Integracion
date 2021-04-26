const koaRouter = require('koa-router');
const router = new koaRouter()

const get = require("./routes/get");
const albums = require("./routes/albums");
const tracks = require("./routes/tracks");
router.use("/", get.routes());
router.use("/", albums.routes());
router.use("/", tracks.routes());
module.exports = router;