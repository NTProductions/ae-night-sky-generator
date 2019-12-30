// night sky generator
// create custom number of glowing objects on a black background
// this is to create a sort of star wars background effect, and give you a randomised night sky every time

function generateNightSky(numStars, sizeVariation, glowRGB) {
        app.beginUndoGroup("Generate Night Sky");
        nightSkyComp = app.project.items.addComp("Night Sky", 1920, 1080, 1, 5, 30);
        var starLayers = generateStars(nightSkyComp, numStars, sizeVariation, glowRGB);
        randomisePosition(starLayers);
        
        nightSkyComp.openInViewer();
        app.endUndoGroup();
    }

function generateStars(comp, num, variation, rgb) {
        var layers = [];
        var randomInt;
        for(var i = 1; i <= num; i++) {
            variation /= 10;
            randomInt = Math.floor(Math.random() * 2);
            if(randomInt == 0) {
                variation *= -1;
                }
            layers.push(comp.layers.addSolid([1, 1, 1], "Star_"+i.toString(), Math.floor(2+variation), Math.floor(2+variation), 1, 5));
            layers[i-1].Effects.addProperty("ADBE Glo2");
            layers[i-1].effect(1).property(3).expression = 'wiggle('+(Math.random() * 2).toString()+', '+Math.floor(Math.random() * 15).toString()+')';
            layers[i-1].Effects.addProperty("ADBE Tint");
            layers[i-1].effect(2).property(2).setValue(rgb);
            }
        return layers;
    }

function randomisePosition(layers) {
        var comp = layers[0].containingComp;
        for(var i = 0; i < layers.length; i++) {
            layers[i].property("ADBE Transform Group").property("ADBE Position").setValue([Math.floor(Math.random() * comp.width), Math.floor(Math.random() * comp.height)]);
            }
    }

generateNightSky(250, 10, [.3176, .8475, 1]);
// recommended ranges
// numStars [50-1000]
// sizeVariation [0-50]
// glowRGB [anyColour]