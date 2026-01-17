
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import React, { useEffect, useRef } from 'react';
import './Iridescence.css';

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;
uniform float uTime;
uniform vec3 uColorA; // #e33a3f
uniform vec3 uColorB; // #243b7f
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  
  // Smooth flowing coordinates
  float t = uTime * 0.2;
  
  // Create Gaussian-like light blobs that drift
  float blob1 = sin(uv.x * 2.0 + t) * cos(uv.y * 1.5 - t * 0.8) * 0.5 + 0.5;
  float blob2 = cos(uv.x * 1.2 - t * 1.2) * sin(uv.y * 2.5 + t * 0.5) * 0.5 + 0.5;
  float blob3 = sin((uv.x + uv.y) * 1.0 + t * 0.5) * 0.5 + 0.5;

  // Mix the brand colors with a very light background base
  vec3 base = vec3(0.98, 0.98, 1.0); // Light airy background
  vec3 mix1 = mix(base, uColorA, blob1 * 0.15);
  vec3 mix2 = mix(mix1, uColorB, blob2 * 0.15);
  vec3 final = mix(mix2, uColorA, blob3 * 0.05);
  
  // Vignette for focus
  float dist = distance(uv, vec2(0.5));
  float vignette = smoothstep(0.8, 0.2, dist);
  
  gl_FragColor = vec4(final, vignette * 0.5);
}
`;

interface IridescenceProps {
  colorA?: [number, number, number];
  colorB?: [number, number, number];
  speed?: number;
  className?: string;
}

export default function Iridescence({
  colorA = [0.89, 0.22, 0.24], // Normalized #e33a3f
  colorB = [0.14, 0.23, 0.49], // Normalized #243b7f
  speed = 1.0,
  className = "",
  ...rest
}: IridescenceProps) {
  const ctnDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ctnDom.current) return;
    const ctn = ctnDom.current;
    const renderer = new Renderer({ alpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    let program: Program;

    function resize() {
      if (!ctn) return;
      renderer.setSize(ctn.offsetWidth, ctn.offsetHeight);
    }
    window.addEventListener('resize', resize, false);
    resize();

    const geometry = new Triangle(gl);
    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColorA: { value: new Color(...colorA) },
        uColorB: { value: new Color(...colorB) }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    let animateId: number;

    function update(t: number) {
      animateId = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001 * speed;
      renderer.render({ scene: mesh });
    }
    animateId = requestAnimationFrame(update);
    ctn.appendChild(gl.canvas);

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener('resize', resize);
      try {
        ctn.removeChild(gl.canvas);
      } catch (e) {}
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [colorA, colorB, speed]);

  return <div ref={ctnDom} className={`iridescence-container ${className}`} {...rest} />;
}
