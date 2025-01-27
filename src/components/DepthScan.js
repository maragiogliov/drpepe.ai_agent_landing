import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const DepthScan = () => {
  const containerRef = useRef(null);
  const [textureLoaded, setTextureLoaded] = useState(false);
  let camera, scene, renderer, uniforms;
  let textures = [];
  let startTime;

  useEffect(() => {
    let texture;

    const loadTextures = () => {
      // Load texture asynchronously
      const loader = new THREE.TextureLoader();
      loader.load("path_to_your_texture.png", (loadedTexture) => {
        textures.push(loadedTexture);
        texture = loadedTexture; // Assign loaded texture to a variable
        setTextureLoaded(true); // Once loaded, update state to trigger material creation
      });
    };

    const init = () => {
      loadTextures();

      // Setup scene, camera, and renderer
      const container = containerRef.current;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      startTime = Date.now();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      scene = new THREE.Scene();

      const geometry = new THREE.PlaneGeometry(16, 9);

      // Initial uniforms, but texture will be set after it's loaded
      // eslint-disable-next-line react-hooks/exhaustive-deps
      uniforms = {
        time: { type: "f", value: 1.0 },
        resolution: { type: "v2", value: new THREE.Vector2() },
        texture: { type: "t", value: null }, // Start with null until texture is loaded
      };

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { type: "f", value: 1.0 },
          resolution: { type: "v2", value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          texture: { type: "t", value: texture },  // Ensure this is correctly set
        },
        vertexShader: document.getElementById("vertexShader").textContent,
        fragmentShader: document.getElementById("fragmentShader").textContent,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      renderer = new THREE.WebGLRenderer();
      container.appendChild(renderer.domElement);
      onWindowResize();
      window.addEventListener("resize", onWindowResize, false);

      animate();
    };

    const onWindowResize = () => {
      const container = containerRef.current;
      const canvasWidth = container.offsetWidth;
      const canvasHeight = container.offsetHeight;
      uniforms.resolution.value.x = canvasWidth;
      uniforms.resolution.value.y = canvasHeight;
      renderer.setSize(canvasWidth, canvasHeight);
    };

    const animate = () => {
      render();
      requestAnimationFrame(animate);
    };

    const render = () => {
      const currentTime = Date.now();
      uniforms.time.value = (currentTime - startTime) / 1000.0;
      if (textureLoaded) {
        uniforms.texture.value = textures[0]; // Set texture once it's loaded
      }
      renderer.render(scene, camera);
    };

    init();

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, [textureLoaded]);

  return (
    <div>
      <div ref={containerRef}></div>
      <script id="vertexShader" type="x-shader/x-vertex">
        {`
          void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
      </script>
      <script id="fragmentShader" type="x-shader/x-fragment">
  {`
    uniform float time;
    uniform vec2 resolution;
    uniform sampler2D texture;
    
    void main() {
      vec2 uv = gl_FragCoord.xy / resolution;
      vec4 texColor = texture2D(texture, uv); // Corrected to texture2D for WebGL 1.0
      float depth = texColor.r;
      gl_FragColor = vec4(vec3(depth), 1.0);
    }
  `}
</script>
    </div>
  );
};

export default DepthScan;
