import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-elixir',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './elixir.component.html',
  styleUrl: './elixir.component.css'
})
export class ElixirComponent implements OnInit, OnDestroy{
  @ViewChild('threeCanvas', { static: true }) canvasRef!: ElementRef;
  
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private bottle!: THREE.Mesh;
  private liquid!: THREE.Mesh;
  private animationFrameId: number | null = null;
  liquidLevel: number = 0;  // Nivel inicial del líquido (de 0 a 1)

  constructor() {}

  ngOnInit(): void {
    this.initScene();
    this.animate();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private initScene(): void {
    // Crear la escena
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xeeeeee); // Fondo más claro para contraste

    // Crear la cámara y posicionarla
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 2, 5); // Ajustamos la posición de la cámara para que vea todo correctamente

    // Crear el renderizador de three.js
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);  // Mejorar la calidad del renderizado

    // Obtener el contenedor del lienzo y agregarlo
    const canvasContainer = this.canvasRef.nativeElement;
    canvasContainer.appendChild(this.renderer.domElement);

    // Crear una luz ambiental para iluminar uniformemente
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);  // Luz suave, de bajo nivel
    this.scene.add(ambientLight);

    // Crear una luz direccional para resaltar los objetos
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);  // Luz más potente
    directionalLight.position.set(5, 5, 5); // Posición de la luz
    this.scene.add(directionalLight);

    // Crear la botella (esfera) con más transparencia
    const bottleGeometry = new THREE.SphereGeometry(1, 32, 32);
    const bottleMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00ffffff,  // Color blanco
      transparent: true,  // Activar la transparencia
      opacity: 0.1,  // Menos opacidad para que se vea más transparente
      transmission: 0.9,  // Aumentar la transmisión (más parecido al vidrio)
      roughness: 0.05,  // Superficie suave
      metalness: 0.0,  // No metálico
      reflectivity: 0.8,  // Reflejos mejorados
      ior: 1.5,  // Índice de refracción para vidrio
      clearcoat: 0.1,  // Reducido para no sobrecargar el brillo
      clearcoatRoughness: 0.1,  // Superficie ligeramente rugosa en la capa brillante
    });
    this.bottle = new THREE.Mesh(bottleGeometry, bottleMaterial);
    this.bottle.renderOrder = 1;
    this.scene.add(this.bottle);

    // Crear el líquido dentro de la botella usando una esfera ajustada
    this.liquid = this.createLiquid(this.liquidLevel);
    this.liquid.renderOrder = 0;
    this.scene.add(this.liquid);

    // Posicionar el líquido dentro de la botella
    this.updateLiquidPosition();
  }

  private createLiquid(level: number): THREE.Mesh {
    const radius = 0.9;  // Radio de la botella
    const liquidHeight = 2 * level;  // Altura del líquido basada en el nivel

    const liquidGeometry = new THREE.SphereGeometry(1, 32, 32);  // Crea la parte superior de la esfera
    const liquidMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00ccff,  // Color del líquido, azul brillante
      transparent: true,
      opacity: 0.8,  // Opacidad para verlo claramente
      transmission: 0.9,
      roughness: 0.2,
      clearcoat: 1,  // Brillo adicional
    });
    
    return new THREE.Mesh(liquidGeometry, liquidMaterial);
  }

  private updateLiquidPosition(): void {
    const liquidHeight = 2 * this.liquidLevel;  // Altura del líquido, se ajusta según el nivel

    // Actualizamos la geometría y posición del líquido
    this.liquid.geometry = new THREE.SphereGeometry(1, 32, 32);
    this.liquid.position.y = -0.2 + liquidHeight / 2;  // Ajustar la posición del líquido dentro de la botella
  }

  private animate(): void {
    this.animationFrameId = requestAnimationFrame(() => this.animate());
    //this.bottle.rotation.x += 0.01;
    //this.bottle.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }

  public setLiquidLevel(level: number): void {
    this.liquidLevel = Math.max(0, Math.min(1, level)); // Mantener entre 0 y 1
    console.log(this.liquidLevel);
    this.updateLiquidLevel();
  }

  private updateLiquidLevel(): void {
    const liquidHeight = Math.PI * this.liquidLevel;  // Ajustamos el valor del líquido
    this.liquid.geometry = new THREE.SphereGeometry(1, 32, 32);
    this.liquid.position.y = -0.2 + liquidHeight / 2;  // Ajustamos la posición según el nivel
    console.log(this.liquid);
  }

}
