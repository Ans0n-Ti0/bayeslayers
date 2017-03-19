var m = require("mithril")
var Bayes = require("../models/Bayes")

module.exports = {
    oninit: function(vnode) {
        Bayes.loadOLMap(vnode.attrs.olmap);
        Bayes.loadFeature();
        Bayes.loadNet(vnode.attrs.netid);
    },
    view: function() {
        return m("form.pure-form.pure-form-aligned", [
            m("span.pure-menu-heading", "Bayesnet: " + unescape(Bayes.net.name)),
            m("button.pure-button.pure-button-primary[type=submit]", {onclick: Bayes.saveFeature}, "Save"),
            m("button.pure-button.pure-button-primary[type=submit]", {onclick: Bayes.loadFeature}, "Load"),
            m("fieldset", m(".pure-control-group", [
                    m("button.pure-button.pure-button-primary[type=submit]", {onclick: Bayes.inferState}, "Infer"),
                    m("select", {id: "target", oninput: m.withAttr("selectedIndex", Bayes.setTarget), value: Bayes.target.name}, Bayes.nodes.map(function(node) {
                        return m("option", node.name)
                    }))
            ])),
            m("fieldset", Bayes.nodes.map(function(node) {
                return m(".pure-control-group", [
                    m("label", {for: node.name}, node.name),
                    m("select", {id: node.name, oninput: m.withAttr("selectedIndex", Bayes.setState, node), value: Bayes.states[node.name]}, [m("option", "")].concat(node.states.map(function(state) {
                        return m("option", state)
                    })))
                ])
            })),
        ])
    }
}