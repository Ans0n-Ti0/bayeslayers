var m = require("mithril")
var Bayes = require("../models/Bayes")

module.exports = {
    oninit: Bayes.loadList,
    view: function() {
        return m(".pure-menu", [
            m("span.pure-menu-heading", "Bayesnets"),
            m("ul.pure-menu-list", Bayes.list.map(function(net) {
                return m("li.pure-menu-item", m("a.pure-menu-link", {href: "/nets/" + net.name, oncreate: m.route.link}, net.name))
            })),
        ])
    }
}