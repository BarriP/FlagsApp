"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Flag = /** @class */ (function () {
    function Flag(code, name, description) {
        this.code = code;
        this.description = description;
        this.name = name;
    }
    Object.defineProperty(Flag.prototype, "imageUrl", {
        get: function () {
            return "http://usa.banderas-mundo.es/data/flags/normal/" + this.code.toLowerCase() + ".png";
        },
        enumerable: true,
        configurable: true
    });
    return Flag;
}());
exports.Flag = Flag;
exports.FLAGS = [
    new Flag("AL", "Alabama", ""),
    new Flag("AK", "Alaska", ""),
    new Flag("AZ", "Arizona", ""),
    new Flag("AR", "Arkansas", ""),
    new Flag("CA", "California", ""),
    new Flag("CO", "Colorado", ""),
    new Flag("CT", "Connecticut", ""),
    new Flag("DE", "Delaware", ""),
    new Flag("FL", "Florida", ""),
    new Flag("GA", "Georgia", ""),
    new Flag("HI", "Hawaii", ""),
    new Flag("ID", "Idaho", ""),
    new Flag("IL", "Illinois", ""),
    new Flag("IN", "Indiana", ""),
    new Flag("IA", "Iowa", ""),
    new Flag("KS", "Kansas", ""),
    new Flag("KY", "Kentucky", ""),
    new Flag("LA", "Louisiana", ""),
    new Flag("ME", "Maine", ""),
    new Flag("MD", "Maryland", ""),
    new Flag("MA", "Massachusetts", ""),
    new Flag("MI", "Michigan", ""),
    new Flag("MN", "Minnesota", ""),
    new Flag("MS", "Mississippi", ""),
    new Flag("MO", "Missouri", ""),
    new Flag("MT", "Montana", ""),
    new Flag("NE", "Nebraska", ""),
    new Flag("NV", "Nevada", ""),
    new Flag("NH", "New Hampshire", ""),
    new Flag("NJ", "New Jersey", ""),
    new Flag("NM", "New Mexico", ""),
    new Flag("NY", "New York", ""),
    new Flag("NC", "North Carolina", ""),
    new Flag("ND", "North Dakota", ""),
    new Flag("OH", "Ohio", ""),
    new Flag("OK", "Oklahoma", ""),
    new Flag("OR", "Oregon", ""),
    new Flag("PA", "Pennsylvania", ""),
    new Flag("RI", "Rhode Island", ""),
    new Flag("SC", "South Carolina", ""),
    new Flag("SD", "South Dakota", ""),
    new Flag("TN", "Tennessee", ""),
    new Flag("TX", "Texas", ""),
    new Flag("UT", "Utah", ""),
    new Flag("VT", "Vermont", ""),
    new Flag("VA", "Virginia", ""),
    new Flag("WA", "Washington", ""),
    new Flag("WV", "West virginia", ""),
    new Flag("WI", "Wisconsin", ""),
    new Flag("WY", "Wyoming", "")
];
exports.FLAG_OBJECTS = exports.FLAGS.map(function (f) {
    var result = {};
    result[f.code] = f;
    return result;
});
exports.FLAG_NAMES = exports.FLAGS.map(function (f) {
    return {
        name: f.name,
        code: f.code
    };
});
//# sourceMappingURL=flags.js.map