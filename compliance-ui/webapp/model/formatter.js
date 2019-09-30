sap.ui.define([], function () {
	"use strict";

	var Formatter = {

		blocktimeDisplay : function (blockTime) {
/*			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "MMM d, yyyy, hh:mm a"
			});
			return oDateFormat.format(new Date(blockTime + ' UTC')); */
			var d = new Date(0);
			return new Date(d.setUTCSeconds(blockTime));
		}
	};
	return Formatter;

}, /* bExport= */ true);