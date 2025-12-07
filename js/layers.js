addLayer("p", {
    name: "prestige",
    symbol: "P",
    position: 0,
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#498563",
    requires: new Decimal(10),
    resource: "prestige points",
    baseResource: "points",
    baseAmount() {return player.points},
    type: "normal",
    exponent: 0.5,
    
    // Upgrade effects are calculated here
    gainMult() { 
        let mult = new Decimal(1)
        if (hasUpgrade('p', 11)) mult = mult.times(2) 
        if (hasUpgrade('p', 12)) mult = mult.times(1.5) 
        if (hasUpgrade('p', 13)) {
            let pointBoost = player.points.pow(-0.75).add(1)
            mult = mult.times(pointBoost)
        }
        
        return mult
    },
    
    gainExp() { 
        return new Decimal(1)
    },
    row: 0,
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Hello!",
            description: "Double your point gain.",
            cost: new Decimal(10),
        },
        12: {
            title: "Your progressing slightly faster now...",
            description: "One and one half's the amount of points gained when clicking.",
            cost: new Decimal(50),
        },
        13: {
            title: "Progression is pretty slow currently...",
            description: "Using multipliers it gives a slight boost.",
            cost: new Decimal(250),
            
            // 👇 New Dynamic Boost Display
            tooltip: () => {
                let boost = player.points.pow(-0.75).add(1)
                return "Currently: **x" + format(boost) + "**"
            },
        },	
    },
})
