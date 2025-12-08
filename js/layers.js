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
        
        // Apply the dynamic effect of upgrade 13
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        
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
            description: "Double your point gain.",
            cost: new Decimal(10),
        },
        12: {
            title: "Your progressing slightly faster now...",
            description: "One and one half's the amount of points gained when clicking.",
            cost: new Decimal(50),
        },
        13: {
            title: "Prestige Power!",
            // Display the current calculated multiplier in the description
            description: "Prestige Point gain is multiplied by **(1 + 0.1 × Prestige Points)**.",
            cost: new Decimal(250),
            
            // This function calculates the multiplier based on player.p.points
            effect() {
                // Get the player's prestige points (p.points)
                let pp = player.p.points
                
                // Calculate the multiplier: 1 + (0.1 * PP)
                let power = pp.times(0.1).plus(1) 
                
                return power
            },
            
            // This provides the text displayed below the upgrade to show the actual effect
            effectDisplay() {
                // Returns the calculated effect, rounded to 3 decimal places for display
                return "x" + format(upgradeEffect('p', 13), 3)
            }
        },
        14: {
            title: "Oh look! Tripling!",
            description: "You finally tripling stuff now!",
            cost: new Decimal(2500),
        },
    },
})
