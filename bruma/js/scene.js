/* ============================================================
   scene.js — Taza de café 3D con vapor (Three.js r128)
   Cámara ligada al scroll. Degradación elegante si falla.
   ============================================================ */
(function () {
  'use strict';

  var canvas = document.getElementById('scene');
  if (!canvas || typeof THREE === 'undefined') {
    if (canvas) canvas.style.display = 'none';
    return;
  }

  var isMobile = window.innerWidth < 900;

  // --- Renderer ---
  var renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: !isMobile,
    alpha: true
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  if (!isMobile) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  // --- Escena ---
  var BG = 0x1c130b;
  var scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(BG, 0.05);

  var camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 5, 11);
  camera.lookAt(-2.6, 2.2, 0);

  // --- Materiales ---
  var ceramic = new THREE.MeshStandardMaterial({ color: 0xe7dac1, roughness: 0.58, metalness: 0.04 });
  var ceramicInner = new THREE.MeshStandardMaterial({ color: 0xd8c3a6, roughness: 0.5, metalness: 0.04, side: THREE.BackSide });
  var coffee = new THREE.MeshStandardMaterial({ color: 0x3a2412, roughness: 0.22, metalness: 0.18 });
  var foam = new THREE.MeshStandardMaterial({ color: 0xe9d8bf, roughness: 0.6, metalness: 0.0 });

  // --- Taza ---
  var cup = new THREE.Group();
  scene.add(cup);

  var body = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.02, 1.7, 48, 1, true), ceramic);
  body.position.y = 0.85;
  body.castShadow = !isMobile;
  cup.add(body);

  var bodyInner = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.0, 1.66, 48, 1, true), ceramicInner);
  bodyInner.position.y = 0.87;
  cup.add(bodyInner);

  var bottom = new THREE.Mesh(new THREE.CylinderGeometry(1.02, 1.02, 0.08, 48), ceramic);
  bottom.position.y = 0.04;
  bottom.castShadow = !isMobile;
  cup.add(bottom);

  // Café + crema
  var coffeeSurface = new THREE.Mesh(new THREE.CircleGeometry(1.28, 48), coffee);
  coffeeSurface.rotation.x = -Math.PI / 2;
  coffeeSurface.position.y = 1.6;
  cup.add(coffeeSurface);

  var cremaRing = new THREE.Mesh(new THREE.RingGeometry(0.9, 1.26, 48), foam);
  cremaRing.rotation.x = -Math.PI / 2;
  cremaRing.position.y = 1.605;
  cremaRing.material = new THREE.MeshStandardMaterial({ color: 0xb98a5a, roughness: 0.5, transparent: true, opacity: 0.55 });
  cup.add(cremaRing);

  // Asa
  var handle = new THREE.Mesh(new THREE.TorusGeometry(0.52, 0.16, 20, 40, Math.PI * 1.1), ceramic);
  handle.position.set(1.42, 0.95, 0);
  handle.rotation.z = -Math.PI / 2.6;
  handle.castShadow = !isMobile;
  cup.add(handle);

  // Plato
  var saucer = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.35, 0.12, 56), ceramic);
  saucer.position.y = -0.02;
  saucer.castShadow = !isMobile;
  saucer.receiveShadow = !isMobile;
  cup.add(saucer);

  var saucerWell = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.1, 0.06, 48), ceramicInner);
  saucerWell.position.y = 0.06;
  cup.add(saucerWell);

  // --- Suelo para sombra ---
  if (!isMobile) {
    var ground = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.ShadowMaterial({ opacity: 0.32 }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.08;
    ground.receiveShadow = true;
    scene.add(ground);
  }

  // --- Vapor (partículas) ---
  function steamSprite() {
    var c = document.createElement('canvas');
    c.width = 64; c.height = 64;
    var ctx = c.getContext('2d');
    var g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(233, 216, 191, 0.9)');
    g.addColorStop(0.4, 'rgba(233, 216, 191, 0.35)');
    g.addColorStop(1, 'rgba(233, 216, 191, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }

  var STEAM_COUNT = isMobile ? 26 : 60;
  var steamGeo = new THREE.BufferGeometry();
  var positions = new Float32Array(STEAM_COUNT * 3);
  var seeds = new Float32Array(STEAM_COUNT);
  for (var i = 0; i < STEAM_COUNT; i++) {
    positions[i * 3] = (Math.sin(i * 12.9898) ) * 0.5;
    positions[i * 3 + 1] = 1.7 + (i / STEAM_COUNT) * 3.2;
    positions[i * 3 + 2] = (Math.cos(i * 4.1414)) * 0.5;
    seeds[i] = (i * 7.13) % 6.28;
  }
  steamGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  var steamMat = new THREE.PointsMaterial({
    size: 1.5,
    map: steamSprite(),
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    color: 0xe9d8bf
  });
  var steam = new THREE.Points(steamGeo, steamMat);
  cup.add(steam);

  // --- Iluminación de 3 puntos ---
  scene.add(new THREE.AmbientLight(0x3a2a1a, 0.5));

  var key = new THREE.DirectionalLight(0xffe0b0, 1.05);
  key.position.set(5, 9, 6);
  if (!isMobile) {
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 30;
    key.shadow.camera.left = -6;
    key.shadow.camera.right = 6;
    key.shadow.camera.top = 6;
    key.shadow.camera.bottom = -6;
    key.shadow.radius = 4;
    key.shadow.bias = -0.0004;
  }
  scene.add(key);

  var fill = new THREE.DirectionalLight(0x6f86b0, 0.45);
  fill.position.set(-7, 4, -3);
  scene.add(fill);

  var rim = new THREE.PointLight(0xc0894e, 1.0, 24);
  rim.position.set(-4, 3, -6);
  scene.add(rim);

  // --- Cámara ligada al scroll ---
  var scrollT = 0;
  var camT = 0;

  function updateScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    scrollT = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
  }
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  var clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    var t = clock.getElapsedTime();
    var dt = clock.getDelta();

    camT += (scrollT - camT) * 0.05;

    // Órbita: rodea la taza y baja el ángulo al hacer scroll
    var angle = t * 0.08 + camT * Math.PI * 1.4;
    var radius = 11 - camT * 3.4;
    var height = 5 - camT * 3.2;
    camera.position.x = Math.sin(angle) * radius;
    camera.position.z = Math.cos(angle) * radius;
    camera.position.y = Math.max(height, 1.1);
    camera.lookAt(-2.6 + camT * 2.6, 2.2 - camT * 1.4, 0);

    // Giro continuo sutil
    cup.rotation.y = t * 0.12;

    // Vapor sube y reaparece
    var pos = steamGeo.attributes.position.array;
    for (var j = 0; j < STEAM_COUNT; j++) {
      pos[j * 3 + 1] += dt * (0.5 + (j % 5) * 0.08);
      pos[j * 3] += Math.sin(t * 1.3 + seeds[j]) * dt * 0.12;
      if (pos[j * 3 + 1] > 5.2) {
        pos[j * 3 + 1] = 1.7;
        pos[j * 3] = Math.sin(j * 12.9898) * 0.4;
        pos[j * 3 + 2] = Math.cos(j * 4.1414) * 0.4;
      }
    }
    steamGeo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }
  animate();

  // --- Resize ---
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      updateScroll();
    }, 150);
  });
})();
