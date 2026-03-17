import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ShaderPlane = ({ vertexShader, fragmentShader, uniforms }) => {
  const meshRef = useRef(null);
  const { size } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material;
      material.uniforms.u_time.value = state.clock.elapsedTime * 0.5;
      material.uniforms.u_resolution.value.set(size.width, size.height, 1.0);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
};

const createNoiseTexture = () => {
  const size = 64;
  const data = new Uint8Array(size * size * 4);
  for (let i = 0; i < data.length; i += 4) {
    const v = Math.floor(Math.random() * 255);
    data[i] = v;
    data[i + 1] = v;
    data[i + 2] = v;
    data[i + 3] = 255;
  }

  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.needsUpdate = true;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
};

const Animation = ({
  vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader = `
    precision highp float;

    varying vec2 vUv;
    uniform float u_time;
    uniform float u_intensity;
    uniform vec3 u_resolution;
    uniform sampler2D iChannel0;

    #define STEP 128
    #define EPS .001

    float smin(float a, float b, float k) {
      float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
      return mix(b, a, h) - k * h * (1.0 - h);
    }

    const mat2 m = mat2(.8, .6, -.6, .8);

    float noise(in vec2 x) {
      return sin(1.5 * x.x) * sin(1.5 * x.y);
    }

    float fbm6(vec2 p) {
      float f = 0.0;
      f += 0.500000 * (0.5 + 0.5 * noise(p)); p = m * p * 2.02;
      f += 0.250000 * (0.5 + 0.5 * noise(p)); p = m * p * 2.03;
      f += 0.125000 * (0.5 + 0.5 * noise(p)); p = m * p * 2.01;
      f += 0.062500 * (0.5 + 0.5 * noise(p)); p = m * p * 2.04;
      f += 0.015625 * (0.5 + 0.5 * noise(p));
      return f / 0.96875;
    }

    mat2 getRot(float a) {
      float sa = sin(a), ca = cos(a);
      return mat2(ca, -sa, sa, ca);
    }

    vec3 hueShift(vec3 color, float angle) {
      const vec3 k = vec3(0.57735, 0.57735, 0.57735);
      float cosAngle = cos(angle);
      return color * cosAngle + cross(k, color) * sin(angle) + k * dot(k, color) * (1.0 - cosAngle);
    }

    vec3 _position;

    float sphere(vec3 center, float radius) {
      return distance(_position, center) - radius;
    }

    float swingPlane(float height) {
      vec3 pos = _position + vec3(0., 0., u_time * 5.5);
      float def = fbm6(pos.xz * .25) * 0.5;
      float way = pow(abs(pos.x) * 34., 2.5) * .0000125;
      def *= way;
      float ch = height + def;
      return max(pos.y - ch, 0.);
    }

    float map(vec3 pos) {
      _position = pos;
      float dist = swingPlane(0.);
      float sminFactor = 5.25;
      dist = smin(dist, sphere(vec3(0., -15., 80.), 60.), sminFactor);
      return dist;
    }

    void mainImage(out vec4 fragColor, in vec2 fragCoord) {
      float minRes = min(u_resolution.x, u_resolution.y);
      vec2 uv = (fragCoord.xy - .5 * u_resolution.xy) / minRes;

      vec3 rayOrigin = vec3(uv + vec2(0., 6.), -1.);
      vec3 rayDir = normalize(vec3(uv, 1.));
      rayDir.zy = getRot(.15) * rayDir.zy;

      vec3 position = rayOrigin;
      float curDist;
      int nbStep = 0;

      for (; nbStep < STEP; ++nbStep) {
        curDist = map(position + (texture(iChannel0, position.xz) - .5).xyz * .005);
        if (curDist < EPS) break;
        position += rayDir * curDist * .5;
      }

      float f = float(nbStep) / float(STEP);
      f *= .95;

      vec3 c1 = vec3(0.0588, 0.6196, 0.6000); // #0f9e99
      vec3 c2 = vec3(0.6274, 0.7607, 0.6823); // #a0c2ae
      vec3 c3 = hueShift(c1, 3.14159265); // 180 hue shift

      vec3 col = mix(c1, c2, smoothstep(0.0, 0.75, f));
      col = mix(col, c3 * 0.65, smoothstep(0.7, 1.0, f));
      col *= f * u_intensity;

      fragColor = vec4(col, 1.0);
    }

    void main() {
      vec4 fragColor;
      vec2 fragCoord = vUv * u_resolution.xy;
      mainImage(fragColor, fragCoord);
      gl_FragColor = fragColor;
    }
  `,
  uniforms = {},
  className = 'fixed inset-0 -z-10 pointer-events-none',
  intensity = 1.0,
}) => {
  const noiseTexture = useMemo(() => createNoiseTexture(), []);

  const shaderUniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector3(1, 1, 1) },
      u_intensity: { value: intensity },
      iChannel0: { value: noiseTexture },
      ...uniforms,
    }),
    [uniforms, intensity, noiseTexture]
  );

  return (
    <div className={className}>
      <Canvas
        className="h-full w-full"
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <ShaderPlane
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={shaderUniforms}
        />
      </Canvas>
    </div>
  );
};

export default Animation;
