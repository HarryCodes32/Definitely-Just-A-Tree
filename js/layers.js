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
        
        // Reverted: Static multiplier of 2
        if (hasUpgrade('p', 11)) mult = mult.times(2) 
        
        // Reverted: Static multiplier of 1.5
        if (hasUpgrade('p', 12)) mult = mult.times(1.5) 
        
        // Reverted: Static multiplier of 2
        if (hasUpgrade('p', 13)) mult = mult.times(2) 
        
        if (hasUpgrade('p', 14)) mult = mult.times(3) 
        
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
            // Reverted description
            description: "Double your point gain.",
            cost: new Decimal(10),
        },
        12: {
            title: "Your progressing slightly faster now...",
            // Reverted description
            description: "One and one half's the amount of points gained when clicking.",
            cost: new Decimal(50),
        },
        13: {
            title: "Progression is pretty slow currently...",
            // Reverted description
            description: "Another Doubling...",
            cost: new Decimal(250),
            // Removed effect() and effectDisplay() functions
        }, // <-- FIXED: Closing brace for upgrade 13 was here
        14: {
            title: "Some more points it seems?",
            description: "Your getting some stuff",
            cost: new Decimal(2500),
        },
    },
})
