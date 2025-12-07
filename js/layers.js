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
    
    // 👇 Upgrade effects are calculated here
    gainMult() { 
        let mult = new Decimal(1)
        if (hasUpgrade('p', 11)) mult = mult.times(2) 
        if (hasUpgrade('p', 12)) mult = mult.times(1.5) 
        if (hasUpgrade('p', 13)) mult = mult.times(2) 
        if (hasUpgrade('p', 14)) mult = mult.times(3) 
        
        // FIX 1: Removed the misplaced '}' brace here. 
        // The closing brace for the function is at the end.
        
        return mult
    }, // <-- The function closes here correctly
    
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
        13: { // <-- FIX 2: Added missing comma and closing brace for upgrade 13.
            title: "Progression is pretty slow currently...",
            description: "Another Doubling...",
            cost: new Decimal(250),
        }, // <--- FIX 2
        14: {
            title: "Oh look! Tripling!",
            description: "You finally tripling stuff now!",
            cost: new Decimal(2500),
        },	
    }, // <-- FIX 3: Added missing comma after the 'upgrades' object.
})
