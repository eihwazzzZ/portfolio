import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-elixir-container',
  standalone: true,
  templateUrl: './elixir-container.component.html',
  styleUrls: ['./elixir-container.component.css']
})
export class ElixirContainerComponent implements OnInit, OnDestroy {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private animateFrame: number = 0;

  private loader: GLTFLoader;
  private model: THREE.Object3D;
  private liquid: THREE.Mesh;  // Aquí almacenarás el líquido

  private life: number = 100;  // Vida del personaje (esto puede cambiar dinámicamente)

  constructor(private el: ElementRef) {
    this.loader = new GLTFLoader();
    this.model = new THREE.Object3D();
    this.liquid = new THREE.Mesh();  // Inicializamos el líquido
  }

  ngOnInit(): void {
    this.initScene();
    this.loadModel();
    this.animate();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animateFrame);
    this.renderer.dispose();
  }

  private initScene(): void {
    const width = this.el.nativeElement.clientWidth;
    const height = this.el.nativeElement.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(0, 3, 5);  // Aumentar el valor de Y para que esté más arriba (mira hacia abajo)
    this.camera.lookAt(new THREE.Vector3(0, 1, 0));

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(width, height);
    this.el.nativeElement.appendChild(this.renderer.domElement);

    const controls = new OrbitControls(this.camera, this.renderer.domElement); 
    controls.enableDamping = true; // Suaviza el movimiento de la cámara
    controls.dampingFactor = 0.25; // Ajusta el factor de suavizado
    controls.screenSpacePanning = false;

    // Asegúrate de que el control permita la rotación en todos los ángulos
    controls.enableZoom = true;  // Habilitar el zoom con la rueda del mouse
    controls.enableRotate = true;  // Habilitar la rotación libre
    controls.maxPolarAngle = Math.PI / 2;  // Permitir rotación completa en el eje Y (arriba y abajo)
    controls.minPolarAngle = 0;  // Asegúrate de que la cámara no se gire por debajo de cierto punto
    controls.enablePan = true;  // Permitir el movimiento de la cámara en el espacio
  }

  private loadModel(): void {
    const modelPath = 'assets/3d-models/BasicBottle.glb';  // Ruta del modelo GLB
    this.loader.load(
      modelPath,
      (gltf) => {
        this.model = gltf.scene;
        this.scene.add(this.model);
        
        this.model.scale.set(1, 1, 1);  // Ajusta el tamaño si es necesario
        this.model.position.set(0, 0, 0);  // Ajusta la posición si es necesario

        // Acceder al objeto "Sphere" de Blender, que representa el frasco (elixir)
        const elixir = this.model.getObjectByName('Sphere') as THREE.Object3D;

        if (elixir) {
          const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });  // Por ejemplo, verde
          elixir.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material = material;  // Asignar el material a todas las mallas del elixir
            }
          });
          // Si encontramos el objeto "Sphere", lo agregamos a la escena
          this.scene.add(elixir);
          elixir.position.set(0, 0, 0);  // Ajusta la posición si es necesario
        }

        // Si el objeto "Sphere" no se encuentra, puedes verificar qué objetos tiene el modelo
        else {
          console.error('No se encontró el objeto Sphere en el modelo cargado.');
        }
        // Buscar el objeto del líquido dentro del modelo cargado
        this.liquid = this.model.getObjectByName('Liquid') as THREE.Mesh;
        
        // Si el líquido no tiene un objeto llamado 'Liquid', puedes acceder por índice
        // this.liquid = this.model.children[1] as THREE.Mesh;

        // Inicializa el nivel del líquido
        this.updateLiquidLevel();
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% cargado');
      },
      (error) => {
        console.error('Error al cargar el modelo 3D', error);
      }
    );
  }

  private updateLiquidLevel(): void {
    if (this.liquid) {
      // Aquí controlamos el nivel del líquido, según la vida del personaje
      const maxHeight = 3;  // Altura máxima del líquido (ajusta según tu modelo)
      const height = (this.life / 100) * maxHeight;  // Modificamos la altura del líquido según la vida
      this.liquid.scale.y = height;  // Ajusta la escala en el eje Y para simular la reducción del líquido
      this.liquid.position.y = height / 2;  // Ajusta la posición para que el líquido no se salga
    }
  }

  private animate(): void {
    this.animateFrame = requestAnimationFrame(() => this.animate());
    this.renderScene();
  }

  private renderScene(): void {
    if (this.model) {
      this.model.rotation.x += 0.01;
      this.model.rotation.y += 0.01;
    }

    
    this.renderer.render(this.scene, this.camera);
  }

  // Esta función puede ser llamada para actualizar la vida del personaje y modificar el líquido
  public updateLife(newLife: number): void {
    this.life = newLife;
    this.updateLiquidLevel();  // Actualiza el nivel del líquido en función de la nueva vida
  }
}
