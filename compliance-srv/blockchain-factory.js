var MultiChain = require("./multichain.js");

module.exports = function (creds, logger, cb) {
    var opts = {};
    var type = "";

    switch (type.toLowerCase()) {
        case "":
            opts.streamId = process.env.MC_STREAM_ID;
            MultiChain(creds, opts, logger, cb);
            break;
        default:
            logger.error("No blockchain technology specified.");
            break;
    }
}