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
    
    // 👇 Upgrade effects are added here
    gainMult() { 
        let mult = new Decimal(1)
        if (hasUpgrade('p', 11)) mult = mult.times(2) // Upgrade 11 effect
        if (hasUpgrade('p', 12)) mult = mult.times(2) // <-- Upgrade 12 effect added
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
        11: { // <-- Fix 1: Added closing brace and comma here
            title: "Hello!",
            description: "Double your point gain.",
            cost: new Decimal(10),
        }, // <--- FIX 1
        12: {
            title: "Some doubling action.",
            description: "Doubles the amount of points gained when clicking.",
            cost: new Decimal(350),
        },
    },
})
