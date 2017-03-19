var m = require("mithril")

var Bayes = {
    list: [],
    loadList: function() {
        return m.request({
            method: "GET",
            url: "http://127.0.0.1:8080/api/nets",
        })
        .then(function(result) {
            Bayes.list = result
        })
    },
    net: {},
    nodes: [],
    states: {},
    loadNet: function(netid) {
        return m.request({
            method: "GET",
            url: "http://127.0.0.1:8080/api/nets/:netid",
            data: {netid: netid},
        })
        .then(function(result) {
            Bayes.net = result;
            Bayes.nodes = result.nodes;
            nodesLength = result.nodes.length;
            for (var i = 0; i < nodesLength; i++) {
                Bayes.nodes[i].states = result.nodes[i].states;
                if (typeof result.nodes.levels !== "undefined") {
                    Bayes.nodes[i].levels = result.nodes[i].levels;
                }
            }
        })
    },
    setState: function(value) {
        Bayes.states[this.name] = this.states[value - 1]
    },
    target: "",
    setTarget: function(value) {
        Bayes.target = Bayes.nodes[value]
    },
    inferred: {},
    inferState: function() {
        return m.request({
            method: "POST",
            url: "http://127.0.0.1:8080/api/nets/" + Bayes.net.name + "/nodes/" + Bayes.target.name,
            data: {id: "test", cases: [Bayes.states]},
        })
        .then(function(result) {
            Bayes.inferred = result.results[0];
            if (typeof Bayes.inferred.error !== "undefined" && Bayes.inferred.error !== "") {
                alert(Bayes.inferred.error);
            } else {
                alert(Bayes.inferred.value);
            }
        })
    },
    olmap: {},
    loadOLMap: function(map) {
        Bayes.olmap = map
    },
    saveFeature: function() {
        feature = Bayes.olmap.get("highlightFeature");
        if (typeof feature !== "undefined") {
            state = {}
            Object.assign(state, Bayes.states)
            feature.set("state", state, false)
        }
    },
    loadFeature: function() {
        feature = Bayes.olmap.get("highlightFeature");
        if (typeof feature !== "undefined") {
            Bayes.states = {}
            state = feature.get("state")
            if (typeof state !== "undefined") {
                Object.assign(Bayes.states, state)
            }
        }
    }
}

module.exports = Bayes