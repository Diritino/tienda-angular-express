import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from './services/productos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // 👈 quité HttpClientModule
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  productos: any[] = [];
  nombre: string = '';
  precio: number | null = null;

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productosService.getProductos()
      .subscribe((data: any[]) => this.productos = data);
  }

  agregarProducto() {
    if (!this.nombre || this.precio === null) return;

    const nuevoProducto = {
      nombre: this.nombre,
      precio: Number(this.precio)
    };

    this.productosService.addProducto(nuevoProducto)
      .subscribe((p: any) => {
        this.productos.push(p);
        this.nombre = '';
        this.precio = null;
      });
  }

  eliminarProducto(id: number) {
    this.productosService.deleteProducto(id)
      .subscribe(() => {
        this.productos = this.productos.filter(p => p.id !== id);
      });
  }
}
