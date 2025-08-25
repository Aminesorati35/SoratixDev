import React, { useEffect, useRef, useState } from 'react';

const GeometricConstellationBackground = () => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;
    
    // Mouse movement handler
    const handleMouseMove = (event) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY
      });
    };
    
    // Mouse leave handler
    const handleMouseLeave = () => {
      setMousePosition({ x: null, y: null });
    };
    
    // Add mouse event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Geometric Node class
    class GeometricNode {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 4 + 2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.floatAmplitude = Math.random() * 30 + 10;
        this.floatSpeed = Math.random() * 0.02 + 0.01;
        this.floatOffset = Math.random() * Math.PI * 2;
        this.shape = Math.floor(Math.random() * 4); // 0: circle, 1: square, 2: triangle, 3: diamond
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.opacity = Math.random() * 0.6 + 0.3;
        // Use blue to purple gradient colors
        const colorOptions = ['#0088ff', '#4169E1', '#6A5ACD', '#8A2BE2', '#9370DB'];
        this.color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        
        // Drift motion
        this.driftX = (Math.random() - 0.5) * 0.3;
        this.driftY = (Math.random() - 0.5) * 0.3;
      }
      
      update() {
        // Check if mouse is over the node
        let mouseInfluence = 0;
        let mouseDistance = 0;
        let mouseAngle = 0;
        
        if (mousePosition.x !== null && mousePosition.y !== null) {
          const dx = mousePosition.x - this.x;
          const dy = mousePosition.y - this.y;
          mouseDistance = Math.sqrt(dx * dx + dy * dy);
          mouseAngle = Math.atan2(dy, dx);
          
          // Mouse influence decreases with distance
          const mouseRadius = 200; // Mouse influence radius
          mouseInfluence = mouseDistance < mouseRadius ? (1 - mouseDistance / mouseRadius) : 0;
        }
        
        // Floating motion with mouse influence
        if (mouseInfluence > 0) {
          // Particles move away from mouse
          const repelStrength = 30 * mouseInfluence;
          const attractStrength = 10 * mouseInfluence;
          
          // Repel effect (move away from mouse)
          this.x += Math.cos(mouseAngle + Math.PI) * repelStrength * (1 / (mouseDistance + 1)) * 5;
          this.y += Math.sin(mouseAngle + Math.PI) * repelStrength * (1 / (mouseDistance + 1)) * 5;
          
          // Increase animation effects when mouse is near
          this.rotationSpeed = this.rotationSpeed * (1 + mouseInfluence);
          this.currentSize = this.size * (1 + mouseInfluence * 0.5);
        } else {
          // Normal floating motion when mouse is away
          this.x = this.baseX + Math.sin(time * this.floatSpeed + this.floatOffset) * this.floatAmplitude;
          this.y = this.baseY + Math.cos(time * this.floatSpeed + this.floatOffset * 0.7) * this.floatAmplitude * 0.5;
          
          // Gradually return to base position
          this.baseX += (this.x - this.baseX) * 0.01;
          this.baseY += (this.y - this.baseY) * 0.01;
        }
        
        // Drift
        this.baseX += this.driftX;
        this.baseY += this.driftY;
        
        // Boundary wrapping
        if (this.baseX > canvas.width + 100) this.baseX = -100;
        if (this.baseX < -100) this.baseX = canvas.width + 100;
        if (this.baseY > canvas.height + 100) this.baseY = -100;
        if (this.baseY < -100) this.baseY = canvas.height + 100;
        
        // Rotation - enhanced when mouse is near
        this.rotation += this.rotationSpeed;
        
        // Pulsing - enhanced when mouse is near
        const pulseAmplitude = 1 + (mouseInfluence * 2);
        this.currentSize = this.size + Math.sin(time * 0.03 + this.pulsePhase) * pulseAmplitude;
        this.currentOpacity = this.opacity + Math.sin(time * 0.02 + this.pulsePhase) * 0.2 + (mouseInfluence * 0.3);
      }
      
      drawShape() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = this.currentOpacity;
        
        const size = this.currentSize;
        
        switch (this.shape) {
          case 0: // Circle
            ctx.beginPath();
            ctx.arc(0, 0, size, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(0, 0, size + 2, 0, Math.PI * 2);
            ctx.globalAlpha = this.currentOpacity * 0.3;
            ctx.stroke();
            break;
            
          case 1: // Square
            ctx.fillRect(-size, -size, size * 2, size * 2);
            ctx.globalAlpha = this.currentOpacity * 0.3;
            ctx.strokeRect(-size - 2, -size - 2, (size + 2) * 2, (size + 2) * 2);
            break;
            
          case 2: // Triangle
            ctx.beginPath();
            ctx.moveTo(0, -size);
            ctx.lineTo(size, size);
            ctx.lineTo(-size, size);
            ctx.closePath();
            ctx.fill();
            ctx.globalAlpha = this.currentOpacity * 0.3;
            ctx.beginPath();
            ctx.moveTo(0, -size - 2);
            ctx.lineTo(size + 2, size + 2);
            ctx.lineTo(-size - 2, size + 2);
            ctx.closePath();
            ctx.stroke();
            break;
            
          case 3: // Diamond
            ctx.beginPath();
            ctx.moveTo(0, -size);
            ctx.lineTo(size, 0);
            ctx.lineTo(0, size);
            ctx.lineTo(-size, 0);
            ctx.closePath();
            ctx.fill();
            ctx.globalAlpha = this.currentOpacity * 0.3;
            ctx.beginPath();
            ctx.moveTo(0, -size - 2);
            ctx.lineTo(size + 2, 0);
            ctx.lineTo(0, size + 2);
            ctx.lineTo(-size - 2, 0);
            ctx.closePath();
            ctx.stroke();
            break;
        }
        
        ctx.restore();
      }
      
      draw() {
        // Enhanced glow effect
        const glowSize = this.currentSize * 4;
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, glowSize
        );
        gradient.addColorStop(0, `${this.color}80`);
        gradient.addColorStop(0.5, `${this.color}40`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = this.currentOpacity * 0.6;
        ctx.fill();
        
        // Add secondary glow for more depth
        const secondaryGlowSize = this.currentSize * 2;
        const secondaryGradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, secondaryGlowSize
        );
        secondaryGradient.addColorStop(0, `${this.color}A0`);
        secondaryGradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, secondaryGlowSize, 0, Math.PI * 2);
        ctx.fillStyle = secondaryGradient;
        ctx.globalAlpha = this.currentOpacity * 0.8;
        ctx.fill();
        
        // Draw the shape
        this.drawShape();
      }
    }
    
    
    // Create nodes - increased density for more visual interest
    const nodesArray = [];
    const nodeCount = Math.min(70, Math.floor(window.innerWidth / 25));
    
    for (let i = 0; i < nodeCount; i++) {
      nodesArray.push(new GeometricNode());
    }
    
    // Draw constellation patterns
    const drawConstellations = () => {
      // Increase connection distance when mouse is present
      let maxDistance = 180;
      let mouseEnhancement = 1;
      
      // Check if mouse is present and enhance connections near mouse
      if (mousePosition.x !== null && mousePosition.y !== null) {
        maxDistance = 220; // Increased connection distance when mouse is present
        mouseEnhancement = 1.5; // Enhanced connection strength
      }
      
      const connections = [];
      
      // Find all valid connections
      for (let a = 0; a < nodesArray.length; a++) {
        for (let b = a + 1; b < nodesArray.length; b++) {
          const nodeA = nodesArray[a];
          const nodeB = nodesArray[b];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Check if connection is within mouse influence
          let connectionEnhancement = 1;
          if (mousePosition.x !== null && mousePosition.y !== null) {
            // Calculate distance from connection midpoint to mouse
            const midX = (nodeA.x + nodeB.x) / 2;
            const midY = (nodeA.y + nodeB.y) / 2;
            const mouseDx = midX - mousePosition.x;
            const mouseDy = midY - mousePosition.y;
            const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
            
            // Enhance connections near mouse
            const mouseRadius = 200;
            if (mouseDistance < mouseRadius) {
              connectionEnhancement = 1 + (1 - mouseDistance / mouseRadius) * 0.5;
            }
          }
          
          if (distance < maxDistance * connectionEnhancement) {
            connections.push({
              a: nodeA,
              b: nodeB,
              distance: distance,
              enhancement: connectionEnhancement
            });
          }
        }
      }
      
      // Draw connections with varying styles
      connections.forEach((connection, index) => {
        const { a, b, distance, enhancement } = connection;
        const opacity = (1 - distance / maxDistance) * 0.4 * enhancement;
        const animation = Math.sin(time * 0.01 + index * 0.2) * 0.5 + 0.5;
        
        // Animated dash pattern - enhanced when mouse is near
        const dashLength = 10 + animation * 5 * enhancement;
        const gapLength = 5 + animation * 3;
        
        ctx.setLineDash([dashLength, gapLength]);
        ctx.lineDashOffset = -time * 0.5 * enhancement;
        
        // Draw main line
        ctx.beginPath();
        // Use gradient for connections
        const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        gradient.addColorStop(0, a.color);
        gradient.addColorStop(1, b.color);
        ctx.strokeStyle = gradient;
        ctx.globalAlpha = opacity * animation;
        ctx.lineWidth = 1 * enhancement; // Thicker lines when mouse is near
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        
        // Draw energy pulse - enhanced when mouse is near
        if (animation > 0.7 / enhancement) { // More frequent pulses when mouse is near
          const pulsePos = (time * 0.02 * enhancement + index * 0.1) % 1;
          const pulseX = a.x + (b.x - a.x) * pulsePos;
          const pulseY = a.y + (b.y - a.y) * pulsePos;
          
          ctx.setLineDash([]);
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 2 * enhancement, 0, Math.PI * 2); // Larger pulse when mouse is near
          ctx.fillStyle = '#0088ff';
          ctx.globalAlpha = opacity * 0.8 * enhancement;
          ctx.fill();
        }
        
        ctx.setLineDash([]);
      });
      
      // Draw constellation triangles
      for (let i = 0; i < connections.length - 2; i++) {
        const conn1 = connections[i];
        const conn2 = connections[i + 1];
        const conn3 = connections[i + 2];
        
        // Check if we can form a triangle
        if (conn1.a === conn2.a && conn1.b === conn3.a && conn2.b === conn3.b) {
          const center = {
            x: (conn1.a.x + conn1.b.x + conn2.b.x) / 3,
            y: (conn1.a.y + conn1.b.y + conn2.b.y) / 3
          };
          
          const triangleOpacity = Math.sin(time * 0.005 + i * 0.1) * 0.1 + 0.05;
          
          ctx.beginPath();
          ctx.moveTo(conn1.a.x, conn1.a.y);
          ctx.lineTo(conn1.b.x, conn1.b.y);
          ctx.lineTo(conn2.b.x, conn2.b.y);
          ctx.closePath();
          // Create a gradient for the triangle
          const triangleGradient = ctx.createLinearGradient(
            conn1.a.x, conn1.a.y, 
            conn2.b.x, conn2.b.y
          );
          triangleGradient.addColorStop(0, '#0088ff40');
          triangleGradient.addColorStop(1, '#8A2BE240');
          ctx.fillStyle = triangleGradient;
          ctx.globalAlpha = triangleOpacity;
          ctx.fill();
        }
      }
    };
    
    // Floating geometric shapes - enhanced for more visual appeal
    const floatingShapes = [];
    const createFloatingShape = () => {
      // Increase probability when mouse is present
      let spawnProbability = 0.03;
      let spawnPosition = { x: Math.random() * canvas.width, y: canvas.height + 50 };
      
      // If mouse is present, occasionally spawn shapes near mouse
      if (mousePosition.x !== null && mousePosition.y !== null && Math.random() < 0.5) {
        spawnProbability = 0.06; // Double spawn rate when mouse is active
        
        // Spawn near mouse with some randomness
        const randomOffset = 100;
        spawnPosition = {
          x: mousePosition.x + (Math.random() - 0.5) * randomOffset,
          y: mousePosition.y + (Math.random() - 0.5) * randomOffset
        };
      }
      
      if (Math.random() < spawnProbability) {
        const colorOptions = ['#0088ff', '#4169E1', '#6A5ACD', '#8A2BE2', '#9370DB'];
        const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        
        floatingShapes.push({
          x: spawnPosition.x,
          y: spawnPosition.y,
          size: Math.random() * 25 + 15, // Larger shapes
          speed: Math.random() * 1.5 + 0.7, // Faster movement
          rotation: 0,
          rotationSpeed: (Math.random() - 0.5) * 0.08, // Faster rotation
          opacity: Math.random() * 0.4 + 0.2, // More visible
          shape: Math.floor(Math.random() * 4),
          life: 0,
          maxLife: 350, // Longer lifespan
          color: color,
          pulseSpeed: Math.random() * 0.05 + 0.02, // For pulsing effect
          mouseInfluenced: mousePosition.x !== null // Track if created during mouse presence
        });
      }
    };
    
    const updateFloatingShapes = () => {
      floatingShapes.forEach((shape, index) => {
        // Check for mouse influence
        let mouseInfluence = 0;
        let mouseDistance = 0;
        let mouseAngle = 0;
        
        if (mousePosition.x !== null && mousePosition.y !== null) {
          const dx = mousePosition.x - shape.x;
          const dy = mousePosition.y - shape.y;
          mouseDistance = Math.sqrt(dx * dx + dy * dy);
          mouseAngle = Math.atan2(dy, dx);
          
          // Mouse influence decreases with distance
          const mouseRadius = 250; // Mouse influence radius for shapes
          mouseInfluence = mouseDistance < mouseRadius ? (1 - mouseDistance / mouseRadius) : 0;
        }
        
        // Update movement based on mouse influence
        if (mouseInfluence > 0) {
          // Shapes move away from mouse with some attraction/repulsion dynamics
          const repelStrength = 2 * mouseInfluence;
          
          // Repel effect (move away from mouse)
          shape.x += Math.cos(mouseAngle + Math.PI) * repelStrength;
          shape.y += Math.sin(mouseAngle + Math.PI) * repelStrength;
          
          // Increase rotation speed when mouse is near
          shape.rotationSpeed *= (1 + mouseInfluence * 0.5);
        } else {
          // Normal movement when mouse is away
          shape.y -= shape.speed;
        }
        
        shape.rotation += shape.rotationSpeed;
        shape.life++;
        
        const fadeOut = shape.life > shape.maxLife * 0.8 ? 
          1 - (shape.life - shape.maxLife * 0.8) / (shape.maxLife * 0.2) : 1;
        
        // Add enhanced pulsing effect when mouse is near
        const pulseAmplitude = 5 * (1 + mouseInfluence * 2);
        const pulseEffect = Math.sin(time * shape.pulseSpeed * (1 + mouseInfluence * 0.5)) * pulseAmplitude;
        const pulsedSize = shape.size + pulseEffect;
        
        // Enhanced opacity when mouse is near
        const enhancedOpacity = shape.opacity * (1 + mouseInfluence * 0.5);
        
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation);
        ctx.globalAlpha = enhancedOpacity * fadeOut;
        ctx.strokeStyle = shape.color;
        ctx.lineWidth = 2 * (1 + mouseInfluence * 0.5); // Thicker lines when mouse is near
        
        // Enhanced glow effect when mouse is near
        const glowSize = pulsedSize * (1.5 + mouseInfluence);
        const gradient = ctx.createRadialGradient(
          0, 0, 0,
          0, 0, glowSize
        );
        gradient.addColorStop(0, `${shape.color}${Math.floor(64 + mouseInfluence * 64).toString(16)}`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(0, 0, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = enhancedOpacity * fadeOut * (0.5 + mouseInfluence * 0.3);
        ctx.fill();
        
        ctx.globalAlpha = enhancedOpacity * fadeOut;
        const size = pulsedSize;
        
        switch (shape.shape) {
          case 0:
            ctx.beginPath();
            ctx.arc(0, 0, size, 0, Math.PI * 2);
            ctx.stroke();
            break;
          case 1:
            ctx.strokeRect(-size, -size, size * 2, size * 2);
            break;
          case 2:
            ctx.beginPath();
            ctx.moveTo(0, -size);
            ctx.lineTo(size, size);
            ctx.lineTo(-size, size);
            ctx.closePath();
            ctx.stroke();
            break;
          case 3:
            ctx.beginPath();
            ctx.moveTo(0, -size);
            ctx.lineTo(size, 0);
            ctx.lineTo(0, size);
            ctx.lineTo(-size, 0);
            ctx.closePath();
            ctx.stroke();
            break;
        }
        
        ctx.restore();
        
        if (shape.y < -50 || shape.life > shape.maxLife) {
          floatingShapes.splice(index, 1);
        }
      });
    };
    
    // Track previous mouse position for movement detection
    let prevMousePosition = { x: null, y: null };
    
    // Mouse ripple effect
    const mouseRipples = [];
    
    // Create a ripple effect at mouse position
    const createMouseRipple = () => {
      if (mousePosition.x !== null && mousePosition.y !== null && 
          (prevMousePosition.x === null || 
           Math.abs(mousePosition.x - prevMousePosition.x) > 5 || 
           Math.abs(mousePosition.y - prevMousePosition.y) > 5)) {
        
        // Create ripple at current mouse position
        mouseRipples.push({
          x: mousePosition.x,
          y: mousePosition.y,
          radius: 5,
          maxRadius: 100,
          opacity: 0.7,
          color: '#0088ff'
        });
        
        // Update previous position
        prevMousePosition = { ...mousePosition };
      }
    };
    
    // Update and draw ripples
    const updateMouseRipples = () => {
      for (let i = 0; i < mouseRipples.length; i++) {
        const ripple = mouseRipples[i];
        
        // Expand ripple
        ripple.radius += 2;
        ripple.opacity -= 0.01;
        
        // Draw ripple
        if (ripple.opacity > 0) {
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
          ctx.strokeStyle = ripple.color;
          ctx.lineWidth = 2;
          ctx.globalAlpha = ripple.opacity;
          ctx.stroke();
          
          // Add glow effect to ripple
          const rippleGradient = ctx.createRadialGradient(
            ripple.x, ripple.y, 0,
            ripple.x, ripple.y, ripple.radius
          );
          rippleGradient.addColorStop(0, `${ripple.color}00`);
          rippleGradient.addColorStop(0.7, `${ripple.color}10`);
          rippleGradient.addColorStop(1, `${ripple.color}00`);
          
          ctx.fillStyle = rippleGradient;
          ctx.fill();
        } else {
          // Remove faded ripples
          mouseRipples.splice(i, 1);
          i--;
        }
      }
    };
    
    // Animation loop
    const animate = () => {
      time++;
      
      // Clear canvas and add subtle gradient background
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create a subtle background gradient
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.7
      );
      bgGradient.addColorStop(0, 'rgba(10, 21, 37, 0)');
      bgGradient.addColorStop(1, 'rgba(10, 21, 37, 0.2)');
      
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Create and update mouse ripples
      createMouseRipple();
      updateMouseRipples();
      
      // Draw custom cursor
      if (mousePosition.x !== null && mousePosition.y !== null) {
        // Outer glow
        const cursorGradient = ctx.createRadialGradient(
          mousePosition.x, mousePosition.y, 0,
          mousePosition.x, mousePosition.y, 20
        );
        cursorGradient.addColorStop(0, 'rgba(0, 136, 255, 0.3)');
        cursorGradient.addColorStop(0.5, 'rgba(0, 136, 255, 0.1)');
        cursorGradient.addColorStop(1, 'rgba(0, 136, 255, 0)');
        
        ctx.beginPath();
        ctx.arc(mousePosition.x, mousePosition.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = cursorGradient;
        ctx.globalAlpha = 0.7;
        ctx.fill();
        
        // Inner cursor
        ctx.beginPath();
        ctx.arc(mousePosition.x, mousePosition.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#0088ff';
        ctx.globalAlpha = 0.9;
        ctx.fill();
        
        // Cursor ring
        ctx.beginPath();
        ctx.arc(mousePosition.x, mousePosition.y, 10, 0, Math.PI * 2);
        ctx.strokeStyle = '#0088ff';
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.7;
        ctx.stroke();
      }
      
      // Update and draw nodes
      nodesArray.forEach(node => {
        node.update();
        node.draw();
      });
      
      // Draw constellation patterns
      drawConstellations();
      
      // Handle floating shapes
      createFloatingShape();
      updateFloatingShapes();
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
  // Initialize animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ pointerEvents: 'auto', cursor: 'none' }}
    />
  );
};

export default GeometricConstellationBackground;