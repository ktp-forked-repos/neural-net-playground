
Vue.component('neuron-graph', {
    template: '#neuron-graph-el',
    props: [
        'input',
        'weight',
        'bias',
        'label'
    ],
    data: function() {
        return {
            width: 200,
            minBias: -5,
            maxBias: 5,
            biasModel: this.bias || 0
        };
    },
    computed: {
        stepFunction: function() {
            return "M0 100H" + this.scaleX(this.biasModel) + "V0 H" + this.width;
        },
        sigmoidPath: function() {
            var path = "M";
            var bias = +this.biasModel;

            for (var x = -10; x <= 10; x += 0.25) {
                path += this.scaleX(x) + " " + (100 * (1 - sigmoid(x + bias))) + " ";
            }
            return path;
        },
        inputX: function() {
            return this.scaleX(this.input * this.weight);
        },
        domainWidth: function() {
            return Math.abs(this.weight) * this.width * 0.1;
        },
        domainX: function() {
            return (this.width - this.domainWidth) * 0.5;
        },
        output: function() {
            return this.input * this.weight > this.biasModel;
        }
    },
    methods: {
        scaleX: function(x) {
            return this.width * 0.5 + (x * this.width * 0.05);
        }
    },
});

var vm = new Vue({
    el: '#neural-net',
    data: {
        width: 200,
        input1: 0.2,
        minWeight: -5,
        maxWeight: 5,
        weight1a: 2,
        weight1b: -1,
        bias1a: 1,
        bias1b: 0,
    },
    computed: {
    },
    methods: {
        round: function(x) {
            return Math.round(x * 1000) / 1000;
        }
    },
});


function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}
