"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Flag = /** @class */ (function () {
    function Flag(code, description) {
        this.code = code;
        this.description = description;
    }
    return Flag;
}());
exports.Flag = Flag;
exports.FLAGS = [
    new Flag("AL", ""),
    new Flag("AK", ""),
    new Flag("AZ", ""),
    new Flag("AR", ""),
    new Flag("CA", ""),
    new Flag("CO", ""),
    new Flag("CT", ""),
    new Flag("DE", ""),
    new Flag("FL", ""),
    new Flag("GA", ""),
    new Flag("HI", ""),
    new Flag("ID", ""),
    new Flag("IL", ""),
    new Flag("IN", ""),
    new Flag("IA", ""),
    new Flag("KS", ""),
    new Flag("KY", ""),
    new Flag("LA", ""),
    new Flag("ME", ""),
    new Flag("MD", ""),
    new Flag("MA", ""),
    new Flag("MI", ""),
    new Flag("MN", ""),
    new Flag("MS", ""),
    new Flag("MO", ""),
    new Flag("MT", ""),
    new Flag("NE", ""),
    new Flag("NV", ""),
    new Flag("NH", ""),
    new Flag("NJ", ""),
    new Flag("NM", ""),
    new Flag("NY", ""),
    new Flag("NC", ""),
    new Flag("ND", ""),
    new Flag("OH", ""),
    new Flag("OK", ""),
    new Flag("OR", ""),
    new Flag("PA", ""),
    new Flag("RI", ""),
    new Flag("SC", ""),
    new Flag("SD", ""),
    new Flag("TN", ""),
    new Flag("TX", ""),
    new Flag("UT", ""),
    new Flag("VT", ""),
    new Flag("VA", ""),
    new Flag("WA", ""),
    new Flag("WV", ""),
    new Flag("WI", ""),
    new Flag("WY", "")
];
exports.FLAG_OBJECTS = exports.FLAGS.map(function (f) {
    var result = {};
    result[f.code] = f;
    return result;
});
//# sourceMappingURL=flags.js.map