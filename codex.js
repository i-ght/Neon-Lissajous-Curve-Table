/* 
In Funk we trust
https://www.youtube.com/watch?v=GmDNMx9FRgI
*/
// Neon color palette as a queue
const neonColors = [
    '#39FF14', // Neon green
    '#FF10F0', // Neon pink
    '#00FFFF', // Neon cyan
    '#FF007F', // Neon magenta
    '#FF6600', // Neon orange
    '#CCFF00', // Neon lime
    '#FF00FF', // Neon purple
  ];
  
  // Function to get the next color in the queue
  function getNextColor() {
    const color = neonColors.shift(); // Get the first color in the queue
    neonColors.push(color); // Move it to the end of the queue
    return color;
  }
  
  // Function to draw a Lissajous curve with a neon effect
  function drawLissajous(ctx, width, height, a, b, delta, color) {
    const scale = 0.4; // Scale factor to fit the curve in the canvas
    const steps = 1000; // Number of points to draw
    ctx.clearRect(0, 0, width, height); // Clear the canvas before redrawing
  
    // Neon glow effect
    ctx.shadowBlur = 20;
    ctx.shadowColor = color;
  
    ctx.beginPath();
    ctx.strokeStyle = color; // Set the stroke color
  
    for (let t = 0; t < 2 * Math.PI; t += (2 * Math.PI) / steps) {
      const x = width / 2 + width / 2 * scale * Math.sin(a * t + delta);
      const y = height / 2 + height / 2 * scale * Math.sin(b * t);
      if (t === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
  
    ctx.stroke();
  }
  
  // Function to create a canvas and draw a Lissajous curve
  function createCanvas(a, b) {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    const color = getNextColor(); // Assign the next color in the queue
    return { canvas, ctx, a, b, delta: 0, color };
  }
  
  // Generate a table of Lissajous curves with unique frequency pairs
  const container = document.getElementById('canvasContainer');
  const frequencies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // Frequencies for a and b
  const canvases = [];
  
  // Use a Set to track unique pairs
  const usedPairs = new Set();
  
  frequencies.forEach(a => {
    frequencies.forEach(b => {
      // Create a unique key for the pair (a, b) in a consistent order
      const pairKey = JSON.stringify([Math.min(a, b), Math.max(a, b)]);
  
      // Only proceed if this pair hasn't been used yet
      if (!usedPairs.has(pairKey)) {
        const canvasData = createCanvas(a, b);
        container.appendChild(canvasData.canvas);
        canvases.push(canvasData);
        usedPairs.add(pairKey); // Mark this pair as used
      }
    });
  });
  
  // Animation loop
  function animate() {
    canvases.forEach(canvasData => {
      canvasData.delta += 0.02; // Increment phase difference for animation
      drawLissajous(canvasData.ctx, canvasData.canvas.width, canvasData.canvas.height, canvasData.a, canvasData.b, canvasData.delta, canvasData.color);
    });
    requestAnimationFrame(animate); // Loop the animation
  }
  
  animate(); // Start the animation