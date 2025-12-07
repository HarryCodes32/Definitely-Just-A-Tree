addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#498563",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ], // <-- Fix 1: Removed extra }, and added proper closing bracket and comma
    layerShown(){return true}, // <-- Fix 2: Changed to proper key-value pair and added comma
    upgrades: { // <-- Fix 3: Added the upgrades property key and opening brace
        11: {
            title: "Hello!",
            description: "Double your point gain.",
            cost: new Decimal(10),
        }, // <-- Fix 4: The 'if (hasUpgrade...)' line does not belong here. It is for the point gain function.
    }, // <-- Fix 5: Added closing brace for upgrades
    // The line below should be in the point gain function, not here:
    // if (hasUpgrade('p', 11)) gain = gain.times(2) 
    
    // Fix 6: Removed extraneous closing brackets/commas
})
