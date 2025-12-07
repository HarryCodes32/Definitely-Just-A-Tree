addLayer("p", {
    name: "prestige",
    symbol: "P",
    position: 0,
    
    // Core Data
    startData() { 
        return {
            unlocked: true, // Set to true to ensure layer is immediately visible
            points: new Decimal(0),
        }
    },
    color: "#498563",
    requires: new Decimal(10),
    resource: "prestige points",
    baseResource: "points",
    baseAmount() {
        return player.points
    },
    type: "normal",
    exponent: 0.5,
    
    // Gain Multiplier (where all upgrade effects are applied)
    gainMult() { 
        let mult = new Decimal(1)
        
        // Upgrade 11: Double point gain
        if (hasUpgrade('p', 11)) mult = mult.times(2) 
        
        // Upgrade 12: 1.5x point gain
        if (hasUpgrade('p', 12)) mult = mult.times(1.5) 
        
        // Upgrade 13: Double point gain (as requested in the last working snippet)
        if (hasUpgrade('p', 13)) mult = mult.times(2) 
        
        // Upgrade 14: Triple point gain
        if (hasUpgrade('p', 14)) mult = mult.times(3) 
        
        return mult
    }, 
    
    gainExp() { 
        return new Decimal(1)
    },
    
    // Visibility and Layout
    row: 0,
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() {
        return true
    }, // This ensures the layer is always visible
    
    // Upgrades
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
            description: "Another Doubling...",
            cost: new Decimal(250),
        },
        14: {
            title: "Oh look! Tripling!",
            description: "You finally tripling stuff now!",
            cost: new Decimal(2500),
        }, // No comma here, as it is the last item in the 'upgrades' object
    }, // No comma here, as it is the last item in the 'p' object
})
})
