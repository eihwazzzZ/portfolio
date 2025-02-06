import { Component, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';
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

  private life: number = 10;  // Vida del personaje (esto puede cambiar dinámicamente)

  @Input() lifeForChild!: number;

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
    const modelPath = 'assets/3d-models/Elixir_New_Basic_2.glb';  // Ruta del modelo GLB
    this.loader.load(
      modelPath,
      (gltf) => {
        this.model = gltf.scene;
        this.scene.add(this.model);
        
        this.model.scale.set(1, 1, 1);  // Ajusta el tamaño si es necesario
        this.model.position.set(0, 0, 0);  // Ajusta la posición si es necesario

        const glassMaterial = new THREE.MeshPhysicalMaterial({
          color: 0x00ffffff,  // Color blanco, ajustable si quieres un tono diferente
          transparent: true,  // Activar la transparencia
          opacity: 0.3,  // Valor ajustable entre 0 (totalmente transparente) y 1 (totalmente opaco)
          transmission: 1.0,  // Esto hace que el material sea transparente como el vidrio
          roughness: 0.05,  // Controla lo suave del material (puedes ajustarlo a tu gusto)
          metalness: 0.0,  // El vidrio no es metálico
          reflectivity: 0.9,  // Controla los reflejos (ajustalo si es necesario)
          ior: 1.5,  // Índice de refracción típico para vidrio (ajustalo si es necesario)
          clearcoat: 1.0,  // Agrega una capa brillante sobre el material
          clearcoatRoughness: 0.1  // Controla la rugosidad de la capa brillante
        });
        // Acceder al objeto "Sphere" de Blender, que representa el frasco (elixir)
        //const elixir = this.model.getObjectByName('Sphere') as THREE.Object3D;

        const liquidMaterial = new THREE.MeshBasicMaterial({
          color: 0xff0000,  // Color del líquido
        });
        
        // Asignar materiales y el orden de renderizado
        const elixir = this.model.getObjectByName('Sphere') as THREE.Object3D;
        this.liquid  = this.model.getObjectByName('Liquid') as THREE.Mesh;
        
        if (elixir) {
          elixir.traverse((child) => {
            console.log(child);
            console.log(child.position);
            if (child instanceof THREE.Mesh) {
              child.material = glassMaterial;
              child.renderOrder = 1;  // La botella se dibuja después de otros objetos
            }
          });

          this.scene.add(elixir);
          elixir.position.set(0, 0, 0);
        }
        
        if (this.liquid) {
          this.liquid.material = liquidMaterial;
          //this.liquid.renderOrder = 0;  // El líquido se dibuja primero
          this.liquid.updateMatrixWorld(true);
          console.log(this.liquid.position);
          console.log(this.liquid.scale);
          this.liquid.scale.set(1, 15, 1);    // Cambia la escala
          this.liquid.position.set(0, -157, 0);
          this.liquid.updateMatrixWorld(true);
          this.scene.add(this.liquid);
          console.log(this.liquid.position);
          console.log(this.liquid.scale);
          this.renderer.render(this.scene, this.camera);
        }
        

        // Si el objeto "Sphere" no se encuentra, puedes verificar qué objetos tiene el modelo
        else {
          console.error('No se encontró el objeto Sphere en el modelo cargado.');
        }
        // Buscar el objeto del líquido dentro del modelo cargado
        //this.liquid = this.model.getObjectByName('Liquid') as THREE.Mesh;
        
        // Si el líquido no tiene un objeto llamado 'Liquid', puedes acceder por índice
        // this.liquid = this.model.children[1] as THREE.Mesh;
        /*const liquidMaterial = new THREE.MeshBasicMaterial({
          color: 0xff0000,  // Color rojo
        });*/
        
        // Asignar material al líquido
        /*const liquid = this.model.getObjectByName('Liquid') as THREE.Mesh;
        if (liquid) {
          liquid.material = liquidMaterial;
        }*/

        // Inicializa el nivel del líquido
        this.updateLiquidLevel();
        console.log(this.liquid);
        console.log(this.life);
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
      //console.log(this.lifeForChild);
      // Aquí controlamos el nivel del líquido, según la vida del personaje
      const maxHeight = 3;  // Altura máxima del líquido (ajusta según tu modelo)
      const height = (this.life / 100) * maxHeight;  // Modificamos la altura del líquido según la vida
      this.liquid.scale.y = height;  // Ajusta la escala en el eje Y para simular la reducción del líquido
      this.liquid.matrixAutoUpdate = true;
      this.liquid.position.y = -height / 2;  // Actualiza la posición
      this.liquid.updateMatrix();
      this.liquid.updateMatrixWorld(true); 
      console.log(this.liquid);
      //console.log(height);
      //this.liquid.position.y = height / 2;  // Ajusta la posición para que el líquido no se salga
    }
  }

  private animate(): void {
    this.animateFrame = requestAnimationFrame(() => this.animate());
    this.renderScene();
  }

  private renderScene(): void {
    if (this.model) {
      //console.log(this.model);
      //this.model.rotation.x += 0.01;
      //this.model.rotation.y += 0.01;
    }
    //console.log(this.lifeForChild);
    //this.updateLiquidLevel();
    //console.log(this.liquid);
    
    this.renderer.render(this.scene, this.camera);
  }

  // Esta función puede ser llamada para actualizar la vida del personaje y modificar el líquido
  public updateLife(newLife: number): void {
    this.life += newLife;
    this.updateLiquidLevel();  // Actualiza el nivel del líquido en función de la nueva vida
    console.log(this.life);
    console.log(this.liquid);
    debugger;
    this.liquid.position.y = 0;
  }
}
